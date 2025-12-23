'use client'

import { ArrowRight, CheckCircle, Clock, IndianRupee, Droplets, Home, Star, Sun, Users, Wifi, Building2, Palette } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrefabPentHousePage() {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const coreFeatures = [
    {
      icon: Building2,
      title: t('prefabPentHouse.coreFeatures.architectural.title'),
      description: t('prefabPentHouse.coreFeatures.architectural.description'),
      emoji: '🏛️'
    },
    {
      icon: Clock,
      title: t('prefabPentHouse.coreFeatures.efficiency.title'),
      description: t('prefabPentHouse.coreFeatures.efficiency.description'),
      emoji: '⚡'
    },
    {
      icon: Droplets,
      title: t('prefabPentHouse.coreFeatures.sustainability.title'),
      description: t('prefabPentHouse.coreFeatures.sustainability.description'),
      emoji: '🌱'
    },
    {
      icon: Palette,
      title: t('prefabPentHouse.coreFeatures.customization.title'),
      description: t('prefabPentHouse.coreFeatures.customization.description'),
      emoji: '🎨'
    },
    {
      icon: Star,
      title: t('prefabPentHouse.coreFeatures.luxuryAmenities.title'),
      description: t('prefabPentHouse.coreFeatures.luxuryAmenities.description'),
      emoji: '✨'
    }
  ];

  const penthouseFeatures = [
    {
      icon: Home,
      title: t('prefabPentHouse.features.luxuryLiving.title'),
      description: t('prefabPentHouse.features.luxuryLiving.description')
    },
    {
      icon: Sun,
      title: t('prefabPentHouse.features.rooftopGardens.title'),
      description: t('prefabPentHouse.features.rooftopGardens.description')
    },
    {
      icon: Wifi,
      title: t('prefabPentHouse.features.smartHome.title'),
      description: t('prefabPentHouse.features.smartHome.description')
    },
    {
      icon: Droplets,
      title: t('prefabPentHouse.features.sustainable.title'),
      description: t('prefabPentHouse.features.sustainable.description')
    }
  ];

  const specifications = [
    { feature: t('prefabPentHouse.specifications.areaRange'), value: '2,000 - 5,000 sq ft' },
    { feature: t('prefabPentHouse.specifications.ceilingHeight'), value: '11-14 feet' },
    { feature: t('prefabPentHouse.specifications.bedrooms'), value: '3-5 BHK configurations' },
    { feature: t('prefabPentHouse.specifications.bathrooms'), value: '3-6 premium bathrooms' },
    { feature: t('prefabPentHouse.specifications.balconies'), value: 'Multiple with city/nature views' },
    { feature: t('prefabPentHouse.specifications.parking'), value: '2-4 covered parking spaces' },
    { feature: t('prefabPentHouse.specifications.constructionTime'), value: '6-8 months' },
    { feature: t('prefabPentHouse.specifications.warranty'), value: '10 years structural' }
  ];

  const luxuryFeatures = [
    t('prefabPentHouse.luxuryFeatures.privateElevator'),
    t('prefabPentHouse.luxuryFeatures.floorToCeiling'),
    t('prefabPentHouse.luxuryFeatures.premiumFittings'),
    t('prefabPentHouse.luxuryFeatures.modularKitchen'),
    t('prefabPentHouse.luxuryFeatures.masterSuite'),
    t('prefabPentHouse.luxuryFeatures.jacuzzi'),
    t('prefabPentHouse.luxuryFeatures.homeTheater'),
    t('prefabPentHouse.luxuryFeatures.wineCellar'),
    t('prefabPentHouse.luxuryFeatures.infinityPool'),
    t('prefabPentHouse.luxuryFeatures.landscapedTerrace'),
    t('prefabPentHouse.luxuryFeatures.homeAutomation'),
    t('prefabPentHouse.luxuryFeatures.securitySystem')
  ];

  const sustainabilityFeatures = [
    {
      title: t('prefabPentHouse.sustainability.solar.title'),
      description: t('prefabPentHouse.sustainability.solar.description'),
      benefit: t('prefabPentHouse.sustainability.solar.benefit')
    },
    {
      title: t('prefabPentHouse.sustainability.rainwater.title'),
      description: t('prefabPentHouse.sustainability.rainwater.description'),
      benefit: t('prefabPentHouse.sustainability.rainwater.benefit')
    },
    {
      title: t('prefabPentHouse.sustainability.greenMaterials.title'),
      description: t('prefabPentHouse.sustainability.greenMaterials.description'),
      benefit: t('prefabPentHouse.sustainability.greenMaterials.benefit')
    },
    {
      title: t('prefabPentHouse.sustainability.energyEfficient.title'),
      description: t('prefabPentHouse.sustainability.energyEfficient.description'),
      benefit: t('prefabPentHouse.sustainability.energyEfficient.benefit')
    }
  ];

  const gallery = [
    {
      src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      title: t('prefabPentHouse.gallery.exterior.title'),
      description: t('prefabPentHouse.gallery.exterior.description')
    },
    {
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      title: t('prefabPentHouse.gallery.livingArea.title'),
      description: t('prefabPentHouse.gallery.livingArea.description')
    },
    {
      src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
      title: t('prefabPentHouse.gallery.rooftop.title'),
      description: t('prefabPentHouse.gallery.rooftop.description')
    },
    {
      src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
      title: t('prefabPentHouse.gallery.masterBedroom.title'),
      description: t('prefabPentHouse.gallery.masterBedroom.description')
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
                {t('prefabPentHouse.badge')}
              </Badge>
              <h1
                className="text-4xl md:text-6xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('prefabPentHouse.heroTitle')}
              </h1>
              <p
                className="text-xl mb-8 leading-relaxed"
                style={{ color: '#666' }}
              >
                {t('prefabPentHouse.heroDescription')}
              </p>
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
                  onClick={openPopup}
                >
                  {t('prefabPentHouse.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=500&fit=crop"
                alt="Luxury prefab penthouse exterior"
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
                      {t('prefabPentHouse.startingFrom')}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      {t('prefabPentHouse.startingPrice')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
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
              {t('prefabPentHouse.coreFeaturesTitle')}
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('prefabPentHouse.coreFeaturesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {coreFeatures.map((feature, index) => (
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
              {t('prefabPentHouse.coreFeaturesConclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
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
              {t('prefabPentHouse.premiumFeaturesTitle')}
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('prefabPentHouse.premiumFeaturesSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {penthouseFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0"
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
                <CardContent className="p-0">
                  <feature.icon
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: '#FB921D' }}
                  />
                  <h3
                    className="text-xl mb-2 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: '#666' }}>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery & Specifications */}
      <section
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList
              className="grid w-full grid-cols-3 border-0"
              style={{ backgroundColor: '#FFF5E6' }}
            >
              <TabsTrigger
                value="gallery"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('prefabPentHouse.tabs.gallery')}
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('prefabPentHouse.tabs.specifications')}
              </TabsTrigger>
              <TabsTrigger
                value="sustainability"
                className="transition-all duration-300 data-[state=active]:bg-white"
                style={{ color: '#C55A00' }}
              >
                {t('prefabPentHouse.tabs.sustainability')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {gallery.map((item, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
                    style={{
                      backgroundColor: '#FFF5E6',
                      border: '1px solid #FFD0A0'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.borderColor = '#FB921D';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = '#FFD0A0';
                    }}
                  >
                    <ImageWithFallback
                      src={item.src}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3
                        className="text-lg mb-1 font-semibold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: '#666' }}
                      >
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card
                  style={{
                    backgroundColor: '#FFF5E6',
                    border: '1px solid #FFD0A0'
                  }}
                >
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('prefabPentHouse.technicalSpecsTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b"
                          style={{ borderColor: '#FFD0A0' }}
                        >
                          <span style={{ color: '#666' }}>{spec.feature}</span>
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

                <Card
                  style={{
                    backgroundColor: '#FFF5E6',
                    border: '1px solid #FFD0A0'
                  }}
                >
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('prefabPentHouse.luxuryAmenitiesTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {luxuryFeatures.map((feature, index) => (
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

            <TabsContent value="sustainability" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {sustainabilityFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="p-6 border-0"
                    style={{
                      backgroundColor: '#FFF5E6',
                      border: '1px solid #FFD0A0'
                    }}
                  >
                    <h3
                      className="text-xl mb-3 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="mb-4"
                      style={{ color: '#666' }}
                    >
                      {feature.description}
                    </p>
                    <div
                      className="rounded-lg p-3"
                      style={{ backgroundColor: 'white' }}
                    >
                      <div
                        className="text-sm font-medium"
                        style={{ color: '#C55A00' }}
                      >
                        {t('prefabPentHouse.sustainability.benefitLabel')} {feature.benefit}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16"
        style={{ backgroundColor: '#FFE0C0' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: IndianRupee, number: '30%', label: t('prefabPentHouse.stats.costSavings') },
              { icon: Clock, number: '60%', label: t('prefabPentHouse.stats.fasterConstruction') },
              { icon: Home, number: '50+', label: t('prefabPentHouse.stats.penthousesBuilt') },
              { icon: Users, number: '100%', label: t('prefabPentHouse.stats.clientSatisfaction') }
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 border-0 hover:shadow-lg transition-all duration-300"
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
                <CardContent className="p-0">
                  <stat.icon
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: '#FB921D' }}
                  />
                  <div
                    className="text-2xl mb-1 font-bold"
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
                </CardContent>
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
            {t('prefabPentHouse.finalCta.title')}
          </h2>
          <p
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('prefabPentHouse.finalCta.description')}
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
              onClick={openPopup}
            >
              {t('prefabPentHouse.finalCta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
