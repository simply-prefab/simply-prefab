const RESEND_CONFIG = {
    FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    TEAM_EMAIL: process.env.RESEND_TEAM_EMAIL || 'tosayyad@gmail.com',
};

export function getCustomerConfirmationTemplate(bookingData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px;">
        <h2 style="color: #FDB515; margin-top: 0;">✅ Booking Confirmed!</h2>
        <p style="font-size: 16px; line-height: 1.6;">Dear ${bookingData.customerName},</p>
        <p style="font-size: 16px; line-height: 1.6;">Your consultation has been successfully booked.</p>
        
        <div style="background: #FDF8E8; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #FDB515;">
          <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${bookingData.appointmentDate}</p>
          <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${bookingData.appointmentTime}</p>
          <p style="margin: 5px 0;"><strong>🆔 Booking ID:</strong> ${bookingData.bookingId}</p>
          <p style="margin: 5px 0;"><strong>📋 Type:</strong> ${bookingData.consultationType}</p>
          ${bookingData.amount ? `<p style="margin: 5px 0;"><strong>💰 Amount Paid:</strong> ₹${bookingData.amount.toLocaleString()}</p>` : ''}
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">
          You will receive a calendar invitation in a separate email shortly.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
          Thank you for choosing SimplyPrefab!
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
          © ${new Date().getFullYear()} SimplyPrefab. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getTeamNotificationTemplate(bookingData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px;">
        <h2 style="color: #10b981; margin-top: 0;">🎉 New Booking Received</h2>
        
        <div style="background: #FEF3C7; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #F59E0B;">
          <strong>⚡ Action Required:</strong> New consultation booking received!
        </div>
        
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Customer Details</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${bookingData.customerName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${bookingData.customerEmail}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${bookingData.customerPhone}</p>
          ${bookingData.location ? `<p style="margin: 5px 0;"><strong>Location:</strong> ${bookingData.location}</p>` : ''}
          
          <h3>Booking Details</h3>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.appointmentDate}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.appointmentTime}</p>
          <p style="margin: 5px 0;"><strong>Type:</strong> ${bookingData.consultationType}</p>
          <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
          ${bookingData.amount ? `<p style="margin: 5px 0;"><strong>Amount:</strong> ₹${bookingData.amount.toLocaleString()}</p>` : ''}
          ${bookingData.projectType ? `<p style="margin: 5px 0;"><strong>Project Type:</strong> ${bookingData.projectType}</p>` : ''}
        </div>
        
        ${bookingData.message ? `
        <div style="background: #FDF8E8; padding: 15px; border-radius: 8px; border-left: 4px solid #FDB515; margin: 20px 0;">
          <strong>💬 Customer Message:</strong><br/>
          <p style="margin: 10px 0 0 0;">${bookingData.message}</p>
        </div>
        ` : ''}
        
        <p style="background: #E0F2FE; padding: 15px; border-radius: 8px; margin: 20px 0;">
          📎 <strong>Calendar file attached</strong> - Click the .ics file to add this consultation to your calendar.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          Please contact the customer to confirm and prepare for the consultation.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getCalendarInviteEmailTemplate(bookingData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FDB515; margin: 0;">📅 Calendar Invitation</h1>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">Hi ${bookingData.customerName},</p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Your consultation with SimplyPrefab has been scheduled!
        </p>
        
        <div style="background: linear-gradient(135deg, #FDB515 0%, #F89E1B 100%); padding: 25px; border-radius: 8px; margin: 25px 0; color: white;">
          <h2 style="margin: 0 0 15px 0; font-size: 24px;">📍 Meeting Details</h2>
          <p style="font-size: 18px; margin: 8px 0;"><strong>Date:</strong> ${bookingData.appointmentDate}</p>
          <p style="font-size: 18px; margin: 8px 0;"><strong>Time:</strong> ${bookingData.appointmentTime}</p>
          <p style="font-size: 18px; margin: 8px 0;"><strong>Type:</strong> ${bookingData.consultationType}</p>
          <p style="font-size: 18px; margin: 8px 0;"><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
        </div>
        
        <div style="background: #EDF7FF; padding: 20px; border-radius: 8px; border-left: 4px solid #2196F3; margin: 25px 0;">
          <p style="margin: 0; color: #1565C0; font-size: 15px;">
            <strong>📎 Calendar File Attached</strong><br/><br/>
            Click on the attached <code style="background: white; padding: 2px 6px; border-radius: 3px;">consultation.ics</code> file to automatically add this event to your calendar app (Google Calendar, Outlook, Apple Calendar, etc.)
          </p>
        </div>
        
        <div style="margin: 25px 0;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px;">
            <strong>📝 What to prepare:</strong>
          </p>
          <ul style="font-size: 15px; line-height: 1.8; color: #555;">
            <li>Project requirements and goals</li>
            <li>Budget considerations</li>
            <li>Site/location details</li>
            <li>Any specific questions you have</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
          We look forward to speaking with you!
        </p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Best regards,<br/>
          <strong>SimplyPrefab Team</strong>
        </p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 14px;">
          <p>Questions? Contact us at ${RESEND_CONFIG.TEAM_EMAIL}</p>
          <p>© ${new Date().getFullYear()} SimplyPrefab. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getCustomerPaymentTemplate(orderData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px;">
        <h2 style="color: #10b981; margin-top: 0;">✅ Payment Successful!</h2>
        <p style="font-size: 16px; line-height: 1.6;">Hi ${orderData.customerName},</p>
        <p style="font-size: 16px; line-height: 1.6;">Your payment has been successfully processed.</p>
        
        <div style="background: #ECFDF5; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981;">
          <p style="margin: 5px 0;"><strong>💰 Amount:</strong> ₹${orderData.amountInRupees?.toLocaleString() || orderData.amount?.toLocaleString()}</p>
          <p style="margin: 5px 0;"><strong>🆔 Order ID:</strong> ${orderData.id || orderData.orderId}</p>
          <p style="margin: 5px 0;"><strong>💳 Payment ID:</strong> ${orderData.paymentId}</p>
          <p style="margin: 5px 0;"><strong>✔️ Status:</strong> <span style="color: #10b981; font-weight: bold;">PAID</span></p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">
          Our team will contact you shortly at <strong>${orderData.customerEmail}</strong> to schedule your consultation.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
          Thank you for choosing SimplyPrefab!<br/>
          © ${new Date().getFullYear()} SimplyPrefab. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function getTeamPaymentTemplate(orderData: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px;">
        <h2 style="color: #10b981; margin-top: 0;">🎉 New Payment Received!</h2>
        
        <div style="background: #FEF3C7; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #F59E0B;">
          <strong>⚡ Action Required:</strong> A customer has completed their payment.
        </div>
        
        <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Payment Details</h3>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${orderData.amountInRupees?.toLocaleString() || orderData.amount?.toLocaleString()}</p>
          <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderData.id || orderData.orderId}</p>
          <p style="margin: 5px 0;"><strong>Payment ID:</strong> ${orderData.paymentId}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">PAID</span></p>
        </div>
        
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Customer Information</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${orderData.customerName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${orderData.customerEmail}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${orderData.customerPhone || 'Not provided'}</p>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          Please follow up with the customer to schedule their consultation.
        </p>
      </div>
    </body>
    </html>
  `;
}
