import { Metadata } from 'next'
import PriceAnalysisPage from '@/pages/PriceAnalysisPage'

export const metadata: Metadata = {
  title: 'Price Analysis',
  description: 'Detailed construction cost analysis and estimation',
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <PriceAnalysisPage />
}
