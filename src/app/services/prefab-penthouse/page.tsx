import { Metadata } from 'next'
import PrefabPentHousePage from '@/pages/services/PrefabPentHousePage'

export const metadata: Metadata = {
  title: 'Prefab Penthouse Solutions',
  description: 'Premium prefab penthouse construction',
}

// Add this line to force dynamic rendering
export const dynamic = 'force-dynamic'

export default function Page() {
  return <PrefabPentHousePage />
}
