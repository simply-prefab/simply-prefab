import { Metadata } from 'next'
import PriceAnalysisPage from '@/pages/PriceAnalysisPage'

export const metadata: Metadata = {
  title: 'Prefab House Cost Calculator',
  description:
    'Estimate the cost of your prefab or steel structure home and compare it with conventional construction.',
  alternates: { canonical: '/price-analysis' },
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <PriceAnalysisPage />
}
