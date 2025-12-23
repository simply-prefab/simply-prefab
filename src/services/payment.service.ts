import { functions } from '../config/firebase.config';
import { httpsCallable } from 'firebase/functions';
import { CONFIG } from '../utils/config';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || CONFIG.RAZORPAY.KEY_ID;

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentDetails {
  amount: number;
  currency: string;
  receipt: string;
  customerId: string;
  notes?: Record<string, string>;
}

export const PaymentService = {
  // Initialize Razorpay script
  async initializeRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  // Create payment order
  async createOrder(paymentDetails: PaymentDetails) {
    try {
      const createRazorpayOrder = httpsCallable(functions, 'createRazorpayOrder');
      const response = await createRazorpayOrder({
        amount: paymentDetails.amount * 100, // amount in paisa
        currency: paymentDetails.currency,
        receipt: paymentDetails.receipt,
        notes: {
          customerId: paymentDetails.customerId,
          ...paymentDetails.notes
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  },

  // Process payment using Razorpay checkout
  async processPayment(orderDetails: any): Promise<any> {
    await this.initializeRazorpay();
    
    return new Promise((resolve, reject) => {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: 'SimplePrefab',
        description: 'Payment for SimplePrefab services',
        order_id: orderDetails.id,
        handler: async (response: any) => {
          try {
            const verifyRazorpayPayment = httpsCallable(functions, 'verifyRazorpayPayment');
            const verificationResponse = await verifyRazorpayPayment({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
            resolve(verificationResponse.data);
          } catch (error) {
            reject(error);
          }
        },
        prefill: {
          name: orderDetails.customerName,
          email: orderDetails.customerEmail,
          contact: orderDetails.customerPhone
        },
        theme: {
          color: '#2E7D32'
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    });
  }
};