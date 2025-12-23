'use client'

import React, { createContext, useContext, useState } from 'react';
import { useService } from '../services/ServiceContext';
import { toast } from 'sonner';

interface ExpertConsultationContextType {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  scheduleConsultation: (data: ConsultationData) => Promise<void>;
}

interface ConsultationData {
  name: string;
  email: string;
  phone: string;
  startTime: Date;
  endTime: Date;
  notes?: string;
  location?: string;
}

const ExpertConsultationContext = createContext<ExpertConsultationContextType | undefined>(undefined);

export const ExpertConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const service = useService();

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const scheduleConsultation = async (data: ConsultationData) => {
    try {
      // Register the customer first
      const customerId = await service.registerCustomer({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: ''
      });

      // Schedule the consultation
      await service.scheduleConsultation(customerId, {
        startTime: data.startTime,
        endTime: data.endTime,
        notes: data.notes,
        location: data.location
      });

      toast.success('Consultation scheduled successfully!');
      closePopup();
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      toast.error('Failed to schedule consultation. Please try again.');
      throw error;
    }
  };

  return (
    <ExpertConsultationContext.Provider value={{ 
      isPopupOpen, 
      openPopup, 
      closePopup,
      scheduleConsultation 
    }}>
      {children}
    </ExpertConsultationContext.Provider>
  );
};

export const useExpertConsultation = () => {
  const context = useContext(ExpertConsultationContext);
  if (context === undefined) {
    throw new Error('useExpertConsultation must be used within an ExpertConsultationProvider');
  }
  return context;
};