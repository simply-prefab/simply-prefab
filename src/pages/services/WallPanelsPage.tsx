'use client'

import { ArrowRight, Award, CheckCircle, Clock, Droplets, Shield, Star, Thermometer, Zap, Home, Building2, Factory } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WallPanelsPage() {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const technicalSpecs = [
    { property: t('wallPanels.specifications.thermalConductivity'), value: '0.22 W/mK', unit: t('wallPanels.specifications.superiorInsulation') },
    { property: t('wallPanels.specifications.fireRating'), value: '120 minutes', unit: 'BS476: Part 4 Grade A' },
    { property: t('wallPanels.specifications.soundReduction'), value: '40-50 dB', unit: t('wallPanels.specifications.excellentNoise') },
    { property: t('wallPanels.specifications.panelThickness'), value: '50-100 mm', unit: t('wallPanels.specifications.multipleOptions') },
    { property: t('wallPanels.specifications.weight'), value: '40-70 kg/m²', unit: t('wallPanels.specifications.lightweight') },
    { property: t('wallPanels.specifications.installationSpeed'), value: '100-150 m²/day', unit: t('wallPanels.specifications.perCrew') },
    { property: t('wallPanels.specifications.lifespan'), value: '50+ years', unit: t('wallPanels.specifications.withWarranty') },
    { property: t('wallPanels.specifications.waterResistance'), value: 'IP rated', unit: t('wallPanels.specifications.waterproof') }
  ];

  const benefits = [
    {
      icon: Clock,
      title: t('wallPanels.benefits.fastInstallation.title'),
      description: t('wallPanels.benefits.fastInstallation.description'),
      value: t('wallPanels.benefits.fastInstallation.value')
    },
    {
      icon: Thermometer,
      title: t('wallPanels.benefits.energyEfficient.title'),
      description: t('wallPanels.benefits.energyEfficient.description'),
      value: t('wallPanels.benefits.energyEfficient.value')
    },
    {
      icon: Shield,
      title: t('wallPanels.benefits.fireResistant.title'),
      description: t('wallPanels.benefits.fireResistant.description'),
      value: t('wallPanels.benefits.fireResistant.value')
    },
    {
      icon: Droplets,
      title: t('wallPanels.benefits.moistureProof.title'),
      description: t('wallPanels.benefits.moistureProof.description'),
      value: t('wallPanels.benefits.moistureProof.value')
    }
  ];

  const applications = [
    {
      category: t('wallPanels.applications.residential.category'),
      description: t('wallPanels.applications.residential.description'),
      features: [
        t('wallPanels.applications.residential.features.energyEfficient'),
        t('wallPanels.applications.residential.features.soundInsulation'),
        t('wallPanels.applications.residential.features.quickConstruction'),
        t('wallPanels.applications.residential.features.durable')
      ],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
      icon: Home
    },
    {
      category: t('wallPanels.applications.commercial.category'),
      description: t('wallPanels.applications.commercial.description'),
      features: [
        t('wallPanels.applications.commercial.features.fireRated'),
        t('wallPanels.applications.commercial.features.flexibleLayouts'),
        t('wallPanels.applications.commercial.features.professionalFinish'),
        t('wallPanels.applications.commercial.features.hvacCompatible')
      ],
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&h=300&fit=crop',
      icon: Building2
    },
    {
      category: t('wallPanels.applications.industrial.category'),
      description: t('wallPanels.applications.industrial.description'),
      features: [
        t('wallPanels.applications.industrial.features.heavyDuty'),
        t('wallPanels.applications.industrial.features.weatherResistant'),
        t('wallPanels.applications.industrial.features.lowMaintenance'),
        t('wallPanels.applications.industrial.features.costEffective')
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=300&fit=crop',
      icon: Factory
    }
  ];

  const installationProcess = [
    {
      step: 1,
      title: t('wallPanels.installation.sitePreparation.title'),
      description: t('wallPanels.installation.sitePreparation.description'),
      duration: t('wallPanels.installation.sitePreparation.duration')
    },
    {
      step: 2,
      title: t('wallPanels.installation.manufacturing.title'),
      description: t('wallPanels.installation.manufacturing.description'),
      duration: t('wallPanels.installation.manufacturing.duration')
    },
    {
      step: 3,
      title: t('wallPanels.installation.transportation.title'),
      description: t('wallPanels.installation.transportation.description'),
      duration: t('wallPanels.installation.transportation.duration')
    },
    {
      step: 4,
      title: t('wallPanels.installation.dryInstallation.title'),
      description: t('wallPanels.installation.dryInstallation.description'),
      duration: t('wallPanels.installation.dryInstallation.duration')
    },
    {
      step: 5,
      title: t('wallPanels.installation.finishing.title'),
      description: t('wallPanels.installation.finishing.description'),
      duration: t('wallPanels.installation.finishing.duration')
    }
  ];

  const qualityFeatures = [
    t('wallPanels.qualityFeatures.composition'),
    t('wallPanels.qualityFeatures.factoryControlled'),
    t('wallPanels.qualityFeatures.greenproCertified'),
    t('wallPanels.qualityFeatures.noCuring'),
    t('wallPanels.qualityFeatures.dryConstruction'),
    t('wallPanels.qualityFeatures.reusable'),
    t('wallPanels.qualityFeatures.smoothFinish'),
    t('wallPanels.qualityFeatures.structuralStability')
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
                {t('wallPanels.badge')}
              </Badge>
              <h1
                className="text-4xl md:text-6xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('wallPanels.heroTitle')}
              </h1>
              <p
                className="text-xl mb-6 leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('wallPanels.heroDescription')}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    50+
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('wallPanels.stats.yearsLifespan')}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    120
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('wallPanels.stats.minFireRating')}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    60%
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('wallPanels.stats.timeSavings')}
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
                  {t('wallPanels.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=500&fit=crop"
                alt="Birla Aerocon wall panel installation"
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
                      {t('wallPanels.startingFrom')}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      {t('wallPanels.startingPrice')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
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
              {t('wallPanels.whyChooseTitle')}
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('wallPanels.whyChooseSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card
              className="border-0"
              style={{
                backgroundColor: '#FFF5E6',
                border: '2px solid #FB921D'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#FB921D' }}
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('wallPanels.whyChoose.structural.title')}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {t('wallPanels.whyChoose.structural.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0"
              style={{
                backgroundColor: '#FFF5E6',
                border: '2px solid #FB921D'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#FB921D' }}
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('wallPanels.whyChoose.rapidConstruction.title')}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {t('wallPanels.whyChoose.rapidConstruction.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0"
              style={{
                backgroundColor: '#FFF5E6',
                border: '2px solid #FB921D'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#FB921D' }}
                  >
                    <Thermometer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('wallPanels.whyChoose.energyEfficiency.title')}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {t('wallPanels.whyChoose.energyEfficiency.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0"
              style={{
                backgroundColor: '#FFF5E6',
                border: '2px solid #FB921D'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#FB921D' }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('wallPanels.whyChoose.ecoFriendly.title')}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: '#666' }}
                    >
                      {t('wallPanels.whyChoose.ecoFriendly.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              {t('wallPanels.whyChooseConclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              {t('wallPanels.benefitsTitle')}
            </h2>
            <p
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('wallPanels.benefitsSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0"
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
                <CardContent className="p-0">
                  <benefit.icon
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: '#FB921D' }}
                  />
                  <h3
                    className="text-xl mb-2 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="mb-3"
                    style={{ color: '#666' }}
                  >
                    {benefit.description}
                  </p>
                  <Badge
                    className="border-0"
                    style={{
                      backgroundColor: '#FB921D',
                      color: 'white'
                    }}
                  >
                    {benefit.value}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications & Applications */}
      <section
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList
              className="grid w-full grid-cols-3 border-0"
              style={{ backgroundColor: '#FFF5E6' }}
            >
              <TabsTrigger
                value="specifications"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('wallPanels.tabs.specifications')}
              </TabsTrigger>
              <TabsTrigger
                value="applications"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('wallPanels.tabs.applications')}
              </TabsTrigger>
              <TabsTrigger
                value="installation"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('wallPanels.tabs.installation')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card style={{ backgroundColor: '#FFF5E6', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('wallPanels.technicalSpecsTitle')}</CardTitle>
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
                          <div className="text-right">
                            <div
                              className="font-semibold"
                              style={{ color: '#1a1a1a' }}
                            >
                              {spec.value}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: '#C55A00' }}
                            >
                              {spec.unit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: '#FFF5E6', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('wallPanels.qualityFeaturesTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {qualityFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
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
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="mt-8">
              <div className="space-y-8">
                {applications.map((app, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: '#FFF5E6',
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <ImageWithFallback
                          src={app.image}
                          alt={app.category}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <app.icon
                            className="w-8 h-8"
                            style={{ color: '#FB921D' }}
                          />
                          <h3
                            className="text-2xl font-bold"
                            style={{ color: '#1a1a1a' }}
                          >
                            {app.category}
                          </h3>
                        </div>
                        <p
                          className="mb-4"
                          style={{ color: '#666' }}
                        >
                          {app.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {app.features.map((feature, idx) => (
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

            <TabsContent value="installation" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl mb-4 font-bold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {t('wallPanels.installationProcessTitle')}
                  </h3>
                  <p style={{ color: '#666' }}>
                    {t('wallPanels.installationProcessSubtitle')}
                  </p>
                </div>
                <div className="space-y-8">
                  {installationProcess.map((step, index) => (
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
                        style={{ backgroundColor: '#FFF5E6' }}
                      >
                        <h4
                          className="text-xl mb-2 font-semibold"
                          style={{ color: '#1a1a1a' }}
                        >
                          {step.title}
                        </h4>
                        <p
                          className="mb-2"
                          style={{ color: '#666' }}
                        >
                          {step.description}
                        </p>
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
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Table */}
      <section
        className="py-16"
        style={{ backgroundColor: '#FFE0C0' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('wallPanels.comparisonTitle')}
            </h2>
            <p
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('wallPanels.comparisonSubtitle')}
            </p>
          </div>
          <Card
            className="overflow-hidden border-0"
            style={{
              backgroundColor: 'white',
              border: '2px solid #FB921D'
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: '#FFF5E6' }}>
                  <tr>
                    <th
                      className="px-6 py-3 text-left font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('wallPanels.comparison.factor')}
                    </th>
                    <th
                      className="px-6 py-3 text-center font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('wallPanels.comparison.traditional')}
                    </th>
                    <th
                      className="px-6 py-3 text-center font-semibold"
                      style={{ color: '#FB921D' }}
                    >
                      {t('wallPanels.comparison.birlaAerocon')}
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white' }}>
                  {[
                    [t('wallPanels.comparison.constructionTime'), '6-8 weeks', '2-3 weeks'],
                    [t('wallPanels.comparison.qualityControl'), 'Variable on-site', 'Factory controlled'],
                    [t('wallPanels.comparison.weatherDependency'), 'High', 'None - Dry construction'],
                    [t('wallPanels.comparison.curingRequired'), 'Yes (14-28 days)', 'No - Ready to use'],
                    [t('wallPanels.comparison.thermalInsulation'), 'Basic', 'Superior (0.22 W/mK)'],
                    [t('wallPanels.comparison.fireRating'), '60-90 minutes', '120 minutes (Grade A)'],
                    [t('wallPanels.comparison.soundReduction'), '30-35 dB', '40-50 dB'],
                    [t('wallPanels.comparison.lifespan'), '25-30 years', '50+ years'],
                    [t('wallPanels.comparison.maintenance'), 'Regular', 'Minimal'],
                    [t('wallPanels.comparison.environmentalImpact'), 'High waste', 'Eco-friendly (GREENPRO)']
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? '' : ''}
                      style={{
                        backgroundColor: index % 2 === 0 ? 'white' : '#FFF5E6',
                        borderBottom: '1px solid #FFD0A0'
                      }}
                    >
                      <td
                        className="px-6 py-4 font-medium"
                        style={{ color: '#1a1a1a' }}
                      >
                        {row[0]}
                      </td>
                      <td
                        className="px-6 py-4 text-center"
                        style={{ color: '#666' }}
                      >
                        {row[1]}
                      </td>
                      <td
                        className="px-6 py-4 text-center font-semibold"
                        style={{ color: '#FB921D' }}
                      >
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
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
            {t('wallPanels.finalCta.title')}
          </h2>
          <p
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('wallPanels.finalCta.description')}
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
              {t('wallPanels.finalCta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
