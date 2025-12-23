'use client'

import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  Clock, 
  IndianRupee, 
  ArrowRight, 
  Users, 
  Shield,
  Award,
  Building,
  Zap,
  Palette,
  Factory,
  Leaf
} from 'lucide-react';

const TurnkeyPrefabPage = () => {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const coreFeatures = [
    {
      icon: Palette,
      title: t('turnkeyPrefab.coreFeatures.design.title'),
      description: t('turnkeyPrefab.coreFeatures.design.description'),
      emoji: '🎨'
    },
    {
      icon: Factory,
      title: t('turnkeyPrefab.coreFeatures.manufacturing.title'),
      description: t('turnkeyPrefab.coreFeatures.manufacturing.description'),
      emoji: '🏭'
    },
    {
      icon: Zap,
      title: t('turnkeyPrefab.coreFeatures.assembly.title'),
      description: t('turnkeyPrefab.coreFeatures.assembly.description'),
      emoji: '⚡'
    },
    {
      icon: IndianRupee,
      title: t('turnkeyPrefab.coreFeatures.costEfficiency.title'),
      description: t('turnkeyPrefab.coreFeatures.costEfficiency.description'),
      emoji: '💰'
    },
    {
      icon: Leaf,
      title: t('turnkeyPrefab.coreFeatures.sustainability.title'),
      description: t('turnkeyPrefab.coreFeatures.sustainability.description'),
      emoji: '🌱'
    }
  ];

  const features = [
    {
      icon: Building,
      title: t('turnkeyPrefab.features.completeSolution.title'),
      description: t('turnkeyPrefab.features.completeSolution.description')
    },
    {
      icon: Clock,
      title: t('turnkeyPrefab.features.fasterDelivery.title'),
      description: t('turnkeyPrefab.features.fasterDelivery.description')
    },
    {
      icon: IndianRupee,
      title: t('turnkeyPrefab.features.fixedPrice.title'),
      description: t('turnkeyPrefab.features.fixedPrice.description')
    },
    {
      icon: Shield,
      title: t('turnkeyPrefab.features.warranty.title'),
      description: t('turnkeyPrefab.features.warranty.description')
    },
    {
      icon: Users,
      title: t('turnkeyPrefab.features.projectManagement.title'),
      description: t('turnkeyPrefab.features.projectManagement.description')
    },
    {
      icon: Award,
      title: t('turnkeyPrefab.features.qualityCertified.title'),
      description: t('turnkeyPrefab.features.qualityCertified.description')
    }
  ];

  const process = [
    {
      step: "01",
      title: t('turnkeyPrefab.process.consultation.title'),
      description: t('turnkeyPrefab.process.consultation.description')
    },
    {
      step: "02", 
      title: t('turnkeyPrefab.process.sitePreparation.title'),
      description: t('turnkeyPrefab.process.sitePreparation.description')
    },
    {
      step: "03",
      title: t('turnkeyPrefab.process.manufacturing.title'),
      description: t('turnkeyPrefab.process.manufacturing.description')
    },
    {
      step: "04",
      title: t('turnkeyPrefab.process.installation.title'),
      description: t('turnkeyPrefab.process.installation.description')
    },
    {
      step: "05",
      title: t('turnkeyPrefab.process.finishing.title'),
      description: t('turnkeyPrefab.process.finishing.description')
    }
  ];

  return (
    <div 
      className="min-h-screen pt-16"
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

      {/* Hero Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 224, 192, 0.8) 0%, rgba(255, 245, 230, 0.9) 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-20 right-20 w-32 h-32 rounded-full"
            style={{ backgroundColor: '#FB921D' }}
          />
          <div 
            className="absolute bottom-20 left-20 w-24 h-24 rounded-full"
            style={{ backgroundColor: '#C55A00' }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge 
                className="px-4 py-2 border-0"
                style={{
                  backgroundColor: '#FB921D',
                  color: 'white'
                }}
              >
                {t('turnkeyPrefab.badge')}
              </Badge>
              <h1 
                className="text-4xl md:text-6xl font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('turnkeyPrefab.heroTitle')}
                <span 
                  className="block"
                  style={{ color: '#FB921D' }}
                >
                  {t('turnkeyPrefab.heroTitleHighlight')}
                </span>
              </h1>
              <p 
                className="text-xl leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('turnkeyPrefab.heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="px-8 font-semibold transition-all duration-300 border-2"
                  style={{
                    backgroundColor: '#FB921D',
                    borderColor: '#FB921D',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#E67E0F';
                    (e.currentTarget as HTMLElement).style.borderColor = '#E67E0F';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(251, 146, 29, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#FB921D';
                    (e.currentTarget as HTMLElement).style.borderColor = '#FB921D';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                  onClick={() => openPopup()}
                >
                  {t('turnkeyPrefab.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJua2V5JTIwcHJlZmFiJTIwaG9tZSUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NTY5OTI2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Turnkey Prefab Construction"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  style={{ border: '3px solid #FB921D' }}
                />
              </div>
              <div 
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl opacity-20"
                style={{ backgroundColor: '#FB921D' }}
              />
              <div 
                className="absolute -top-6 -left-6 w-20 h-20 rounded-full opacity-20"
                style={{ backgroundColor: '#C55A00' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section 
        className="py-20"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge 
              className="mb-4 px-4 py-2 border-0"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
            >
              {t('turnkeyPrefab.coreFeaturesLabel')}
            </Badge>
            <h2 
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('turnkeyPrefab.coreFeaturesTitle')}
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('turnkeyPrefab.coreFeaturesSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: '#FFF5E6',
                    border: '1px solid #FFD0A0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FB921D';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#FFD0A0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: '#FB921D' }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-3xl">{feature.emoji}</span>
                    </div>
                    <h3 
                      className="text-xl mb-3 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div
            className="text-center p-8 rounded-lg"
            style={{
              backgroundColor: '#FFF5E6',
              border: '2px solid #FB921D'
            }}
          >
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#1a1a1a' }}
            >
              {t('turnkeyPrefab.coreFeaturesConclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-20"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge 
              className="mb-4 px-4 py-2 border-0"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
            >
              {t('turnkeyPrefab.featuresLabel')}
            </Badge>
            <h2 
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('turnkeyPrefab.featuresTitle')}
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('turnkeyPrefab.featuresSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #FFD0A0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FB921D';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#FFD0A0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <CardContent className="p-8 text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto"
                      style={{ backgroundColor: '#FB921D' }}
                    >
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 
                      className="text-xl mb-4 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        className="py-20"
        style={{ backgroundColor: '#FFE0C0' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge 
              className="mb-4 px-4 py-2 border-0"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
            >
              {t('turnkeyPrefab.processLabel')}
            </Badge>
            <h2 
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('turnkeyPrefab.processTitle')}
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('turnkeyPrefab.processSubtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div 
              className="absolute left-8 top-16 bottom-16 w-0.5 hidden lg:block"
              style={{ backgroundColor: '#FFD0A0' }}
            >
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: true }}
                className="w-full"
                style={{
                  background: 'linear-gradient(to bottom, #FB921D, #C55A00)'
                }}
              />
            </div>

            <div className="space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-8"
                >
                  <div className="flex-shrink-0 relative z-10">
                    <div 
                      className="w-16 h-16 text-white rounded-full flex items-center justify-center shadow-lg font-bold"
                      style={{ backgroundColor: '#FB921D' }}
                    >
                      <span>{step.step}</span>
                    </div>
                  </div>
                  <div 
                    className="flex-1 pt-2 p-6 rounded-xl"
                    style={{ backgroundColor: 'white' }}
                  >
                    <h3 
                      className="text-2xl mb-3 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-lg leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('turnkeyPrefab.statsTitle')}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: t('turnkeyPrefab.stats.completedProjects'), icon: Building },
              { number: '98%', label: t('turnkeyPrefab.stats.onTimeDelivery'), icon: Clock },
              { number: '100%', label: t('turnkeyPrefab.stats.clientSatisfaction'), icon: Award },
              { number: '10+', label: t('turnkeyPrefab.stats.yearsExperience'), icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card 
                  className="p-6 border-0 hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: '#FFF5E6',
                    border: '1px solid #FFD0A0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FB921D';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#FFD0A0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <stat.icon 
                    className="w-8 h-8 mx-auto mb-3"
                    style={{ color: '#FB921D' }}
                  />
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{ color: '#1a1a1a' }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 font-bold">
              {t('turnkeyPrefab.finalCta.title')}
            </h2>
            <p 
              className="text-xl mb-8 leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              {t('turnkeyPrefab.finalCta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 font-semibold transition-all duration-300 border-2"
                style={{
                  backgroundColor: 'white',
                  color: '#1a1a1a',
                  borderColor: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
                onClick={() => openPopup()}
              >
                {t('turnkeyPrefab.finalCta.startProject')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/price-analysis">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 border-2 font-semibold transition-all duration-300"
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                    (e.currentTarget as HTMLElement).style.color = '#1a1a1a';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {t('turnkeyPrefab.finalCta.getPriceEstimate')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TurnkeyPrefabPage;
