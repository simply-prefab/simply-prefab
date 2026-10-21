import { Metadata } from 'next'
import ContactPage from '@/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us: Free Prefab Consultation',
  description:
    'Talk to SimplyPrefab about your prefab or steel structure project. Call, WhatsApp or email us for a free consultation.',
  alternates: { canonical: '/contact' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'
export default function Page() {
  return <ContactPage />
}
