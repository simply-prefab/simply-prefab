import { Metadata } from 'next'
import SkyNestDuplex1600 from '@/pages/models/SkyNestDuplex1600'

export const metadata: Metadata = {
  title: 'SkyNest Duplex 1600 Model',
  description: 'Eco-friendly duplex model - 1600 sq ft',
}

export default function Page() {
  return <SkyNestDuplex1600 />
}
