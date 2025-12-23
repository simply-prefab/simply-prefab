import { Metadata } from 'next'
import ArchitectureDesignPage from '@/pages/services/ArchitectureDesignPage'

export const metadata: Metadata = {
  title: 'Architecture Design',
  description: 'Professional architecture design services',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <ArchitectureDesignPage />
}
