import { Metadata } from 'next'
import WallPanelsPage from '@/pages/services/WallPanelsPage'

export const metadata: Metadata = {
  title: 'Prefab Wall Panels (AAC & Fiber Cement)',
  description:
    'Lightweight, fast-install prefab wall panels for homes and commercial buildings. Supply and installation by SimplyPrefab.',
  alternates: { canonical: '/services/wall-panels' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <WallPanelsPage />
}
