import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase.config';
import { ConsultationBookingData, WhatsAppMessageData, WhatsAppResponse } from '../types/whatsapp';

class WhatsAppService {
  private static instance: WhatsAppService;

  private constructor() {}

  static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }

  private async sendWhatsAppMessage(data: WhatsAppMessageData): Promise<boolean> {
    try {
      console.log('📱 Sending WhatsApp message:', data.type, data.phoneNumber);
      
      const sendMessage = httpsCallable<WhatsAppMessageData, WhatsAppResponse>(
        functions, 
        'sendWhatsAppMessage'
      );
      
      const result = await sendMessage(data);
      
      if (result.data.success) {
        console.log(`✅ WhatsApp ${data.type} sent successfully`);
        return true;
      } else {
        throw new Error(result.data.error || 'WhatsApp message failed to send');
      }
    } catch (error) {
      console.error(`❌ Failed to send WhatsApp ${data.type}:`, error);
      
      // Fallback: Generate WhatsApp URL for manual sending
      if (import.meta.env.DEV) {
        const message = this.generateFallbackMessage(data.type, data.metadata);
        const whatsappUrl = this.generateWhatsAppURL(data.phoneNumber, message);
        console.log('📱 Development fallback URL:', whatsappUrl);
        
        // Optional: Open in new tab for testing
        window.open(whatsappUrl, '_blank');
      }
      
      return false;
    }
  }

  // Send booking confirmation to customer
  async sendBookingConfirmation(bookingData: ConsultationBookingData): Promise<boolean> {
    return this.sendWhatsAppMessage({
      phoneNumber: bookingData.customerPhone,
      type: 'booking_confirmation',
      metadata: bookingData
    });
  }

  // Send booking reminder to customer
  async sendBookingReminder(bookingData: ConsultationBookingData): Promise<boolean> {
    return this.sendWhatsAppMessage({
      phoneNumber: bookingData.customerPhone,
      type: 'booking_reminder',
      metadata: bookingData
    });
  }

  // Send team notification
  async sendTeamNotification(bookingData: ConsultationBookingData): Promise<boolean> {
    const teamNumber = process.env.NEXT_PUBLIC_WHATSAPP_TEAM_NUMBER;
    if (!teamNumber) {
      console.warn('⚠️ Team WhatsApp number not configured');
      return false;
    }

    return this.sendWhatsAppMessage({
      phoneNumber: teamNumber,
      type: 'team_notification',
      metadata: bookingData
    });
  }

  // Send payment receipt
  async sendPaymentReceipt(bookingData: ConsultationBookingData): Promise<boolean> {
    return this.sendWhatsAppMessage({
      phoneNumber: bookingData.customerPhone,
      type: 'payment_receipt',
      metadata: bookingData
    });
  }

  // Send consultation guidelines
  async sendConsultationGuidelines(bookingData: ConsultationBookingData): Promise<boolean> {
    return this.sendWhatsAppMessage({
      phoneNumber: bookingData.customerPhone,
      type: 'consultation_guidelines',
      metadata: bookingData
    });
  }

  // Send quick custom message
  async sendQuickMessage(phoneNumber: string, message: string): Promise<boolean> {
    const mockBookingData: ConsultationBookingData = {
      customerName: 'Customer',
      customerPhone: phoneNumber,
      customerEmail: '',
      appointmentDate: new Date().toISOString(),
      appointmentTime: 'ASAP',
      amount: 0,
      bookingId: 'QUICK-' + Date.now(),
      paymentId: 'QUICK-PAYMENT',
      consultationType: 'Quick Message',
      questionnaire: { message }
    };

    return this.sendWhatsAppMessage({
      phoneNumber,
      type: 'booking_confirmation',
      metadata: mockBookingData
    });
  }

  // Generate WhatsApp URL for manual sending (fallback)
  generateWhatsAppURL(phoneNumber: string, message: string): string {
    const cleanPhone = this.cleanPhoneNumber(phoneNumber);
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  // Fallback message generator for development
  private generateFallbackMessage(type: string, metadata: ConsultationBookingData): string {
    const baseMessage = `SimplyPrefab - ${type.replace('_', ' ').toUpperCase()}`;
    
    switch (type) {
      case 'booking_confirmation':
        return `${baseMessage}\nHi ${metadata.customerName}, your booking is confirmed for ${metadata.appointmentDate} at ${metadata.appointmentTime}`;
      case 'booking_reminder':
        return `${baseMessage}\nReminder: Your consultation is tomorrow at ${metadata.appointmentTime}`;
      case 'payment_receipt':
        return `${baseMessage}\nPayment of ₹${metadata.amount} received. Thank you!`;
      case 'consultation_guidelines':
        return `${baseMessage}\nPlease check your email for consultation guidelines`;
      case 'team_notification':
        return `${baseMessage}\nNew booking from ${metadata.customerName}`;
      default:
        return `Message from SimplyPrefab`;
    }
  }

  private cleanPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '');
  }
}

export default WhatsAppService;