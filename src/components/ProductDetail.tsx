'use client'

import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Product } from '@/data/products';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductDetailBanner = ({ product }: { product: Product }) => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-16 md:pt-20 pb-8 md:pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/products" className="inline-block mb-4 md:mb-6">
          <Button
            variant="ghost"
            className="transition-all duration-300 text-sm md:text-base"
            style={{
              color: '#666',
              backgroundColor: 'transparent'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('productDetail.backToProducts')}
          </Button>
        </Link>
        
        <div className="text-center mb-12 md:mb-16">
          <Badge
            className="mb-3 md:mb-4 border-0 text-sm md:text-base"
            style={{
              backgroundColor: '#FB921D',
              color: 'white'
            }}
          >
            {t('productDetail.badge')}
          </Badge>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-bold px-4"
            style={{ color: '#1a1a1a' }}
          >
            {product.name}
          </h1>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-6"
            style={{ color: '#666' }}
          >
            {t('productDetail.subtitle', { productName: product.name.toLowerCase() })}
          </p>
        </div>
      </div>
    </section>
  );
};

interface Props { 
  product: Product; 
}

const ProductDetail: React.FC<Props> = ({ product }) => {
  const { t } = useLanguage();
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const { openPopup } = useExpertConsultation();
  
  const prevImage = () => setMainImgIndex((prev) =>
    prev === 0 ? product.images.length - 1 : prev - 1);
  const nextImage = () => setMainImgIndex((prev) =>
    prev === product.images.length - 1 ? 0 : prev + 1);

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

      <ProductDetailBanner product={product} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <Card
          className="p-4 sm:p-6 md:p-8 border-0 hover:shadow-xl transition-all duration-300 mx-auto"
          style={{
            backgroundColor: 'white',
            border: '2px solid #FFD0A0',
            maxWidth: '1200px'
          }}
        >
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="lg:w-1/2">
                <div 
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: '#FFF5E6',
                    border: '2px solid #FFD0A0'
                  }}
                >
                  {product.images?.[mainImgIndex] ? (
                    <img
                      src={product.images[mainImgIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-base sm:text-lg font-semibold text-center px-4"
                      style={{ color: '#FB921D' }}
                    >
                      {t('productDetail.imageNotAvailable')}
                    </div>
                  )}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow transition-all border-0"
                        style={{ color: '#FB921D' }}
                        aria-label={t('productDetail.previousImage')}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow transition-all border-0"
                        style={{ color: '#FB921D' }}
                        aria-label={t('productDetail.nextImage')}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}
                </div>
                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto py-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImgIndex(idx)}
                        className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 transition-all ${
                          mainImgIndex === idx
                            ? 'border-[#FB921D] bg-[#FFF5E6] shadow-md scale-105'
                            : 'border-[#FFD0A0] bg-white hover:border-[#FB921D]'
                        }`}
                        aria-label={t('productDetail.viewImage', { number: idx + 1 })}
                        type="button"
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} ${t('productDetail.view')} ${idx + 1}`}
                          className="w-full h-full object-cover rounded-md" 
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 
                      className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('productDetail.overview')}
                    </h2>
                    <p 
                      className="text-base sm:text-lg leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <h2 
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('productDetail.technicalSpecifications')}
                    </h2>
                    <ul className="space-y-2">
                      {product.specifications.map((spec, i) => (
                        <li 
                          key={i} 
                          className="flex items-start space-x-2 sm:space-x-3"
                          style={{ color: '#666' }}
                        >
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: '#FB921D' }}
                          />
                          <span className="text-sm sm:text-base">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 
                      className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('productDetail.structuralPerformance')}
                    </h2>
                    <ul className="space-y-2">
                      {product.performance.map((perf, i) => (
                        <li 
                          key={i} 
                          className="flex items-start space-x-2 sm:space-x-3"
                          style={{ color: '#666' }}
                        >
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: '#FB921D' }}
                          />
                          <span className="text-sm sm:text-base">{perf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t" style={{ borderColor: '#FFD0A0' }}>
                  <Button
                    size="lg"
                    className="w-full font-semibold transition-all duration-300 text-sm sm:text-base py-3 sm:py-4"
                    style={{
                      backgroundColor: '#FB921D',
                      color: 'white'
                    }}
                    onClick={openPopup}
                  >
                    {t('productDetail.getExpertConsultation')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Banner for CTA */}
      <section
        className="py-12 md:py-16 text-white px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 font-bold">
            {t('productDetail.cta.title')}
          </h3>
          <p 
            className="text-base sm:text-lg mb-4 sm:mb-6 px-2"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('productDetail.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              className="font-semibold transition-all duration-300 border-2 w-full sm:w-auto text-sm sm:text-base"
              style={{
                backgroundColor: 'white',
                color: '#1a1a1a',
                borderColor: 'white'
              }}
              onClick={openPopup}
            >
              {t('productDetail.cta.scheduleCall')}
            </Button>
            <Link href="/projects" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-2 font-semibold transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                style={{
                  borderColor: 'white',
                  backgroundColor: 'transparent'
                }}
              >
                {t('productDetail.cta.viewProjects')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
