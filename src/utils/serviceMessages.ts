/**
 * Service Messages Utility
 * 
 * Provides helper functions to get translated messages for service operations.
 * Used by Firebase, Email, Payment, and other services for user-facing error/success messages.
 * 
 * Usage in service error handling:
 * 
 * try {
 *   await FirebaseService.saveCustomer(data);
 * } catch (error) {
 *   const message = getServiceMessage('firebase.errors.saveCustomerFailed');
 *   showNotification(message); // Display to user
 * }
 */

// Import the English translations
import { enTranslations } from '@/translations/en';

// Type-safe path accessor
type TranslationPath = 
  | 'servicesIntegration.firebase.errors.saveCustomerFailed'
  | 'servicesIntegration.firebase.errors.retrieveCustomerFailed'
  | 'servicesIntegration.firebase.errors.updateCustomerFailed'
  | 'servicesIntegration.firebase.errors.updateConsultationFailed'
  | 'servicesIntegration.firebase.errors.updateProjectFailed'
  | 'servicesIntegration.firebase.errors.updatePaymentFailed'
  | 'servicesIntegration.firebase.errors.customerNotFound'
  | 'servicesIntegration.firebase.success.customerSaved'
  | 'servicesIntegration.firebase.success.customerUpdated'
  | 'servicesIntegration.firebase.success.consultationUpdated'
  | 'servicesIntegration.firebase.success.projectDetailsUpdated'
  | 'servicesIntegration.firebase.success.paymentDetailsUpdated'
  | 'servicesIntegration.email.errors.sendFailed'
  | 'servicesIntegration.email.errors.invalidEmail'
  | 'servicesIntegration.email.errors.calendarInviteFailed'
  | 'servicesIntegration.payment.errors.initializationFailed'
  | 'servicesIntegration.payment.errors.orderCreationFailed'
  | 'servicesIntegration.payment.errors.paymentFailed'
  | 'servicesIntegration.payment.errors.verificationFailed'
  | 'servicesIntegration.payment.status.pending'
  | 'servicesIntegration.payment.status.completed'
  | 'servicesIntegration.payment.status.failed'
  | 'servicesIntegration.payment.status.cancelled'
  | 'servicesIntegration.payment.confirmationMessages.success'
  | 'servicesIntegration.payment.confirmationMessages.processing'
  | 'servicesIntegration.payment.confirmationMessages.retry'
  | 'servicesIntegration.payment.confirmationMessages.failed'
  | 'servicesIntegration.whatsapp.errors.sendFailed'
  | 'servicesIntegration.whatsapp.errors.invalidPhone'
  | 'servicesIntegration.customer.registration.success'
  | 'servicesIntegration.customer.registration.failed'
  | 'servicesIntegration.customer.registration.emailAlreadyExists'
  | 'servicesIntegration.customer.registration.validationError'
  | 'servicesIntegration.customer.consultation.scheduled'
  | 'servicesIntegration.customer.consultation.scheduleFailed'
  | 'servicesIntegration.customer.consultation.cancelled'
  | 'servicesIntegration.customer.consultation.completed'
  | 'servicesIntegration.customer.project.created'
  | 'servicesIntegration.customer.project.updated'
  | 'servicesIntegration.customer.project.deleted'
  | 'servicesIntegration.customer.project.failed'
  | 'servicesIntegration.general.loading'
  | 'servicesIntegration.general.processing'
  | 'servicesIntegration.general.success'
  | 'servicesIntegration.general.error'
  | 'servicesIntegration.general.networkError'
  | 'servicesIntegration.general.serverError'
  | 'servicesIntegration.general.unauthorized'
  | 'servicesIntegration.general.notFound';

/**
 * Get a translated service message by path
 * Falls back to the path itself if message not found
 * 
 * @param path - The translation key path
 * @returns The translated message
 */
export function getServiceMessage(path: string): string {
  // Simple nested object accessor for service messages
  const keys = path.split('.');
  let value: any = enTranslations;
  
  for (const key of keys) {
    value = value?.[key];
    if (!value) {
      // Fallback to the path itself if not found
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
  }
  
  return String(value);
}

/**
 * Firebase Service Messages
 */
export const FirebaseMessages = {
  errors: {
    saveCustomerFailed: () => getServiceMessage('servicesIntegration.firebase.errors.saveCustomerFailed'),
    retrieveCustomerFailed: () => getServiceMessage('servicesIntegration.firebase.errors.retrieveCustomerFailed'),
    updateCustomerFailed: () => getServiceMessage('servicesIntegration.firebase.errors.updateCustomerFailed'),
    updateConsultationFailed: () => getServiceMessage('servicesIntegration.firebase.errors.updateConsultationFailed'),
    updateProjectFailed: () => getServiceMessage('servicesIntegration.firebase.errors.updateProjectFailed'),
    updatePaymentFailed: () => getServiceMessage('servicesIntegration.firebase.errors.updatePaymentFailed'),
    customerNotFound: () => getServiceMessage('servicesIntegration.firebase.errors.customerNotFound'),
  },
  success: {
    customerSaved: () => getServiceMessage('servicesIntegration.firebase.success.customerSaved'),
    customerUpdated: () => getServiceMessage('servicesIntegration.firebase.success.customerUpdated'),
    consultationUpdated: () => getServiceMessage('servicesIntegration.firebase.success.consultationUpdated'),
    projectDetailsUpdated: () => getServiceMessage('servicesIntegration.firebase.success.projectDetailsUpdated'),
    paymentDetailsUpdated: () => getServiceMessage('servicesIntegration.firebase.success.paymentDetailsUpdated'),
  }
};

/**
 * Email Service Messages
 */
export const EmailMessages = {
  errors: {
    sendFailed: () => getServiceMessage('servicesIntegration.email.errors.sendFailed'),
    invalidEmail: () => getServiceMessage('servicesIntegration.email.errors.invalidEmail'),
    calendarInviteFailed: () => getServiceMessage('servicesIntegration.email.errors.calendarInviteFailed'),
  }
};

/**
 * Payment Service Messages
 */
export const PaymentMessages = {
  errors: {
    initializationFailed: () => getServiceMessage('servicesIntegration.payment.errors.initializationFailed'),
    orderCreationFailed: () => getServiceMessage('servicesIntegration.payment.errors.orderCreationFailed'),
    paymentFailed: () => getServiceMessage('servicesIntegration.payment.errors.paymentFailed'),
    verificationFailed: () => getServiceMessage('servicesIntegration.payment.errors.verificationFailed'),
  },
  status: {
    pending: () => getServiceMessage('servicesIntegration.payment.status.pending'),
    completed: () => getServiceMessage('servicesIntegration.payment.status.completed'),
    failed: () => getServiceMessage('servicesIntegration.payment.status.failed'),
    cancelled: () => getServiceMessage('servicesIntegration.payment.status.cancelled'),
  },
  confirmationMessages: {
    success: () => getServiceMessage('servicesIntegration.payment.confirmationMessages.success'),
    processing: () => getServiceMessage('servicesIntegration.payment.confirmationMessages.processing'),
    retry: () => getServiceMessage('servicesIntegration.payment.confirmationMessages.retry'),
    failed: () => getServiceMessage('servicesIntegration.payment.confirmationMessages.failed'),
  }
};

/**
 * WhatsApp Service Messages
 */
export const WhatsAppMessages = {
  errors: {
    sendFailed: () => getServiceMessage('servicesIntegration.whatsapp.errors.sendFailed'),
    invalidPhone: () => getServiceMessage('servicesIntegration.whatsapp.errors.invalidPhone'),
  }
};

/**
 * Customer Operation Messages
 */
export const CustomerMessages = {
  registration: {
    success: () => getServiceMessage('servicesIntegration.customer.registration.success'),
    failed: () => getServiceMessage('servicesIntegration.customer.registration.failed'),
    emailAlreadyExists: () => getServiceMessage('servicesIntegration.customer.registration.emailAlreadyExists'),
    validationError: () => getServiceMessage('servicesIntegration.customer.registration.validationError'),
  },
  consultation: {
    scheduled: () => getServiceMessage('servicesIntegration.customer.consultation.scheduled'),
    scheduleFailed: () => getServiceMessage('servicesIntegration.customer.consultation.scheduleFailed'),
    cancelled: () => getServiceMessage('servicesIntegration.customer.consultation.cancelled'),
    completed: () => getServiceMessage('servicesIntegration.customer.consultation.completed'),
  },
  project: {
    created: () => getServiceMessage('servicesIntegration.customer.project.created'),
    updated: () => getServiceMessage('servicesIntegration.customer.project.updated'),
    deleted: () => getServiceMessage('servicesIntegration.customer.project.deleted'),
    failed: () => getServiceMessage('servicesIntegration.customer.project.failed'),
  }
};

/**
 * General Service Messages
 */
export const GeneralMessages = {
  loading: () => getServiceMessage('servicesIntegration.general.loading'),
  processing: () => getServiceMessage('servicesIntegration.general.processing'),
  success: () => getServiceMessage('servicesIntegration.general.success'),
  error: () => getServiceMessage('servicesIntegration.general.error'),
  networkError: () => getServiceMessage('servicesIntegration.general.networkError'),
  serverError: () => getServiceMessage('servicesIntegration.general.serverError'),
  unauthorized: () => getServiceMessage('servicesIntegration.general.unauthorized'),
  notFound: () => getServiceMessage('servicesIntegration.general.notFound'),
};

/**
 * Example usage in a service:
 * 
 * import { FirebaseMessages, PaymentMessages } from '@/utils/serviceMessages';
 * 
 * export const FirebaseService = {
 *   async saveCustomerDetails(data) {
 *     try {
 *       // ... save logic
 *       console.log(FirebaseMessages.success.customerSaved());
 *     } catch (error) {
 *       throw new Error(FirebaseMessages.errors.saveCustomerFailed());
 *     }
 *   }
 * }
 */
