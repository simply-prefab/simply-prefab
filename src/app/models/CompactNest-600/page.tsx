import { Metadata } from 'next'
import TinyEcoStudioPage from '@/pages/models/CompactNest600'

export const metadata: Metadata = {
  title: 'EcoCompact 1200 Model',
  description: 'Compact prefab home model - 1200 sq ft',
}

export default function Page() {
  return <TinyEcoStudioPage />
}
