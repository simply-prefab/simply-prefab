import { Metadata } from 'next'
import ModernLoftTerraceHome2200 from '@/pages/models/ModernLoftTerraceHome2200'

export const metadata: Metadata = {
  title: 'Modern Loft Terrace Home 2200 sq ft',
  description:
    'Spacious 2200 sq ft prefab family home with terrace. See specifications, floor plans and starting price.',
  alternates: { canonical: '/models/ModernLoft-Terrace-Home-2200' },
}

export default function Page() {
  return <ModernLoftTerraceHome2200 />
}
