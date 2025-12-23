import { Metadata } from 'next'
import ContactPage from '@/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for your prefab construction needs',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'
export default function Page() {
  return <ContactPage />
}
