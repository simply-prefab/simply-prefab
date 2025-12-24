import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { generateCalendarInvite } from '../../../../utils/calendarGenerator';
import { 
  getCustomerConfirmationTemplate,
  getTeamNotificationTemplate,
  getCalendarInviteEmailTemplate,
  getCustomerPaymentTemplate,
  getTeamPaymentTemplate
} from '../../../../utils/emailTemplates';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminDb = getFirestore();
const resend = new Resend(process.env.RESEND_API_KEY);

const RESEND_CONFIG = {
  FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  FROM_NAME: process.env.RESEND_FROM_NAME || 'SimplyPrefab',
  TEAM_EMAIL: process.env.RESEND_TEAM_EMAIL || 'tosayyad@gmail.com',
};

interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
  }>;
}

interface SendEmailRequest {
  type: 'customer_confirmation' | 'team_notification' | 'calendar_invite' | 'custom' | 'send_all';
  emailData?: EmailData;
  bookingData?: any;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendEmailRequest = await request.json();
    const { type, emailData, bookingData } = body;

    console.log(`📧 Processing email request: ${type}`);

    if (!process.env.RESEND_API_KEY || !RESEND_CONFIG.FROM_EMAIL) {
      return NextResponse.json(
        { success: false, error: 'Resend API not configured' },
        { status: 500 }
      );
    }

    // 🚀 NEW: Handle sending all 3 emails with delays
    if (type === 'send_all') {
      return await sendAllEmailsWithDelays(bookingData);
    }

    let preparedEmailData: EmailData;

    switch (type) {
      case 'customer_confirmation':
        preparedEmailData = {
          to: bookingData.customerEmail,
          subject: '✅ Booking Confirmed - SimplyPrefab',
          htmlContent: getCustomerConfirmationTemplate(bookingData)
        };
        break;

      case 'team_notification':
        // Team gets notification with calendar invite
        const teamCalendarContent = generateCalendarInvite(bookingData);
        preparedEmailData = {
          to: RESEND_CONFIG.TEAM_EMAIL,
          subject: `🎉 New Booking: ${bookingData.customerName}`,
          htmlContent: getTeamNotificationTemplate(bookingData),
          attachments: [{
            filename: 'consultation.ics',
            content: Buffer.from(teamCalendarContent)
          }]
        };
        break;

      case 'calendar_invite':
        // Customer gets calendar invitation
        const customerCalendarContent = generateCalendarInvite(bookingData);
        preparedEmailData = {
          to: bookingData.customerEmail,
          subject: '📅 Calendar Invitation - SimplyPrefab Consultation',
          htmlContent: getCalendarInviteEmailTemplate(bookingData),
          attachments: [{
            filename: 'consultation.ics',
            content: Buffer.from(customerCalendarContent)
          }]
        };
        break;

      case 'custom':
        if (!emailData) {
          return NextResponse.json(
            { success: false, error: 'emailData required for custom emails' },
            { status: 400 }
          );
        }
        preparedEmailData = emailData;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Send email via Resend
    const result = await sendEmailViaResend(preparedEmailData);

    if (!result.success) {
      throw new Error(result.error || 'Failed to send email');
    }

    // Log to Firestore using Admin SDK
    try {
      await adminDb.collection('emailLogs').add({
        to: preparedEmailData.to,
        type: type,
        subject: preparedEmailData.subject,
        timestamp: FieldValue.serverTimestamp(),
        messageId: result.messageId,
        status: 'sent',
        hasAttachment: !!(preparedEmailData.attachments && preparedEmailData.attachments.length > 0)
      });
      console.log('✅ Email logged to Firestore');
    } catch (logError) {
      console.error('⚠️ Failed to log email to Firestore:', logError);
      // Don't fail the email send if logging fails
    }

    console.log(`✅ Email sent successfully: ${type}`);
    return NextResponse.json({
      success: true,
      messageId: result.messageId
    });

  } catch (error: any) {
    console.error('❌ Email API error:', error);

    // Log error to Firestore using Admin SDK
    try {
      await adminDb.collection('emailErrors').add({
        type: error.type || 'unknown',
        error: error.message || 'Unknown error',
        timestamp: FieldValue.serverTimestamp(),
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

// 🚀 NEW: Send all 3 emails with delays to avoid rate limiting
async function sendAllEmailsWithDelays(bookingData: any) {
  const results: any[] = [];
  const teamCalendarContent = generateCalendarInvite(bookingData);
  const customerCalendarContent = generateCalendarInvite(bookingData);

  try {
    // Email 1: Team notification
    console.log('📧 Sending team notification...');
    const teamEmail: EmailData = {
      to: RESEND_CONFIG.TEAM_EMAIL,
      subject: `🎉 New Booking: ${bookingData.customerName}`,
      htmlContent: getTeamNotificationTemplate(bookingData),
      attachments: [{
        filename: 'consultation.ics',
        content: Buffer.from(teamCalendarContent)
      }]
    };
    const teamResult = await sendEmailViaResend(teamEmail);
    results.push({ type: 'team_notification', ...teamResult });
    
    // Log to Firestore
    await logEmail(teamEmail, 'team_notification', teamResult.messageId);

    // ⏰ Wait 600ms to avoid rate limit
    await new Promise(resolve => setTimeout(resolve, 600));

    // Email 2: Calendar invite
    console.log('📧 Sending calendar invite...');
    const calendarEmail: EmailData = {
      to: bookingData.customerEmail,
      subject: '📅 Calendar Invitation - SimplyPrefab Consultation',
      htmlContent: getCalendarInviteEmailTemplate(bookingData),
      attachments: [{
        filename: 'consultation.ics',
        content: Buffer.from(customerCalendarContent)
      }]
    };
    const calendarResult = await sendEmailViaResend(calendarEmail);
    results.push({ type: 'calendar_invite', ...calendarResult });
    
    // Log to Firestore
    await logEmail(calendarEmail, 'calendar_invite', calendarResult.messageId);

    // ⏰ Wait 600ms
    await new Promise(resolve => setTimeout(resolve, 600));

    // Email 3: Customer confirmation
    console.log('📧 Sending customer confirmation...');
    const confirmationEmail: EmailData = {
      to: bookingData.customerEmail,
      subject: '✅ Booking Confirmed - SimplyPrefab',
      htmlContent: getCustomerConfirmationTemplate(bookingData)
    };
    const confirmationResult = await sendEmailViaResend(confirmationEmail);
    results.push({ type: 'customer_confirmation', ...confirmationResult });
    
    // Log to Firestore
    await logEmail(confirmationEmail, 'customer_confirmation', confirmationResult.messageId);

    console.log('✅ All emails sent successfully with delays');
    
    return NextResponse.json({
      success: true,
      message: 'All emails sent successfully',
      results
    });

  } catch (error: any) {
    console.error('❌ Error sending emails with delays:', error);
    
    // Log error
    await adminDb.collection('emailErrors').add({
      type: 'send_all',
      error: error.message || 'Unknown error',
      timestamp: FieldValue.serverTimestamp(),
      results
    });

    return NextResponse.json(
      { success: false, error: error.message, results },
      { status: 500 }
    );
  }
}

// Helper: Log email to Firestore
async function logEmail(emailData: EmailData, type: string, messageId?: string) {
  try {
    await adminDb.collection('emailLogs').add({
      to: emailData.to,
      type: type,
      subject: emailData.subject,
      timestamp: FieldValue.serverTimestamp(),
      messageId: messageId || null,
      status: 'sent',
      hasAttachment: !!(emailData.attachments && emailData.attachments.length > 0)
    });
    console.log(`✅ ${type} logged to Firestore`);
  } catch (error) {
    console.error(`⚠️ Failed to log ${type}:`, error);
  }
}

// Helper function to send email via Resend
async function sendEmailViaResend(emailData: EmailData): Promise<{ 
  success: boolean; 
  messageId?: string; 
  error?: string 
}> {
  try {
    const emailOptions: any = {
      from: `${RESEND_CONFIG.FROM_NAME} <${RESEND_CONFIG.FROM_EMAIL}>`,
      to: [emailData.to],
      subject: emailData.subject,
      html: emailData.htmlContent,
    };

    if (emailData.textContent) {
      emailOptions.text = emailData.textContent;
    }

    if (emailData.attachments && emailData.attachments.length > 0) {
      emailOptions.attachments = emailData.attachments;
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error: any) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}
