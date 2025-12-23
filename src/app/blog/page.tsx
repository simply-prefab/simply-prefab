import { Metadata } from 'next'
import BlogPage from '@/pages/BlogPage'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news and insights from prefab construction industry',
}

// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'
export default function Page() {
  return <BlogPage />
}
