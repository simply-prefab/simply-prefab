'use client'

import { useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import ExpertPopup from '@/components/ExpertPopup'
import { validateConfig } from '@/utils/config'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    validateConfig()
  }, [])

  return (
    <div className="min-h-screen themed-surface" style={{ backgroundColor: 'var(--theme-background)', color: 'var(--theme-text)' }}>
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
      <ExpertPopup />
      <Toaster />
    </div>
  )
}
