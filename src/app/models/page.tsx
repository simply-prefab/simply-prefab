import { Metadata } from 'next'
import AllModelsPage from '@/pages/AllModelsPage'

export const metadata: Metadata = {
  title: 'Prefab Home Models & Prices',
  description:
    'Browse SimplyPrefab prefab home models from 600 to 2200 sq ft with starting prices, floor plans and 3D views.',
  alternates: { canonical: '/models' },
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <AllModelsPage />
}
