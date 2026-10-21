import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ServiceProvider } from '@/services/ServiceContext'
import { ExpertConsultationProvider } from '@/contexts/ExpertConsultationContext'
import { ClientWrapper } from './client-wrapper'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.simplyprefab.com'),
  title: {
    default: 'SimplyPrefab | Prefab & Steel Structure Homes in India',
    template: '%s | SimplyPrefab',
  },
  description:
    'SimplyPrefab builds turnkey prefab and pre-engineered steel homes, villas, penthouses and commercial buildings across India. ISO certified. Get a free consultation.',
  keywords: [
    'prefab homes India',
    'prefab house Bangalore',
    'prefab house Hyderabad',
    'steel structure house',
    'PEB construction',
    'LGSF construction',
    'prefab penthouse',
    'modular homes India',
    'turnkey prefab construction',
    'SimplyPrefab',
  ],
  authors: [{ name: 'SimplyPrefab' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.simplyprefab.com',
    siteName: 'SimplyPrefab',
    title: 'SimplyPrefab | Prefab & Steel Structure Homes in India',
    description:
      'Turnkey prefab and steel structure homes across India: faster construction, transparent milestone payments, quality-checked work.',
    images: [{ url: '/images/hero/house.jpg', width: 1200, height: 630, alt: 'SimplyPrefab prefab home' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimplyPrefab | Prefab & Steel Structure Homes in India',
    description: 'Turnkey prefab and steel structure homes across India.',
    images: ['/images/hero/house.jpg'],
  },
  robots: { index: true, follow: true },
}


const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'SimplyPrefab',
  legalName: 'Prefabulous Homez LLP',
  url: 'https://www.simplyprefab.com',
  logo: 'https://www.simplyprefab.com/favicon.ico',
  image: 'https://www.simplyprefab.com/images/hero/house.jpg',
  email: 'projects@simplyprefab.com',
  telephone: '+91-90008-88844',
  areaServed: 'IN',
  description:
    'Turnkey prefab and pre-engineered steel structure construction for homes, villas, penthouses and commercial buildings across India.',
  sameAs: ['https://www.linkedin.com/company/prefabulous-homez-llp'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
          <ServiceProvider>
            <ExpertConsultationProvider>
              <ClientWrapper>
                {children}
              </ClientWrapper>
            </ExpertConsultationProvider>
          </ServiceProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
