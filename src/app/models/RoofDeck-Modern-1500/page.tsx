import { Metadata } from 'next'
import RoofDeckModern1500 from '@/pages/models/RoofDeckModern1500'

export const metadata: Metadata = {
  title: 'Family Haven 2000 Model',
  description: 'Perfect family home - 2000 sq ft',
}

export default function Page() {
  return <RoofDeckModern1500 />
}
