import { Metadata } from 'next'
import WaterProofingPage from '@/pages/services/WaterProofingPage'

export const metadata: Metadata = {
  title: 'Waterproofing Solutions',
  description: 'Professional waterproofing services',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <WaterProofingPage />
}
