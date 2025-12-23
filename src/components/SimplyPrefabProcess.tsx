'use client'

import {
  ArrowRight,
  Play,
  X
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';

const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

 
const VideoModal = ({ videoUrl, title, onClose }: { videoUrl: string; title: string; onClose: () => void }) => {
  const youtubeId = getYouTubeId(videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-all"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="aspect-video">
          {youtubeId && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const StackCard = ({ step, index, totalSteps, containerRef, selectedVideo, setSelectedVideo }: any) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  const cardY = useTransform(scrollY, (latest) => {
    if (!ref.current || !containerRef.current) return 0;

    const container = containerRef.current as HTMLElement;
    const containerTop = container.offsetTop;
    
    const scrollDistance = latest - containerTop;
    const cardStartScroll = window.innerHeight * 1.5 + index * 200;
    const cardProgress = scrollDistance - cardStartScroll;
    
    if (cardProgress < 0) return 0;
    
    return -Math.min(cardProgress * 0.25, 40);
  });

  const opacity = useTransform(scrollY, (latest) => {
    if (!ref.current || !containerRef.current) return 1;

    const container = containerRef.current as HTMLElement;
    const containerTop = container.offsetTop;
    const scrollDistance = latest - containerTop;
    const cardStartScroll = window.innerHeight * 1.5 + index * 200;
    const cardProgress = scrollDistance - cardStartScroll;

    if (cardProgress < 0) return 0.8;
    
    return Math.max(0.6, 1 - cardProgress * 0.001);
  });

  const scale = useTransform(scrollY, (latest) => {
    if (!ref.current || !containerRef.current) return 1;

    const container = containerRef.current as HTMLElement;
    const containerTop = container.offsetTop;
    const scrollDistance = latest - containerTop;
    const cardStartScroll = window.innerHeight * 1.5 + index * 200;
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
        zIndex: totalSteps - index,
        marginBottom: '100px'
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: "200px" }}
      className="relative"
    >
      <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[400px] md:min-h-[360px]">
          {/* Left: Image */}
          <motion.div
            className="relative overflow-hidden group"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent group-hover:from-black/30 transition-all duration-300" />

            {/* Sleek Watch Video Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center"
              onClick={() =>
                setSelectedVideo({ url: step.videoUrl, title: step.title })
              }
            >
              <motion.div
                whileHover={{ 
                  boxShadow: '0 20px 40px rgba(251, 146, 29, 0.5)',
                  backgroundColor: step.color
                }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300"
                style={{
                  backgroundColor: step.color,
                  boxShadow: '0 10px 30px rgba(251, 146, 29, 0.3)',
                  backdropFilter: 'blur(8px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Play className="w-5 h-5 fill-white" />
                <span className="text-sm md:text-base font-semibold">{t('constructionProcess.watchVideo')}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Right: Dark Content */}
          <div
            className="p-6 md:p-10 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            }}
          >
            {/* Top Section */}
            <div>
              {/* Step Number */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + 0.1 }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-black text-lg mb-4 md:mb-6"
                style={{
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
                }}
              >
                {step.stepNumber}
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.15 }}
                className="text-xl md:text-3xl font-black text-white mb-3 md:mb-4 leading-tight"
              >
                {step.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.2 }}
                className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed font-medium"
              >
                {step.description}
              </motion.p>
            </div>

            {/* Bottom Section with Button */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.25 }}
              whileHover={{ x: 4 }}
              onClick={() =>
                setSelectedVideo({ url: step.videoUrl, title: step.title })
              }
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-white text-sm md:text-base w-fit transition-all duration-300"
              style={{
                backgroundColor: step.color,
                boxShadow: '0 8px 20px rgba(251, 146, 29, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(251, 146, 29, 0.4)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(251, 146, 29, 0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Play className="w-4 md:w-5 h-4 md:h-5 fill-white" />
              <span>{t('constructionProcess.watchVideo')}</span>
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
            </motion.button>

            {/* Top accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: index * 0.08 + 0.1 }}
              className="absolute top-0 left-0 w-12 md:w-16 h-0.5 md:h-1 origin-left"
              style={{ background: step.color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ConstructionProcessScrollStack = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const processSteps = [
    {
      id: 1,
      stepNumber: "01",
      title: t('constructionProcess.steps.step1.title'),
      description: t('constructionProcess.steps.step1.description'),
      videoUrl: "https://www.youtube.com/watch?v=9PL38lv_CPg",
      image: "/images/process/our-construction-process.png",
      color: "#FB921D"
    },
    {
      id: 2,
      stepNumber: "02",
      title: t('constructionProcess.steps.step2.title'),
      description: t('constructionProcess.steps.step2.description'),
      videoUrl: "https://www.youtube.com/watch?v=tyHaXdrqJKQ&t=4s",
      image: "/images/process/step2.jpg",
      color: "#D66A00"
    },
    {
      id: 3,
      stepNumber: "03",
      title: t('constructionProcess.steps.step3.title'),
      description: t('constructionProcess.steps.step3.description'),
      videoUrl: "https://www.youtube.com/watch?v=ZU7uYvVL34g&t=92s",
      image: "/images/process/step3.jpg",
      color: "#E67E0F"
    },
    {
      id: 4,  
      stepNumber: "04",
      title: t('constructionProcess.steps.step4.title'),
      description: t('constructionProcess.steps.step4.description'),
      videoUrl: "https://www.youtube.com/watch?v=pdt5KdkTcsI",
      image: "/images/process/step4.jpg",
      color: "#C55A00"
    },
    {
      id: 5,
      stepNumber: "05",
      title: t('constructionProcess.steps.step5.title'),
      description: t('constructionProcess.steps.step5.description'),
      videoUrl: "https://www.youtube.com/watch?v=SaTJAzuR-lE&t=2s",
      image: "/images/process/step7.jpg",
      color: "#FB921D"
    },
    {
      id: 6,
      stepNumber: "06",
      title: t('constructionProcess.steps.step6.title'),
      description: t('constructionProcess.steps.step6.description'),
      videoUrl: "https://www.youtube.com/watch?v=6292W8RE5BY",
      image: "/images/process/step8.jpg",
      color: "#D66A00"
    },
    {
      id: 7,
      stepNumber: "07",
      title: t('constructionProcess.steps.step7.title'),
      description: t('constructionProcess.steps.step7.description'),
      videoUrl: "https://www.youtube.com/watch?v=WSCLdHuuTa4",
      image: "/images/process/step6.jpg",
      color: "#E67E0F"
    },
    {
      id: 8,
      stepNumber: "08",
      title: t('constructionProcess.steps.step8.title'),
      description: t('constructionProcess.steps.step8.description'),
      videoUrl: "https://www.youtube.com/watch?v=zpZeSknZ4Z8",
      image: "/images/process/step5.jpg",
      color: "#C55A00"
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
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-amber-600" />

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
          <Badge className="mb-4 text-sm md:text-base px-4 py-2 border-0 font-black inline-block bg-white/20 text-white">
            {t('constructionProcess.badge')}
          </Badge>

          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4 font-black text-white">
            {t('constructionProcess.title')}
          </h2>

          <p className="text-base md:text-lg max-w-3xl mx-auto font-semibold text-white/95">
            {t('constructionProcess.subtitle')}
          </p>
        </motion.div>

        <div className="relative w-full" style={{ perspective: '1000px' }}>
          {processSteps.map((step, index) => (
            <StackCard
              key={step.id}
              step={step}
              index={index}
              totalSteps={processSteps.length}
              containerRef={containerRef}
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
            />
          ))}
        </div>

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
              {t('constructionProcess.cta.title')}
            </h3>
            <p className="mb-8 max-w-2xl mx-auto text-base md:text-lg font-semibold text-white/90">
              {t('constructionProcess.cta.description')}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
              onClick={openPopup}
                size="lg"
                className="px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-black transition-all duration-300 rounded-full"
                style={{
                  backgroundColor: 'white',
                  color: '#FB921D'
                }}
              >
                {t('constructionProcess.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};

export default ConstructionProcessScrollStack;
