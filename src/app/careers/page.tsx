import { Metadata } from 'next'
import CareersPage from '@/pages/CareersPage'

export const metadata: Metadata = {
  title: 'Careers at SimplyPrefab',
  description:
    'Join SimplyPrefab and build India\'s prefab construction future. See open roles in engineering, sales and site execution.',
  alternates: { canonical: '/careers' },
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <CareersPage />
}
