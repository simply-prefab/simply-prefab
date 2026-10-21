import { Metadata } from 'next'
import PrefabPentHousePage from '@/pages/services/PrefabPentHousePage'

export const metadata: Metadata = {
  title: 'Prefab Penthouse on Existing Building',
  description:
    'Add a lightweight steel prefab penthouse or rooftop floor to your existing building, built fast with minimal disruption by SimplyPrefab.',
  alternates: { canonical: '/services/prefab-penthouse' },
}

// Add this line to force dynamic rendering
export const dynamic = 'force-dynamic'

export default function Page() {
  return <PrefabPentHousePage />
}
