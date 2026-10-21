import { Metadata } from 'next'
import UPVCWindowsPage from '@/pages/services/UPVCWindowsPage'

export const metadata: Metadata = {
  title: 'UPVC Windows & Doors',
  description:
    'Energy-efficient UPVC windows and doors supplied and installed by SimplyPrefab.',
  alternates: { canonical: '/services/upvc-windows' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <UPVCWindowsPage />
}
