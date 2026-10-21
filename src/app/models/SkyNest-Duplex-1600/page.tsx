import { Metadata } from 'next'
import SkyNestDuplex1600 from '@/pages/models/SkyNestDuplex1600'

export const metadata: Metadata = {
  title: 'SkyNest Duplex 1600 sq ft Prefab Home',
  description:
    '1600 sq ft prefab duplex home. See specifications, floor plans and starting price.',
  alternates: { canonical: '/models/SkyNest-Duplex-1600' },
}

export default function Page() {
  return <SkyNestDuplex1600 />
}
