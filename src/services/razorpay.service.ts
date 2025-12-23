interface PaymentConfig {
  test: {
    keyId: string;
    keySecret: string;
  };
  live: {
    keyId: string;
    keySecret: string;
  };
}

const paymentConfig: PaymentConfig = {
  test: {
    keyId: 'rzp_test_your_key_id',
    keySecret: 'your_test_secret_key'
  },
  live: {
    keyId: 'rzp_live_your_key_id',
    keySecret: 'your_live_secret_key'
  }
};

let currentMode: 'test' | 'live' = 'test';

export interface PaymentDetails {
  amount: number;
  currency: string;
  receipt: string;
  customerId: string;
  notes?: Record<string, string>;
}

declare global {
  interface Window {
    Razorpay: any;
  }
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
  async createOrder(paymentDetails: PaymentDetails): Promise<any> {
    try {
      // In a real application, you would make an API call to your backend
      // which would then create the order using Razorpay's server-side SDK
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentDetails.amount * 100, // amount in paisa
          currency: paymentDetails.currency,
          receipt: paymentDetails.receipt,
          notes: {
            customerId: paymentDetails.customerId,
            ...paymentDetails.notes
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  },

  // Process payment using Razorpay checkout
  async processPayment(orderDetails: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        key: currentMode === 'test' ? paymentConfig.test.keyId : paymentConfig.live.keyId,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: 'SimplePrefab',
        description: 'Payment for SimplePrefab services',
        order_id: orderDetails.id,
        handler: (response: any) => {
          resolve(response);
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
  },

  // Verify payment signature
  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    try {
      // In a real application, you would make an API call to your backend
      // which would then verify the payment using Razorpay's server-side SDK
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          orderId,
          signature
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      const result = await response.json();
      return result.verified;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  // Switch to live mode
  enableLiveMode() {
    currentMode = 'live';
  },

  // Switch to test mode
  enableTestMode() {
    currentMode = 'test';
  }
};