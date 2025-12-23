// ✅ Updated for Next.js API Routes (no Firebase Functions)

import { ConsultationBookingData } from '@/types/whatsapp';
// import { isDevelopment } from './config';

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface SendEmailRequest {
  type: 'customer_confirmation' | 'team_notification' | 'calendar_invite' | 'custom';
  emailData?: any;
  bookingData?: ConsultationBookingData;
}

class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // ✅ UPDATED: Call Next.js API Route instead of Firebase Function
  private async sendEmail(request: SendEmailRequest): Promise<boolean> {
    try {
      console.log('📧 Sending email via Next.js API:', request.type);

      // Development fallback
      // if (isDevelopment) {
      //   console.log('📧 [DEV MODE] Email would be sent:', request.type, request.bookingData?.customerEmail);
      //   await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      //   return true;
      // }

      // ✅ Call Next.js API Route instead of Firebase Function
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          error: `HTTP ${response.status}` 
        }));
        throw new Error(errorData.error || 'Failed to send email');
      }

      const result: EmailResponse = await response.json();

      if (result.success) {
        console.log(`✅ Email ${request.type} sent successfully`);
        return true;
      } else {
        throw new Error(result.error || 'Email failed to send');
      }
    } catch (error: any) {
      console.error(`❌ Failed to send email ${request.type}:`, error);

      // Provide user-friendly error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.error('Network error while sending email');
      } else if (error.message.includes('unavailable')) {
        console.error('Email service temporarily unavailable');
      }

      return false;
    }
  }

  // Send consultation booking confirmation to customer
  async sendCustomerConfirmation(bookingData: ConsultationBookingData): Promise<boolean> {
    return this.sendEmail({
      type: 'customer_confirmation',
      bookingData: this.prepareBookingData(bookingData)
    });
  }

  // Send consultation booking notification to team
  async sendTeamNotification(bookingData: ConsultationBookingData): Promise<boolean> {
    return this.sendEmail({
      type: 'team_notification',
      bookingData: this.prepareBookingData(bookingData)
    });
  }

  // Send calendar invitation to both customer and team
  async sendCalendarInvitation(bookingData: ConsultationBookingData): Promise<boolean> {
    return this.sendEmail({
      type: 'calendar_invite',
      bookingData: this.prepareBookingData(bookingData)
    });
  }

  // Send custom email (for other use cases)
  async sendCustomEmail(
    to: string,
    subject: string,
    htmlContent: string,
    textContent?: string
  ): Promise<boolean> {
    return this.sendEmail({
      type: 'custom',
      emailData: {
        to,
        subject,
        htmlContent,
        textContent
      }
    });
  }

  // Send all booking-related emails at once
  async sendAllBookingEmails(bookingData: ConsultationBookingData): Promise<{
    customerConfirmation: boolean;
    teamNotification: boolean;
    calendarInvite: boolean;
  }> {
    const [customerConfirmation, teamNotification, calendarInvite] = await Promise.all([
      this.sendCustomerConfirmation(bookingData),
      this.sendTeamNotification(bookingData),
      this.sendCalendarInvitation(bookingData)
    ]);

    return {
      customerConfirmation,
      teamNotification,
      calendarInvite
    };
  }

  private prepareBookingData(bookingData: ConsultationBookingData): ConsultationBookingData {
    return {
      ...bookingData,
      appointmentDate: bookingData.appointmentDate instanceof Date
        ? bookingData.appointmentDate.toISOString()
        : bookingData.appointmentDate
    };
  }
}

export default EmailService;
