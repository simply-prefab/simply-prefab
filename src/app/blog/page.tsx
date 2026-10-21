import { Metadata } from 'next'
import BlogPage from '@/pages/BlogPage'

export const metadata: Metadata = {
  title: 'Prefab Construction Blog',
  description:
    'Guides, costs and tips on prefab and steel structure construction in India from the SimplyPrefab team.',
  alternates: { canonical: '/blog' },
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'
export default function Page() {
  return <BlogPage />
}
