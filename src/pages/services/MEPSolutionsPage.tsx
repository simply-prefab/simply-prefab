'use client'

import { ArrowRight, CheckCircle, Droplets, Leaf, Lightbulb, Lock, Shield, Star, Wind, Zap } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MEPSolutionsPage() {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const mepServices = [
    {
      category: t('mepSolutions.services.mechanical.category'),
      icon: Wind,
      description: t('mepSolutions.services.mechanical.description'),
      services: [
        t('mepSolutions.services.mechanical.services.hvacDesign'),
        t('mepSolutions.services.mechanical.services.ventilation'),
        t('mepSolutions.services.mechanical.services.fireSafety'),
        t('mepSolutions.services.mechanical.services.elevatorSystems')
      ],
      price: t('mepSolutions.services.mechanical.price'),
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
    },
    {
      category: t('mepSolutions.services.electrical.category'),
      icon: Zap,
      description: t('mepSolutions.services.electrical.description'),
      services: [
        t('mepSolutions.services.electrical.services.powerDistribution'),
        t('mepSolutions.services.electrical.services.lightingDesign'),
        t('mepSolutions.services.electrical.services.homeAutomation'),
        t('mepSolutions.services.electrical.services.solarIntegration')
      ],
      price: t('mepSolutions.services.electrical.price'),
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
    },
    {
      category: t('mepSolutions.services.plumbing.category'),
      icon: Droplets,
      description: t('mepSolutions.services.plumbing.description'),
      services: [
        t('mepSolutions.services.plumbing.services.waterSupply'),
        t('mepSolutions.services.plumbing.services.drainageSystems'),
        t('mepSolutions.services.plumbing.services.sewageTreatment'),
        t('mepSolutions.services.plumbing.services.rainwaterHarvesting')
      ],
      price: t('mepSolutions.services.plumbing.price'),
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
    }
  ];

  const coreComponents = [
    {
      icon: Wind,
      title: t('mepSolutions.components.mechanical.title'),
      description: t('mepSolutions.components.mechanical.description'),
      emoji: '❄️'
    },
    {
      icon: Zap,
      title: t('mepSolutions.components.electrical.title'),
      description: t('mepSolutions.components.electrical.description'),
      emoji: '⚡'
    },
    {
      icon: Droplets,
      title: t('mepSolutions.components.plumbing.title'),
      description: t('mepSolutions.components.plumbing.description'),
      emoji: '💧'
    },
    {
      icon: Lock,
      title: t('mepSolutions.components.safety.title'),
      description: t('mepSolutions.components.safety.description'),
      emoji: '🔒'
    },
    {
      icon: Lightbulb,
      title: t('mepSolutions.components.energyEfficiency.title'),
      description: t('mepSolutions.components.energyEfficiency.description'),
      emoji: '💡'
    },
    {
      icon: Leaf,
      title: t('mepSolutions.components.sustainability.title'),
      description: t('mepSolutions.components.sustainability.description'),
      emoji: '🌱'
    }
  ];

  const smartFeatures = [
    {
      system: t('mepSolutions.smartFeatures.hvac.system'),
      description: t('mepSolutions.smartFeatures.hvac.description'),
      benefits: [
        t('mepSolutions.smartFeatures.hvac.benefits.energySavings'),
        t('mepSolutions.smartFeatures.hvac.benefits.remoteMonitoring'),
        t('mepSolutions.smartFeatures.hvac.benefits.predictiveMaintenance'),
        t('mepSolutions.smartFeatures.hvac.benefits.airQuality')
      ],
      technology: t('mepSolutions.smartFeatures.hvac.technology')
    },
    {
      system: t('mepSolutions.smartFeatures.lighting.system'),
      description: t('mepSolutions.smartFeatures.lighting.description'),
      benefits: [
        t('mepSolutions.smartFeatures.lighting.benefits.energyReduction'),
        t('mepSolutions.smartFeatures.lighting.benefits.circadianSync'),
        t('mepSolutions.smartFeatures.lighting.benefits.sceneControl'),
        t('mepSolutions.smartFeatures.lighting.benefits.securityIntegration')
      ],
      technology: t('mepSolutions.smartFeatures.lighting.technology')
    },
    {
      system: t('mepSolutions.smartFeatures.water.system'),
      description: t('mepSolutions.smartFeatures.water.description'),
      benefits: [
        t('mepSolutions.smartFeatures.water.benefits.conservation'),
        t('mepSolutions.smartFeatures.water.benefits.leakPrevention'),
        t('mepSolutions.smartFeatures.water.benefits.qualityMonitoring'),
        t('mepSolutions.smartFeatures.water.benefits.automatedIrrigation')
      ],
      technology: t('mepSolutions.smartFeatures.water.technology')
    },
    {
      system: t('mepSolutions.smartFeatures.energy.system'),
      description: t('mepSolutions.smartFeatures.energy.description'),
      benefits: [
        t('mepSolutions.smartFeatures.energy.benefits.realTimeMonitoring'),
        t('mepSolutions.smartFeatures.energy.benefits.loadBalancing'),
        t('mepSolutions.smartFeatures.energy.benefits.peakDemandControl'),
        t('mepSolutions.smartFeatures.energy.benefits.costOptimization')
      ],
      technology: t('mepSolutions.smartFeatures.energy.technology')
    }
  ];

  const systemIntegration = [
    {
      phase: t('mepSolutions.integration.design.phase'),
      description: t('mepSolutions.integration.design.description'),
      features: [
        t('mepSolutions.integration.design.features.modularDesign'),
        t('mepSolutions.integration.design.features.prefabricatedAssemblies'),
        t('mepSolutions.integration.design.features.standardizedConnections'),
        t('mepSolutions.integration.design.features.qualityControl')
      ],
      timeline: t('mepSolutions.integration.design.timeline')
    },
    {
      phase: t('mepSolutions.integration.factory.phase'),
      description: t('mepSolutions.integration.factory.description'),
      features: [
        t('mepSolutions.integration.factory.features.controlledEnvironment'),
        t('mepSolutions.integration.factory.features.precisionInstallation'),
        t('mepSolutions.integration.factory.features.testingProtocols'),
        t('mepSolutions.integration.factory.features.qualityAssurance')
      ],
      timeline: t('mepSolutions.integration.factory.timeline')
    },
    {
      phase: t('mepSolutions.integration.site.phase'),
      description: t('mepSolutions.integration.site.description'),
      features: [
        t('mepSolutions.integration.site.features.plugAndPlay'),
        t('mepSolutions.integration.site.features.minimalSiteWork'),
        t('mepSolutions.integration.site.features.fastCommissioning'),
        t('mepSolutions.integration.site.features.systemTesting')
      ],
      timeline: t('mepSolutions.integration.site.timeline')
    }
  ];

  const energyEfficiency = [
    {
      category: t('mepSolutions.efficiency.hvac.category'),
      measures: [
        t('mepSolutions.efficiency.hvac.measures.vrfSystems'),
        t('mepSolutions.efficiency.hvac.measures.energyRecovery'),
        t('mepSolutions.efficiency.hvac.measures.smartZoning'),
        t('mepSolutions.efficiency.hvac.measures.heatPumps')
      ],
      savings: t('mepSolutions.efficiency.hvac.savings')
    },
    {
      category: t('mepSolutions.efficiency.lighting.category'),
      measures: [
        t('mepSolutions.efficiency.lighting.measures.ledLighting'),
        t('mepSolutions.efficiency.lighting.measures.daylightHarvesting'),
        t('mepSolutions.efficiency.lighting.measures.occupancySensors'),
        t('mepSolutions.efficiency.lighting.measures.smartDimming')
      ],
      savings: t('mepSolutions.efficiency.lighting.savings')
    },
    {
      category: t('mepSolutions.efficiency.water.category'),
      measures: [
        t('mepSolutions.efficiency.water.measures.lowFlowFixtures'),
        t('mepSolutions.efficiency.water.measures.greywaterRecycling'),
        t('mepSolutions.efficiency.water.measures.smartIrrigation'),
        t('mepSolutions.efficiency.water.measures.leakDetection')
      ],
      savings: t('mepSolutions.efficiency.water.savings')
    }
  ];

  const technicalSpecs = {
    electrical: [
      { parameter: t('mepSolutions.specifications.electrical.powerSupply'), value: '230V/400V, 50Hz' },
      { parameter: t('mepSolutions.specifications.electrical.loadCapacity'), value: 'Up to 100kW' },
      { parameter: t('mepSolutions.specifications.electrical.powerFactor'), value: '>0.95' },
      { parameter: t('mepSolutions.specifications.electrical.voltageRegulation'), value: '±5%' },
      { parameter: t('mepSolutions.specifications.electrical.backupPower'), value: 'Generator/UPS options' },
      { parameter: t('mepSolutions.specifications.electrical.safetyStandards'), value: 'IS 732, IEC 60364' }
    ],
    mechanical: [
      { parameter: t('mepSolutions.specifications.mechanical.hvacCapacity'), value: '1-50 TR' },
      { parameter: t('mepSolutions.specifications.mechanical.airChanges'), value: '6-12 ACH' },
      { parameter: t('mepSolutions.specifications.mechanical.filtration'), value: 'MERV 8-13' },
      { parameter: t('mepSolutions.specifications.mechanical.noiseLevel'), value: '<45 dB(A)' },
      { parameter: t('mepSolutions.specifications.mechanical.energyRating'), value: '4-5 Star BEE' },
      { parameter: t('mepSolutions.specifications.mechanical.refrigerant'), value: 'R-410A/R-32' }
    ],
    plumbing: [
      { parameter: t('mepSolutions.specifications.plumbing.waterPressure'), value: '1.5-4.0 kg/cm²' },
      { parameter: t('mepSolutions.specifications.plumbing.pipeMaterial'), value: 'CPVC/PPR/PEX' },
      { parameter: t('mepSolutions.specifications.plumbing.hotWater'), value: 'Heat pump/Solar' },
      { parameter: t('mepSolutions.specifications.plumbing.drainage'), value: 'Gravity/Pumped' },
      { parameter: t('mepSolutions.specifications.plumbing.waterQuality'), value: 'WHO standards' },
      { parameter: t('mepSolutions.specifications.plumbing.leakProtection'), value: 'Smart sensors' }
    ]
  };

  const maintenancePackages = [
    {
      package: t('mepSolutions.maintenance.basic.package'),
      description: t('mepSolutions.maintenance.basic.description'),
      price: t('mepSolutions.maintenance.basic.price'),
      includes: [
        t('mepSolutions.maintenance.basic.includes.quarterlyInspections'),
        t('mepSolutions.maintenance.basic.includes.filterReplacements'),
        t('mepSolutions.maintenance.basic.includes.basicRepairs'),
        t('mepSolutions.maintenance.basic.includes.performanceMonitoring')
      ],
      suitable: t('mepSolutions.maintenance.basic.suitable')
    },
    {
      package: t('mepSolutions.maintenance.comprehensive.package'),
      description: t('mepSolutions.maintenance.comprehensive.description'),
      price: t('mepSolutions.maintenance.comprehensive.price'),
      includes: [
        t('mepSolutions.maintenance.comprehensive.includes.monthlyInspections'),
        t('mepSolutions.maintenance.comprehensive.includes.preventiveMaintenance'),
        t('mepSolutions.maintenance.comprehensive.includes.priorityRepairs'),
        t('mepSolutions.maintenance.comprehensive.includes.systemUpgrades')
      ],
      suitable: t('mepSolutions.maintenance.comprehensive.suitable')
    },
    {
      package: t('mepSolutions.maintenance.smart.package'),
      description: t('mepSolutions.maintenance.smart.description'),
      price: t('mepSolutions.maintenance.smart.price'),
      includes: [
        t('mepSolutions.maintenance.smart.includes.realTimeMonitoring'),
        t('mepSolutions.maintenance.smart.includes.predictiveAnalytics'),
        t('mepSolutions.maintenance.smart.includes.emergencyResponse'),
        t('mepSolutions.maintenance.smart.includes.performanceOptimization')
      ],
      suitable: t('mepSolutions.maintenance.smart.suitable')
    }
  ];

  const certifications = [
    { name: t('mepSolutions.certifications.igbc.name'), description: t('mepSolutions.certifications.igbc.description') },
    { name: t('mepSolutions.certifications.bee.name'), description: t('mepSolutions.certifications.bee.description') },
    { name: t('mepSolutions.certifications.is.name'), description: t('mepSolutions.certifications.is.description') },
    { name: t('mepSolutions.certifications.ce.name'), description: t('mepSolutions.certifications.ce.description') },
    { name: t('mepSolutions.certifications.ul.name'), description: t('mepSolutions.certifications.ul.description') },
    { name: t('mepSolutions.certifications.leed.name'), description: t('mepSolutions.certifications.leed.description') }
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
                {t('mepSolutions.badge')}
              </Badge>
              <h1
                className="text-4xl md:text-6xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('mepSolutions.heroTitle')}
              </h1>
              <p
                className="text-xl mb-6 leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('mepSolutions.heroDescription')}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    50%
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('mepSolutions.stats.energySavings')}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    24/7
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('mepSolutions.stats.smartMonitoring')}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    10+
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('mepSolutions.stats.yearWarranty')}
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
                  {t('mepSolutions.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=500&fit=crop"
                alt="Modern MEP systems"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
                style={{ border: '3px solid #FB921D' }}
              />
              <div
                className="absolute -bottom-6 -left-6 rounded-lg p-4 shadow-xl"
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
                      {t('mepSolutions.stats.startingFrom')}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      ₹300/sq ft
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core MEP Components */}
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
              {t('mepSolutions.components.title')}
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('mepSolutions.components.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {coreComponents.map((component, index) => (
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
                       <component.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl">{component.emoji}</span>
                  </div>
                  <h3
                    className="text-xl mb-3 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {component.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: '#666' }}
                  >
                    {component.description}
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
            >
              {t('mepSolutions.components.conclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* MEP Services */}
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
              {t('mepSolutions.services.title')}
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('mepSolutions.services.subtitle')}
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {mepServices.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #FFD0A0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = '#FB921D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#FFD0A0';
                }}
              >
                <ImageWithFallback
                  src={service.image}
                  alt={service.category}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <service.icon
                      className="w-8 h-8"
                      style={{ color: '#FB921D' }}
                    />
                    <CardTitle
                      className="text-xl"
                      style={{ color: '#1a1a1a' }}
                    >
                      {service.category}
                    </CardTitle>
                  </div>
                  <p style={{ color: '#666' }}>{service.description}</p>
                  <Badge
                    className="w-fit border-0"
                    style={{
                      backgroundColor: '#FB921D',
                      color: 'white'
                    }}
                  >
                    {service.price}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4
                      className="text-sm mb-3 font-medium"
                      style={{ color: '#C55A00' }}
                    >
                      {t('mepSolutions.services.servicesIncluded')}
                    </h4>
                    <div className="space-y-2">
                      {service.services.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: '#FB921D' }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: '#666' }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: '#FB921D',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#E67E0F';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#FB921D';
                    }}
                    onClick={() => openPopup()}
                  >
                    {t('mepSolutions.services.learnMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Features */}
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
              {t('mepSolutions.smartFeatures.title')}
            </h2>
            <p
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('mepSolutions.smartFeatures.subtitle')}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {smartFeatures.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-0"
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
                <h3
                  className="text-xl mb-3 font-semibold"
                  style={{ color: '#1a1a1a' }}
                >
                  {feature.system}
                </h3>
                <p
                  className="mb-4"
                  style={{ color: '#666' }}
                >
                  {feature.description}
                </p>
                <div className="space-y-3">
                  <div>
                    <h4
                      className="text-sm mb-2 font-medium"
                      style={{ color: '#C55A00' }}
                    >
                      {t('mepSolutions.smartFeatures.keyBenefits')}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: '#FB921D' }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: '#666' }}
                          >
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: 'white' }}
                  >
                    <div
                      className="text-sm"
                      style={{ color: '#C55A00' }}
                    >
                      <strong>{t('mepSolutions.smartFeatures.technology')}</strong> {feature.technology}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Integration & Technical Specs */}
      <section
        className="py-16"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="integration" className="w-full">
            <TabsList
              className="grid w-full grid-cols-4 border-0"
              style={{ backgroundColor: 'white' }}
            >
              <TabsTrigger
                value="integration"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('mepSolutions.tabs.integration')}
              </TabsTrigger>
              <TabsTrigger
                value="efficiency"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('mepSolutions.tabs.efficiency')}
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('mepSolutions.tabs.specifications')}
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('mepSolutions.tabs.maintenance')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="integration" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl mb-4 font-bold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {t('mepSolutions.integration.title')}
                  </h3>
                  <p style={{ color: '#666' }}>
                    {t('mepSolutions.integration.subtitle')}
                  </p>
                </div>
                <div className="space-y-8">
                  {systemIntegration.map((phase, index) => (
                    <Card
                      key={index}
                      className="p-6 border-0"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid #FFD0A0'
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div
                            className="w-12 h-12 text-white rounded-full flex items-center justify-center text-lg font-bold"
                            style={{ backgroundColor: '#FB921D' }}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <h4
                              className="text-xl font-semibold"
                              style={{ color: '#1a1a1a' }}
                            >
                              {phase.phase}
                            </h4>
                            <Badge
                              variant="outline"
                              style={{
                                borderColor: '#C55A00',
                                color: '#C55A00'
                              }}
                            >
                              {phase.timeline}
                            </Badge>
                          </div>
                          <p
                            className="mb-4"
                            style={{ color: '#666' }}
                          >
                            {phase.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {phase.features.map((feature, idx) => (
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
              </div>
            </TabsContent>

            <TabsContent value="efficiency" className="mt-8">
              <div className="space-y-8">
                {energyEfficiency.map((category, index) => (
                  <Card
                    key={index}
                    className="p-6 border-0"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3
                        className="text-xl font-semibold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {category.category}
                      </h3>
                      <Badge
                        className="border-0"
                        style={{
                          backgroundColor: '#FB921D',
                          color: 'white'
                        }}
                      >
                        {category.savings}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.measures.map((measure, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: '#FB921D' }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: '#666' }}
                          >
                            {measure}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <Card style={{ backgroundColor: 'white', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap
                        className="w-5 h-5 mr-2"
                        style={{ color: '#FB921D' }}
                      />
                      <span style={{ color: '#1a1a1a' }}>{t('mepSolutions.specifications.electrical.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {technicalSpecs.electrical.map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span style={{ color: '#666' }}>{spec.parameter}</span>
                          <span
                            className="font-medium"
                            style={{ color: '#1a1a1a' }}
                          >
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: 'white', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wind
                        className="w-5 h-5 mr-2"
                        style={{ color: '#FB921D' }}
                      />
                      <span style={{ color: '#1a1a1a' }}>{t('mepSolutions.specifications.mechanical.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {technicalSpecs.mechanical.map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span style={{ color: '#666' }}>{spec.parameter}</span>
                          <span
                            className="font-medium"
                            style={{ color: '#1a1a1a' }}
                          >
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: 'white', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Droplets
                        className="w-5 h-5 mr-2"
                        style={{ color: '#FB921D' }}
                      />
                      <span style={{ color: '#1a1a1a' }}>{t('mepSolutions.specifications.plumbing.title')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {technicalSpecs.plumbing.map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span style={{ color: '#666' }}>{spec.parameter}</span>
                          <span
                            className="font-medium"
                            style={{ color: '#1a1a1a' }}
                          >
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {maintenancePackages.map((pkg, index) => (
                  <Card
                    key={index}
                    className={`p-6 text-center border-0 ${index === 1 ? 'ring-2' : ''}`}
                    style={{
                      backgroundColor: index === 1 ? 'white' : '#FFF5E6',
                      border: '1px solid #FFD0A0',
                      // ringColor: index === 1 ? '#FB921D' : 'transparent'
                    }}
                  >
                    <h3
                      className="text-xl mb-3 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {pkg.package}
                    </h3>
                    <p
                      className="mb-4"
                      style={{ color: '#666' }}
                    >
                      {pkg.description}
                    </p>
                    <div
                      className="text-2xl mb-4 font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      {pkg.price}
                    </div>
                    <div className="space-y-2 mb-6">
                      {pkg.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: '#FB921D' }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: '#666' }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Badge
                      variant="outline"
                      className="mb-4"
                      style={{
                        borderColor: '#C55A00',
                        color: '#C55A00'
                      }}
                    >
                      {pkg.suitable}
                    </Badge>
                    <Button
                      className="w-full font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: index === 1 ? '#FB921D' : '#C55A00',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = index === 1 ? '#E67E0F' : '#A64D00';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = index === 1 ? '#FB921D' : '#C55A00';
                      }}
                      onClick={() => openPopup()}
                    >
                      {t('mepSolutions.maintenance.choosePackage')}
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Certifications */}
      <section
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('mepSolutions.certifications.title')}
            </h2>
            <p
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('mepSolutions.certifications.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-4 text-center hover:shadow-lg transition-all duration-300 border-0"
                style={{
                  backgroundColor: '#FFF5E6',
                  border: '1px solid #FFD0A0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FB921D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#FFD0A0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Shield
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: '#FB921D' }}
                />
                <h3
                  className="text-lg mb-1 font-semibold"
                  style={{ color: '#1a1a1a' }}
                >
                  {cert.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: '#666' }}
                >
                  {cert.description}
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
            {t('mepSolutions.finalCta.title')}
          </h2>
          <p
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('mepSolutions.finalCta.description')}
          </p>
          <Button
            size="lg"
            className="font-semibold transition-all duration-300 border-2"
            style={{
              backgroundColor: 'white',
              color: '#1a1a1a',
              borderColor: 'white'
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
            {t('mepSolutions.finalCta.consultation')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
