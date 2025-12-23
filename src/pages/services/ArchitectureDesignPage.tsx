'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Palette, Ruler, Eye, Zap, ArrowRight, CheckCircle, Star, Users, Award, Building, Leaf, Lightbulb, Globe2 } from 'lucide-react';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ArchitectureDesignPage() {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const designServices = [
    {
      name: t('architectureDesign.services.conceptual.name'),
      description: t('architectureDesign.services.conceptual.description'),
      price: t('architectureDesign.services.conceptual.price'),
      duration: t('architectureDesign.services.conceptual.duration'),
      deliverables: [
        t('architectureDesign.services.conceptual.deliverables.siteAnalysis'),
        t('architectureDesign.services.conceptual.deliverables.conceptSketches'),
        t('architectureDesign.services.conceptual.deliverables.spacePlanning'),
        t('architectureDesign.services.conceptual.deliverables.initial3D')
      ],
      icon: Eye
    },
    {
      name: t('architectureDesign.services.detailed.name'),
      description: t('architectureDesign.services.detailed.description'),
      price: t('architectureDesign.services.detailed.price'),
      duration: t('architectureDesign.services.detailed.duration'),
      deliverables: [
        t('architectureDesign.services.detailed.deliverables.workingDrawings'),
        t('architectureDesign.services.detailed.deliverables.structuralPlans'),
        t('architectureDesign.services.detailed.deliverables.mepCoordination'),
        t('architectureDesign.services.detailed.deliverables.materialSpecs')
      ],
      icon: Ruler
    },
    {
      name: t('architectureDesign.services.interior.name'),
      description: t('architectureDesign.services.interior.description'),
      price: t('architectureDesign.services.interior.price'),
      duration: t('architectureDesign.services.interior.duration'),
      deliverables: [
        t('architectureDesign.services.interior.deliverables.interiorLayouts'),
        t('architectureDesign.services.interior.deliverables.furnitureSelection'),
        t('architectureDesign.services.interior.deliverables.lightingDesign'),
        t('architectureDesign.services.interior.deliverables.colorSchemes')
      ],
      icon: Palette
    },
    {
      name: t('architectureDesign.services.visualization.name'),
      description: t('architectureDesign.services.visualization.description'),
      price: t('architectureDesign.services.visualization.price'),
      duration: t('architectureDesign.services.visualization.duration'),
      deliverables: [
        t('architectureDesign.services.visualization.deliverables.rendering3D'),
        t('architectureDesign.services.visualization.deliverables.virtualWalkthroughs'),
        t('architectureDesign.services.visualization.deliverables.animationVideos'),
        t('architectureDesign.services.visualization.deliverables.vrExperiences')
      ],
      icon: Zap
    }
  ];

  const designProcess = [
    {
      phase: t('architectureDesign.process.discovery.phase'),
      description: t('architectureDesign.process.discovery.description'),
      duration: t('architectureDesign.process.discovery.duration'),
      activities: [
        t('architectureDesign.process.discovery.activities.consultation'),
        t('architectureDesign.process.discovery.activities.siteSurvey'),
        t('architectureDesign.process.discovery.activities.requirementAnalysis'),
        t('architectureDesign.process.discovery.activities.budgetPlanning')
      ]
    },
    {
      phase: t('architectureDesign.process.concept.phase'),
      description: t('architectureDesign.process.concept.description'),
      duration: t('architectureDesign.process.concept.duration'),
      activities: [
        t('architectureDesign.process.concept.activities.conceptualSketches'),
        t('architectureDesign.process.concept.activities.spacePlanning'),
        t('architectureDesign.process.concept.activities.designOptions'),
        t('architectureDesign.process.concept.activities.clientFeedback')
      ]
    },
    {
      phase: t('architectureDesign.process.development.phase'),
      description: t('architectureDesign.process.development.description'),
      duration: t('architectureDesign.process.development.duration'),
      activities: [
        t('architectureDesign.process.development.activities.detailedDrawings'),
        t('architectureDesign.process.development.activities.materialSelection'),
        t('architectureDesign.process.development.activities.systemIntegration'),
        t('architectureDesign.process.development.activities.complianceCheck')
      ]
    },
    {
      phase: t('architectureDesign.process.documentation.phase'),
      description: t('architectureDesign.process.documentation.description'),
      duration: t('architectureDesign.process.documentation.duration'),
      activities: [
        t('architectureDesign.process.documentation.activities.workingDrawings'),
        t('architectureDesign.process.documentation.activities.specifications'),
        t('architectureDesign.process.documentation.activities.permitDrawings'),
        t('architectureDesign.process.documentation.activities.tenderDocuments')
      ]
    },
    {
      phase: t('architectureDesign.process.construction.phase'),
      description: t('architectureDesign.process.construction.description'),
      duration: t('architectureDesign.process.construction.duration'),
      activities: [
        t('architectureDesign.process.construction.activities.siteSupervision'),
        t('architectureDesign.process.construction.activities.qualityControl'),
        t('architectureDesign.process.construction.activities.changeManagement'),
        t('architectureDesign.process.construction.activities.finalInspection')
      ]
    }
  ];

  const designSpecialties = [
    {
      category: t('architectureDesign.specialties.sustainable.category'),
      description: t('architectureDesign.specialties.sustainable.description'),
      features: [
        t('architectureDesign.specialties.sustainable.features.leedCompliance'),
        t('architectureDesign.specialties.sustainable.features.passiveSolar'),
        t('architectureDesign.specialties.sustainable.features.naturalVentilation'),
        t('architectureDesign.specialties.sustainable.features.greenMaterials')
      ],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop'
    },
    {
      category: t('architectureDesign.specialties.prefabOptimized.category'),
      description: t('architectureDesign.specialties.prefabOptimized.description'),
      features: [
        t('architectureDesign.specialties.prefabOptimized.features.modularPlanning'),
        t('architectureDesign.specialties.prefabOptimized.features.standardConnections'),
        t('architectureDesign.specialties.prefabOptimized.features.transportConsiderations'),
        t('architectureDesign.specialties.prefabOptimized.features.assemblyEfficiency')
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=300&fit=crop'
    },
    {
      category: t('architectureDesign.specialties.smartHome.category'),
      description: t('architectureDesign.specialties.smartHome.description'),
      features: [
        t('architectureDesign.specialties.smartHome.features.iotIntegration'),
        t('architectureDesign.specialties.smartHome.features.homeAutomation'),
        t('architectureDesign.specialties.smartHome.features.securitySystems'),
        t('architectureDesign.specialties.smartHome.features.energyManagement')
      ],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop'
    }
  ];

  const portfolioProjects = [
    {
      name: t('architectureDesign.portfolio.ecoVilla.name'),
      type: t('architectureDesign.portfolio.ecoVilla.type'),
      area: t('architectureDesign.portfolio.ecoVilla.area'),
      style: t('architectureDesign.portfolio.ecoVilla.style'),
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      features: [
        t('architectureDesign.portfolio.ecoVilla.features.netZero'),
        t('architectureDesign.portfolio.ecoVilla.features.rainwater'),
        t('architectureDesign.portfolio.ecoVilla.features.greenRoof'),
        t('architectureDesign.portfolio.ecoVilla.features.solarIntegration')
      ]
    },
    {
      name: t('architectureDesign.portfolio.corporateOffice.name'),
      type: t('architectureDesign.portfolio.corporateOffice.type'),
      area: t('architectureDesign.portfolio.corporateOffice.area'),
      style: t('architectureDesign.portfolio.corporateOffice.style'),
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
      features: [
        t('architectureDesign.portfolio.corporateOffice.features.flexibleWorkspaces'),
        t('architectureDesign.portfolio.corporateOffice.features.naturalLighting'),
        t('architectureDesign.portfolio.corporateOffice.features.greenWalls'),
        t('architectureDesign.portfolio.corporateOffice.features.smartSystems')
      ]
    },
    {
      name: t('architectureDesign.portfolio.luxuryPenthouse.name'),
      type: t('architectureDesign.portfolio.luxuryPenthouse.type'),
      area: t('architectureDesign.portfolio.luxuryPenthouse.area'),
      style: t('architectureDesign.portfolio.luxuryPenthouse.style'),
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      features: [
        t('architectureDesign.portfolio.luxuryPenthouse.features.skyGarden'),
        t('architectureDesign.portfolio.luxuryPenthouse.features.homeTheater'),
        t('architectureDesign.portfolio.luxuryPenthouse.features.wineCellar'),
        t('architectureDesign.portfolio.luxuryPenthouse.features.infinityPool')
      ]
    }
  ];

  const corePhilosophies = [
    {
      icon: Eye,
      title: t('architectureDesign.philosophy.aestheticVision.title'),
      description: t('architectureDesign.philosophy.aestheticVision.description'),
      emoji: '🎨'
    },
    {
      icon: Lightbulb,
      title: t('architectureDesign.philosophy.functionality.title'),
      description: t('architectureDesign.philosophy.functionality.description'),
      emoji: '💡'
    },
    {
      icon: Leaf,
      title: t('architectureDesign.philosophy.sustainability.title'),
      description: t('architectureDesign.philosophy.sustainability.description'),
      emoji: '🌱'
    },
    {
      icon: Globe2,
      title: t('architectureDesign.philosophy.cultural.title'),
      description: t('architectureDesign.philosophy.cultural.description'),
      emoji: '🏛️'
    },
    {
      icon: Users,
      title: t('architectureDesign.philosophy.community.title'),
      description: t('architectureDesign.philosophy.community.description'),
      emoji: '👥'
    }
  ];

  const softwareTools = [
    { name: t('architectureDesign.tools.autoCAD.name'), category: t('architectureDesign.tools.autoCAD.category'), usage: t('architectureDesign.tools.autoCAD.usage') },
    { name: t('architectureDesign.tools.revit.name'), category: t('architectureDesign.tools.revit.category'), usage: t('architectureDesign.tools.revit.usage') },
    { name: t('architectureDesign.tools.sketchUp.name'), category: t('architectureDesign.tools.sketchUp.category'), usage: t('architectureDesign.tools.sketchUp.usage') },
    { name: t('architectureDesign.tools.max3ds.name'), category: t('architectureDesign.tools.max3ds.category'), usage: t('architectureDesign.tools.max3ds.usage') },
    { name: t('architectureDesign.tools.lumion.name'), category: t('architectureDesign.tools.lumion.category'), usage: t('architectureDesign.tools.lumion.usage') },
    { name: t('architectureDesign.tools.enscape.name'), category: t('architectureDesign.tools.enscape.category'), usage: t('architectureDesign.tools.enscape.usage') }
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
                {t('architectureDesign.badge')}
              </Badge>
              <h1 
                className="text-4xl md:text-6xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('architectureDesign.heroTitle')}
              </h1>
              <p 
                className="text-xl mb-6 leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('architectureDesign.heroDescription')}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    200+
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('architectureDesign.stats.projectsDesigned')}
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    15+
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('architectureDesign.stats.awardsWon')}
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    100%
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {t('architectureDesign.stats.clientSatisfaction')}
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
                  {t('architectureDesign.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=500&fit=crop"
                alt="Modern architectural design"
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
                      {t('architectureDesign.stats.startingFrom')}
                    </div>
                    <div 
                      className="text-lg font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      ₹25/sq ft
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Design Philosophy */}
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
              {t('architectureDesign.philosophy.title')}
            </h2>
            <p 
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('architectureDesign.philosophy.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {corePhilosophies.map((philosophy, index) => (
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
                      <philosophy.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl">{philosophy.emoji}</span>
                  </div>
                  <h3 
                    className="text-xl mb-3 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {philosophy.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ color: '#666' }}
                  >
                    {philosophy.description}
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
              {t('architectureDesign.philosophy.conclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* Design Services */}
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
              {t('architectureDesign.services.title')}
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('architectureDesign.services.subtitle')}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {designServices.map((service, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 border-0"
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
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <service.icon 
                    className="w-8 h-8 mr-4"
                    style={{ color: '#FB921D' }}
                  />
                  <div className="flex-1">
                    <CardTitle 
                      className="text-xl"
                      style={{ color: '#1a1a1a' }}
                    >
                      {service.name}
                    </CardTitle>
                    <p style={{ color: '#666' }}>{service.description}</p>
                  </div>
                  <div className="text-right">
                    <div 
                      className="text-lg font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      {service.price}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: '#C55A00' }}
                    >
                      {service.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 
                      className="text-sm mb-2 font-medium"
                      style={{ color: '#C55A00' }}
                    >
                      {t('architectureDesign.services.deliverables')}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.deliverables.map((item, idx) => (
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
                    {t('architectureDesign.services.learnMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process & Specialties */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="process" className="w-full">
            <TabsList 
              className="grid w-full grid-cols-3 border-0"
              style={{ backgroundColor: '#FFF5E6' }}
            >
              <TabsTrigger 
                value="process"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('architectureDesign.tabs.process')}
              </TabsTrigger>
              <TabsTrigger 
                value="specialties"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('architectureDesign.tabs.specialties')}
              </TabsTrigger>
              <TabsTrigger 
                value="portfolio"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('architectureDesign.tabs.portfolio')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="process" className="mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 
                    className="text-2xl mb-4 font-bold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {t('architectureDesign.process.title')}
                  </h3>
                  <p style={{ color: '#666' }}>
                    {t('architectureDesign.process.subtitle')}
                  </p>
                </div>
                <div className="space-y-8">
                  {designProcess.map((phase, index) => (
                    <Card 
                      key={index} 
                      className="p-6 border-0"
                      style={{
                        backgroundColor: '#FFF5E6',
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
                          <div className="flex justify-between items-start mb-2">
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
                              {phase.duration}
                            </Badge>
                          </div>
                          <p 
                            className="mb-4"
                            style={{ color: '#666' }}
                          >
                            {phase.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {phase.activities.map((activity, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle 
                                  className="w-4 h-4 flex-shrink-0"
                                  style={{ color: '#FB921D' }}
                                />
                                <span 
                                  className="text-sm"
                                  style={{ color: '#666' }}
                                >
                                  {activity}
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

            <TabsContent value="specialties" className="mt-8">
              <div className="space-y-8">
                {designSpecialties.map((specialty, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden border-0 hover:shadow-xl transition-all duration-300"
                    style={{
                      backgroundColor: '#FFF5E6',
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <ImageWithFallback
                          src={specialty.image}
                          alt={specialty.category}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 
                          className="text-2xl mb-3 font-bold"
                          style={{ color: '#1a1a1a' }}
                        >
                          {specialty.category}
                        </h3>
                        <p 
                          className="mb-4"
                          style={{ color: '#666' }}
                        >
                          {specialty.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {specialty.features.map((feature, idx) => (
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

            <TabsContent value="portfolio" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {portfolioProjects.map((project, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
                    style={{
                      backgroundColor: '#FFF5E6',
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
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 
                        className="text-xl mb-2 font-semibold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {project.name}
                      </h3>
                      <div 
                        className="flex justify-between text-sm mb-3"
                        style={{ color: '#C55A00' }}
                      >
                        <span>{project.type}</span>
                        <span>{project.area}</span>
                      </div>
                      <p 
                        className="mb-4"
                        style={{ color: '#666' }}
                      >
                        {project.style}
                      </p>
                      <div className="space-y-2">
                        {project.features.map((feature, idx) => (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Tools & Technology */}
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
              {t('architectureDesign.tools.title')}
            </h2>
            <p 
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('architectureDesign.tools.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareTools.map((tool, index) => (
              <Card 
                key={index} 
                className="p-4 text-center hover:shadow-lg transition-all duration-300 border-0"
                style={{
                  backgroundColor: 'white',
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
                <CardContent className="p-0">
                  <h3 
                    className="text-lg mb-1 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {tool.name}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className="text-xs mb-2"
                    style={{
                      borderColor: '#FB921D',
                      color: '#FB921D'
                    }}
                  >
                    {tool.category}
                  </Badge>
                  <p 
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {tool.usage}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Credentials */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl md:text-4xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('architectureDesign.team.title')}
              </h2>
              <p 
                className="text-lg mb-8"
                style={{ color: '#666' }}
              >
                {t('architectureDesign.team.description')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, number: '15+', label: t('architectureDesign.team.stats.professionals') },
                  { icon: Award, number: '20+', label: t('architectureDesign.team.stats.experience') },
                  { icon: Building, number: '200+', label: t('architectureDesign.team.stats.projectsCompleted') },
                  { icon: Star, number: '15+', label: t('architectureDesign.team.stats.designAwards') }
                ].map((stat, index) => (
                  <Card 
                    key={index}
                    className="p-4 text-center border-0 hover:shadow-lg transition-all duration-300"
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
                    <stat.icon 
                      className="w-8 h-8 mx-auto mb-2"
                      style={{ color: '#FB921D' }}
                    />
                    <div 
                      className="text-2xl font-bold"
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
                ))}
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Design team at work"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
                style={{ border: '3px solid #FB921D' }}
              />
            </div>
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
            {t('architectureDesign.finalCta.title')}
          </h2>
          <p 
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('architectureDesign.finalCta.description')}
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
              {t('architectureDesign.finalCta.startDesign')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-2 font-semibold transition-all duration-300"
              style={{
                borderColor: 'white',
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
              onClick={() => openPopup()}
            >
              {t('architectureDesign.finalCta.scheduleConsultation')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
