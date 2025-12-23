import { Metadata } from 'next'
import AboutPage from '@/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our prefab construction solutions and expertise',
}
// Force dynamic rendering to access context providers
export const dynamic = 'force-dynamic'

export default function Page() {
  return <AboutPage />
}
