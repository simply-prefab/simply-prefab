'use client'

import { ArrowLeft, Bath, Bed, ChevronLeft, ChevronRight, Eye, Home, Leaf, Minimize, Rotate3D, Ruler, Shield, Zap } from 'lucide-react';
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

export default function TinyEcoStudioPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();

  const modelData = {
    name: t('models.tinyEcoStudio.name'),
    tagline: t('models.tinyEcoStudio.tagline'),
    area: t('models.tinyEcoStudio.area'),
    bedrooms: 2,
    bathrooms: 1,
    price: t('models.tinyEcoStudio.price'),
    timeline: t('models.tinyEcoStudio.timeline'),
    images: [
      "/images/models/compact1.jpg",
      "/images/models/compact2.jpg",
      "/images/models/compact3.jpg",
    ],
    features: [
      { icon: Minimize, title: t('models.tinyEcoStudio.features.microDesign.title'), description: t('models.tinyEcoStudio.features.microDesign.description') },
      { icon: Leaf, title: t('models.tinyEcoStudio.features.netZero.title'), description: t('models.tinyEcoStudio.features.netZero.description') },
      { icon: Zap, title: t('models.tinyEcoStudio.features.smartStorage.title'), description: t('models.tinyEcoStudio.features.smartStorage.description') },
      { icon: Shield, title: t('models.tinyEcoStudio.features.offGrid.title'), description: t('models.tinyEcoStudio.features.offGrid.description') },
    ],
    specifications: {
      [t('models.tinyEcoStudio.specifications.totalArea')]: t('models.tinyEcoStudio.area'),
      [t('models.tinyEcoStudio.specifications.footprint')]: "20' x 20'",
      [t('models.tinyEcoStudio.specifications.bedrooms')]: t('models.tinyEcoStudio.specifications.bedroomsValue'),
      [t('models.tinyEcoStudio.specifications.bathrooms')]: t('models.tinyEcoStudio.specifications.bathroomsValue'),
      [t('models.tinyEcoStudio.specifications.foundation')]: t('models.tinyEcoStudio.specifications.foundationValue'),
      [t('models.tinyEcoStudio.specifications.wallSystem')]: t('models.tinyEcoStudio.specifications.wallSystemValue'),
      [t('models.tinyEcoStudio.specifications.roofing')]: t('models.tinyEcoStudio.specifications.roofingValue'),
      [t('models.tinyEcoStudio.specifications.windows')]: t('models.tinyEcoStudio.specifications.windowsValue'),
      [t('models.tinyEcoStudio.specifications.energyRating')]: t('models.tinyEcoStudio.specifications.energyRatingValue')
    },
    floorPlan: [
      "/3DModels/compactHouse/compactHouse.jpg",
    ],
    floorPlanLabels: [t('models.tinyEcoStudio.floorPlanLabels.mainFloor')],
    model3D: "/3DModels/compactHouse/compactHouse.obj"
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
            {t('models.tinyEcoStudio.backToModels')}
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
                {t('models.tinyEcoStudio.badge')}
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
                    {t('models.tinyEcoStudio.stats.totalArea')}
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
                    {t('models.tinyEcoStudio.stats.bedrooms')}
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
                    {t('models.tinyEcoStudio.stats.bathrooms')}
                  </div>
                </div>
                <div
                  className="text-center p-4 rounded-lg shadow-sm border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E5D5B7'
                  }}
                >
                  <Home
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
                    {t('models.tinyEcoStudio.stats.startingPrice')}
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
                {t('models.tinyEcoStudio.tabs.overview')}
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="transition-all duration-300"
                style={{ color: '#8B4513' }}
              >
                {t('models.tinyEcoStudio.tabs.features')}
              </TabsTrigger>
              <TabsTrigger
                value="floorplan"
                className="transition-all duration-300"
                style={{ color: '#8B4513' }}
              >
                {t('models.tinyEcoStudio.tabs.floorPlan')}
              </TabsTrigger>
              <TabsTrigger
                value="3d-model"
                className="transition-all duration-300"
                style={{ color: '#8B4513' }}
              >
                {t('models.tinyEcoStudio.tabs.model3D')}
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
                        {t('models.tinyEcoStudio.overview.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="mb-4"
                        style={{ color: '#A0522D' }}
                      >
                        {t('models.tinyEcoStudio.overview.paragraph1')}
                      </p>
                      <p
                        className="mb-4"
                        style={{ color: '#A0522D' }}
                      >
                        {t('models.tinyEcoStudio.overview.paragraph2')}
                      </p>
                      <p style={{ color: '#A0522D' }}>
                        {t('models.tinyEcoStudio.overview.paragraph3')}
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
                      <CardTitle style={{ color: '#3C2414' }}>{t('models.tinyEcoStudio.specificationsTitle')}</CardTitle>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    {t('models.tinyEcoStudio.floorPlan.title')}
                  </CardTitle>
                  <p style={{ color: '#A0522D' }}>
                    {t('models.tinyEcoStudio.floorPlan.description')}
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
                        alt={`${modelData.floorPlanLabels[activeFloorPlan]} ${t('models.tinyEcoStudio.floorPlan.planSuffix')}`}
                        className="w-full h-full object-contain"
                      />

                      {modelData.floorPlan.length > 1 && (
                        <>
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
                        </>
                      )}

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

                    {modelData.floorPlan.length > 1 && (
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
                    )}
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
                    {t('models.tinyEcoStudio.model3D.title')}
                  </CardTitle>
                  <p style={{ color: '#A0522D' }}>
                    {t('models.tinyEcoStudio.model3D.description')}
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
              {t('models.tinyEcoStudio.cta.title')}
            </h2>
            <p
              className="text-xl mb-8"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              {t('models.tinyEcoStudio.cta.description')}
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
                {t('models.tinyEcoStudio.cta.getStarted')}
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
                  {t('models.tinyEcoStudio.cta.compareCosts')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
