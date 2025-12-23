import { Metadata } from 'next'
import TriLevelModern from '@/pages/models/TriLevelModern'

export const metadata: Metadata = {
  title: 'TriLevel Modern Model',
  description: 'Modern tri-level prefab home',
}

export default function Page() {
  return <TriLevelModern />
}
