import { Metadata } from 'next'
import MEPSolutionsPage from '@/pages/services/MEPSolutionsPage'

export const metadata: Metadata = {
  title: 'MEP Solutions: Electrical & Plumbing',
  description:
    'Mechanical, electrical and plumbing design and installation for prefab homes and buildings by SimplyPrefab.',
  alternates: { canonical: '/services/mep-solutions' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <MEPSolutionsPage />
}
