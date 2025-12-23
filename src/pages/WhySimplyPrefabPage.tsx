'use client'

import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Globe,
  Heart,
  IndianRupee,
  Shield,
  Users,
  Zap
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

const WhySimplyPrefabPage = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openPopup } = useExpertConsultation();
  const mainFeatures = [
    {
      icon: CreditCard,
      title: t('whySimplyPrefab.mainFeatures.safeTransaction.title'),
      description: t('whySimplyPrefab.mainFeatures.safeTransaction.description'),
      details: t('whySimplyPrefab.mainFeatures.safeTransaction.details'),
      benefits: [
        t('whySimplyPrefab.mainFeatures.safeTransaction.benefits.milestonePayments'),
        t('whySimplyPrefab.mainFeatures.safeTransaction.benefits.escrowProtection'),
        t('whySimplyPrefab.mainFeatures.safeTransaction.benefits.insurance'),
        t('whySimplyPrefab.mainFeatures.safeTransaction.benefits.moneyBack')
      ],
      color: "linear-gradient(135deg, #FB921D, #E67E0F)",
      bgColor: "#FFF5E6",
      iconBg: "#FB921D",
      image: "/images/safe-money-transaction.png"
    },
    {
      icon: FileText,
      title: t('whySimplyPrefab.mainFeatures.transparency.title'),
      description: t('whySimplyPrefab.mainFeatures.transparency.description'),
      details: t('whySimplyPrefab.mainFeatures.transparency.details'),
      benefits: [
        t('whySimplyPrefab.mainFeatures.transparency.benefits.realTimeTracking'),
        t('whySimplyPrefab.mainFeatures.transparency.benefits.dailyUpdates'),
        t('whySimplyPrefab.mainFeatures.transparency.benefits.costBreakdown'),
        t('whySimplyPrefab.mainFeatures.transparency.benefits.materialTracking'),
        t('whySimplyPrefab.mainFeatures.transparency.benefits.digitalAccess')
      ],
      color: "linear-gradient(135deg, #C55A00, #E67E0F)",
      bgColor: "#FFE0C0",
      iconBg: "#C55A00",
      image: "/images/absolute-transparency.jpg"
    },
    {
      icon: Users,
      title: t('whySimplyPrefab.mainFeatures.qualityControl.title'),
      description: t('whySimplyPrefab.mainFeatures.qualityControl.description'),
      details: t('whySimplyPrefab.mainFeatures.qualityControl.details'),
      benefits: [
        t('whySimplyPrefab.mainFeatures.qualityControl.benefits.checkpoints'),
        t('whySimplyPrefab.mainFeatures.qualityControl.benefits.inspectors'),
        t('whySimplyPrefab.mainFeatures.qualityControl.benefits.audits'),
        t('whySimplyPrefab.mainFeatures.qualityControl.benefits.standards'),
        t('whySimplyPrefab.mainFeatures.qualityControl.benefits.certificates')
      ],
      color: "linear-gradient(135deg, #E67E0F, #FB921D)",
      bgColor: "#FFF5E6",
      iconBg: "#E67E0F",
      image: "/images/assured-quality.jpg"
    },
    {
      icon: Clock,
      title: t('whySimplyPrefab.mainFeatures.zeroDelays.title'),
      description: t('whySimplyPrefab.mainFeatures.zeroDelays.description'),
      details: t('whySimplyPrefab.mainFeatures.zeroDelays.details'),
      benefits: [
        t('whySimplyPrefab.mainFeatures.zeroDelays.benefits.zeroTolerance'),
        t('whySimplyPrefab.mainFeatures.zeroDelays.benefits.scheduling'),
        t('whySimplyPrefab.mainFeatures.zeroDelays.benefits.weatherIndependent'),
        t('whySimplyPrefab.mainFeatures.zeroDelays.benefits.guaranteed')
      ],
      color: "linear-gradient(135deg, #C55A00, #8B6F47)",
      bgColor: "#FFE0C0",
      iconBg: "#C55A00",
      image: "/images/zero-delay.jpg"
    }
  ];

  const additionalBenefits = [
    {
      icon: IndianRupee,
      title: t('whySimplyPrefab.additionalBenefits.costEffective.title'),
      description: t('whySimplyPrefab.additionalBenefits.costEffective.description'),
      stats: t('whySimplyPrefab.additionalBenefits.costEffective.stats')
    },
    {
      icon: Zap,
      title: t('whySimplyPrefab.additionalBenefits.fastDelivery.title'),
      description: t('whySimplyPrefab.additionalBenefits.fastDelivery.description'),
      stats: t('whySimplyPrefab.additionalBenefits.fastDelivery.stats')
    },
    {
      icon: Shield,
      title: t('whySimplyPrefab.additionalBenefits.warranty.title'),
      description: t('whySimplyPrefab.additionalBenefits.warranty.description'),
      stats: t('whySimplyPrefab.additionalBenefits.warranty.stats')
    },
    {
      icon: Globe,
      title: t('whySimplyPrefab.additionalBenefits.ecoFriendly.title'),
      description: t('whySimplyPrefab.additionalBenefits.ecoFriendly.description'),
      stats: t('whySimplyPrefab.additionalBenefits.ecoFriendly.stats')
    },
    {
      icon: Award,
      title: t('whySimplyPrefab.additionalBenefits.certified.title'),
      description: t('whySimplyPrefab.additionalBenefits.certified.description'),
      stats: t('whySimplyPrefab.additionalBenefits.certified.stats')
    },
    {
      icon: Heart,
      title: t('whySimplyPrefab.additionalBenefits.customerFirst.title'),
      description: t('whySimplyPrefab.additionalBenefits.customerFirst.description'),
      stats: t('whySimplyPrefab.additionalBenefits.customerFirst.stats')
    }
  ];


  return (
    <div className="min-h-screen bg-white" ref={ref}>
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFE0C0 0%, #FFF5E6 50%, #FFE0C0 100%)'
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full translate-x-48 -translate-y-48"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 146, 29, 0.3) 0%, transparent 100%)'
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
              {t('whySimplyPrefab.badge')}
            </Badge>
            <h1
              className="text-4xl md:text-6xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('whySimplyPrefab.heroTitle')}
            </h1>
            <p
              className="text-xl max-w-4xl mx-auto mb-8"
              style={{ color: '#666' }}
            >
              {t('whySimplyPrefab.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="px-8 py-4 text-white font-medium border-2 transition-all duration-300"
                  style={{
                    backgroundColor: '#FB921D',
                    borderColor: '#FB921D'
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
                >
                  {t('whySimplyPrefab.heroCta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 font-medium border-2 transition-all duration-300"
                  style={{
                    borderColor: '#C55A00',
                    color: '#C55A00'
                  }}
                  onMouseEnter={(e: any) => {
                    (e.target as HTMLElement).style.backgroundColor = '#C55A00';
                    (e.target as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e: any) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.color = '#C55A00';
                  }}
                >
                  {t('whySimplyPrefab.viewWork')}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/why-simplyprefab.jpg"
                alt="Modern SimplyPrefab Home"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 146, 29, 0.1) 0%, transparent 50%)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('whySimplyPrefab.coreCommitmentsTitle')}
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('whySimplyPrefab.coreCommitmentsSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card
                    className="border-0 shadow-xl"
                    style={{
                      backgroundColor: feature.bgColor,
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <CardHeader>
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4"
                        style={{ backgroundColor: feature.iconBg }}
                      >
                        <feature.icon className="h-8 w-8" />
                      </div>
                      <CardTitle
                        className="text-3xl mb-4"
                        style={{ color: '#1a1a1a' }}
                      >
                        {feature.title}
                      </CardTitle>
                      <p
                        className="text-lg mb-6"
                        style={{ color: '#666' }}
                      >
                        {feature.details}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {feature.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                            className="flex items-center"
                          >
                            <CheckCircle2
                              className="h-5 w-5 mr-3 flex-shrink-0"
                              style={{ color: '#FB921D' }}
                            />
                            <span style={{ color: '#C55A00' }}>{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                    className="relative"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <ImageWithFallback
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-80 object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: feature.color }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('whySimplyPrefab.additionalBenefitsTitle')}
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('whySimplyPrefab.additionalBenefitsSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #FFD0A0'
                  }}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto"
                      style={{ backgroundColor: '#FB921D' }}
                    >
                      <benefit.icon className="h-8 w-8" />
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: '#1a1a1a' }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="mb-4"
                      style={{ color: '#666' }}
                    >
                      {benefit.description}
                    </p>
                    <div
                      className="text-lg font-semibold"
                      style={{ color: '#FB921D' }}
                    >
                      {benefit.stats}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 
      <section
        className="py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl mb-8 font-bold">
              {t('whySimplyPrefab.testimonialsTitle')}
            </h2>
            <div
              className="rounded-2xl p-8 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl mb-6 italic">
                "{testimonials[0].quote}"
              </blockquote>
              <div className="flex items-center justify-center">
                <div
                  className="w-12 h-12 rounded-full mr-4"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                />
                <div>
                  <div className="font-semibold">{testimonials[0].name}</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {testimonials[0].location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      <section
        className="py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #C55A00 0%, #1a1a1a 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 font-bold">
              {t('whySimplyPrefab.finalCta.title')}
            </h2>
            <p
              className="text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              {t('whySimplyPrefab.finalCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="px-8 py-4 text-white font-medium border-2 transition-all duration-300"
                  style={{
                    backgroundColor: '#FB921D',
                    borderColor: '#FB921D'
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
                  {t('whySimplyPrefab.finalCta.consultation')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/price-analysis">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 px-8 py-4 font-medium transition-all duration-300"
                  style={{
                    borderColor: 'white',
                    color: 'white'
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
                  {t('whySimplyPrefab.finalCta.calculateSavings')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhySimplyPrefabPage;
