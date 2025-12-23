import { Metadata } from 'next'
import ServicesPage from '@/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive prefab construction services',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <ServicesPage />
}
