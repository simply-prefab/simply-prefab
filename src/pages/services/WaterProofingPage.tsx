'use client'

import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useExpertConsultation } from '../../contexts/ExpertConsultationContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Droplets, 
  Shield, 
  Clock, 
  Award, 
  ArrowRight, 
  Umbrella,
  Home,
  CheckCircle2,
  Zap,
  Users,
  Building,
  Layers,
  PaintBucket
} from 'lucide-react';

const WaterProofingPage = () => {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const solutions = [
    {
      icon: Layers,
      title: t('waterproofing.solutions.foundation.title'),
      description: t('waterproofing.solutions.foundation.description'),
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlbWVudCUyMHdhdGVycHJvb2Zpbmd8ZW58MXx8fHwxNzU2OTkyNjA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Home,
      title: t('waterproofing.solutions.roof.title'),
      description: t('waterproofing.solutions.roof.description'),
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwd2F0ZXJwcm9vZmluZ3xlbnwxfHx8fDE3NTY5OTI2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Building,
      title: t('waterproofing.solutions.exteriorWall.title'),
      description: t('waterproofing.solutions.exteriorWall.description'),
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29maW5nJTIwc29sdXRpb24lMjBob21lfGVufDF8fHx8MTc1Njk5MjYwOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: PaintBucket,
      title: t('waterproofing.solutions.interior.title'),
      description: t('waterproofing.solutions.interior.description'),
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHdhdGVycHJvb2Zpbmd8ZW58MXx8fHwxNzU2OTkyNjA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Shield,
      title: t('waterproofing.solutions.basement.title'),
      description: t('waterproofing.solutions.basement.description'),
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlbWVudCUyMHdhdGVycHJvb2Zpbmd8ZW58MXx8fHwxNzU2OTkyNjA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: t('waterproofing.features.warranty.title'),
      description: t('waterproofing.features.warranty.description')
    },
    {
      icon: Zap,
      title: t('waterproofing.features.quickApplication.title'),
      description: t('waterproofing.features.quickApplication.description')
    },
    {
      icon: Award,
      title: t('waterproofing.features.premiumMaterials.title'),
      description: t('waterproofing.features.premiumMaterials.description')
    },
    {
      icon: Users,
      title: t('waterproofing.features.expertInstallation.title'),
      description: t('waterproofing.features.expertInstallation.description')
    },
    {
      icon: CheckCircle2,
      title: t('waterproofing.features.qualityTested.title'),
      description: t('waterproofing.features.qualityTested.description')
    },
    {
      icon: Clock,
      title: t('waterproofing.features.preventiveSolutions.title'),
      description: t('waterproofing.features.preventiveSolutions.description')
    }
  ];

  const process = [
    {
      step: "01",
      title: t('waterproofing.process.assessment.title'),
      description: t('waterproofing.process.assessment.description')
    },
    {
      step: "02", 
      title: t('waterproofing.process.design.title'),
      description: t('waterproofing.process.design.description')
    },
    {
      step: "03",
      title: t('waterproofing.process.preparation.title'),
      description: t('waterproofing.process.preparation.description')
    },
    {
      step: "04",
      title: t('waterproofing.process.application.title'),
      description: t('waterproofing.process.application.description')
    },
    {
      step: "05",
      title: t('waterproofing.process.testing.title'),
      description: t('waterproofing.process.testing.description')
    }
  ];

  const teamRoles = [
    { 
      title: t('waterproofing.team.architects.title'), 
      desc: t('waterproofing.team.architects.description') 
    },
    { 
      title: t('waterproofing.team.builders.title'), 
      desc: t('waterproofing.team.builders.description') 
    },
    { 
      title: t('waterproofing.team.designers.title'), 
      desc: t('waterproofing.team.designers.description') 
    }
  ];

  const stats = [
    { 
      number: t('waterproofing.stats.homesProtected.number'), 
      label: t('waterproofing.stats.homesProtected.label'), 
      icon: Home 
    },
    { 
      number: t('waterproofing.stats.warranty.number'), 
      label: t('waterproofing.stats.warranty.label'), 
      icon: Shield 
    },
    { 
      number: t('waterproofing.stats.successRate.number'), 
      label: t('waterproofing.stats.successRate.label'), 
      icon: Award 
    },
    { 
      number: t('waterproofing.stats.support.number'), 
      label: t('waterproofing.stats.support.label'), 
      icon: Clock 
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
                {t('waterproofing.hero.badge')}
              </Badge>
              <h1 
                className="text-4xl md:text-6xl font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('waterproofing.hero.title.line1')}
                <span 
                  className="block"
                  style={{ color: '#FB921D' }}
                >
                  {t('waterproofing.hero.title.line2')}
                </span>
                {t('waterproofing.hero.title.line3')}
              </h1>
              <p 
                className="text-xl leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('waterproofing.hero.description')}
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
                    e.currentTarget.style.backgroundColor = '#E67E0F';
                    e.currentTarget.style.borderColor = '#E67E0F';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(251, 146, 29, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FB921D';
                    e.currentTarget.style.borderColor = '#FB921D';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => openPopup()}
                >
                  {t('waterproofing.hero.cta')}
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
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcnByb29maW5nJTIwc29sdXRpb24lMjBob21lfGVufDF8fHx8MTc1Njk5MjYwOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={t('waterproofing.hero.imageAlt')}
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

      {/* Solutions Grid */}
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
              {t('waterproofing.solutionsSection.badge')}
            </Badge>
            <h2 
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('waterproofing.solutionsSection.title')}
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('waterproofing.solutionsSection.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(197, 90, 0, 0.7) 0%, transparent 50%)'
                      }}
                    />
                    <div className="absolute bottom-4 left-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: '#FB921D' }}
                      >
                        <solution.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 
                      className="text-xl mb-3 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {solution.title}
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {solution.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Approach Section */}
      <section 
        className="py-20"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge 
                className="mb-4 px-4 py-2 border-0"
                style={{
                  backgroundColor: '#FB921D',
                  color: 'white'
                }}
              >
                {t('waterproofing.teamSection.badge')}
              </Badge>
              <h2 
                className="text-3xl md:text-4xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('waterproofing.teamSection.title')}
              </h2>
              <p 
                className="text-lg mb-6 leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('waterproofing.teamSection.description')}
              </p>
              <div className="space-y-4">
                {teamRoles.map((team, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg"
                    style={{ backgroundColor: 'white' }}
                  >
                    <CheckCircle2 
                      className="w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: '#FB921D' }}
                    />
                    <div>
                      <h4 
                        className="font-semibold mb-1"
                        style={{ color: '#1a1a1a' }}
                      >
                        {team.title}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ color: '#666' }}
                      >
                        {team.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt={t('waterproofing.teamSection.imageAlt')}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                style={{ border: '3px solid #FB921D' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              {t('waterproofing.featuresSection.badge')}
            </Badge>
            <h2 
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('waterproofing.featuresSection.title')}
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('waterproofing.featuresSection.subtitle')}
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
              {t('waterproofing.processSection.badge')}
            </Badge>
            <h2 
              className="text-4xl md:text-5xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('waterproofing.processSection.title')}
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('waterproofing.processSection.subtitle')}
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
        style={{ backgroundColor: '#FFE0C0' }}
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
              {t('waterproofing.statsSection.title')}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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
                    backgroundColor: 'white',
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
              {t('waterproofing.cta.title')}
            </h2>
            <p 
              className="text-xl mb-8 leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              {t('waterproofing.cta.description')}
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
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => openPopup()}
              >
                {t('waterproofing.cta.primaryButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/services">
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
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#1a1a1a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {t('waterproofing.cta.secondaryButton')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WaterProofingPage;
