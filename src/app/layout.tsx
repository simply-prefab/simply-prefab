import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ServiceProvider } from '@/services/ServiceContext'
import { ExpertConsultationProvider } from '@/contexts/ExpertConsultationContext'
import { ClientWrapper } from './client-wrapper'

export const metadata: Metadata = {
  title: {
    default: 'Eco - Prefab Construction Solutions',
    template: '%s | Eco Prefab',
  },
  description: 'Quality prefab construction solutions including penthouses, wall panels, and turnkey prefab solutions in India',
  keywords: 'prefab construction, modular homes, prefab penthouse, wall panels, UPVC windows, turnkey construction, eco homes',
  authors: [{ name: 'Eco Prefab' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://your-domain.com',
    siteName: 'Eco Prefab',
    title: 'Eco - Prefab Construction Solutions',
    description: 'Quality prefab construction solutions in India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eco - Prefab Construction Solutions',
    description: 'Quality prefab construction solutions in India',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ServiceProvider>
            <ExpertConsultationProvider>
              <ClientWrapper>
                {children}
              </ClientWrapper>
            </ExpertConsultationProvider>
          </ServiceProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
