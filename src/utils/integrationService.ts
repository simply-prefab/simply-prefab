// Comprehensive Integration Service for SimplyPrefab
// Orchestrates all payment, email, and WhatsApp services

import { PaymentGateway, PaymentDetails, PaymentResult } from './paymentGateway';
import EmailService, { ConsultationBookingData } from './emailService';
import WhatsAppService from './whatsappService';
import { CONFIG, validateConfig, isDevelopment } from './config';

export interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  consultationType: 'expert-consultation';
  appointmentDate: Date;
  appointmentTime: string;
  questionnaire: Record<string, any>;
  amount: number;
}

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  paymentId?: string;
  error?: string;
  confirmationsSent?: {
    email: boolean;
    whatsapp: boolean;
    calendar: boolean;
  };
}

export class IntegrationService {
  private static instance: IntegrationService;
  private paymentGateway: PaymentGateway;
  private emailService: EmailService;
  private whatsappService: WhatsAppService;

  private constructor() {
    this.paymentGateway = PaymentGateway.getInstance();
    this.emailService = EmailService.getInstance();
    this.whatsappService = WhatsAppService.getInstance();
  }

  static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  // Main booking flow: Payment -> Confirmation -> Notifications
  async processBooking(bookingRequest: BookingRequest): Promise<BookingResult> {
    const bookingId = `BOOK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Step 1: Validate configuration (lenient in development mode)
      console.log('🔄 Starting booking process...', { isDevelopment });
      
      const configValid = validateConfig();
      if (!configValid && !isDevelopment) {
        throw new Error('Service configuration is incomplete. Please check your API keys.');
      }

      if (isDevelopment) {
        console.log('🎭 Running in development mode with mock services');
      }

      // Step 2: Process payment
      const paymentDetails: PaymentDetails = {
        amount: bookingRequest.amount,
        currency: 'INR',
        description: `SimplyPrefab ${bookingRequest.consultationType} consultation`,
        customerEmail: bookingRequest.customerEmail,
        customerName: bookingRequest.customerName,
        customerPhone: bookingRequest.customerPhone,
        consultationType: bookingRequest.consultationType,
        metadata: {
          bookingId,
          appointmentDate: bookingRequest.appointmentDate.toISOString(),
          appointmentTime: bookingRequest.appointmentTime,
          questionnaire: bookingRequest.questionnaire
        }
      };

      console.log('🔄 Processing payment for booking:', bookingId);
      const paymentResult = await this.paymentGateway.processPayment(paymentDetails);

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment processing failed');
      }

      console.log('✅ Payment successful:', paymentResult.transactionId);

      // Step 3: Create booking data
      const bookingData: ConsultationBookingData = {
        bookingId,
        customerName: bookingRequest.customerName,
        customerEmail: bookingRequest.customerEmail,
        customerPhone: bookingRequest.customerPhone,
        consultationType: bookingRequest.consultationType,
        appointmentDate: bookingRequest.appointmentDate,
        appointmentTime: bookingRequest.appointmentTime,
        questionnaire: bookingRequest.questionnaire,
        paymentId: paymentResult.transactionId!,
        amount: bookingRequest.amount
      };

      // Step 4: Send all notifications
      const confirmationResults = await this.sendAllNotifications(bookingData);

      // Step 5: Schedule reminder (for future implementation)
      await this.scheduleReminders(bookingData);

      return {
        success: true,
        bookingId,
        paymentId: paymentResult.transactionId,
        confirmationsSent: confirmationResults
      };

    } catch (error) {
      console.error('❌ Booking processing failed:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Booking processing failed';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle specific error types
        if (error.message.includes('isDevelopment is not defined')) {
          errorMessage = 'Configuration error: Environment detection failed. Please refresh and try again.';
        } else if (error.message.includes('Payment')) {
          errorMessage = 'Payment processing failed. Please try again or contact support.';
        } else if (error.message.includes('Email')) {
          errorMessage = 'Email service temporarily unavailable. Your booking was processed but confirmation may be delayed.';
        }
      }
      
      return {
        success: false,
        error: errorMessage,
        bookingId: bookingId // Include booking ID even on failure for tracking
      };
    }
  }

  // Send all notifications (email + WhatsApp)
  private async sendAllNotifications(bookingData: ConsultationBookingData): Promise<{
    email: boolean;
    whatsapp: boolean;
    calendar: boolean;
  }> {
    console.log('📬 Sending notifications for booking:', bookingData.bookingId);

    // Send notifications in parallel for better performance
    const [
      customerEmailResult,
      teamEmailResult,
      calendarResult,
      customerWhatsAppResult,
      paymentReceiptResult,
      teamWhatsAppResult
    ] = await Promise.allSettled([
      this.emailService.sendCustomerConfirmation(bookingData),
      this.emailService.sendTeamNotification(bookingData),
      this.emailService.sendCalendarInvitation(bookingData),
      this.whatsappService.sendBookingConfirmation(bookingData),
      this.whatsappService.sendPaymentReceipt(bookingData),
      this.whatsappService.sendTeamNotification(bookingData)
    ]);

    // Log results
    const emailSuccess = customerEmailResult.status === 'fulfilled' && 
                        customerEmailResult.value &&
                        teamEmailResult.status === 'fulfilled' && 
                        teamEmailResult.value;

    const whatsappSuccess = customerWhatsAppResult.status === 'fulfilled' && 
                           customerWhatsAppResult.value &&
                           paymentReceiptResult.status === 'fulfilled' && 
                           paymentReceiptResult.value;

    const calendarSuccess = calendarResult.status === 'fulfilled' && 
                           calendarResult.value;

    console.log('📧 Email notifications:', emailSuccess ? '✅' : '❌');
    console.log('📱 WhatsApp notifications:', whatsappSuccess ? '✅' : '❌');
    console.log('📅 Calendar invitation:', calendarSuccess ? '✅' : '❌');

    // Log any failures for debugging
    [customerEmailResult, teamEmailResult, calendarResult, 
     customerWhatsAppResult, paymentReceiptResult, teamWhatsAppResult].forEach((result, index) => {
      if (result.status === 'rejected') {
        const services = ['Customer Email', 'Team Email', 'Calendar', 
                         'Customer WhatsApp', 'Payment Receipt', 'Team WhatsApp'];
        console.error(`❌ ${services[index]} notification failed:`, result.reason);
      }
    });

    return {
      email: emailSuccess,
      whatsapp: whatsappSuccess,
      calendar: calendarSuccess
    };
  }

  // Schedule reminder notifications (future implementation)
  private async scheduleReminders(bookingData: ConsultationBookingData): Promise<void> {
    try {
      // This would typically integrate with a job queue or cron service
      // For now, we'll just log that reminders should be scheduled
      
      const appointmentTime = new Date(bookingData.appointmentDate);
      appointmentTime.setHours(
        parseInt(bookingData.appointmentTime.split(':')[0]),
        parseInt(bookingData.appointmentTime.split(':')[1])
      );

      // Calculate reminder times
      const oneDayBefore = new Date(appointmentTime.getTime() - 24 * 60 * 60 * 1000);
      const oneHourBefore = new Date(appointmentTime.getTime() - 60 * 60 * 1000);
      const fifteenMinutesBefore = new Date(appointmentTime.getTime() - 15 * 60 * 1000);

      console.log('⏰ Reminders should be scheduled for:');
      console.log('📅 1 day before:', oneDayBefore.toISOString());
      console.log('⏰ 1 hour before:', oneHourBefore.toISOString());
      console.log('📞 15 minutes before:', fifteenMinutesBefore.toISOString());

      // In a production environment, you would:
      // 1. Store these in a database with the booking
      // 2. Use a job queue (Redis, AWS SQS) to schedule the reminders
      // 3. Have a separate service that processes these reminders
      
    } catch (error) {
      console.error('Failed to schedule reminders:', error);
    }
  }

  // Send consultation guidelines (called 1 day before appointment)
  async sendConsultationGuidelines(bookingId: string): Promise<boolean> {
    try {
      // In production, you would fetch booking data from database
      console.log('📋 Sending consultation guidelines for booking:', bookingId);
      
      // This is a placeholder - you would need to implement booking data retrieval
      // const bookingData = await this.getBookingFromDatabase(bookingId);
      // return await this.whatsappService.sendConsultationGuidelines(bookingData);
      
      console.log('📋 Consultation guidelines feature requires database integration');
      return true;
    } catch (error) {
      console.error('Failed to send consultation guidelines:', error);
      return false;
    }
  }

  // Send appointment reminder (called 1 hour before appointment)
  async sendAppointmentReminder(bookingId: string): Promise<boolean> {
    try {
      console.log('⏰ Sending appointment reminder for booking:', bookingId);
      
      // This is a placeholder - you would need to implement booking data retrieval
      // const bookingData = await this.getBookingFromDatabase(bookingId);
      // return await this.whatsappService.sendBookingReminder(bookingData);
      
      console.log('⏰ Appointment reminder feature requires database integration');
      return true;
    } catch (error) {
      console.error('Failed to send appointment reminder:', error);
      return false;
    }
  }

  // Health check for all services
  async healthCheck(): Promise<{
    payment: boolean;
    email: boolean;
    whatsapp: boolean;
    overall: boolean;
  }> {
    console.log('🏥 Running service health check...');

    const results = {
      payment: false,
      email: false,
      whatsapp: false,
      overall: false
    };

    try {
      // Check configuration
      const configValid = validateConfig();
      
      // Check if we can create service instances
      results.payment = !!this.paymentGateway && configValid;
      results.email = !!this.emailService && !!CONFIG.RESEND.API_KEY;
      results.whatsapp = !!this.whatsappService && !!CONFIG.WHATSAPP.ACCESS_TOKEN;
      
      results.overall = results.payment && results.email && results.whatsapp;

      console.log('🏥 Health check results:', results);
      return results;
    } catch (error) {
      console.error('Health check failed:', error);
      return results;
    }
  }

  // Get service status and configuration info
  getServiceStatus(): {
    configured: string[];
    missing: string[];
    recommendations: string[];
  } {
    const configured: string[] = [];
    const missing: string[] = [];
    const recommendations: string[] = [];

    // Check Resend
    if (CONFIG.RESEND.API_KEY && CONFIG.RESEND.API_KEY !== 're_DgNLjkPf_aNoU8k6JsESkL3zeVhb3tqZ3') {
      configured.push('Resend Email Service');
    } else {
      missing.push('Resend Email Service');
      recommendations.push('Set up Resend API key for email notifications');
    }

    // Check Razorpay
    if (CONFIG.RAZORPAY.KEY_ID && CONFIG.RAZORPAY.KEY_ID !== 'YOUR_RAZORPAY_KEY_ID') {
      configured.push('Razorpay Payment Gateway');
    } else {
      missing.push('Razorpay Payment Gateway');
      recommendations.push('Configure Razorpay API keys for payment processing');
    }

    // Check WhatsApp
    if (CONFIG.WHATSAPP.ACCESS_TOKEN && CONFIG.WHATSAPP.ACCESS_TOKEN !== 'YOUR_WHATSAPP_ACCESS_TOKEN') {
      configured.push('WhatsApp Business API');
    } else {
      missing.push('WhatsApp Business API');
      recommendations.push('Set up WhatsApp Business API for instant notifications');
    }

    return {
      configured,
      missing,
      recommendations
    };
  }
}

export default IntegrationService;