import { Metadata } from 'next'
import ArchitectureDesignPage from '@/pages/services/ArchitectureDesignPage'

export const metadata: Metadata = {
  title: 'Architecture & House Design Services',
  description:
    'Floor plans, 3D elevations, structural design and BOQ for prefab and steel structure homes by SimplyPrefab.',
  alternates: { canonical: '/services/architecture-design' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <ArchitectureDesignPage />
}
