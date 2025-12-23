import { Metadata } from 'next'
import WhySimplyPrefabPage from '@/pages/WhySimplyPrefabPage'

export const metadata: Metadata = {
  title: 'WhySimplyPrefabPage',
  description: 'WhySimplyPrefabPage',
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <WhySimplyPrefabPage />
}
