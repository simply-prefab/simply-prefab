// Configuration for real-time integrations
// Replace these with your actual API keys and configurations

// Environment variable helper that properly reads from Vite env
const getEnvVar = (key: string, fallback: string = ''): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  return fallback;
};

export const CONFIG = {
  // Resend Email Configuration (Primary)
  RESEND: {
    API_KEY: getEnvVar('REACT_APP_RESEND_API_KEY', 're_DgNLjkPf_aNoU8k6JsESkL3zeVhb3tqZ3'),
    FROM_EMAIL: getEnvVar('REACT_APP_FROM_EMAIL', 'tosayyad@gmail.com'),
    FROM_NAME: getEnvVar('REACT_APP_FROM_NAME', 'SimplyPrefab'),
    TEAM_EMAIL: getEnvVar('REACT_APP_TEAM_EMAIL', 'rafisayyad01@gmail.com'),
    SUPPORT_EMAIL: getEnvVar('REACT_APP_SUPPORT_EMAIL', 'rafisayyad01@gmail.com')
  },

  // Razorpay Payment Gateway Configuration
RAZORPAY: {
    // Server-side keys (for API routes) - no prefix
    KEY_ID: getEnvVar('RAZORPAY_KEY_ID', 'rzp_test_RvMhFXre2QEtVG'),
    KEY_SECRET: getEnvVar('RAZORPAY_KEY_SECRET', 'tzva5IkD6DfVF2EDdlgq5yWm'),
    
    // Client-side key (for frontend) - with NEXT_PUBLIC_ prefix
    // PUBLIC_KEY_ID: getEnvVar('NEXT_PUBLIC_RAZORPAY_KEY_ID', ''),
  },

  // Alternative Email Services (in case Resend is not available)
  EMAILJS: {
    SERVICE_ID: getEnvVar('REACT_APP_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_SERVICE_ID'),
    TEMPLATE_ID: getEnvVar('REACT_APP_EMAILJS_TEMPLATE_ID', 'YOUR_EMAILJS_TEMPLATE_ID'),
    PUBLIC_KEY: getEnvVar('REACT_APP_EMAILJS_PUBLIC_KEY', 'YOUR_EMAILJS_PUBLIC_KEY')
  },

  // Stripe Configuration (alternative payment gateway)
  STRIPE: {
    PUBLISHABLE_KEY: getEnvVar('REACT_APP_STRIPE_PUBLISHABLE_KEY', 'YOUR_STRIPE_PUBLISHABLE_KEY')
  },

  // WhatsApp Business API Configuration
  WHATSAPP: {
    ACCESS_TOKEN: getEnvVar('REACT_APP_WHATSAPP_ACCESS_TOKEN', 'YOUR_WHATSAPP_ACCESS_TOKEN'),
    PHONE_NUMBER_ID: getEnvVar('REACT_APP_WHATSAPP_PHONE_NUMBER_ID', 'YOUR_PHONE_NUMBER_ID'),
    API_ENDPOINT: getEnvVar('REACT_APP_WHATSAPP_API_ENDPOINT', 'https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages'),
    TEAM_NUMBER: getEnvVar('REACT_APP_WHATSAPP_TEAM_NUMBER', '918179601941'), // Replace with actual team WhatsApp number
    WEBHOOK_VERIFY_TOKEN: getEnvVar('REACT_APP_WHATSAPP_WEBHOOK_TOKEN', 'YOUR_WEBHOOK_VERIFY_TOKEN')
  },

  // Application Configuration
  APP: {
    NAME: 'SimplyPrefab',
    WEBSITE_URL: getEnvVar('REACT_APP_WEBSITE_URL', 'https://simplyprefab.com'),
    LOGO_URL: getEnvVar('REACT_APP_LOGO_URL', '/logo.png'),
    SUPPORT_PHONE: getEnvVar('REACT_APP_SUPPORT_PHONE', '+91-XXXX-XXXXXX')
  }
};

// Environment check - simplified and robust
export const isProduction = (() => {
  try {
    // Vite's built-in production check (most reliable for Vite apps)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.PROD === true || import.meta.env.MODE === 'production';
    }
    
    // Check for NODE_ENV (fallback)
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
      return true;
    }
    
    // Check for production hostname patterns when in browser
    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname;
      if (hostname.includes('simplyprefab.com') || 
          hostname.includes('firebase.app') ||
          hostname.includes('firebaseapp.com') ||
          hostname.includes('web.app') ||
          hostname.includes('netlify.app') || 
          hostname.includes('vercel.app') ||
          hostname.includes('herokuapp.com')) {
        return true;
      }
    }
    
    // Default to development for safety
    return false;
  } catch (error) {
    console.warn('Environment detection failed, defaulting to development mode:', error);
    return false;
  }
})();

export const isDevelopment = !isProduction;

// Initialize configuration on module load
(() => {
  console.log('🔧 Config module loaded:', { isDevelopment, isProduction });
})();

// Validation functions
export const validateConfig = () => {
  const errors: string[] = [];

  // In development mode, we're more lenient and just warn about missing configs
  if (isDevelopment) {
    console.log('🔧 Development Mode - API Configuration Status:');
    console.log('Environment:', { isDevelopment, isProduction });
    
    // Check Resend configuration
    if (!CONFIG.RESEND.API_KEY || CONFIG.RESEND.API_KEY === 're_DgNLjkPf_aNoU8k6JsESkL3zeVhb3tqZ3') {
      console.info('📧 Development Mode: Emails will be mocked (Resend not configured)');
    } else {
      console.log('✅ Resend configured');
    }

    // Check Razorpay configuration
    if (!CONFIG.RAZORPAY.KEY_ID || CONFIG.RAZORPAY.KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
      console.info('💳 Development Mode: Payments will be mocked (Razorpay not configured)');
    } else {
      console.log('✅ Razorpay configured');
    }

    // Check WhatsApp configuration
    if (!CONFIG.WHATSAPP.ACCESS_TOKEN || CONFIG.WHATSAPP.ACCESS_TOKEN === 'YOUR_WHATSAPP_ACCESS_TOKEN') {
      console.info('📱 Development Mode: WhatsApp messages will be mocked (API not configured)');
    } else {
      console.log('✅ WhatsApp configured');
    }

    console.log('✅ Development mode - mock services will be used for missing configurations');
    // In development, we always return true to allow the app to work
    return true;
  }

  // In production mode, we require all services to be configured
  if (!CONFIG.RESEND.API_KEY || CONFIG.RESEND.API_KEY === 're_DgNLjkPf_aNoU8k6JsESkL3zeVhb3tqZ3') {
    errors.push('Resend API key is not configured');
  }

  if (!CONFIG.RAZORPAY.KEY_ID || CONFIG.RAZORPAY.KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
    errors.push('Razorpay Key ID is not configured');
  }

  if (!CONFIG.WHATSAPP.ACCESS_TOKEN || CONFIG.WHATSAPP.ACCESS_TOKEN === 'YOUR_WHATSAPP_ACCESS_TOKEN') {
    errors.push('WhatsApp Access Token is not configured');
  }

  if (errors.length > 0) {
    console.error('❌ Production configuration errors:', errors);
  }

  return errors.length === 0;
};

// API endpoints
export const API_ENDPOINTS = {
  RESEND: 'https://api.resend.com/emails',
  RAZORPAY_ORDERS: 'https://api.razorpay.com/v1/orders',
  RAZORPAY_PAYMENTS: 'https://api.razorpay.com/v1/payments'
};