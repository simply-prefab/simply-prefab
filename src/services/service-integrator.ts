import { FirebaseService, CustomerDetails } from './firebase.service';
import { EmailService } from './email.service';
import { PaymentService, PaymentDetails } from './payment.service';
import whatsAppService from '../utils/whatsappService';

export class ServiceIntegrator {
  // Save customer details and send welcome email
  async registerCustomer(customerData: CustomerDetails) {
    try {
      // Save to Firebase
      const customerId = await FirebaseService.saveCustomerDetails(customerData);

      // Send welcome email
      await EmailService.sendEmail({
        to: customerData.email,
        subject: 'Welcome to SimplePrefab',
        html: `
          <h1>Welcome to SimplePrefab!</h1>
          <p>Dear ${customerData.name},</p>
          <p>Thank you for choosing SimplePrefab. We're excited to help you with your prefab home journey!</p>
        `
      });

      return customerId;
    } catch (error) {
      console.error('Error in customer registration:', error);
      throw error;
    }
  }

  // Schedule consultation and send calendar invite
  async scheduleConsultation(customerId: string, consultationData: any) {
    try {
      const customer = await FirebaseService.getCustomerDetails(customerId);
      if (!customer) throw new Error('Customer not found');

      // Update customer with consultation details
      await FirebaseService.updateCustomerDetails(customerId, {
        consultationDetails: consultationData
      });

      // Send calendar invite
      await EmailService.sendCalendarInvite({
        attendees: [customer.email],
        startTime: new Date(consultationData.startTime),
        endTime: new Date(consultationData.endTime),
        subject: 'SimplePrefab Consultation',
        description: consultationData.notes || 'Consultation session with SimplePrefab expert',
        location: consultationData.location
      });

      return true;
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      throw error;
    }
  }

  // Process payment and send confirmation
  async processPayment(customerId: string, paymentDetails: PaymentDetails) {
    try {
      const customer = await FirebaseService.getCustomerDetails(customerId);
      if (!customer) throw new Error('Customer not found');

      // Create payment order
      const order = await PaymentService.createOrder({
        ...paymentDetails,
        customerId
      });

      // Update customer with payment details
      await FirebaseService.updateCustomerDetails(customerId, {
        paymentDetails: {
          ...paymentDetails,
          orderId: order.id,
          status: order.status
        }
      });

      // Send email confirmation
      await EmailService.sendEmail({
        to: customer.email,
        subject: 'Payment Confirmation - SimplePrefab',
        html: `
          <h1>Payment Confirmation</h1>
          <p>Dear ${customer.name},</p>
          <p>Your payment has been processed successfully.</p>
          <p>Order ID: ${order.id}</p>
          <p>Amount: ${paymentDetails.amount} ${paymentDetails.currency}</p>
        `
      });

      // Send WhatsApp confirmation
      if (customer.phone) {
        await whatsAppService.sendPaymentConfirmation(customer.phone, {
          orderId: order.id,
          amount: `${paymentDetails.amount} ${paymentDetails.currency}`
        });
      }

      return order;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }
}