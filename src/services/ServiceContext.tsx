'use client'

import React, { createContext, useContext } from 'react';
import { ServiceIntegrator } from './service-integrator';

const ServiceContext = createContext<ServiceIntegrator | null>(null);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const serviceIntegrator = new ServiceIntegrator();

  return (
    <ServiceContext.Provider value={serviceIntegrator}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};