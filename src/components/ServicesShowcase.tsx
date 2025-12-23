'use client'

import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Hammer,
  Home,
  Pause,
  Play,
  Square,
  Zap
} from 'lucide-react';
import { motion, useDragControls, useInView } from 'motion/react';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const ServicesShowcase = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const dragControls = useDragControls();
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      icon: Building2,
      title: t('servicesShowcase.services.turnkey.title'),
      shortTitle: t('servicesShowcase.services.turnkey.shortTitle'),
      description: t('servicesShowcase.services.turnkey.description'),
      features: [
        t('servicesShowcase.services.turnkey.features.management'),
        t('servicesShowcase.services.turnkey.features.timeline'),
        t('servicesShowcase.services.turnkey.features.quality')
      ],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJua2V5JTIwcHJlZmFiJTIwaG9tZSUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NTY5OTI2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "linear-gradient(135deg, #FB921D, #E67E0F)",
      bgColor: "#FFF5E6",
      iconBg: "#FB921D",
      link: "/services/turnkey-prefab"
    },
    {
      id: 2,
      icon: Home,
      title: t('servicesShowcase.services.penthouse.title'),
      shortTitle: t('servicesShowcase.services.penthouse.shortTitle'),
      description: t('servicesShowcase.services.penthouse.description'),
      features: [
        t('servicesShowcase.services.penthouse.features.luxury'),
        t('servicesShowcase.services.penthouse.features.premium'),
        t('servicesShowcase.services.penthouse.features.views')
      ],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBwcmVmYWIlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzU2OTkyNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "linear-gradient(135deg, #D66A00, #C55A00)",
      bgColor: "#FFE0C0",
      iconBg: "#D66A00",
      link: "/services/prefab-penthouse"
    },
    {
      id: 3,
      icon: Building2,
      title: t('servicesShowcase.services.wallPanels.title'),
      shortTitle: t('servicesShowcase.services.wallPanels.shortTitle'),
      description: t('servicesShowcase.services.wallPanels.description'),
      features: [
        t('servicesShowcase.services.wallPanels.features.efficient'),
        t('servicesShowcase.services.wallPanels.features.quick'),
        t('servicesShowcase.services.wallPanels.features.insulation')
      ],
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwcGFuZWxzJTIwcHJlZmFiJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1Njk5MjYwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "linear-gradient(135deg, #E67E0F, #FB921D)",
      bgColor: "#FFF5E6",
      iconBg: "#E67E0F",
      link: "/services/wall-panels"
    },
    {
      id: 4,
      icon: Hammer,
      title: t('servicesShowcase.services.architecture.title'),
      shortTitle: t('servicesShowcase.services.architecture.shortTitle'),
      description: t('servicesShowcase.services.architecture.description'),
      features: [
        t('servicesShowcase.services.architecture.features.visualization'),
        t('servicesShowcase.services.architecture.features.sustainable'),
        t('servicesShowcase.services.architecture.features.custom')
      ],
      image: "https://images.unsplash.com/photo-1600566753051-6394ba171931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBkZXNpZ24lMjBwcmVmYWJ8ZW58MXx8fHwxNzU2OTkyNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "linear-gradient(135deg, #C55A00, #B84A00)",
      bgColor: "#FFE0C0",
      iconBg: "#C55A00",
      link: "/services/architecture-design"
    },
    {
      id: 5,
      icon: Square,
      title: t('servicesShowcase.services.upvc.title'),
      shortTitle: t('servicesShowcase.services.upvc.shortTitle'),
      description: t('servicesShowcase.services.upvc.description'),
      features: [
        t('servicesShowcase.services.upvc.features.efficient'),
        t('servicesShowcase.services.upvc.features.noise'),
        t('servicesShowcase.services.upvc.features.maintenance')
      ],
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHZjJTIwd2luZG93cyUyMGhvbWV8ZW58MXx8fHwxNzU2OTkyNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "linear-gradient(135deg, #FB921D, #C55A00)",
      bgColor: "#FFF5E6",
      iconBg: "#FB921D",
      link: "/services/upvc-windows"
    },
    {
      id: 6,
      icon: Zap,
      title: t('servicesShowcase.services.mep.title'),
      shortTitle: t('servicesShowcase.services.mep.shortTitle'),
      description: t('servicesShowcase.services.mep.description'),
      features: [
        t('servicesShowcase.services.mep.features.smart'),
        t('servicesShowcase.services.mep.features.energy'),
        t('servicesShowcase.services.mep.features.safety')
      ],
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXAlMjBzb2x1dGlvbnMlMjBob21lfGVufDF8fHx8MTc1Njk5MjYwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "linear-gradient(135deg, #E67E0F, #C55A00)",
      bgColor: "#FFE0C0",
      iconBg: "#E67E0F",
      link: "/services/mep-solutions"
    },
    {
      id: 7,
      icon: Droplets,
      title: t('servicesShowcase.services.waterproofing.title'),
      shortTitle: t('servicesShowcase.services.waterproofing.shortTitle'),
      description: t('servicesShowcase.services.waterproofing.description'),
      features: [
        t('servicesShowcase.services.waterproofing.features.warranty'),
        t('servicesShowcase.services.waterproofing.features.premium'),
        t('servicesShowcase.services.waterproofing.features.expert')
      ],
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29maW5nJTIwc29sdXRpb24lMjBob21lfGVufDF8fHx8MTc1Njk5MjYwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "linear-gradient(135deg, #C55A00, #B84A00)",
      bgColor: "#FFE0C0",
      iconBg: "#C55A00",
      link: "/services/waterproofing"
    }
  ];

  // Duplicate the array for seamless scrolling
  const duplicatedServices = [...services, ...services];

  const handleUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    setAutoScroll(false);
    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current);
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  const handleUserInteractionEnd = useCallback(() => {
    setIsUserInteracting(false);
    resumeTimeoutRef.current = setTimeout(() => {
      setAutoScroll(true);
    }, 3000);
  }, []);

  const pauseAutoScroll = useCallback(() => {
    handleUserInteraction();
  }, [handleUserInteraction]);

  const resumeAutoScroll = useCallback(() => {
    handleUserInteractionEnd();
  }, [handleUserInteractionEnd]);

  const scrollToCard = useCallback((index: number) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const cardWidth = 320;
    const targetScroll = index * cardWidth;

    scrollElement.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setCurrentIndex(index);
    handleUserInteraction();
    handleUserInteractionEnd();
  }, [handleUserInteraction, handleUserInteractionEnd]);

  const scrollNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % services.length;
    scrollToCard(nextIndex);
  }, [currentIndex, services.length, scrollToCard]);

  const scrollPrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1;
    scrollToCard(prevIndex);
  }, [currentIndex, services.length, scrollToCard]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !autoScroll || isUserInteracting) return;

    const cardWidth = 320;
    const scrollSpeed = 1.5;
    let animationId: number;

    const smoothScroll = () => {
      if (!isDragging && autoScroll && !isUserInteracting) {
        scrollElement.scrollLeft += scrollSpeed;

        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0;
        }

        const newIndex = Math.round(scrollElement.scrollLeft / cardWidth) % services.length;
        setCurrentIndex(newIndex);
      }
      animationId = requestAnimationFrame(smoothScroll);
    };

    animationId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [autoScroll, isDragging, isUserInteracting, services.length]);

  const handleDragStart = () => {
    setIsDragging(true);
    setAutoScroll(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setAutoScroll(true);
    }, 3000);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollLeft += e.deltaY;
      setAutoScroll(false);
      setTimeout(() => {
        setAutoScroll(true);
      }, 3000);
    }
  };

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = '#E67E0F';
    target.style.transform = 'scale(1.1)';
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = 'rgba(251, 146, 29, 0.9)';
    target.style.transform = 'scale(1)';
  };

  const handleControlButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = '#C55A00';
    target.style.transform = 'scale(1.1)';
  };

  const handleControlButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = 'rgba(197, 90, 0, 0.9)';
    target.style.transform = 'scale(1)';
  };

  const handleCtaButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    target.style.transform = 'translateY(-1px)';
  };

  const handleCtaButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = 'white';
    target.style.transform = 'translateY(0)';
  };

  const handleOutlineCtaButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = 'white';
    target.style.color = '#1a1a1a';
  };

  const handleOutlineCtaButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = 'transparent';
    target.style.color = 'white';
  };

  return (
    <section
      className="py-20 relative overflow-hidden services-showcase-container"
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #FFE0C0 0%, #FFF5E6 50%, #FFE0C0 100%)'
      }}
    >
      {/* Orange accent line at top */}
      <div
        className="absolute top-0 left-0 w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      {/* Background decoration with Orange Theme */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full translate-x-48 -translate-y-48"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 146, 29, 0.3) 0%, transparent 100%)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full -translate-x-48 translate-y-48"
        style={{
          background: 'linear-gradient(135deg, rgba(197, 90, 0, 0.2) 0%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge
            className="mb-4 text-lg px-4 py-2 border-0"
            style={{
              backgroundColor: '#FB921D',
              color: 'white'
            }}
          >
            {t('servicesShowcase.badge')}
          </Badge>
          <h2
            className="text-4xl md:text-6xl mb-6 font-bold"
            style={{ color: '#1a1a1a' }}
          >
            {t('servicesShowcase.heading')}
          </h2>
          <p
            className="text-xl max-w-4xl mx-auto"
            style={{ color: '#666' }}
          >
            {t('servicesShowcase.description')}
          </p>
        </motion.div>

        {/* Rotating Services Gallery */}
        <div className="relative mb-16">
          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 left-4 z-20"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={scrollPrev}
              onMouseEnter={(e) => { pauseAutoScroll(); handleButtonMouseEnter(e as any); }}
              onMouseLeave={(e) => { resumeAutoScroll(); handleButtonMouseLeave(e as any); }}
              className="w-12 h-12 rounded-full border-0 transition-all duration-300 shadow-lg"
              style={{
                backgroundColor: 'rgba(251, 146, 29, 0.9)',
                color: 'white'
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 right-4 z-20"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={scrollNext}
              onMouseEnter={(e) => { pauseAutoScroll(); handleButtonMouseEnter(e as any); }}
              onMouseLeave={(e) => { resumeAutoScroll(); handleButtonMouseLeave(e as any); }}
              className="w-12 h-12 rounded-full border-0 transition-all duration-300 shadow-lg"
              style={{
                backgroundColor: 'rgba(251, 146, 29, 0.9)',
                color: 'white'
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Auto-scroll Control */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-4 left-4 z-20"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={autoScroll ? pauseAutoScroll : resumeAutoScroll}
              className="w-10 h-10 rounded-full border-0 transition-all duration-300 shadow-lg"
              title={autoScroll ? t('servicesShowcase.pauseAutoScroll') : t('servicesShowcase.resumeAutoScroll')}
              style={{
                backgroundColor: 'rgba(197, 90, 0, 0.9)',
                color: 'white'
              }}
              onMouseEnter={handleControlButtonMouseEnter}
              onMouseLeave={handleControlButtonMouseLeave}
            >
              {autoScroll ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </motion.div>

          <motion.div
            ref={scrollRef}
            className={`flex space-x-6 overflow-hidden cursor-grab active:cursor-grabbing draggable-gallery ${isDragging ? 'dragging' : ''}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            drag="x"
            dragControls={dragControls}
            dragConstraints={{ left: -2000, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onWheel={handleWheel}
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {duplicatedServices.map((service, index) => (
              <motion.div
                key={`${service.id}-${index}`}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  rotateY: hoveredCard === service.id ? 0 : -5
                } : { opacity: 0, y: 50, rotateY: -15 }}
                transition={{
                  duration: 0.6,
                  delay: (index % services.length) * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  y: -15,
                  rotateY: 0,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(service.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group perspective-1000 flex-shrink-0 w-80"
              >
                <Link href={service.link} className={`block h-full card-content ${isDragging ? 'pointer-events-none' : ''}`}>
                  <Card
                    className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu"
                    style={{
                      backgroundColor: service.bgColor,
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Orange overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: service.color }}
                      />

                      {/* Icon overlay */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + (index % services.length) * 0.1 }}
                        className="absolute top-4 right-4"
                      >
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                          style={{ background: service.color }}
                        >
                          <service.icon className="h-6 w-6" />
                        </div>
                      </motion.div>

                      {/* Service number */}
                      <div className="absolute bottom-4 left-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: 'rgba(251, 146, 29, 0.8)' }}
                        >
                          {service.id.toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 relative">
                      {/* Gradient accent line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 + (index % services.length) * 0.1 }}
                        className="absolute top-0 left-0 right-0 h-1 origin-left"
                        style={{ background: service.color }}
                      />

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.4 + (index % services.length) * 0.1 }}
                        className="text-xl mb-3 group-hover:text-gray-800 transition-colors font-semibold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {service.shortTitle}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.5 + (index % services.length) * 0.1 }}
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: '#666' }}
                      >
                        {service.description}
                      </motion.p>

                      {/* Features list */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.6 + (index % services.length) * 0.1 }}
                        className="space-y-2 mb-4"
                      >
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-xs">
                            <CheckCircle2
                              className="h-3 w-3 mr-2 flex-shrink-0"
                              style={{ color: '#FB921D' }}
                            />
                            <span style={{ color: '#666' }}>{feature}</span>
                          </div>
                        ))}
                      </motion.div>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.7 + (index % services.length) * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <span
                          className="text-sm font-medium"
                          style={{ color: '#FB921D' }}
                        >
                          {t('common.learnMore')}
                        </span>
                        <ArrowRight
                          className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1"
                          style={{ color: '#D66A00' }}
                        />
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays with Orange Theme */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to right, rgba(255, 224, 192, 1) 0%, transparent 100%)'
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to left, rgba(255, 245, 230, 1) 0%, transparent 100%)'
            }}
          />

          {/* Progress Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20"
          >
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                onMouseEnter={pauseAutoScroll}
                onMouseLeave={resumeAutoScroll}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: currentIndex === index ? '#FB921D' : '#FFD0A0',
                  width: currentIndex === index ? '32px' : '8px'
                }}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA with Orange Theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <Card
            className="shadow-2xl border-0 overflow-hidden"
            style={{ border: '1px solid #FFD0A0' }}
          >
            <CardContent className="p-0">
              <div
                className="p-8 md:p-12 text-white"
                style={{
                  background: 'linear-gradient(135deg, #FB921D 0%, #D66A00 100%)'
                }}
              >
                <h3
                  className="text-3xl md:text-4xl font-bold mb-4 font-serif"
                  style={{ color: 'white' }}
                >
                  {t('servicesShowcase.bottomCta.title')}
                </h3>
                <p
                  className="mb-8 max-w-2xl mx-auto text-lg"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {t('servicesShowcase.bottomCta.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="px-8 py-4 text-lg font-medium border-2 transition-all duration-300"
                      style={{
                        backgroundColor: 'white',
                        color: '#1a1a1a',
                        borderColor: 'white'
                      }}
                      onMouseEnter={handleCtaButtonMouseEnter}
                      onMouseLeave={handleCtaButtonMouseLeave}
                      onClick={openPopup}
                    >
                      {t('servicesShowcase.cta.schedule')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  <Link href="/services">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="px-8 py-4 text-lg font-medium border-2 transition-all duration-300"
                        style={{
                          borderColor: 'white',
                          color: 'white',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={handleOutlineCtaButtonMouseEnter}
                        onMouseLeave={handleOutlineCtaButtonMouseLeave}
                      >
                        {t('servicesShowcase.cta.viewAll')}
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <style>{`
        .services-showcase-container div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ServicesShowcase;
