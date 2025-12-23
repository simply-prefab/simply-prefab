'use client'

import Link from 'next/link';
import { products } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
const ProductsBanner = () => {
  const { t } = useLanguage();
  return (
    <section className="pt-16 md:pt-20 pb-12 md:pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge
            className="mb-3 md:mb-4 border-0 text-sm md:text-base"
            style={{
              backgroundColor: '#FB921D',
              color: 'white'
            }}
          >
            {t('products.ourProducts')}
          </Badge>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-bold px-4"
            style={{ color: '#1a1a1a' }}
          >
           {t('products.premiumConstructionSolutions')}
          </h1>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-6"
            style={{ color: '#666' }}
          >
            {t('products.premiumConstructionSolutionsDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

const ProductsListPage = () => {
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #FFE0C0, #FFF5E6)'
      }}
    >
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      <ProductsBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map(product => (
            <Card
              key={product.id}
              className="border-0 hover:shadow-xl transition-all duration-300 overflow-hidden group mx-auto w-full max-w-sm sm:max-w-none"
              style={{
                backgroundColor: 'white',
                border: '1px solid #FFD0A0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = '#FB921D';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(251, 146, 29, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#FFD0A0';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Link href={`/products/${product.id}`} className="block h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  <div
                    className="flex items-center justify-center h-40 sm:h-48 p-4 sm:p-6 flex-shrink-0"
                    style={{ backgroundColor: '#FFF5E6' }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 sm:h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex-grow flex flex-col">
                    <h3
                      className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-[#FB921D] transition-colors line-clamp-2"
                      style={{ color: '#1a1a1a' }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed flex-grow line-clamp-3"
                      style={{ color: '#666' }}
                    >
                      {product.description}
                    </p>
                    <div
                      className="flex items-center gap-2 font-semibold text-sm sm:text-base transition-colors mt-auto"
                      style={{ color: '#FB921D' }}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <section
        className="py-12 md:py-16 text-white px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-6 font-bold">
            Ready to Build Your Dream Project?
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 px-2"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Experience India's first-of-its-kind turnkey prefab construction solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/projects" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="font-semibold transition-all duration-300 border-2 w-full sm:w-auto text-sm sm:text-base"
                style={{
                  backgroundColor: 'white',
                  color: '#1a1a1a',
                  borderColor: 'white'
                }}
              >
                {t('common.viewProjects')}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-2 font-semibold transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
              style={{
                borderColor: 'white',
                backgroundColor: 'transparent'
              }}
              onClick={openPopup}
            >
              {t('common.scheduleACall')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsListPage;