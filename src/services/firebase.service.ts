import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/lib/firebase';

export interface ProjectDetails {
  type: string;
  size: number;
  budget: number;
  timeline: string;
  specifications?: Record<string, any>;
}

export interface ConsultationDetails {
  date: Date;
  time: string;
  type: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface PaymentDetails {
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  method?: string;
}

export interface CustomerDetails {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  projectDetails?: ProjectDetails;
  consultationDetails?: ConsultationDetails;
  paymentDetails?: PaymentDetails;
}

export class FirebaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'FirebaseError';
  }
}

export const FirebaseService = {
  async saveCustomerDetails(customerData: Omit<CustomerDetails, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const customerWithTimestamps = {
        ...customerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const docRef = await addDoc(collection(db, 'customers'), customerWithTimestamps);
      return docRef.id;
    } catch (error) {
      console.error('Error saving customer details:', error);
      throw new FirebaseError('Failed to save customer details', error instanceof Error ? error.message : undefined);
    }
  },

  async getCustomerDetails(customerId: string): Promise<CustomerDetails | null> {
    try {
      const docRef = doc(db, 'customers', customerId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          consultationDetails: data.consultationDetails
            ? {
              ...data.consultationDetails,
              date: data.consultationDetails.date?.toDate(),
            }
            : undefined,
          paymentDetails: data.paymentDetails
            ? {
              ...data.paymentDetails,
              timestamp: data.paymentDetails.timestamp?.toDate(),
            }
            : undefined,
        } as CustomerDetails;
      }
      return null;
    } catch (error) {
      console.error('Error getting customer details:', error);
      throw new FirebaseError('Failed to retrieve customer details', error instanceof Error ? error.message : undefined);
    }
  },

  async updateCustomerDetails(
    customerId: string,
    updates: Partial<Omit<CustomerDetails, 'id' | 'createdAt'>>
  ): Promise<void> {
    try {
      const docRef = doc(db, 'customers', customerId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating customer details:', error);
      throw new FirebaseError('Failed to update customer details', error instanceof Error ? error.message : undefined);
    }
  },

  async updateConsultation(customerId: string, consultationDetails: ConsultationDetails): Promise<void> {
    try {
      const docRef = doc(db, 'customers', customerId);
      await updateDoc(docRef, {
        consultationDetails,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating consultation details:', error);
      throw new FirebaseError('Failed to update consultation details', error instanceof Error ? error.message : undefined);
    }
  },

  async updateProjectDetails(customerId: string, projectDetails: ProjectDetails): Promise<void> {
    try {
      const docRef = doc(db, 'customers', customerId);
      await updateDoc(docRef, {
        projectDetails,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating project details:', error);
      throw new FirebaseError('Failed to update project details', error instanceof Error ? error.message : undefined);
    }
  },

  async updatePaymentDetails(customerId: string, paymentDetails: PaymentDetails): Promise<void> {
    try {
      const docRef = doc(db, 'customers', customerId);
      await updateDoc(docRef, {
        paymentDetails,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating payment details:', error);
      throw new FirebaseError('Failed to update payment details', error instanceof Error ? error.message : undefined);
    }
  },
};