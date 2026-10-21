import { Metadata } from 'next'
import WaterProofingPage from '@/pages/services/WaterProofingPage'

export const metadata: Metadata = {
  title: 'Roof & Terrace Waterproofing Services',
  description:
    'Professional roof, terrace and wall waterproofing for prefab and conventional buildings by SimplyPrefab.',
  alternates: { canonical: '/services/waterproofing' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <WaterProofingPage />
}
