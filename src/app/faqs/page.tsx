import { Metadata } from 'next'
import FAQsPage from '@/pages/FAQsPage'

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about prefab construction',
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <FAQsPage />
}
