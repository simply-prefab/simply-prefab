'use client'

import { ArrowRight, Building2, CheckCircle, Clock, IndianRupee, Download, Droplets, Home, Layers, Palette, RectangleHorizontal, Zap } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  // Service data with translations
  const services = [
    {
      id: 'turnkey-prefab-construction',
      title: t('servicesPage.services.turnkeyPrefabConstruction.title'),
      description: t('servicesPage.services.turnkeyPrefabConstruction.description'),
      icon: Building2,
      features: [
        t('servicesPage.services.turnkeyPrefabConstruction.features.0'),
        t('servicesPage.services.turnkeyPrefabConstruction.features.1'),
        t('servicesPage.services.turnkeyPrefabConstruction.features.2'),
        t('servicesPage.services.turnkeyPrefabConstruction.features.3'),
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      price: t('servicesPage.services.turnkeyPrefabConstruction.price'),
      timeline: t('servicesPage.services.turnkeyPrefabConstruction.timeline'),
      link: '/services/turnkey-prefab-construction',
      gradient: 'linear-gradient(135deg, #FB921D, #E67E0F)'
    },
    {
      id: 'prefab-penthouse',
      title: t('servicesPage.services.prefabPenthouse.title'),
      description: t('servicesPage.services.prefabPenthouse.description'),
      icon: Home,
      features: [
        t('servicesPage.services.prefabPenthouse.features.0'),
        t('servicesPage.services.prefabPenthouse.features.1'),
        t('servicesPage.services.prefabPenthouse.features.2'),
        t('servicesPage.services.prefabPenthouse.features.3'),
      ],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
      price: t('servicesPage.services.prefabPenthouse.price'),
      timeline: t('servicesPage.services.prefabPenthouse.timeline'),
      link: '/services/prefab-penthouse',
      gradient: 'linear-gradient(135deg, #C55A00, #E67E0F)'
    },
    {
      id: 'wall-panels',
      title: t('servicesPage.services.wallPanels.title'),
      description: t('servicesPage.services.wallPanels.description'),
      icon: Layers,
      features: [
        t('servicesPage.services.wallPanels.features.0'),
        t('servicesPage.services.wallPanels.features.1'),
        t('servicesPage.services.wallPanels.features.2'),
        t('servicesPage.services.wallPanels.features.3'),
      ],
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop',
      price: t('servicesPage.services.wallPanels.price'),
      timeline: t('servicesPage.services.wallPanels.timeline'),
      link: '/services/wall-panels',
      gradient: 'linear-gradient(135deg, #E67E0F, #FB921D)'
    },
    {
      id: 'architecture-design',
      title: t('servicesPage.services.architectureDesign.title'),
      description: t('servicesPage.services.architectureDesign.description'),
      icon: Palette,
      features: [
        t('servicesPage.services.architectureDesign.features.0'),
        t('servicesPage.services.architectureDesign.features.1'),
        t('servicesPage.services.architectureDesign.features.2'),
        t('servicesPage.services.architectureDesign.features.3'),
      ],
      image: 'https://images.unsplash.com/photo-1600566753051-6394ba171931?w=600&h=400&fit=crop',
      price: t('servicesPage.services.architectureDesign.price'),
      timeline: t('servicesPage.services.architectureDesign.timeline'),
      link: '/services/architecture-design',
      gradient: 'linear-gradient(135deg, #C55A00, #8B6F47)'
    },
    {
      id: 'upvc-windows',
      title: t('servicesPage.services.upvcWindows.title'),
      description: t('servicesPage.services.upvcWindows.description'),
      icon: RectangleHorizontal,
      features: [
        t('servicesPage.services.upvcWindows.features.0'),
        t('servicesPage.services.upvcWindows.features.1'),
        t('servicesPage.services.upvcWindows.features.2'),
        t('servicesPage.services.upvcWindows.features.3'),
      ],
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
      price: t('servicesPage.services.upvcWindows.price'),
      timeline: t('servicesPage.services.upvcWindows.timeline'),
      link: '/services/upvc-windows',
      gradient: 'linear-gradient(135deg, #FB921D, #C55A00)'
    },
    {
      id: 'mep-solutions',
      title: t('servicesPage.services.mepSolutions.title'),
      description: t('servicesPage.services.mepSolutions.description'),
      icon: Zap,
      features: [
        t('servicesPage.services.mepSolutions.features.0'),
        t('servicesPage.services.mepSolutions.features.1'),
        t('servicesPage.services.mepSolutions.features.2'),
        t('servicesPage.services.mepSolutions.features.3'),
      ],
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
      price: t('servicesPage.services.mepSolutions.price'),
      timeline: t('servicesPage.services.mepSolutions.timeline'),
      link: '/services/mep-solutions',
      gradient: 'linear-gradient(135deg, #E67E0F, #C55A00)'
    },
    {
      id: 'water-proofing',
      title: t('servicesPage.services.waterProofing.title'),
      description: t('servicesPage.services.waterProofing.description'),
      icon: Droplets,
      features: [
        t('servicesPage.services.waterProofing.features.0'),
        t('servicesPage.services.waterProofing.features.1'),
        t('servicesPage.services.waterProofing.features.2'),
        t('servicesPage.services.waterProofing.features.3'),
      ],
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop',
      price: t('servicesPage.services.waterProofing.price'),
      timeline: t('servicesPage.services.waterProofing.timeline'),
      link: '/services/water-proofing',
      gradient: 'linear-gradient(135deg, #C55A00, #8B6F47)'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: t('servicesPage.benefits.fasterConstruction.title'),
      description: t('servicesPage.benefits.fasterConstruction.description')
    },
    {
      icon: IndianRupee,
      title: t('servicesPage.benefits.costEffective.title'),
      description: t('servicesPage.benefits.costEffective.description')
    },
    {
      icon: CheckCircle,
      title: t('servicesPage.benefits.qualityAssured.title'),
      description: t('servicesPage.benefits.qualityAssured.description')
    }
  ];

  const process = [
    { 
      step: 1, 
      title: t('servicesPage.process.consultation.title'), 
      description: t('servicesPage.process.consultation.description') 
    },
    { 
      step: 2, 
      title: t('servicesPage.process.design.title'), 
      description: t('servicesPage.process.design.description') 
    },
    { 
      step: 3, 
      title: t('servicesPage.process.manufacturing.title'), 
      description: t('servicesPage.process.manufacturing.description') 
    },
    { 
      step: 4, 
      title: t('servicesPage.process.installation.title'), 
      description: t('servicesPage.process.installation.description') 
    },
    { 
      step: 5, 
      title: t('servicesPage.process.handover.title'), 
      description: t('servicesPage.process.handover.description') 
    }
  ];

  const whyChoosePoints = [
    t('servicesPage.whyChoose.points.0'),
    t('servicesPage.whyChoose.points.1'),
    t('servicesPage.whyChoose.points.2'),
    t('servicesPage.whyChoose.points.3'),
    t('servicesPage.whyChoose.points.4'),
    t('servicesPage.whyChoose.points.5'),
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFF5E6, #FFE0C0, white)' }}>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-full h-2" style={{ background: 'linear-gradient(to right, #FB921D, #C55A00)' }} />

        <div className="absolute top-20 right-0 w-96 h-96 rounded-full translate-x-48 -translate-y-48" style={{ background: 'linear-gradient(135deg, rgba(251, 146, 29, 0.2) 0%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full -translate-x-48 translate-y-48" style={{ background: 'linear-gradient(135deg, rgba(197, 90, 0, 0.15) 0%, transparent 100%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-lg px-6 py-2 border-0" style={{ backgroundColor: '#FB921D', color: 'white' }}>
              {t('servicesPage.badge')}
            </Badge>
            <h1 className="text-5xl md:text-7xl mb-6 font-bold" style={{ color: '#1a1a1a' }}>
              {t('servicesPage.heading')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
              {t('servicesPage.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                style={{ backgroundColor: '#FFF5E6', borderColor: '#FFD0A0' }}
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FB921D, #E67E0F)' }}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3 font-bold" style={{ color: '#1a1a1a' }}>{benefit.title}</h3>
                  <p style={{ color: '#666' }}>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 font-bold" style={{ color: '#1a1a1a' }}>
              {t('servicesPage.sectionTitle')}
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#666' }}>
              {t('servicesPage.sectionDescription')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: '#FFF5E6', borderColor: '#FFD0A0' }}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="text-base px-4 py-2 border-0" style={{ background: service.gradient, color: 'white' }}>
                      <service.icon className="w-4 h-4 mr-2" />
                      {service.title}
                    </Badge>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: service.gradient }} />
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl" style={{ color: '#1a1a1a' }}>{service.title}</CardTitle>
                  <p style={{ color: '#666' }}>{service.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FFE0C0' }}>
                    <div>
                      <p className="text-sm mb-1" style={{ color: '#C55A00' }}>
                        {t('servicesPage.startingPrice')}
                      </p>
                      <p className="text-xl font-bold" style={{ color: '#FB921D' }}>{service.price}</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1" style={{ color: '#C55A00' }}>
                        {t('servicesPage.timelineLabel')}
                      </p>
                      <p className="text-xl font-bold" style={{ color: '#1a1a1a' }}>{service.timeline}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3" style={{ color: '#C55A00' }}>
                      {t('servicesPage.keyFeatures')}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#FB921D' }} />
                          <span className="text-sm" style={{ color: '#666' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={service.link}>
                    <Button className="w-full h-12 text-base font-semibold border-0 transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#FB921D', color: 'white' }}>
                      {t('common.learnMore')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFE0C0 0%, #FFF5E6 100%)' }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #FB921D, #C55A00)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 font-bold" style={{ color: '#1a1a1a' }}>
              {t('servicesPage.processTitle')}
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#666' }}>
              {t('servicesPage.processDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 relative">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #FB921D, #E67E0F)', color: 'white' }}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1a1a' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: '#666' }}>{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-1 z-0" style={{ background: 'linear-gradient(to right, #FB921D, #E67E0F)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-8 font-bold" style={{ color: '#1a1a1a' }}>
                {t('servicesPage.whyChooseHeading')}
              </h2>
              <div className="space-y-6">
                {whyChoosePoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#FFF5E6' }}>
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FB921D' }} />
                    <p className="text-lg" style={{ color: '#C55A00' }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-xl" style={{ background: 'linear-gradient(135deg, #FB921D, #E67E0F)', opacity: 0.2 }} />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop"
                alt="Modern prefab construction facility"
                className="rounded-xl shadow-2xl w-full h-[500px] object-cover relative z-10 border-4"
                style={{ borderColor: '#FB921D' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full translate-x-48 -translate-y-48" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full -translate-x-48 translate-y-48" style={{ background: 'rgba(255, 255, 255, 0.05)' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl mb-6 font-bold text-white">
            {t('servicesPage.cta.heading')}
          </h2>
          <p className="text-xl mb-10 text-white/90">
            {t('servicesPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button size="lg" className="px-10 py-6 text-lg font-semibold border-0 hover:scale-105 transition-transform" style={{ backgroundColor: 'white', color: '#1a1a1a' }}>
                {t('common.getQuote')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-10 py-6 text-lg font-semibold border-2 hover:bg-white hover:scale-105 transition-all" style={{ borderColor: 'white', color: 'white', backgroundColor: 'transparent' }}>
              <Download className="mr-2 w-5 h-5" />
              {t('servicesPage.cta.downloadBrochure')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
