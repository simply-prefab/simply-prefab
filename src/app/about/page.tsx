import { Metadata } from 'next'
import AboutPage from '@/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About SimplyPrefab',
  description:
    'SimplyPrefab (Prefabulous Homez LLP) designs and builds prefab and pre-engineered steel structures across India. ISO certified, turnkey delivery.',
  alternates: { canonical: '/about' },
}
// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <AboutPage />
}
