import { Metadata } from 'next'
import ServicesPage from '@/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Prefab Construction Services',
  description:
    'Turnkey prefab homes, prefab penthouses, wall panels, UPVC windows, MEP, waterproofing and architecture design services by SimplyPrefab.',
  alternates: { canonical: '/services' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <ServicesPage />
}
