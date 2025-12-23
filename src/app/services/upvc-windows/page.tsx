import { Metadata } from 'next'
import UPVCWindowsPage from '@/pages/services/UPVCWindowsPage'

export const metadata: Metadata = {
  title: 'UPVC Windows',
  description: 'Premium UPVC window solutions',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <UPVCWindowsPage />
}
