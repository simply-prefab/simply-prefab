import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

const BASE = 'https://www.simplyprefab.com'

const routes = [
  '',
  '/about',
  '/why-simplyprefab',
  '/services',
  '/services/turnkey-prefab',
  '/services/prefab-penthouse',
  '/services/wall-panels',
  '/services/upvc-windows',
  '/services/mep-solutions',
  '/services/waterproofing',
  '/services/architecture-design',
  '/models',
  '/models/CompactNest-600',
  '/models/SkyNest-Duplex-1600',
  '/models/RoofDeck-Modern-1500',
  '/models/ModernLoft-Terrace-Home-2200',
  '/models/TriLevel-Modern',
  '/products',
  '/projects',
  '/price-analysis',
  '/faqs',
  '/blog',
  '/careers',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/refund-policy',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    ...routes.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path.startsWith('/services') || path.startsWith('/models') ? 0.8 : 0.6,
    })),
    ...products.map((p) => ({
      url: `${BASE}/products/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
