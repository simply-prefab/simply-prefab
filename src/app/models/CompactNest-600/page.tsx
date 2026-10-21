import { Metadata } from 'next'
import TinyEcoStudioPage from '@/pages/models/CompactNest600'

export const metadata: Metadata = {
  title: 'Compact Home 600 sq ft Prefab Model',
  description:
    'Compact 600 sq ft prefab home with efficient layout. See specifications, floor plans and starting price.',
  alternates: { canonical: '/models/CompactNest-600' },
}

export default function Page() {
  return <TinyEcoStudioPage />
}
