import { Metadata } from 'next'
import ProjectsPage from '@/pages/ProjectsPage'

export const metadata: Metadata = {
  title: 'Completed Prefab Projects',
  description:
    'Homes, villas, resorts and commercial prefab and steel structure projects delivered by SimplyPrefab across India.',
  alternates: { canonical: '/projects' },
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <ProjectsPage />
}
