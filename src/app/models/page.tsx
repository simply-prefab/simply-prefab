import { Metadata } from 'next'
import AllModelsPage from '@/pages/AllModelsPage'

export const metadata: Metadata = {
  title: 'All Models',
  description: 'Browse our prefab home models',
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <AllModelsPage />
}
