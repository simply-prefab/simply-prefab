import { Metadata } from 'next'
import TurnkeyPrefabPage from '@/pages/services/TurnkeyPrefabPage'

export const metadata: Metadata = {
  title: 'Turnkey Prefab House Construction in India',
  description:
    'End-to-end turnkey prefab and steel structure home construction: design, approvals support, structure, finishing and handover by SimplyPrefab.',
  alternates: { canonical: '/services/turnkey-prefab' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <TurnkeyPrefabPage />
}
