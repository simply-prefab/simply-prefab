'use client'

import { ArrowLeft, Bath, Bed, IndianRupee, Filter, Grid, List, Search, Square } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AllModelsPage = () => {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const homeModels = [
    {
      id: 1,
      name: t('homeModels.ecoCompact1200.title'),
      area: "1,200 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      price: 120000,
      priceDisplay: t('homeModels.ecoCompact1200.price') || "₹120,000",
      category: "compact",
      timeline: "8-10 weeks",
      image: "/images/models/image2.jpg",
      features: [
        t('homeModels.ecoCompact1200.features.0') || "Solar Ready",
        t('homeModels.ecoCompact1200.features.1') || "Energy Efficient",
        t('homeModels.ecoCompact1200.features.2') || "Modern Design"
      ],
      slug: "TriLevel-Modern",
      color: "#FB921D"
    },
    {
      id: 2,
      name: t('homeModels.greenVilla1600.title'),
      area: "1,600 sq ft",
      bedrooms: 3,
      bathrooms: 2.5,
      price: 180000,
      priceDisplay: t('homeModels.greenVilla1600.price') || "₹180,000",
      category: "family",
      timeline: "8-10 weeks",
      image: "/images/models/duplex1.jpg",
      features: [
        t('homeModels.greenVilla1600.features.0') || "Open Floor Plan",
        t('homeModels.greenVilla1600.features.1') || "Smart Home Ready",
        t('homeModels.greenVilla1600.features.2') || "Sustainable Materials"
      ],
      slug: "SkyNest-Duplex-1600",
      color: "#D66A00"
    },
    {
      id: 3,
      name: t('homeModels.tinyEcoStudio.title'),
      area: "600 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      price: 85000,
      priceDisplay: t('homeModels.tinyEcoStudio.price') || "₹85,000",
      category: "tiny",
      timeline: "4-6 weeks",
      image: "/images/models/compact1.jpg",
      features: [
        t('homeModels.tinyEcoStudio.features.0') || "Minimalist Design",
        t('homeModels.tinyEcoStudio.features.1') || "Off-Grid Ready",
        t('homeModels.tinyEcoStudio.features.2') || "Compact Living"
      ],
      slug: "CompactNest-600",
      color: "#C55A00"
    },
    {
      id: 4,
      name: t('homeModels.familyHaven2000.title'),
      area: "2,200 sq ft",
      bedrooms: 4,
      bathrooms: 3,
      price: 220000,
      priceDisplay: t('homeModels.familyHaven2000.price') || "₹220,000",
      category: "family",
      timeline: "10-12 weeks",
      image: "/images/models/wide-balcony.jpg",
      features: [
        t('homeModels.familyHaven2000.features.0') || "Family Friendly",
        t('homeModels.familyHaven2000.features.1') || "Large Kitchen",
        t('homeModels.familyHaven2000.features.2') || "Outdoor Deck"
      ],
      slug: "ModernLoft-Terrace-Home-2200",
      color: "#D66A00"
    },
    {
      id: 5,
      name: t('homeModels.urbanModern1500.title'),
      area: "1,500 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      price: 155000,
      priceDisplay: t('homeModels.urbanModern1500.price') || "₹155,000",
      category: "compact",
      timeline: "8-10 weeks",
      image: "/images/models/SkyNextDuplex/img2.jpg",
      features: [
        t('homeModels.urbanModern1500.features.0') || "Urban Design",
        t('homeModels.urbanModern1500.features.1') || "Rooftop Access",
        t('homeModels.urbanModern1500.features.2') || "City Living"
      ],
      slug: "RoofDeck-Modern-1500",
      color: "#FB921D"
    }
  ];

  const filteredModels = homeModels
    .filter(model => {
      if (filterBy === 'all') return true;
      return model.category === filterBy;
    })
    .filter(model =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'area-low':
          return parseInt(a.area) - parseInt(b.area);
        case 'area-high':
          return parseInt(b.area) - parseInt(a.area);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.price - b.price;
      }
    });

  const ModelCard = ({ model, isListView = false }: { model: any, isListView?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={isListView ? "w-full" : ""}
    >
      <Card
        className={`shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-0 h-full ${isListView ? 'flex flex-row' : ''}`}
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
        <div className={`relative overflow-hidden ${isListView ? 'w-64 flex-shrink-0' : 'h-48'}`}>
          <ImageWithFallback
            src={model.image}
            alt={model.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <Badge
              className="border-0"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
            >
              {model.area}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge
              variant="secondary"
              className="border"
              style={{
                backgroundColor: 'white',
                color: '#1a1a1a',
                borderColor: '#FFD0A0'
              }}
            >
              {model.priceDisplay}
            </Badge>
          </div>
        </div>

        <CardContent className={`p-6 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
          <div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: '#1a1a1a' }}
            >
              {model.name}
            </h3>

            <div className={`flex ${isListView ? 'flex-row space-x-6' : 'justify-between'} text-sm mb-4`}>
              <div className="flex items-center space-x-1">
                <Bed
                  className="h-4 w-4"
                  style={{ color: '#FB921D' }}
                />
                <span style={{ color: '#666' }}>{model.bedrooms} {t('allModels.card.br')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bath
                  className="h-4 w-4"
                  style={{ color: '#FB921D' }}
                />
                <span style={{ color: '#666' }}>{model.bathrooms} {t('allModels.card.ba')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Square
                  className="h-4 w-4"
                  style={{ color: '#FB921D' }}
                />
                <span style={{ color: '#666' }}>{model.area}</span>
              </div>
              {isListView && (
                <div className="flex items-center space-x-1">
                  <IndianRupee
                    className="h-4 w-4"
                    style={{ color: '#FB921D' }}
                  />
                  <span style={{ color: '#666' }}>{model.timeline}</span>
                </div>
              )}
            </div>

            <div className={`space-y-2 ${isListView ? 'grid grid-cols-2 gap-2' : ''}`}>
              {model.features.slice(0, isListView ? 6 : 3).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center text-sm">
                  <div
                    className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                    style={{ backgroundColor: '#FB921D' }}
                  ></div>
                  <span style={{ color: '#666' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${isListView ? 'mt-4' : 'mt-6 pt-4'} ${!isListView ? 'border-t' : ''}`} style={{ borderColor: '#FFD0A0' }}>
            <div className={`flex ${isListView ? 'flex-col space-y-2' : 'justify-between items-center'}`}>
              {!isListView && (
                <span
                  className="text-2xl font-bold"
                  style={{ color: '#FB921D' }}
                >
                  {model.priceDisplay}
                </span>
              )}
              <div className={`flex ${isListView ? 'space-x-2' : ''}`}>
                <Link href={`/models/${model.slug}`}>
                  <Button
                    size={isListView ? "sm" : "default"}
                    className="font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: '#FB921D',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                    }}
                  >
                    {t('allModels.card.learnMore')}
                  </Button>
                </Link>
                {isListView && (
                  <Link href="/price-analysis">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 font-semibold"
                      style={{
                        borderColor: '#C55A00',
                        color: '#C55A00'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = '#C55A00';
                        (e.target as HTMLElement).style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        (e.target as HTMLElement).style.color = '#C55A00';
                      }}
                    >
                      {t('allModels.card.getQuote')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ backgroundColor: '#FFE0C0' }}
    >
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      {/* Header */}
      <div
        className="border-b"
        style={{
          backgroundColor: 'white',
          borderColor: '#FFD0A0'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/"
            className="inline-flex items-center mb-6 transition-all duration-300"
            style={{
              color: '#FB921D',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#E67E0F';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = '#FB921D';
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('allModels.header.backToHome')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-5xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('allModels.header.title')}
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('allModels.header.description')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl shadow-md p-6 mb-8"
          style={{
            backgroundColor: 'white',
            border: '1px solid #FFD0A0'
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                style={{ color: '#FB921D' }}
              />
              <Input
                placeholder={t('allModels.filters.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2"
                style={{
                  borderColor: '#FFD0A0',
                  color: '#1a1a1a'
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#FB921D';
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#FFD0A0';
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger
                  className="w-full sm:w-48 border-2"
                  style={{
                    borderColor: '#FFD0A0',
                    color: '#1a1a1a'
                  }}
                >
                  <Filter
                    className="h-4 w-4 mr-2"
                    style={{ color: '#FB921D' }}
                  />
                  <SelectValue placeholder={t('allModels.filters.filterPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allModels.filters.categories.all')}</SelectItem>
                  <SelectItem value="tiny">{t('allModels.filters.categories.tiny')}</SelectItem>
                  <SelectItem value="compact">{t('allModels.filters.categories.compact')}</SelectItem>
                  <SelectItem value="family">{t('allModels.filters.categories.family')}</SelectItem>
                  <SelectItem value="luxury">{t('allModels.filters.categories.luxury')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger
                  className="w-full sm:w-48 border-2"
                  style={{
                    borderColor: '#FFD0A0',
                    color: '#1a1a1a'
                  }}
                >
                  <SelectValue placeholder={t('allModels.filters.sortPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">{t('allModels.filters.sort.priceLow')}</SelectItem>
                  <SelectItem value="price-high">{t('allModels.filters.sort.priceHigh')}</SelectItem>
                  <SelectItem value="area-low">{t('allModels.filters.sort.areaLow')}</SelectItem>
                  <SelectItem value="area-high">{t('allModels.filters.sort.areaHigh')}</SelectItem>
                  <SelectItem value="name">{t('allModels.filters.sort.name')}</SelectItem>
                </SelectContent>
              </Select>

              <div
                className="flex rounded-lg p-1"
                style={{ backgroundColor: '#FFF5E6' }}
              >
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'shadow-sm' : ''}
                  style={{
                    backgroundColor: viewMode === 'grid' ? '#FB921D' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : '#C55A00'
                  }}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'shadow-sm' : ''}
                  style={{
                    backgroundColor: viewMode === 'list' ? '#FB921D' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#C55A00'
                  }}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <p style={{ color: '#666' }}>
            {t('allModels.resultsCount.showing')} {filteredModels.length} {t('allModels.resultsCount.of')} {homeModels.length} {t('allModels.resultsCount.models')}
            {searchTerm && ` ${t('allModels.resultsCount.for')} "${searchTerm}"`}
            {filterBy !== 'all' && ` ${t('allModels.resultsCount.in')} ${filterBy} ${t('allModels.resultsCount.category')}`}
          </p>
        </motion.div>

        {/* Models Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              isListView={viewMode === 'list'}
            />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredModels.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <h3
              className="text-2xl mb-4"
              style={{ color: '#666' }}
            >
              {t('allModels.noResults.title')}
            </h3>
            <p
              className="mb-6"
              style={{ color: '#C55A00' }}
            >
              {t('allModels.noResults.message')}
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
              }}
              className="font-semibold transition-all duration-300"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#FB921D';
              }}
            >
              {t('allModels.noResults.clearFilters')}
            </Button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 rounded-2xl p-8 text-center text-white"
          style={{
            background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
          }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            {t('allModels.cta.title')}
          </h2>
          <p
            className="text-xl mb-6"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('allModels.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="font-semibold transition-all duration-300 border-2"
              style={{
                backgroundColor: 'white',
                color: '#1a1a1a',
                borderColor: 'white'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'white';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
              onClick={openPopup}
            >
              {t('allModels.cta.button')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AllModelsPage;
