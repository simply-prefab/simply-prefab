export interface ConsultationBookingData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  appointmentDate: Date | string;
  appointmentTime: string;
  amount: number;
  bookingId: string;
  paymentId: string;
  consultationType: string;
  location?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  orderId?: string;
  description?: string;
  message?: string;
}

export interface WhatsAppMessageData {
  phoneNumber: string;
  type: 'booking_confirmation' | 'booking_reminder' | 'payment_receipt' | 'consultation_guidelines' | 'team_notification';
  metadata: ConsultationBookingData;
}

export interface WhatsAppResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}