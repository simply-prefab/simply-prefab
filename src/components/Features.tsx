'use client'

import {
  ArrowRight,
  Award,
  Clock,
  CreditCard,
  IndianRupee,
  FileText,
  Shield,
  Users
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();
  const features = [
    {
      icon: CreditCard,
      title: t('features.items.safeTransaction.title'),
      description: t('features.items.safeTransaction.description'),
      details: t('features.items.safeTransaction.details'),
      color: "linear-gradient(135deg, #FB921D, #E67E0F)",
      bgColor: "#FFF5E6",
      iconBg: "#FB921D",
      image: "/images/safe-money-transaction.png"
    },
    {
      icon: FileText,
      title: t('features.items.transparency.title'),
      description: t('features.items.transparency.description'),
      details: t('features.items.transparency.details'),
      color: "linear-gradient(135deg, #C55A00, #A0522D)",
      bgColor: "#FFE0C0",
      iconBg: "#C55A00",
      image: "/images/absolute-transparency.jpg"
    },
    {
      icon: Users,
      title: t('features.items.qualityControl.title'),
      description: t('features.items.qualityControl.description'),
      details: t('features.items.qualityControl.details'),
      color: "linear-gradient(135deg, #E67E0F, #FB921D)",
      bgColor: "#FFF5E6",
      iconBg: "#E67E0F",
      image: "/images/assured-quality.jpg"
    },
    {
      icon: Clock,
      title: t('features.items.zeroDelays.title'),
      description: t('features.items.zeroDelays.description'),
      details: t('features.items.zeroDelays.details'),
      color: "linear-gradient(135deg, #A0522D, #654321)",
      bgColor: "#FFE0C0",
      iconBg: "#A0522D",
      image: "/images/zero-delay.jpg"
    }
  ];

  const additionalBenefits = [
    {
      icon: IndianRupee,
      title: t('features.benefits.costSavings.title'),
      value: t('features.benefits.costSavings.value'),
      description: t('features.benefits.costSavings.description')
    },
    {
      icon: Clock,
      title: t('features.benefits.faster.title'),
      value: t('features.benefits.faster.value'),
      description: t('features.benefits.faster.description')
    },
    {
      icon: Award,
      title: t('features.benefits.quality.title'),
      value: t('features.benefits.quality.value'),
      description: t('features.benefits.quality.description')
    },
    {
      icon: Shield,
      title: t('features.benefits.warranty.title'),
      value: t('features.benefits.warranty.value'),
      description: t('features.benefits.warranty.description')
    }
  ];

  return (
    <section
      className="py-20 relative overflow-hidden"
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #FFE0C0 0%, #FFF5E6 100%)'
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full -translate-x-48 -translate-y-48"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 29, 0.2), transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full translate-x-48 translate-y-48"
        style={{
          background: 'radial-gradient(circle, rgba(197, 90, 0, 0.2), transparent 70%)'
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
            {t('features.badge')}
          </Badge>
          <h2
            className="text-4xl md:text-5xl mb-6 font-bold"
            style={{ color: '#1a1a1a' }}
          >
            {t('features.heading')}
          </h2>
          <p
            className="text-xl max-w-4xl mx-auto"
            style={{ color: '#666' }}
          >
            {t('features.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <Link href="/why-simplyprefab" className="block h-full">
                <motion.div
                  whileHover={{
                    y: -10,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="h-full rounded-2xl shadow-xl border-2 overflow-hidden group cursor-pointer transform-gpu"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#FFD0A0',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: feature.iconBg }}
                    >
                      <feature.icon className="w-6 h-6" />
                    </motion.div>
                  </div>

                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: feature.color }}
                    />

                    <div className="absolute bottom-4 left-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="px-3 py-1 rounded-full text-white text-xs font-medium shadow-lg"
                        style={{ backgroundColor: '#FB921D' }}
                      >
                        <div className="flex items-center space-x-1">
                          <feature.icon className="w-3 h-3" />
                          <span>{t('features.learnMore')}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: '#1a1a1a' }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: '#666' }}
                      >
                        {feature.description}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="pt-2 border-t"
                      style={{ borderColor: '#FFD0A0' }}
                    >
                      <p
                        className="text-xs"
                        style={{ color: '#C55A00' }}
                      >
                        {feature.details}
                      </p>
                    </motion.div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ backgroundColor: '#FB921D' }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Card
            className="shadow-2xl border-0 overflow-hidden"
            style={{ border: '1px solid #FFD0A0' }}
          >
            <CardContent className="p-0">
              <div
                className="p-8 text-white"
                style={{
                  background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 50%, #E67E0F 100%)'
                }}
              >
                <h3 className="text-3xl font-bold text-center mb-8">
                  {t('features.whyCustomersTitle')}
                </h3>
                <div className="grid md:grid-cols-4 gap-8">
                  {additionalBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.0 + index * 0.1,
                        type: "spring",
                        bounce: 0.3
                      }}
                      className="text-center"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <benefit.icon className="h-8 w-8" />
                      </div>
                      <div className="text-3xl font-bold mb-2">{benefit.value}</div>
                      <div className="text-lg font-semibold mb-1">{benefit.title}</div>
                      <div
                        className="text-sm"
                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                      >
                        {benefit.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="rounded-2xl shadow-xl p-8 md:p-12 mb-16"
          style={{ backgroundColor: '#FFF5E6' }}
        >
          <h3
            className="text-3xl font-bold text-center mb-12"
            style={{ color: '#1a1a1a' }}
          >
            {t('features.trustedByTitle')}
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
                  {[
              { number: "1000+", label: t('features.stats.happyCustomers'), icon: "👥" },
              { number: "90%", label: t('features.stats.customerSatisfaction'), icon: "⭐" },
              { number: "10+", label: t('features.stats.citiesCovered'), icon: "🏙️" },
              { number: "15+", label: t('features.stats.yearsExperience'), icon: "🏆" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div
                  className="text-4xl font-bold mb-2 transition-colors"
                  style={{ color: '#FB921D' }}
                  onMouseEnter={(e: any) => {
                    (e.target as HTMLElement).style.color = '#E67E0F';
                  }}
                  onMouseLeave={(e: any) => {
                    (e.target as HTMLElement).style.color = '#FB921D';
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="transition-colors"
                  style={{ color: '#666' }}
                  onMouseEnter={(e: any) => {
                    (e.target as HTMLElement).style.color = '#C55A00';
                  }}
                  onMouseLeave={(e: any) => {
                    (e.target as HTMLElement).style.color = '#666';
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.6 }}
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
                  background: 'linear-gradient(135deg, #C55A00 0%, #1a1a1a 100%)'
                }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {t('features.cta.title')}
                </h3>
                <p
                  className="mb-8 max-w-2xl mx-auto text-lg"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {t('features.cta.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                      size="lg"
                      className="px-8 py-4 text-lg font-medium border-2 transition-all duration-300"
                      style={{
                        backgroundColor: '#FB921D',
                        borderColor: '#FB921D',
                        color: 'white'
                      }}
                      onMouseEnter={(e: any) => {
                        (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                        (e.target as HTMLElement).style.borderColor = '#E67E0F';
                        (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                        (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(251, 146, 29, 0.3)';
                      }}
                      onMouseLeave={(e: any) => {
                        (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                        (e.target as HTMLElement).style.borderColor = '#FB921D';
                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                        (e.target as HTMLElement).style.boxShadow = 'none';
                      }}
                      onClick={openPopup}
                      >
                      {t('features.cta.schedule')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  <Link href="/projects">
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
                        onMouseEnter={(e: any) => {
                          (e.target as HTMLElement).style.backgroundColor = 'white';
                          (e.target as HTMLElement).style.color = '#1a1a1a';
                        }}
                        onMouseLeave={(e: any) => {
                          (e.target as HTMLElement).style.backgroundColor = 'transparent';
                          (e.target as HTMLElement).style.color = 'white';
                        }}
                      >
                         {t('common.viewProjects')}
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
