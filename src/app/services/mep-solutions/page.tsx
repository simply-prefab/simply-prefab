import { Metadata } from 'next'
import MEPSolutionsPage from '@/pages/services/MEPSolutionsPage'

export const metadata: Metadata = {
  title: 'MEP Solutions',
  description: 'Mechanical, Electrical, and Plumbing solutions',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <MEPSolutionsPage />
}
