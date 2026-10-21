import { Metadata } from 'next'
import FAQsPage from '@/pages/FAQsPage'

export const metadata: Metadata = {
  title: 'Prefab Construction FAQs',
  description:
    'Answers about prefab home cost, timelines, strength, approvals, payments and warranty from SimplyPrefab.',
  alternates: { canonical: '/faqs' },
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <FAQsPage />
}
