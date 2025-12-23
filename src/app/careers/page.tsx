import { Metadata } from 'next'
import CareersPage from '@/pages/CareersPage'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join our team at Eco Prefab',
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <CareersPage />
}
