import { Metadata } from 'next'
import TriLevelModern from '@/pages/models/TriLevelModern'

export const metadata: Metadata = {
  title: 'TriLevel Modern Prefab Villa',
  description:
    'Modern tri-level prefab villa. See specifications, floor plans and starting price.',
  alternates: { canonical: '/models/TriLevel-Modern' },
}

export default function Page() {
  return <TriLevelModern />
}
