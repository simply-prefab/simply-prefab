import { Metadata } from 'next'
import ProjectsPage from '@/pages/ProjectsPage'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Our completed prefab construction projects',
}
export const dynamic = 'force-dynamic'
export default function Page() {
  return <ProjectsPage />
}
