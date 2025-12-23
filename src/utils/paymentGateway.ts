// Real Payment Gateway Integration for SimplyPrefab
// ✅ Updated for Next.js API Routes (no Firebase Functions)

import { CONFIG, isDevelopment } from './config';
import OperationsMonitor from './operationsMonitor';

export interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  consultationType: 'expert-consultation';
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  paymentId: any;
  success: boolean;
  transactionId?: string;
  paymentMethod?: string;
  error?: string;
  redirectUrl?: string;
  orderId?: string;
  receiptId?: string;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Real payment gateway implementation
export class PaymentGateway {
  private static instance: PaymentGateway;

  static getInstance(): PaymentGateway {
    if (!PaymentGateway.instance) {
      PaymentGateway.instance = new PaymentGateway();
    }
    return PaymentGateway.instance;
  }

  // Main payment processing method
  async processPayment(
    paymentDetails: PaymentDetails,
    preferredMethod: 'razorpay' | 'stripe' | 'auto' = 'auto'
  ): Promise<PaymentResult> {
    if (isDevelopment) {
      return this.processMockPayment(paymentDetails);
    }

    try {
      switch (preferredMethod) {
        case 'razorpay':
          return await this.processRazorpayPayment(paymentDetails);
        case 'stripe':
          return await this.processStripePayment(paymentDetails);
        default:
          // Auto-select best payment method based on currency and region
          if (paymentDetails.currency === 'INR') {
            return await this.processRazorpayPayment(paymentDetails);
          } else {
            return await this.processStripePayment(paymentDetails);
          }
      }
    } catch (error) {
      console.error('Payment processing failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
        paymentId: undefined
      };
    }
  }

  // ✅ Razorpay Integration (Using Next.js API Routes)
  async processRazorpayPayment(paymentDetails: PaymentDetails): Promise<PaymentResult> {
    const monitor = OperationsMonitor.getInstance();
    const operationId = monitor.startOperation(
      'payment',
      `Process ₹${paymentDetails.amount} payment for ${paymentDetails.customerName}`,
      paymentDetails
    );

    try {
      monitor.updateOperation(operationId, 'processing');

      // Step 1: Create Razorpay order via Next.js API
      const order = await this.createRazorpayOrder(paymentDetails);

      if (!order) {
        throw new Error('Failed to create Razorpay order');
      }

      // Step 2: Initialize Razorpay checkout
      const result = await this.initiateRazorpayCheckout(order, paymentDetails);

      monitor.updateOperation(
        operationId,
        result.success ? 'success' : 'error',
        result.error
      );

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Razorpay payment failed';
      monitor.updateOperation(operationId, 'error', errorMessage);

      console.error('Razorpay payment failed:', error);
      return {
        success: false,
        error: errorMessage,
        paymentId: undefined
      };
    }
  }

  // ✅ CREATE RAZORPAY ORDER (Next.js API Route)
  private async createRazorpayOrder(
    paymentDetails: PaymentDetails
  ): Promise<RazorpayOrderResponse | null> {
    try {
      if (!CONFIG.RAZORPAY.KEY_ID || CONFIG.RAZORPAY.KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
        throw new Error('Razorpay API keys not configured');
      }

      console.log('📞 Calling Next.js API: /api/payment/create-order');

      const orderData = {
        amount: paymentDetails.amount * 100, // Convert to paise
        currency: paymentDetails.currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          consultationType: paymentDetails.consultationType,
          customerEmail: paymentDetails.customerEmail,
          customerName: paymentDetails.customerName,
          customerPhone: paymentDetails.customerPhone || '',
          description: paymentDetails.description,
          appointmentDate: paymentDetails.metadata?.scheduleData?.appointmentDate || '',
          appointmentTime: paymentDetails.metadata?.scheduleData?.appointmentTime || '',
          location: paymentDetails.metadata?.formData?.location || '',
          projectType: paymentDetails.metadata?.formData?.projectType || '',
          message: paymentDetails.metadata?.formData?.message || '',
        }
      };

      // ✅ Call Next.js API Route (not Firebase Function)
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          error: `HTTP ${response.status}` 
        }));
        throw new Error(errorData.error || 'Failed to create order');
      }

      const result = await response.json();

      if (result && result.id) {
        console.log('✅ Order created successfully:', result);
        return result as RazorpayOrderResponse;
      }

      throw new Error('Invalid response from API');
    } catch (error: any) {
      console.error('❌ Failed to create Razorpay order:', error);

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Network error. Please check your internet connection.');
      }

      throw error;
    }
  }

  // Initialize Razorpay checkout
  private async initiateRazorpayCheckout(
    order: RazorpayOrderResponse,
    paymentDetails: PaymentDetails
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => this.openRazorpayCheckout(order, paymentDetails, resolve);
        script.onerror = () =>
          resolve({
            success: false,
            error: 'Failed to load Razorpay checkout script',
            paymentId: undefined
          });
        document.head.appendChild(script);
      } else {
        this.openRazorpayCheckout(order, paymentDetails, resolve);
      }
    });
  }

  // Open Razorpay checkout modal
  private openRazorpayCheckout(
    order: RazorpayOrderResponse,
    paymentDetails: PaymentDetails,
    resolve: (result: PaymentResult) => void
  ): void {
    const options = {
      key: CONFIG.RAZORPAY.KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: CONFIG.APP.NAME,
      description: paymentDetails.description,
      image: CONFIG.APP.LOGO_URL,
      order_id: order.id,
      prefill: {
        name: paymentDetails.customerName,
        email: paymentDetails.customerEmail,
        contact: paymentDetails.customerPhone || ''
      },
      theme: {
        color: '#FDB515' // SimplyPrefab brand color
      },
      handler: async (response: RazorpayPaymentResponse) => {
        // ✅ Verify payment via Next.js API
        const verificationResult = await this.verifyRazorpayPayment(response, order);
        resolve({
          success: verificationResult.success,
          paymentId: response.razorpay_payment_id,
          transactionId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          paymentMethod: 'razorpay',
          receiptId: order.receipt,
          error: verificationResult.success ? undefined : 'Payment verification failed'
        });
      },
      modal: {
        ondismiss: () => {
          resolve({
            success: false,
            error: 'Payment cancelled by user',
            paymentId: undefined
          });
        }
      },
      notes: {}
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  // ✅ VERIFY RAZORPAY PAYMENT (Next.js API Route)
  private async verifyRazorpayPayment(
    response: RazorpayPaymentResponse,
    order: RazorpayOrderResponse
  ): Promise<{ success: boolean }> {
    try {
      console.log('🔐 Verifying payment signature via Next.js API...');

      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })
      });

      if (!verifyResponse.ok) {
        console.error('❌ Payment verification failed');
        return { success: false };
      }

      const result = await verifyResponse.json();
      
      if (result.success && result.verified) {
        console.log('✅ Payment verified successfully');
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      console.error('Payment verification failed:', error);
      return { success: false };
    }
  }

  // Stripe Integration (Alternative payment method)
  async processStripePayment(paymentDetails: PaymentDetails): Promise<PaymentResult> {
    try {
      // Load Stripe.js if not already loaded
      if (!window.Stripe) {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        document.head.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const stripe = window.Stripe(CONFIG.STRIPE.PUBLISHABLE_KEY);

      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }

      // Create payment intent via Next.js API
      const paymentIntent = await this.createStripePaymentIntent(paymentDetails);

      if (!paymentIntent) {
        throw new Error('Failed to create Stripe payment intent');
      }

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(paymentIntent.client_secret);

      if (result.error) {
        return {
          success: false,
          error: result.error.message,
          paymentId: undefined
        };
      }

      return {
        success: true,
        paymentId: result.paymentIntent.id,
        transactionId: result.paymentIntent.id,
        paymentMethod: 'stripe'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Stripe payment failed',
        paymentId: undefined
      };
    }
  }

  // ✅ CREATE STRIPE PAYMENT INTENT (Next.js API Route)
  private async createStripePaymentIntent(
    paymentDetails: PaymentDetails
  ): Promise<{ client_secret: string } | null> {
    try {
      console.log('📞 Calling Next.js API: /api/payment/create-stripe-intent');

      const response = await fetch('/api/payment/create-stripe-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          customerEmail: paymentDetails.customerEmail,
          customerName: paymentDetails.customerName,
          description: paymentDetails.description,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create Stripe payment intent');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to create Stripe payment intent:', error);
      return null;
    }
  }

  // Mock payment for development/testing
  private async processMockPayment(paymentDetails: PaymentDetails): Promise<PaymentResult> {
    console.log('🎭 [DEV MODE] Processing mock payment:', paymentDetails);

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock successful payment
    return {
      success: true,
      paymentId: `MOCK_PAY_${Date.now()}`,
      transactionId: `MOCK_TXN_${Date.now()}`,
      paymentMethod: 'mock',
      orderId: `MOCK_ORDER_${Date.now()}`,
      receiptId: `receipt_${Date.now()}`
    };
  }

  // UPI Payment Integration (for Indian market)
  async processUPIPayment(paymentDetails: PaymentDetails): Promise<PaymentResult> {
    try {
      // UPI payments through Razorpay
      const upiDetails = {
        ...paymentDetails,
        metadata: {
          ...paymentDetails.metadata,
          payment_method: 'upi'
        }
      };

      return await this.processRazorpayPayment(upiDetails);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'UPI payment failed',
        paymentId: undefined
      };
    }
  }

  // Get supported payment methods based on region/currency
  getSupportedPaymentMethods(currency: string): string[] {
    const methods: string[] = [];

    if (currency === 'INR') {
      methods.push('razorpay', 'upi', 'cards', 'netbanking', 'wallets');
    } else {
      methods.push('stripe', 'cards', 'apple_pay', 'google_pay');
    }

    return methods;
  }

  // Validate payment details
  validatePaymentDetails(paymentDetails: PaymentDetails): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!paymentDetails.amount || paymentDetails.amount <= 0) {
      errors.push('Invalid payment amount');
    }

    if (!paymentDetails.currency) {
      errors.push('Currency is required');
    }

    if (!paymentDetails.customerEmail || !this.isValidEmail(paymentDetails.customerEmail)) {
      errors.push('Valid email is required');
    }

    if (!paymentDetails.customerName || paymentDetails.customerName.trim().length < 2) {
      errors.push('Valid customer name is required');
    }

    if (!paymentDetails.description) {
      errors.push('Payment description is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Payment configuration with real pricing
export const PAYMENT_CONFIG = {
  consultationFee: {
    'expert-consultation': 6000 // ₹10,000 for expert consultation (60 minutes)
  },
  currency: 'INR',
  supportedMethods: ['razorpay', 'stripe', 'upi', 'cards'],
  taxRate: 0.18, // 18% GST
  processingFee: {
    razorpay: 0.0236, // 2.36% for Razorpay
    stripe: 0.029, // 2.9% for Stripe
    upi: 0.005 // 0.5% for UPI
  }
};

// Calculate total amount including tax
export const calculateTotalAmount = (baseAmount: number, includeTax: boolean = true): number => {
  if (!includeTax) return baseAmount;
  return Math.round(baseAmount * (1 + PAYMENT_CONFIG.taxRate));
};

// Calculate processing fee
export const calculateProcessingFee = (
  amount: number,
  method: keyof typeof PAYMENT_CONFIG.processingFee
): number => {
  const feeRate = PAYMENT_CONFIG.processingFee[method] || 0.025;
  return Math.round(amount * feeRate);
};

// Format currency for display
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Declare global Razorpay and Stripe interfaces
declare global {
  interface Window {
    Razorpay: any;
    Stripe: any;
  }
}
