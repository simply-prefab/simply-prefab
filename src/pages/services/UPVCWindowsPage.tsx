'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { RectangleHorizontal, Shield, Thermometer, Volume2, ArrowRight, CheckCircle, Star, Lock, Palette, Sparkles } from 'lucide-react';
import { useExpertConsultation } from '../../contexts/ExpertConsultationContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function UPVCWindowsPage() {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const windowTypes = [
    {
      name: t('upvcWindows.windowTypes.casement.name'),
      description: t('upvcWindows.windowTypes.casement.description'),
      price: t('upvcWindows.windowTypes.casement.price'),
      features: [
        t('upvcWindows.windowTypes.casement.features.0'),
        t('upvcWindows.windowTypes.casement.features.1'),
        t('upvcWindows.windowTypes.casement.features.2'),
        t('upvcWindows.windowTypes.casement.features.3')
      ],
      applications: [
        t('upvcWindows.windowTypes.casement.applications.0'),
        t('upvcWindows.windowTypes.casement.applications.1'),
        t('upvcWindows.windowTypes.casement.applications.2')
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    },
    {
      name: t('upvcWindows.windowTypes.sliding.name'),
      description: t('upvcWindows.windowTypes.sliding.description'),
      price: t('upvcWindows.windowTypes.sliding.price'),
      features: [
        t('upvcWindows.windowTypes.sliding.features.0'),
        t('upvcWindows.windowTypes.sliding.features.1'),
        t('upvcWindows.windowTypes.sliding.features.2'),
        t('upvcWindows.windowTypes.sliding.features.3')
      ],
      applications: [
        t('upvcWindows.windowTypes.sliding.applications.0'),
        t('upvcWindows.windowTypes.sliding.applications.1'),
        t('upvcWindows.windowTypes.sliding.applications.2')
      ],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
    },
    {
      name: t('upvcWindows.windowTypes.tiltTurn.name'),
      description: t('upvcWindows.windowTypes.tiltTurn.description'),
      price: t('upvcWindows.windowTypes.tiltTurn.price'),
      features: [
        t('upvcWindows.windowTypes.tiltTurn.features.0'),
        t('upvcWindows.windowTypes.tiltTurn.features.1'),
        t('upvcWindows.windowTypes.tiltTurn.features.2'),
        t('upvcWindows.windowTypes.tiltTurn.features.3')
      ],
      applications: [
        t('upvcWindows.windowTypes.tiltTurn.applications.0'),
        t('upvcWindows.windowTypes.tiltTurn.applications.1'),
        t('upvcWindows.windowTypes.tiltTurn.applications.2')
      ],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'
    },
    {
      name: t('upvcWindows.windowTypes.fixed.name'),
      description: t('upvcWindows.windowTypes.fixed.description'),
      price: t('upvcWindows.windowTypes.fixed.price'),
      features: [
        t('upvcWindows.windowTypes.fixed.features.0'),
        t('upvcWindows.windowTypes.fixed.features.1'),
        t('upvcWindows.windowTypes.fixed.features.2'),
        t('upvcWindows.windowTypes.fixed.features.3')
      ],
      applications: [
        t('upvcWindows.windowTypes.fixed.applications.0'),
        t('upvcWindows.windowTypes.fixed.applications.1'),
        t('upvcWindows.windowTypes.fixed.applications.2')
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
    }
  ];

  const coreAdvantages = [
    {
      icon: Shield,
      title: t('upvcWindows.advantages.durability.title'),
      description: t('upvcWindows.advantages.durability.description'),
      emoji: '🛡️'
    },
    {
      icon: Thermometer,
      title: t('upvcWindows.advantages.energy.title'),
      description: t('upvcWindows.advantages.energy.description'),
      emoji: '⚡'
    },
    {
      icon: Palette,
      title: t('upvcWindows.advantages.aesthetic.title'),
      description: t('upvcWindows.advantages.aesthetic.description'),
      emoji: '🎨'
    },
    {
      icon: Volume2,
      title: t('upvcWindows.advantages.sound.title'),
      description: t('upvcWindows.advantages.sound.description'),
      emoji: '🔇'
    },
    {
      icon: Lock,
      title: t('upvcWindows.advantages.security.title'),
      description: t('upvcWindows.advantages.security.description'),
      emoji: '🔒'
    }
  ];

  const technicalSpecs = [
    { property: t('upvcWindows.specifications.frameMaterial.property'), value: t('upvcWindows.specifications.frameMaterial.value') },
    { property: t('upvcWindows.specifications.glassType.property'), value: t('upvcWindows.specifications.glassType.value') },
    { property: t('upvcWindows.specifications.uValue.property'), value: t('upvcWindows.specifications.uValue.value') },
    { property: t('upvcWindows.specifications.airInfiltration.property'), value: t('upvcWindows.specifications.airInfiltration.value') },
    { property: t('upvcWindows.specifications.waterTightness.property'), value: t('upvcWindows.specifications.waterTightness.value') },
    { property: t('upvcWindows.specifications.windResistance.property'), value: t('upvcWindows.specifications.windResistance.value') },
    { property: t('upvcWindows.specifications.soundInsulation.property'), value: t('upvcWindows.specifications.soundInsulation.value') },
    { property: t('upvcWindows.specifications.colorOptions.property'), value: t('upvcWindows.specifications.colorOptions.value') }
  ];

  const glassOptions = [
    {
      type: t('upvcWindows.glassOptions.single.type'),
      thickness: t('upvcWindows.glassOptions.single.thickness'),
      features: [
        t('upvcWindows.glassOptions.single.features.0'),
        t('upvcWindows.glassOptions.single.features.1'),
        t('upvcWindows.glassOptions.single.features.2')
      ],
      suitable: t('upvcWindows.glassOptions.single.suitable'),
      price: t('upvcWindows.glassOptions.single.price')
    },
    {
      type: t('upvcWindows.glassOptions.double.type'),
      thickness: t('upvcWindows.glassOptions.double.thickness'),
      features: [
        t('upvcWindows.glassOptions.double.features.0'),
        t('upvcWindows.glassOptions.double.features.1'),
        t('upvcWindows.glassOptions.double.features.2')
      ],
      suitable: t('upvcWindows.glassOptions.double.suitable'),
      price: t('upvcWindows.glassOptions.double.price')
    },
    {
      type: t('upvcWindows.glassOptions.triple.type'),
      thickness: t('upvcWindows.glassOptions.triple.thickness'),
      features: [
        t('upvcWindows.glassOptions.triple.features.0'),
        t('upvcWindows.glassOptions.triple.features.1'),
        t('upvcWindows.glassOptions.triple.features.2')
      ],
      suitable: t('upvcWindows.glassOptions.triple.suitable'),
      price: t('upvcWindows.glassOptions.triple.price')
    },
    {
      type: t('upvcWindows.glassOptions.lowE.type'),
      thickness: t('upvcWindows.glassOptions.lowE.thickness'),
      features: [
        t('upvcWindows.glassOptions.lowE.features.0'),
        t('upvcWindows.glassOptions.lowE.features.1'),
        t('upvcWindows.glassOptions.lowE.features.2')
      ],
      suitable: t('upvcWindows.glassOptions.lowE.suitable'),
      price: t('upvcWindows.glassOptions.lowE.price')
    }
  ];

  const hardwareOptions = [
    {
      category: t('upvcWindows.hardware.handles.category'),
      options: [
        t('upvcWindows.hardware.handles.options.0'),
        t('upvcWindows.hardware.handles.options.1'),
        t('upvcWindows.hardware.handles.options.2'),
        t('upvcWindows.hardware.handles.options.3')
      ],
      features: [
        t('upvcWindows.hardware.handles.features.0'),
        t('upvcWindows.hardware.handles.features.1'),
        t('upvcWindows.hardware.handles.features.2')
      ]
    },
    {
      category: t('upvcWindows.hardware.hinges.category'),
      options: [
        t('upvcWindows.hardware.hinges.options.0'),
        t('upvcWindows.hardware.hinges.options.1'),
        t('upvcWindows.hardware.hinges.options.2'),
        t('upvcWindows.hardware.hinges.options.3')
      ],
      features: [
        t('upvcWindows.hardware.hinges.features.0'),
        t('upvcWindows.hardware.hinges.features.1'),
        t('upvcWindows.hardware.hinges.features.2')
      ]
    },
    {
      category: t('upvcWindows.hardware.locking.category'),
      options: [
        t('upvcWindows.hardware.locking.options.0'),
        t('upvcWindows.hardware.locking.options.1'),
        t('upvcWindows.hardware.locking.options.2'),
        t('upvcWindows.hardware.locking.options.3')
      ],
      features: [
        t('upvcWindows.hardware.locking.features.0'),
        t('upvcWindows.hardware.locking.features.1'),
        t('upvcWindows.hardware.locking.features.2')
      ]
    }
  ];

  const colorOptions = [
    { name: t('upvcWindows.colors.white'), code: '#FFFFFF', popular: true },
    { name: t('upvcWindows.colors.cream'), code: '#F5F5DC', popular: true },
    { name: t('upvcWindows.colors.lightOak'), code: '#DEB887', popular: true },
    { name: t('upvcWindows.colors.darkOak'), code: '#8B4513', popular: false },
    { name: t('upvcWindows.colors.mahogany'), code: '#C04000', popular: false },
    { name: t('upvcWindows.colors.anthraciteGrey'), code: '#36454F', popular: true },
    { name: t('upvcWindows.colors.black'), code: '#000000', popular: false },
    { name: t('upvcWindows.colors.green'), code: '#228B22', popular: false }
  ];

  const installation = [
    {
      step: 1,
      title: t('upvcWindows.installation.survey.title'),
      description: t('upvcWindows.installation.survey.description'),
      duration: t('upvcWindows.installation.survey.duration')
    },
    {
      step: 2,
      title: t('upvcWindows.installation.manufacturing.title'),
      description: t('upvcWindows.installation.manufacturing.description'),
      duration: t('upvcWindows.installation.manufacturing.duration')
    },
    {
      step: 3,
      title: t('upvcWindows.installation.preparation.title'),
      description: t('upvcWindows.installation.preparation.description'),
      duration: t('upvcWindows.installation.preparation.duration')
    },
    {
      step: 4,
      title: t('upvcWindows.installation.installation.title'),
      description: t('upvcWindows.installation.installation.description'),
      duration: t('upvcWindows.installation.installation.duration')
    },
    {
      step: 5,
      title: t('upvcWindows.installation.qualityCheck.title'),
      description: t('upvcWindows.installation.qualityCheck.description'),
      duration: t('upvcWindows.installation.qualityCheck.duration')
    }
  ];

  const maintenance = [
    {
      frequency: t('upvcWindows.maintenance.weekly.frequency'),
      task: t('upvcWindows.maintenance.weekly.task'),
      importance: t('upvcWindows.maintenance.weekly.importance')
    },
    {
      frequency: t('upvcWindows.maintenance.monthly.frequency'),
      task: t('upvcWindows.maintenance.monthly.task'),
      importance: t('upvcWindows.maintenance.monthly.importance')
    },
    {
      frequency: t('upvcWindows.maintenance.quarterly.frequency'),
      task: t('upvcWindows.maintenance.quarterly.task'),
      importance: t('upvcWindows.maintenance.quarterly.importance')
    },
    {
      frequency: t('upvcWindows.maintenance.annually.frequency'),
      task: t('upvcWindows.maintenance.annually.task'),
      importance: t('upvcWindows.maintenance.annually.importance')
    }
  ];

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

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge 
                className="mb-4 border-0"
                style={{
                  backgroundColor: '#FB921D',
                  color: 'white'
                }}
              >
                {t('upvcWindows.hero.badge')}
              </Badge>
              <h1 
                className="text-4xl md:text-6xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('upvcWindows.hero.title')}
              </h1>
              <p 
                className="text-xl mb-6 leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('upvcWindows.hero.description')}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    {t('upvcWindows.hero.stats.energy.value')}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('upvcWindows.hero.stats.energy.label')}
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    {t('upvcWindows.hero.stats.sound.value')}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('upvcWindows.hero.stats.sound.label')}
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    {t('upvcWindows.hero.stats.lifespan.value')}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('upvcWindows.hero.stats.lifespan.label')}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="font-semibold transition-all duration-300 border-2"
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
                  {t('upvcWindows.hero.cta.getQuote')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=500&fit=crop"
                alt={t('upvcWindows.hero.imageAlt')}
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
                style={{ border: '3px solid #FB921D' }}
              />
              <div 
                className="absolute -bottom-6 -right-6 rounded-lg p-4 shadow-xl"
                style={{ 
                  backgroundColor: 'white',
                  border: '2px solid #FB921D'
                }}
              >
                <div className="flex items-center space-x-2">
                  <Star 
                    className="w-5 h-5"
                    style={{ color: '#FB921D' }}
                  />
                  <div>
                    <div 
                      className="text-sm"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('upvcWindows.hero.priceTag.label')}
                    </div>
                    <div 
                      className="text-lg font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      {t('upvcWindows.hero.priceTag.value')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages Section */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('upvcWindows.advantagesSection.title')}
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('upvcWindows.advantagesSection.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {coreAdvantages.map((advantage, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-0"
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
                <CardContent className="p-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: '#FB921D' }}
                    >
                      <advantage.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl">{advantage.emoji}</span>
                  </div>
                  <h3 
                    className="text-xl mb-3 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {advantage.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ color: '#666' }}
                  >
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
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
              dangerouslySetInnerHTML={{ __html: t('upvcWindows.advantagesSection.conclusion') }}
            />
          </div>
        </div>
      </section>

      {/* Window Types */}
      <section 
        className="py-16"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('upvcWindows.windowTypesSection.title')}
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('upvcWindows.windowTypesSection.subtitle')}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {windowTypes.map((window, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
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
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <ImageWithFallback
                      src={window.image}
                      alt={window.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {window.name}
                      </h3>
                      <Badge 
                        className="border-0"
                        style={{
                          backgroundColor: '#FB921D',
                          color: 'white'
                        }}
                      >
                        {window.price}
                      </Badge>
                    </div>
                    <p 
                      className="mb-4"
                      style={{ color: '#666' }}
                    >
                      {window.description}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 
                          className="text-sm mb-2 font-medium"
                          style={{ color: '#C55A00' }}
                        >
                          {t('upvcWindows.windowTypesSection.featuresLabel')}
                        </h4>
                        <div className="grid grid-cols-2 gap-1">
                          {window.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-1">
                              <CheckCircle 
                                className="w-3 h-3 flex-shrink-0"
                                style={{ color: '#FB921D' }}
                              />
                              <span 
                                className="text-xs"
                                style={{ color: '#666' }}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 
                          className="text-sm mb-2 font-medium"
                          style={{ color: '#C55A00' }}
                        >
                          {t('upvcWindows.windowTypesSection.bestForLabel')}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {window.applications.map((app, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-xs"
                              style={{
                                borderColor: '#C55A00',
                                color: '#C55A00'
                              }}
                            >
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications & Options */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList 
              className="grid w-full grid-cols-4 border-0"
              style={{ backgroundColor: '#FFF5E6' }}
            >
              <TabsTrigger 
                value="specifications"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('upvcWindows.tabs.specifications')}
              </TabsTrigger>
              <TabsTrigger 
                value="glass"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('upvcWindows.tabs.glass')}
              </TabsTrigger>
              <TabsTrigger 
                value="hardware"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('upvcWindows.tabs.hardware')}
              </TabsTrigger>
              <TabsTrigger 
                value="colors"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('upvcWindows.tabs.colors')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card style={{ backgroundColor: '#FFF5E6', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('upvcWindows.specificationsTab.technicalTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {technicalSpecs.map((spec, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between items-center py-2 border-b"
                          style={{ borderColor: '#FFD0A0' }}
                        >
                          <span style={{ color: '#666' }}>{spec.property}</span>
                          <span 
                            className="font-semibold"
                            style={{ color: '#1a1a1a' }}
                          >
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: '#FFF5E6', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('upvcWindows.specificationsTab.performanceTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div 
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(251, 146, 29, 0.1)' }}
                      >
                        <span style={{ color: '#1a1a1a' }}>{t('upvcWindows.specificationsTab.performance.energy.label')}</span>
                        <Badge 
                          className="border-0"
                          style={{ backgroundColor: '#FB921D', color: 'white' }}
                        >
                          {t('upvcWindows.specificationsTab.performance.energy.value')}
                        </Badge>
                      </div>
                      <div 
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(197, 90, 0, 0.1)' }}
                      >
                        <span style={{ color: '#1a1a1a' }}>{t('upvcWindows.specificationsTab.performance.quality.label')}</span>
                        <Badge 
                          variant="outline"
                          style={{ borderColor: '#C55A00', color: '#C55A00' }}
                        >
                          {t('upvcWindows.specificationsTab.performance.quality.value')}
                        </Badge>
                      </div>
                      <div 
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(251, 146, 29, 0.1)' }}
                      >
                        <span style={{ color: '#1a1a1a' }}>{t('upvcWindows.specificationsTab.performance.warranty.label')}</span>
                        <Badge 
                          className="border-0"
                          style={{ backgroundColor: '#FB921D', color: 'white' }}
                        >
                          {t('upvcWindows.specificationsTab.performance.warranty.value')}
                        </Badge>
                      </div>
                      <div 
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(255, 224, 192, 0.5)' }}
                      >
                        <span style={{ color: '#1a1a1a' }}>{t('upvcWindows.specificationsTab.performance.fire.label')}</span>
                        <Badge 
                          variant="outline"
                          style={{ borderColor: '#C55A00', color: '#C55A00' }}
                        >
                          {t('upvcWindows.specificationsTab.performance.fire.value')}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="glass" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {glassOptions.map((glass, index) => (
                  <Card 
                    key={index} 
                    className="p-6 border-0"
                    style={{
                      backgroundColor: '#FFF5E6',
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {glass.type}
                      </h3>
                      <Badge 
                        className="border-0"
                        style={{
                          backgroundColor: '#FB921D',
                          color: 'white'
                        }}
                      >
                        {glass.price}
                      </Badge>
                    </div>
                    <div 
                      className="mb-3"
                      style={{ color: '#666' }}
                    >
                      {t('upvcWindows.glassTab.thicknessLabel')}: {glass.thickness}
                    </div>
                    <div className="space-y-2 mb-4">
                      {glass.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle 
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: '#FB921D' }}
                          />
                          <span 
                            className="text-sm"
                            style={{ color: '#666' }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: '#C55A00' }}
                    >
                      <strong>{t('upvcWindows.glassTab.bestForLabel')}:</strong> {glass.suitable}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hardware" className="mt-8">
              <div className="space-y-8">
                {hardwareOptions.map((hardware, index) => (
                  <Card 
                    key={index} 
                    className="p-6 border-0"
                    style={{
                      backgroundColor: '#FFF5E6',
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <h3 
                      className="text-xl mb-4 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {hardware.category}
                    </h3>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 
                          className="text-sm mb-3 font-medium"
                          style={{ color: '#C55A00' }}
                        >
                          {t('upvcWindows.hardwareTab.availableOptionsLabel')}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {hardware.options.map((option, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle 
                                className="w-4 h-4 flex-shrink-0"
                                style={{ color: '#FB921D' }}
                              />
                              <span 
                                className="text-sm"
                                style={{ color: '#666' }}
                              >
                                {option}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 
                          className="text-sm mb-3 font-medium"
                          style={{ color: '#C55A00' }}
                        >
                          {t('upvcWindows.hardwareTab.keyFeaturesLabel')}
                        </h4>
                        <div className="space-y-2">
                          {hardware.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle 
                                className="w-4 h-4 flex-shrink-0"
                                style={{ color: '#FB921D' }}
                              />
                              <span 
                                className="text-sm"
                                style={{ color: '#666' }}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colors" className="mt-8">
              <div className="text-center mb-8">
                <h3 
                  className="text-2xl mb-4 font-bold"
                  style={{ color: '#1a1a1a' }}
                >
                  {t('upvcWindows.colorsTab.title')}
                </h3>
                <p style={{ color: '#666' }}>
                  {t('upvcWindows.colorsTab.subtitle')}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {colorOptions.map((color, index) => (
                  <Card 
                    key={index} 
                    className={`p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-300 border-0 ${
                      color.popular ? 'ring-2' : ''
                    }`}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #FFD0A0',
                      ringColor: color.popular ? '#FB921D' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#FB921D';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = color.popular ? '#FB921D' : '#FFD0A0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-3 border-2"
                      style={{ 
                        backgroundColor: color.code,
                        borderColor: '#FFD0A0'
                      }}
                    />
                    <h4 
                      className="mb-1 font-medium"
                      style={{ color: '#1a1a1a' }}
                    >
                      {color.name}
                    </h4>
                    {color.popular && (
                      <Badge 
                        className="text-xs border-0"
                        style={{
                          backgroundColor: '#FB921D',
                          color: 'white'
                        }}
                      >
                        {t('upvcWindows.colorsTab.popularLabel')}
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <p 
                  className="mb-4"
                  style={{ color: '#666' }}
                >
                  {t('upvcWindows.colorsTab.customMessage')}
                </p>
                <Button 
                  variant="outline"
                  className="font-semibold border-2 transition-all duration-300"
                  style={{
                    borderColor: '#C55A00',
                    color: '#C55A00'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C55A00';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#C55A00';
                  }}
                  onClick={() => openPopup()}
                >
                  {t('upvcWindows.colorsTab.requestCustomButton')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Installation Process */}
      <section 
        className="py-16"
        style={{ backgroundColor: '#FFE0C0' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('upvcWindows.installationSection.title')}
            </h2>
            <p 
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('upvcWindows.installationSection.subtitle')}
            </p>
          </div>
          <div className="space-y-8">
            {installation.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 text-white rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ backgroundColor: '#FB921D' }}
                  >
                    {step.step}
                  </div>
                </div>
                <div 
                  className="flex-1 p-4 rounded-lg"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 
                        className="text-xl mb-2 font-semibold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {step.title}
                      </h4>
                      <p style={{ color: '#666' }}>{step.description}</p>
                    </div>
                    <Badge 
                      variant="outline"
                      style={{
                        borderColor: '#C55A00',
                        color: '#C55A00'
                      }}
                    >
                      {step.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('upvcWindows.maintenanceSection.title')}
            </h2>
            <p 
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('upvcWindows.maintenanceSection.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenance.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 text-center border-0 hover:shadow-lg transition-all duration-300"
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
                <Badge 
                  className="mb-4 border-0"
                  style={{
                    backgroundColor: '#FB921D',
                    color: 'white'
                  }}
                >
                  {item.frequency}
                </Badge>
                <h3 
                  className="text-lg mb-3 font-semibold"
                  style={{ color: '#1a1a1a' }}
                >
                  {item.task}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: '#666' }}
                >
                  {item.importance}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 font-bold">
            {t('upvcWindows.cta.title')}
          </h2>
          <p 
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('upvcWindows.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="font-semibold transition-all duration-300 border-2"
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
              {t('upvcWindows.cta.getEstimate')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 font-semibold transition-all duration-300"
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
              onClick={() => openPopup()}
            >
              {t('upvcWindows.cta.bookSurvey')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
