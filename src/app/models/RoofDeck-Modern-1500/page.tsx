import { Metadata } from 'next'
import RoofDeckModern1500 from '@/pages/models/RoofDeckModern1500'

export const metadata: Metadata = {
  title: 'RoofDeck Modern 1500 sq ft Prefab Home',
  description:
    '1500 sq ft modern prefab home with roof deck. See specifications, floor plans and starting price.',
  alternates: { canonical: '/models/RoofDeck-Modern-1500' },
}

export default function Page() {
  return <RoofDeckModern1500 />
}
