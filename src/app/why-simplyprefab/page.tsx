import { Metadata } from 'next'
import WhySimplyPrefabPage from '@/pages/WhySimplyPrefabPage'

export const metadata: Metadata = {
  title: 'Why Choose SimplyPrefab',
  description:
    'Milestone payments, transparent pricing, 100+ quality checks and on-time delivery. See why homeowners across India choose SimplyPrefab for prefab construction.',
  alternates: { canonical: '/why-simplyprefab' },
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <WhySimplyPrefabPage />
}
