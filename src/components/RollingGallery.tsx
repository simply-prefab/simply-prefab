'use client'

import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const RollingGallery = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const { t } = useLanguage();

  const homeModels = [
    {
      id: 1,
      name: t('homeModels.ecoCompact1200.title'),
      area: "1,200 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      price: t('homeModels.ecoCompact1200.price') || "$120,000",
      image: "/images/models/image2.jpg",
      features: [
        t('homeModels.ecoCompact1200.features.0') || "Solar Ready",
        t('homeModels.ecoCompact1200.features.1') || "Energy Efficient",
        t('homeModels.ecoCompact1200.features.2') || "Modern Design"
      ],
      slug: "TriLevel-Modern",
      color: "#FB921D"
    },
    {
      id: 2,
      name: t('homeModels.greenVilla1600.title'),
      area: "1,600 sq ft",
      bedrooms: 3,
      bathrooms: 2.5,
      price: t('homeModels.greenVilla1600.price') || "$155,000",
      image: "/images/models/duplex1.jpg",
      features: [
        t('homeModels.greenVilla1600.features.0') || "Open Floor Plan",
        t('homeModels.greenVilla1600.features.1') || "Smart Home Ready",
        t('homeModels.greenVilla1600.features.2') || "Sustainable Materials"
      ],
      slug: "SkyNest-Duplex-1600",
      color: "#D66A00"
    },
    {
      id: 3,
      name: t('homeModels.tinyEcoStudio.title'),
      area: "600 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      price: t('homeModels.tinyEcoStudio.price') || "$85,000",
      image: "/images/models/compact1.jpg",
      features: [
        t('homeModels.tinyEcoStudio.features.0') || "Minimalist Design",
        t('homeModels.tinyEcoStudio.features.1') || "Off-Grid Ready",
        t('homeModels.tinyEcoStudio.features.2') || "Compact Living"
      ],
      slug: "CompactNest-600",
      color: "#C55A00"
    },
    {
      id: 4,
      name: t('homeModels.familyHaven2000.title'),
      area: "2,200 sq ft",
      bedrooms: 3,
      bathrooms: 2,
      price: t('homeModels.familyHaven2000.price') || "$195,000",
      image: "/images/models/wide-balcony.jpg",
      features: [
        t('homeModels.familyHaven2000.features.0') || "Family Friendly",
        t('homeModels.familyHaven2000.features.1') || "Large Kitchen",
        t('homeModels.familyHaven2000.features.2') || "Outdoor Deck"
      ],
      slug: "ModernLoft-Terrace-Home-2200",
      color: "#D66A00"
    },
    {
      id: 5,
      name: t('homeModels.urbanModern1500.title'),
      area: "1,500 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      price: t('homeModels.urbanModern1500.price') || "$155,000",
      image: "/images/models/SkyNextDuplex/img2.jpg",
      features: [
        t('homeModels.urbanModern1500.features.0') || "Urban Design",
        t('homeModels.urbanModern1500.features.1') || "Rooftop Access",
        t('homeModels.urbanModern1500.features.2') || "City Living"
      ],
      slug: "RoofDeck-Modern-1500",
      color: "#FB921D"
    }
  ];
  const { openPopup } = useExpertConsultation();
  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      ref={containerRef}
      style={{
        background: 'linear-gradient(135deg, #F4E8DC 0%, #FFF5E6 50%, #F4E8DC 100%)'
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-amber-600" />

      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full translate-x-40 -translate-y-40 md:translate-x-48 md:-translate-y-48 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 146, 29, 0.3) 0%, transparent 100%)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 rounded-full -translate-x-40 translate-y-40 md:-translate-x-48 md:translate-y-48 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(197, 90, 0, 0.2) 0%, transparent 100%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24 rounded-2xl md:rounded-3xl p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)',
            boxShadow: '0 20px 60px rgba(251, 146, 29, 0.3)'
          }}
        >
          <div className="mb-4 text-sm md:text-base px-4 py-2 border-0 font-black inline-block bg-white/20 text-white rounded-full">
            {t('rollingGallery.header.badge')}
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4 font-black text-white">
            {t('rollingGallery.header.title')}
          </h2>

          <p className="text-base md:text-lg max-w-3xl mx-auto font-semibold text-white/95">
            {t('rollingGallery.header.subtitle')}
          </p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-6"
          >
            <ChevronDown className="mx-auto" size={24} style={{ color: 'white' }} />
          </motion.div>
        </motion.div>

        {/* Stacking Cards Container */}
        <div className="relative w-full" style={{ perspective: '1000px' }}>
          {homeModels.map((model, index) => (
            <StackCard
              key={model.id}
              model={model}
              index={index}
              totalCards={homeModels.length}
              containerRef={containerRef}
              router={router}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-24 md:mt-32"
        >
          <div
            className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl p-8 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, #FB921D 0%, #D66A00 100%)'
            }}
          >
            <h3 className="text-2xl md:text-5xl font-black mb-4 text-white">
              {t('rollingGallery.cta.title')}
            </h3>
            <p className="mb-8 max-w-2xl mx-auto text-base md:text-lg font-semibold text-white/90">
              {t('rollingGallery.cta.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openPopup}
              className="px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-black transition-all duration-300 rounded-full"
              style={{
                backgroundColor: 'white',
                color: '#FB921D'
              }}


            >
              {t('rollingGallery.cta.button')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Separate StackCard Component
interface StackCardProps {
  model: any;
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement>;
  router: any;
}

const StackCard: React.FC<StackCardProps> = ({
  model,
  index,
  totalCards,
  containerRef,
  router
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  const cardY = useTransform(scrollY, (latest) => {
    if (!ref.current || !containerRef.current) return 0;

    const container = containerRef.current as HTMLElement;
    const containerTop = container.offsetTop;
    const scrollDistance = latest - containerTop;
    const cardStartScroll = window.innerHeight * 1.5 + index * 220;
    const cardProgress = scrollDistance - cardStartScroll;

    if (cardProgress < 0) return 0;

    return -Math.min(cardProgress * 0.25, 40);
  });

  const opacity = useTransform(scrollY, (latest) => {
    if (!ref.current || !containerRef.current) return 1;

    const container = containerRef.current as HTMLElement;
    const containerTop = container.offsetTop;
    const scrollDistance = latest - containerTop;
    const cardStartScroll = window.innerHeight * 1.5 + index * 220;
    const cardProgress = scrollDistance - cardStartScroll;

    if (cardProgress < 0) return 0.8;

    return Math.max(0.6, 1 - cardProgress * 0.001);
  });

  const scale = useTransform(scrollY, (latest) => {
    if (!ref.current || !containerRef.current) return 1;

    const container = containerRef.current as HTMLElement;
    const containerTop = container.offsetTop;
    const scrollDistance = latest - containerTop;
    const cardStartScroll = window.innerHeight * 1.5 + index * 220;
    const cardProgress = scrollDistance - cardStartScroll;

    return Math.max(0.98, 1 - cardProgress * 0.0002);
  });

  return (
    <motion.div
      ref={ref}
      style={{
        y: cardY,
        opacity,
        scale,
        zIndex: totalCards - index,
        marginBottom: '100px'
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: '200px' }}
      className="relative"
    >
      {/* Card Container */}
      <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white">
        {/* Grid: Mobile - vertical stack, Desktop - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[300px]">
          {/* Image Section */}
          <div className="relative w-full h-[240px] md:h-full overflow-hidden">
            <motion.img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

            {/* Model Number Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              className="absolute top-3 left-3 md:top-4 md:left-4 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-black text-base md:text-lg shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${model.color}, ${model.color}dd)`
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
          </div>

          {/* Content Section */}
          <div
            className="relative px-4 py-5 md:p-6 flex flex-col justify-between w-full md:h-full"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            }}
          >
            {/* Top accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              className="absolute top-0 left-0 w-12 md:w-16 h-0.5 md:h-1 origin-left"
              style={{ background: model.color }}
            />

            {/* Content Area */}
            <div className="flex-1 space-y-3 md:space-y-2">
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.15 }}
                className="text-xl md:text-2xl font-black text-white leading-tight pt-1"
              >
                {model.name}
              </motion.h3>

              {/* Specs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex flex-wrap gap-2 md:gap-3 pb-3 border-b text-sm"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#FFB366' }}
              >
                <span className="font-bold">{model.bedrooms} BR</span>
                <span className="font-bold">{model.bathrooms} BA</span>
                <span className="font-bold">{model.area}</span>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.25 }}
                className="space-y-1.5 md:space-y-2"
              >
                {model.features.slice(0, 2).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: model.color }}
                    />
                    <span className="flex-1 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Section - Price & CTA */}
            <div className="pt-4 border-t mt-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-0.5">Starting from</div>
                  <div className="text-xl md:text-2xl font-black" style={{ color: model.color }}>
                    {model.price}
                  </div>
                </div>

                {/* Arrow Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/models/${model.slug}`)}
                  title="Learn More"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer group flex-shrink-0"
                  style={{
                    backgroundColor: model.color,
                    boxShadow: `0 4px 12px ${model.color}40`
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${model.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${model.color}40`;
                  }}
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RollingGallery;
