import { Metadata } from 'next'
import TurnkeyPrefabPage from '@/pages/services/TurnkeyPrefabPage'

export const metadata: Metadata = {
  title: 'Turnkey Prefab Solutions',
  description: 'Complete turnkey prefab construction',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <TurnkeyPrefabPage />
}
