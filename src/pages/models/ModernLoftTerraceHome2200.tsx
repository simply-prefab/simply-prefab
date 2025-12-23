'use client'

import { ArrowLeft, Bath, Bed, ChevronLeft, ChevronRight, Download, Eye, Heart, Home, Rotate3D, Ruler, Shield, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import SimpleIFCViewer from '@/components/SimpleIFCViewer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FamilyHaven2200Page() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();

  const modelData = {
    name: t('models.familyHaven.name'),
    tagline: t('models.familyHaven.tagline'),
    area: t('models.familyHaven.area'),
    bedrooms: 4,
    bathrooms: 3.5,
    price: t('models.familyHaven.price'),
    pricePerSqFt: t('models.familyHaven.pricePerSqFt'),
    timeline: t('models.familyHaven.timeline'),
    images: [
      "/images/ModernLoftTerrace/img1.jpg",
      "/images/ModernLoftTerrace/img2.jpg",
      "/images/ModernLoftTerrace/img3.jpg",
    ],
    features: [
      { icon: Users, title: t('models.familyHaven.features.familyFocused.title'), description: t('models.familyHaven.features.familyFocused.description') },
      { icon: Heart, title: t('models.familyHaven.features.safeSecure.title'), description: t('models.familyHaven.features.safeSecure.description') },
      { icon: Home, title: t('models.familyHaven.features.openLiving.title'), description: t('models.familyHaven.features.openLiving.description') },
      { icon: Zap, title: t('models.familyHaven.features.energyEfficient.title'), description: t('models.familyHaven.features.energyEfficient.description') },
      { icon: Shield, title: t('models.familyHaven.features.durableBuild.title'), description: t('models.familyHaven.features.durableBuild.description') },
    ],
    specifications: {
      [t('models.familyHaven.specifications.totalArea')]: t('models.familyHaven.area'),
      [t('models.familyHaven.specifications.lotSize')]: t('models.familyHaven.specifications.lotSizeValue'),
      [t('models.familyHaven.specifications.bedrooms')]: t('models.familyHaven.specifications.bedroomsValue'),
      [t('models.familyHaven.specifications.bathrooms')]: "3.5",
      [t('models.familyHaven.specifications.garage')]: t('models.familyHaven.specifications.garageValue'),
      [t('models.familyHaven.specifications.foundation')]: t('models.familyHaven.specifications.foundationValue'),
      [t('models.familyHaven.specifications.exterior')]: t('models.familyHaven.specifications.exteriorValue'),
      [t('models.familyHaven.specifications.roofing')]: t('models.familyHaven.specifications.roofingValue'),
      [t('models.familyHaven.specifications.energyRating')]: t('models.familyHaven.specifications.energyRatingValue')
    },
    floorPlan: [
      "/3DModels/duplex/Level-1.PNG",
      "/3DModels/duplex/Level-2.PNG",
      "/3DModels/duplex/Level-3.PNG"
    ],
    floorPlanLabels: [
      t('models.familyHaven.floorPlanLabels.groundFloor'),
      t('models.familyHaven.floorPlanLabels.firstFloor'),
      t('models.familyHaven.floorPlanLabels.terraceLevel')
    ],
    model3D: "/3DModels/duplex/duplex_house.obj"
  };

  const handlePreviousFloorPlan = () => {
    setActiveFloorPlan((prev) => (prev === 0 ? modelData.floorPlan.length - 1 : prev - 1));
  };

  const handleNextFloorPlan = () => {
    setActiveFloorPlan((prev) => (prev === modelData.floorPlan.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'white' }}
    >
      {/* Gold accent line at top */}
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FDB515, #654321)'
        }}
      />

      {/* Header */}
      <section
        className="pt-20 pb-8"
        style={{
          background: 'linear-gradient(to right, rgba(245, 222, 179, 0.3), rgba(253, 248, 232, 0.3))'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/models"
            className="inline-flex items-center mb-6 transition-all duration-300"
            style={{
              color: '#FDB515',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#DAA520';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#FDB515';
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('models.familyHaven.backToModels')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                className="mb-4 border-0"
                style={{
                  backgroundColor: '#FDB515',
                  color: 'white'
                }}
              >
                {t('models.familyHaven.badge')}
              </Badge>
              <h1
                className="text-4xl md:text-5xl mb-4 font-bold"
                style={{ color: '#3C2414' }}
              >
                {modelData.name}
              </h1>
              <p
                className="text-xl mb-6"
                style={{ color: '#A0522D' }}
              >
                {modelData.tagline}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div
                  className="text-center p-4 rounded-lg shadow-sm border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E5D5B7'
                  }}
                >
                  <Ruler
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: '#FDB515' }}
                  />
                  <div
                    className="text-lg"
                    style={{ color: '#3C2414' }}
                  >
                    {modelData.area}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#A0522D' }}
                  >
                    {t('models.familyHaven.stats.totalArea')}
                  </div>
                </div>
                <div
                  className="text-center p-4 rounded-lg shadow-sm border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E5D5B7'
                  }}
                >
                  <Bed
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: '#FDB515' }}
                  />
                  <div
                    className="text-lg"
                    style={{ color: '#3C2414' }}
                  >
                    {modelData.bedrooms}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#A0522D' }}
                  >
                    {t('models.familyHaven.stats.bedrooms')}
                  </div>
                </div>
                <div
                  className="text-center p-4 rounded-lg shadow-sm border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E5D5B7'
                  }}
                >
                  <Bath
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: '#FDB515' }}
                  />
                  <div
                    className="text-lg"
                    style={{ color: '#3C2414' }}
                  >
                    {modelData.bathrooms}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#A0522D' }}
                  >
                    {t('models.familyHaven.stats.bathrooms')}
                  </div>
                </div>
                <div
                  className="text-center p-4 rounded-lg shadow-sm border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E5D5B7'
                  }}
                >
                  <Heart
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: '#FDB515' }}
                  />
                  <div
                    className="text-lg font-bold"
                    style={{ color: '#FDB515' }}
                  >
                    {modelData.price}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: '#A0522D' }}
                  >
                    {t('models.familyHaven.stats.startingPrice')}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div
                className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
                style={{ border: '3px solid #FDB515' }}
              >
                <ImageWithFallback
                  src={modelData.images[activeImage]}
                  alt={modelData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    {modelData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className="w-3 h-3 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: index === activeImage ? '#FDB515' : 'rgba(255, 255, 255, 0.5)'
                        }}
                        onMouseEnter={(e) => {
                          if (index !== activeImage) {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(253, 181, 21, 0.7)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (index !== activeImage) {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList
              className="grid w-full grid-cols-4 mb-8 border-0"
              style={{ backgroundColor: '#FDF8E8' }}
            >
              <TabsTrigger
                value="overview"
                className="transition-all duration-300"
                style={{ color: '#8B4513' }}
              >
                {t('models.familyHaven.tabs.overview')}
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="transition-all duration-300"
                style={{ color: '#8B4513' }}
              >
                {t('models.familyHaven.tabs.features')}
              </TabsTrigger>
              <TabsTrigger
                value="floorplan"
                className="transition-all duration-300"
                style={{ color: '#8B4513' }}
              >
                {t('models.familyHaven.tabs.floorPlan')}
              </TabsTrigger>
              <TabsTrigger
                value="3d-model"
                className="transition-all duration-300"
                style={{ color: '#8B4513' }}
              >
                {t('models.familyHaven.tabs.model3D')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card
                    style={{
                      backgroundColor: '#FDF8E8',
                      border: '1px solid #E5D5B7'
                    }}
                  >
                    <CardHeader>
                      <CardTitle style={{ color: '#3C2414' }}>
                        {t('models.familyHaven.overview.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="mb-4"
                        style={{ color: '#A0522D' }}
                      >
                        {t('models.familyHaven.overview.paragraph1')}
                      </p>
                      <p
                        className="mb-4"
                        style={{ color: '#A0522D' }}
                      >
                        {t('models.familyHaven.overview.paragraph2')}
                      </p>
                      <p style={{ color: '#A0522D' }}>
                        {t('models.familyHaven.overview.paragraph3')}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card
                    style={{
                      backgroundColor: '#FDF8E8',
                      border: '1px solid #E5D5B7'
                    }}
                  >
                    <CardHeader>
                      <CardTitle style={{ color: '#3C2414' }}>{t('models.familyHaven.specificationsTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(modelData.specifications).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b"
                            style={{ borderColor: '#E5D5B7' }}
                          >
                            <span style={{ color: '#A0522D' }}>
                              {key}:
                            </span>
                            <span
                              className="font-medium"
                              style={{ color: '#3C2414' }}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modelData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className="h-full hover:shadow-lg transition-all duration-300 border-0"
                      style={{
                        backgroundColor: '#FDF8E8',
                        border: '1px solid #E5D5B7'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#FDB515';
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E5D5B7';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <CardContent className="p-6">
                        <feature.icon
                          className="w-8 h-8 mb-4"
                          style={{ color: '#FDB515' }}
                        />
                        <h3
                          className="text-lg mb-2 font-semibold"
                          style={{ color: '#3C2414' }}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: '#A0522D' }}
                        >
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="floorplan">
              <Card
                style={{
                  backgroundColor: '#FDF8E8',
                  border: '1px solid #E5D5B7'
                }}
              >
                <CardHeader>
                  <CardTitle
                    className="flex items-center"
                    style={{ color: '#3C2414' }}
                  >
                    <Eye
                      className="mr-2 w-5 h-5"
                      style={{ color: '#FDB515' }}
                    />
                    {t('models.familyHaven.floorPlan.title')}
                  </CardTitle>
                  <p style={{ color: '#A0522D' }}>
                    {t('models.familyHaven.floorPlan.description')}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div
                      className="aspect-video rounded-lg overflow-hidden relative"
                      style={{
                        backgroundColor: '#F5DEB3',
                        border: '2px solid #FDB515'
                      }}
                    >
                      <ImageWithFallback
                        src={modelData.floorPlan[activeFloorPlan]}
                        alt={`${modelData.floorPlanLabels[activeFloorPlan]} ${t('models.familyHaven.floorPlan.planSuffix')}`}
                        className="w-full h-full object-contain"
                      />
                      
                      <button
                        onClick={handlePreviousFloorPlan}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(253, 181, 21, 0.9)',
                          color: 'white'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = '#FDB515';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(253, 181, 21, 0.9)';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={handleNextFloorPlan}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(253, 181, 21, 0.9)',
                          color: 'white'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = '#FDB515';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(253, 181, 21, 0.9)';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1)';
                        }}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      <div
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full font-semibold"
                        style={{
                          backgroundColor: 'rgba(253, 181, 21, 0.95)',
                          color: 'white'
                        }}
                      >
                        {modelData.floorPlanLabels[activeFloorPlan]}
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                      {modelData.floorPlan.map((plan, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveFloorPlan(index)}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300"
                          style={{
                            backgroundColor: index === activeFloorPlan ? '#FDB515' : '#FDF8E8',
                            border: `2px solid ${index === activeFloorPlan ? '#FDB515' : '#E5D5B7'}`,
                            color: index === activeFloorPlan ? 'white' : '#A0522D'
                          }}
                          onMouseEnter={(e) => {
                            if (index !== activeFloorPlan) {
                              e.currentTarget.style.borderColor = '#FDB515';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (index !== activeFloorPlan) {
                              e.currentTarget.style.borderColor = '#E5D5B7';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          <div className="w-20 h-16 rounded overflow-hidden border"
                            style={{ borderColor: index === activeFloorPlan ? 'white' : '#E5D5B7' }}
                          >
                            <ImageWithFallback
                              src={plan}
                              alt={modelData.floorPlanLabels[index]}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium">
                            {modelData.floorPlanLabels[index]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      className="border-2 font-semibold transition-all duration-300"
                      style={{
                        borderColor: '#8B4513',
                        color: '#8B4513'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = '#8B4513';
                        (e.currentTarget as HTMLElement).style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = '#8B4513';
                      }}
                    >
                      <Download className="mr-2 w-4 h-4" />
                      {t('models.familyHaven.floorPlan.downloadButton')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="3d-model">
              <Card
                style={{
                  backgroundColor: '#FDF8E8',
                  border: '1px solid #E5D5B7'
                }}
              >
                <CardHeader>
                  <CardTitle
                    className="flex items-center"
                    style={{ color: '#3C2414' }}
                  >
                    <Rotate3D
                      className="mr-2 w-5 h-5"
                      style={{ color: '#FDB515' }}
                    />
                    {t('models.familyHaven.model3D.title')}
                  </CardTitle>
                  <p style={{ color: '#A0522D' }}>
                    {t('models.familyHaven.model3D.description')}
                  </p>
                </CardHeader>
                <CardContent>
                  <div
                    style={{
                      border: '2px solid #FDB515',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    <SimpleIFCViewer
                      height="600px"
                      width="100%"
                      modelUrl={modelData.model3D}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #FDB515 0%, #8B4513 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 font-bold">
              {t('models.familyHaven.cta.title')}
            </h2>
            <p
              className="text-xl mb-8"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              {t('models.familyHaven.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-semibold transition-all duration-300 border-2"
                style={{
                  backgroundColor: 'white',
                  color: '#3C2414',
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
                onClick={openPopup}
              >
                {t('models.familyHaven.cta.getStarted')}
              </Button>
              <Link href="/price-analysis">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 font-semibold transition-all duration-300"
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                    (e.currentTarget as HTMLElement).style.color = '#3C2414';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {t('models.familyHaven.cta.compareCosts')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
