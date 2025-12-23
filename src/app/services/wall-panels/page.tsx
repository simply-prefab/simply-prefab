import { Metadata } from 'next'
import WallPanelsPage from '@/pages/services/WallPanelsPage'

export const metadata: Metadata = {
  title: 'Wall Panels',
  description: 'High-quality prefab wall panel solutions',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <WallPanelsPage />
}
