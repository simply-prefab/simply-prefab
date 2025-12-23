"use client"

import React from 'react'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ServiceProvider } from '@/services/ServiceContext'
import { ExpertConsultationProvider } from '@/contexts/ExpertConsultationContext'
import { ClientWrapper } from '@/app/client-wrapper'
import '@/app/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <ServiceProvider>
        <ExpertConsultationProvider>
          <ClientWrapper>
            <Component {...pageProps} />
          </ClientWrapper>
        </ExpertConsultationProvider>
      </ServiceProvider>
    </LanguageProvider>
  )
}
