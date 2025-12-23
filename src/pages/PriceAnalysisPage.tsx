'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Building, Calculator, Clock, Hammer, Home, IndianRupee, MapPin, Paintbrush, Ruler, Shield, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts';

interface CityConfig {
  name: string;
}

interface ConstructionTypeConfig {
  name: string;
}

interface PhaseBreakdown {
  phase: string;
  cost: number;
  percentage: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  image: string;
}

interface ConstructionData {
  total: number;
  timeline: string;
  breakdown: PhaseBreakdown[];
}

interface CostBreakdownData {
  [key: string]: {
    traditional: ConstructionData;
    prefab: ConstructionData;
  };
}

interface CalculatedData {
  traditional: ConstructionData;
  prefab: ConstructionData;
}

interface QualityFactor {
  factor: string;
  traditional: number;
  prefab: number;
  description: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

// Mock config data
const citiesConfig: CityConfig[] = [
  { name: 'Mumbai' },
  { name: 'Delhi' },
  { name: 'Bangalore' },
  { name: 'Hyderabad' },
  { name: 'Chennai' },
  { name: 'Pune' },
  { name: 'Kolkata' },
  { name: 'Ahmedabad' }
];

const constructionTypesConfig: ConstructionTypeConfig[] = [
  { name: 'Residential' },
  { name: 'Commercial' },
  { name: 'Mixed-Use' }
];

export default function PriceAnalysisPage(): JSX.Element {
  const { t } = useLanguage();
  const [selectedComparison, setSelectedComparison] = useState<string>('1000sqft');
  const [customArea, setCustomArea] = useState<string>('');
  const [constructionType, setConstructionType] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(null);
  const [useCustomData, setUseCustomData] = useState<boolean>(false);

  const cities = citiesConfig.map(city => city.name);
  const constructionTypes = constructionTypesConfig.map(type => type.name);

  // Orange Theme Colors - NO RED
  const COLORS = {
    traditional: '#C55A00',  // Dark Orange instead of red
    prefab: '#FB921D',       // Orange
    accent: '#16A34A',       // Green
    background: '#FFF5E6',   // Light Orange/Cream
    darkOrange: '#D66A00',   // Medium Dark Orange
    lightOrange: '#FFD0A0'   // Light Orange
  };

  const { openPopup } = useExpertConsultation();
  const phaseImages = {
    foundation: "https://images.unsplash.com/photo-1687079661575-94c6490e049e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZm91bmRhdGlvbnxlbnwxfHx8fDE3NTcxNDUyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    manufacturing: "https://images.unsplash.com/photo-1746362722801-17bcc1f72fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVmYWIlMjBob3VzZSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzU3MTQ1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    assembly: "https://images.unsplash.com/photo-1562534315-64dba645d0f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGFzc2VtYmx5JTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1NzE0NTI3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    electrical: "https://images.unsplash.com/photo-1657558665549-bd7d82afed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhlbGVjdHJpY2FsJTIwcGx1bWJpbmclMjB3b3JrfGVufDF8fHx8MTc1NzE0NTI3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    finishing: "https://images.unsplash.com/photo-1632214533040-eb166a3b172d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGZpbmlzaGluZyUyMGludGVyaW9yfGVufDF8fHx8MTc1NzE0NTI4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    quality: "https://images.unsplash.com/photo-1665069181618-5618c9b621ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHF1YWxpdHklMjBjb250cm9sJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1NzA3MTA1OXww&ixlib=rb-4.1.0&q=80&w=1080"
  };

  const costBreakdown: CostBreakdownData = {
    '1000sqft': {
      traditional: {
        total: 2500000,
        timeline: t('priceAnalysis.timelines.traditional.small'),
        breakdown: [
          { phase: t('priceAnalysis.phases.sitePreparation'), cost: 300000, percentage: 12, icon: Hammer, image: phaseImages.foundation },
          { phase: t('priceAnalysis.phases.structuralWork'), cost: 750000, percentage: 30, icon: Building, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.masonryPlastering'), cost: 400000, percentage: 16, icon: Home, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.electricalPlumbing'), cost: 300000, percentage: 12, icon: Wrench, image: phaseImages.electrical },
          { phase: t('priceAnalysis.phases.flooringTiling'), cost: 350000, percentage: 14, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.paintingFinishing'), cost: 250000, percentage: 10, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.windowsDoors'), cost: 150000, percentage: 6, icon: Home, image: phaseImages.finishing }
        ]
      },
      prefab: {
        total: 1800000,
        timeline: t('priceAnalysis.timelines.prefab.small'),
        breakdown: [
          { phase: t('priceAnalysis.phases.sitePreparation'), cost: 250000, percentage: 14, icon: Hammer, image: phaseImages.foundation },
          { phase: t('priceAnalysis.phases.prefabManufacturing'), cost: 600000, percentage: 33, icon: Building, image: phaseImages.manufacturing },
          { phase: t('priceAnalysis.phases.onSiteAssembly'), cost: 300000, percentage: 17, icon: Home, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.mepIntegration'), cost: 250000, percentage: 14, icon: Wrench, image: phaseImages.electrical },
          { phase: t('priceAnalysis.phases.finishingInteriors'), cost: 280000, percentage: 16, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.qualityControl'), cost: 120000, percentage: 6, icon: Shield, image: phaseImages.quality }
        ]
      }
    },
    '1500sqft': {
      traditional: {
        total: 3750000,
        timeline: t('priceAnalysis.timelines.traditional.medium'),
        breakdown: [
          { phase: t('priceAnalysis.phases.sitePreparation'), cost: 450000, percentage: 12, icon: Hammer, image: phaseImages.foundation },
          { phase: t('priceAnalysis.phases.structuralWork'), cost: 1125000, percentage: 30, icon: Building, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.masonryPlastering'), cost: 600000, percentage: 16, icon: Home, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.electricalPlumbing'), cost: 450000, percentage: 12, icon: Wrench, image: phaseImages.electrical },
          { phase: t('priceAnalysis.phases.flooringTiling'), cost: 525000, percentage: 14, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.paintingFinishing'), cost: 375000, percentage: 10, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.windowsDoors'), cost: 225000, percentage: 6, icon: Home, image: phaseImages.finishing }
        ]
      },
      prefab: {
        total: 2600000,
        timeline: t('priceAnalysis.timelines.prefab.medium'),
        breakdown: [
          { phase: t('priceAnalysis.phases.sitePreparation'), cost: 350000, percentage: 13, icon: Hammer, image: phaseImages.foundation },
          { phase: t('priceAnalysis.phases.prefabManufacturing'), cost: 900000, percentage: 35, icon: Building, image: phaseImages.manufacturing },
          { phase: t('priceAnalysis.phases.onSiteAssembly'), cost: 420000, percentage: 16, icon: Home, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.mepIntegration'), cost: 370000, percentage: 14, icon: Wrench, image: phaseImages.electrical },
          { phase: t('priceAnalysis.phases.finishingInteriors'), cost: 420000, percentage: 16, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.qualityControl'), cost: 140000, percentage: 6, icon: Shield, image: phaseImages.quality }
        ]
      }
    },
    '2000sqft': {
      traditional: {
        total: 5000000,
        timeline: t('priceAnalysis.timelines.traditional.large'),
        breakdown: [
          { phase: t('priceAnalysis.phases.sitePreparation'), cost: 600000, percentage: 12, icon: Hammer, image: phaseImages.foundation },
          { phase: t('priceAnalysis.phases.structuralWork'), cost: 1500000, percentage: 30, icon: Building, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.masonryPlastering'), cost: 800000, percentage: 16, icon: Home, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.electricalPlumbing'), cost: 600000, percentage: 12, icon: Wrench, image: phaseImages.electrical },
          { phase: t('priceAnalysis.phases.flooringTiling'), cost: 700000, percentage: 14, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.paintingFinishing'), cost: 500000, percentage: 10, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.windowsDoors'), cost: 300000, percentage: 6, icon: Home, image: phaseImages.finishing }
        ]
      },
      prefab: {
        total: 3400000,
        timeline: t('priceAnalysis.timelines.prefab.large'),
        breakdown: [
          { phase: t('priceAnalysis.phases.sitePreparation'), cost: 450000, percentage: 13, icon: Hammer, image: phaseImages.foundation },
          { phase: t('priceAnalysis.phases.prefabManufacturing'), cost: 1200000, percentage: 35, icon: Building, image: phaseImages.manufacturing },
          { phase: t('priceAnalysis.phases.onSiteAssembly'), cost: 550000, percentage: 16, icon: Home, image: phaseImages.assembly },
          { phase: t('priceAnalysis.phases.mepIntegration'), cost: 480000, percentage: 14, icon: Wrench, image: phaseImages.electrical },
          { phase: t('priceAnalysis.phases.finishingInteriors'), cost: 550000, percentage: 16, icon: Paintbrush, image: phaseImages.finishing },
          { phase: t('priceAnalysis.phases.qualityControl'), cost: 170000, percentage: 6, icon: Shield, image: phaseImages.quality }
        ]
      }
    }
  };

  const qualityFactors: QualityFactor[] = [
    {
      factor: t('priceAnalysis.qualityFactors.precisionManufacturing.factor'),
      traditional: 60,
      prefab: 95,
      description: t('priceAnalysis.qualityFactors.precisionManufacturing.description')
    },
    {
      factor: t('priceAnalysis.qualityFactors.materialQuality.factor'),
      traditional: 70,
      prefab: 90,
      description: t('priceAnalysis.qualityFactors.materialQuality.description')
    },
    {
      factor: t('priceAnalysis.qualityFactors.weatherProtection.factor'),
      traditional: 40,
      prefab: 100,
      description: t('priceAnalysis.qualityFactors.weatherProtection.description')
    },
    {
      factor: t('priceAnalysis.qualityFactors.wasteMinimization.factor'),
      traditional: 30,
      prefab: 85,
      description: t('priceAnalysis.qualityFactors.wasteMinimization.description')
    },
    {
      factor: t('priceAnalysis.qualityFactors.constructionSpeed.factor'),
      traditional: 45,
      prefab: 90,
      description: t('priceAnalysis.qualityFactors.constructionSpeed.description')
    }
  ];

  const generateCustomBreakdown = (traditionalTotal: number, prefabTotal: number) => {
    const traditionalBreakdown = [
      { phase: t('priceAnalysis.phases.sitePreparation'), percentage: 12, icon: Hammer, image: phaseImages.foundation },
      { phase: t('priceAnalysis.phases.structuralWork'), percentage: 30, icon: Building, image: phaseImages.assembly },
      { phase: t('priceAnalysis.phases.masonryPlastering'), percentage: 16, icon: Home, image: phaseImages.assembly },
      { phase: t('priceAnalysis.phases.electricalPlumbing'), percentage: 12, icon: Wrench, image: phaseImages.electrical },
      { phase: t('priceAnalysis.phases.flooringTiling'), percentage: 14, icon: Paintbrush, image: phaseImages.finishing },
      { phase: t('priceAnalysis.phases.paintingFinishing'), percentage: 10, icon: Paintbrush, image: phaseImages.finishing },
      { phase: t('priceAnalysis.phases.windowsDoors'), percentage: 6, icon: Home, image: phaseImages.finishing }
    ].map(item => ({
      ...item,
      cost: Math.round((traditionalTotal * item.percentage) / 100)
    }));

    const prefabBreakdown = [
      { phase: t('priceAnalysis.phases.sitePreparation'), percentage: 14, icon: Hammer, image: phaseImages.foundation },
      { phase: t('priceAnalysis.phases.prefabManufacturing'), percentage: 33, icon: Building, image: phaseImages.manufacturing },
      { phase: t('priceAnalysis.phases.onSiteAssembly'), percentage: 17, icon: Home, image: phaseImages.assembly },
      { phase: t('priceAnalysis.phases.mepIntegration'), percentage: 14, icon: Wrench, image: phaseImages.electrical },
      { phase: t('priceAnalysis.phases.finishingInteriors'), percentage: 16, icon: Paintbrush, image: phaseImages.finishing },
      { phase: t('priceAnalysis.phases.qualityControl'), percentage: 6, icon: Shield, image: phaseImages.quality }
    ].map(item => ({
      ...item,
      cost: Math.round((prefabTotal * item.percentage) / 100)
    }));

    return { traditionalBreakdown, prefabBreakdown };
  };

  const handleCalculate = (): void => {
    if (!customArea || !constructionType || !selectedCity) {
      alert(t('priceAnalysis.validation.fillAllFields'));
      return;
    }

    const area = parseInt(customArea, 10);
    const baseRate = constructionType.includes('Commercial') ? 3000 : 2500;
    const cityMultiplier = ['Mumbai', 'Delhi', 'Bangalore'].includes(selectedCity) ? 1.2 :
      ['Hyderabad', 'Chennai', 'Pune'].includes(selectedCity) ? 1.1 : 1.0;

    const traditionalCost = area * baseRate * cityMultiplier;
    const prefabCost = traditionalCost * 0.72;

    const { traditionalBreakdown, prefabBreakdown } = generateCustomBreakdown(traditionalCost, prefabCost);

    const traditionalTimeline = area < 1500 ? t('priceAnalysis.timelines.traditional.small') :
      area < 2000 ? t('priceAnalysis.timelines.traditional.medium') :
        t('priceAnalysis.timelines.traditional.large');
    const prefabTimeline = area < 1500 ? t('priceAnalysis.timelines.prefab.small') :
      area < 2000 ? t('priceAnalysis.timelines.prefab.medium') :
        t('priceAnalysis.timelines.prefab.large');

    const customData: CalculatedData = {
      traditional: {
        total: traditionalCost,
        timeline: traditionalTimeline,
        breakdown: traditionalBreakdown as PhaseBreakdown[]
      },
      prefab: {
        total: prefabCost,
        timeline: prefabTimeline,
        breakdown: prefabBreakdown as PhaseBreakdown[]
      }
    };

    setCalculatedData(customData);
    setUseCustomData(true);

    setTimeout(() => {
      const element = document.getElementById('detailed-analysis');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const currentData = useCustomData && calculatedData ? calculatedData : costBreakdown[selectedComparison];
  const savings = currentData.traditional.total - currentData.prefab.total;
  const savingsPercentage = Math.round((savings / currentData.traditional.total) * 100);

  // Prepare data for charts
  const pieChartData = [
    { name: t('priceAnalysis.tooltips.traditional'), value: currentData.traditional.total, color: COLORS.traditional },
    { name: t('priceAnalysis.tooltips.prefab'), value: currentData.prefab.total, color: COLORS.prefab }
  ];

  const comparisonBarData = currentData.traditional.breakdown.map((item, index) => ({
    phase: item.phase.split(' ').slice(0, 3).join(' '),
    traditional: item.cost / 100000,
    prefab: currentData.prefab.breakdown[index]?.cost / 100000 || 0
  }));

  const savingsData = [
    { size: '1000 sqft', traditional: 25, prefab: 18, savings: 7 },
    { size: '1500 sqft', traditional: 37.5, prefab: 26, savings: 11.5 },
    { size: '2000 sqft', traditional: 50, prefab: 34, savings: 16 }
  ];

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '12px',
          border: '2px solid #FB921D',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <p style={{ color: '#1a1a1a', fontWeight: 'bold', marginBottom: '4px' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
              {entry.name}: ₹{entry.value.toFixed(1)}L
            </p>
          ))}
        </div>
      );
    }
    return null;
  };


  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 224, 192, 0.3), white)'
      }}
    >
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #E67E0F)'
        }}
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge
                className="mb-4 border-0"
                style={{
                  backgroundColor: '#FB921D',
                  color: 'white'
                }}
              >
                {t('priceAnalysis.badge')}
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl mb-6 font-bold"
              style={{
                background: 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('priceAnalysis.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#C55A00' }}
            >
              {t('priceAnalysis.subtitle')}
            </motion.p>
          </div>

          {/* Quick Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {Object.entries(costBreakdown).map(([size, data], index) => (
              <motion.div
                key={size}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 border-2 ${selectedComparison === size && !useCustomData ? 'shadow-lg' : ''
                    }`}
                  onClick={() => {
                    setSelectedComparison(size);
                    setUseCustomData(false);
                  }}
                  style={{
                    backgroundColor: 'white',
                    borderColor: selectedComparison === size && !useCustomData ? '#FB921D' : '#FFD0A0'
                  }}
                >
                  <CardHeader className="text-center">
                    <CardTitle style={{ color: '#1a1a1a' }}>
                      {size.replace('sqft', ' sq ft')}
                    </CardTitle>
                    <div className="text-3xl mb-2 font-bold" style={{ color: '#FB921D' }}>
                      ₹{((data.traditional.total - data.prefab.total) / 100000).toFixed(1)}L
                    </div>
                    <div className="text-sm" style={{ color: '#C55A00' }}>
                      {t('priceAnalysis.quickComparison.potentialSavings')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#C55A00' }}>{t('priceAnalysis.quickComparison.traditional')}</span>
                        <span style={{ color: '#1a1a1a' }}>₹{(data.traditional.total / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#C55A00' }}>{t('priceAnalysis.quickComparison.prefab')}</span>
                        <span className="font-semibold" style={{ color: '#FB921D' }}>
                          ₹{(data.prefab.total / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#C55A00' }}>{t('priceAnalysis.quickComparison.timeline')}</span>
                        <span className="font-semibold" style={{ color: '#FB921D' }}>
                          {data.prefab.timeline}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Visual Cost Comparison with Large Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-16"
          >
            <Card
              className="border-0"
              style={{
                backgroundColor: 'white',
                border: '1px solid #FFD0A0'
              }}
            >
              <CardHeader className="text-center">
                <CardTitle style={{ color: '#1a1a1a', fontSize: '2rem' }}>
                  {t('priceAnalysis.costComparisonTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Pie Chart */}
                  <div>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ₹${(entry.value / 100000).toFixed(1)}L`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Key Stats */}
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="text-center p-6 rounded-lg" style={{ backgroundColor: COLORS.background }}>
                      <IndianRupee className="w-12 h-12 mx-auto mb-2" style={{ color: COLORS.accent }} />
                      <div className="text-3xl font-bold mb-2" style={{ color: COLORS.accent }}>
                        ₹{(savings / 100000).toFixed(1)}L
                      </div>
                      <div style={{ color: '#C55A00' }}>{t('priceAnalysis.totalSavings')} ({savingsPercentage}%)</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(197, 90, 0, 0.1)' }}>
                        <div className="text-xl font-bold" style={{ color: COLORS.traditional }}>
                          ₹{(currentData.traditional.total / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm" style={{ color: '#C55A00' }}>{t('priceAnalysis.tooltips.traditional')}</div>
                      </div>
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(251, 146, 29, 0.1)' }}>
                        <div className="text-xl font-bold" style={{ color: COLORS.prefab }}>
                          ₹{(currentData.prefab.total / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm" style={{ color: '#C55A00' }}>{t('priceAnalysis.tooltips.prefab')}</div>
                      </div>
                    </div>

                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(251, 146, 29, 0.1)' }}>
                      <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: COLORS.prefab }} />
                      <div className="font-bold" style={{ color: '#1a1a1a' }}>{t('priceAnalysis.fasterConstruction')}</div>
                      <div className="text-sm" style={{ color: '#C55A00' }}>
                        {currentData.prefab.timeline} vs {currentData.traditional.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Custom Cost Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-16"
          >
            <Card
              className={`max-w-4xl mx-auto border-2 ${useCustomData ? 'shadow-lg' : ''}`}
              style={{
                backgroundColor: 'white',
                borderColor: useCustomData ? '#FB921D' : '#FFD0A0'
              }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-center justify-center" style={{ color: '#1a1a1a' }}>
                  <Calculator className="mr-2 w-6 h-6" style={{ color: '#FB921D' }} />
                  {t('priceAnalysis.calculator.title')}
                </CardTitle>
                <p className="text-center" style={{ color: '#C55A00' }}>
                  {t('priceAnalysis.calculator.subtitle')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="area" className="flex items-center" style={{ color: '#1a1a1a' }}>
                      <Ruler className="mr-2 w-4 h-4" style={{ color: '#FB921D' }} />
                      {t('priceAnalysis.calculator.areaLabel')}
                    </Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder={t('priceAnalysis.calculator.areaPlaceholder')}
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      className="w-full border-2"
                      style={{
                        borderColor: '#FFD0A0',
                        color: '#1a1a1a'
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center" style={{ color: '#1a1a1a' }}>
                      <Building className="mr-2 w-4 h-4" style={{ color: '#FB921D' }} />
                      {t('priceAnalysis.calculator.constructionTypeLabel')}
                    </Label>
                    <Select value={constructionType} onValueChange={setConstructionType}>
                      <SelectTrigger className="border-2" style={{ borderColor: '#FFD0A0', color: '#1a1a1a' }}>
                        <SelectValue placeholder={t('priceAnalysis.calculator.constructionTypePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {constructionTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center" style={{ color: '#1a1a1a' }}>
                      <MapPin className="mr-2 w-4 h-4" style={{ color: '#FB921D' }} />
                      {t('priceAnalysis.calculator.cityLabel')}
                    </Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="border-2" style={{ borderColor: '#FFD0A0', color: '#1a1a1a' }}>
                        <SelectValue placeholder={t('priceAnalysis.calculator.cityPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="font-semibold transition-all duration-300 w-full md:w-auto"
                      style={{
                        backgroundColor: '#FB921D',
                        color: 'white'
                      }}
                      onClick={handleCalculate}
                    >
                      <Calculator className="mr-2 w-5 h-5" />
                      {t('priceAnalysis.calculator.calculateButton')}
                    </Button>
                  </motion.div>
                </div>

                {calculatedData && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="grid md:grid-cols-3 gap-4 p-6 rounded-lg"
                      style={{
                        background: 'linear-gradient(to right, rgba(255, 224, 192, 0.5), rgba(255, 245, 230, 0.5))'
                      }}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1 font-bold" style={{ color: COLORS.traditional }}>
                          ₹{(calculatedData.traditional.total / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm" style={{ color: '#C55A00' }}>{t('priceAnalysis.calculator.traditionalCost')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1 font-bold" style={{ color: '#FB921D' }}>
                          ₹{(calculatedData.prefab.total / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm" style={{ color: '#C55A00' }}>{t('priceAnalysis.calculator.prefabCost')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-1 font-bold" style={{ color: '#16A34A' }}>
                          ₹{((calculatedData.traditional.total - calculatedData.prefab.total) / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm" style={{ color: '#C55A00' }}>
                          {t('priceAnalysis.calculator.youSave')} ({Math.round(((calculatedData.traditional.total - calculatedData.prefab.total) / calculatedData.traditional.total) * 100)}%)
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Detailed Analysis with Charts */}
      <section
        id="detailed-analysis"
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4 font-bold" style={{ color: '#1a1a1a' }}>
              {t('priceAnalysis.detailedAnalysis.title')}
            </h2>
            <p style={{ color: '#C55A00' }} className="text-lg mb-4">
              {t('priceAnalysis.detailedAnalysis.subtitle')}
            </p>
          </motion.div>

          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList
              className="grid w-full grid-cols-4 border-0"
              style={{ backgroundColor: '#FFF5E6' }}
            >
              <TabsTrigger value="breakdown" style={{ color: '#C55A00' }}>
                {t('priceAnalysis.detailedAnalysis.tabs.breakdown')}
              </TabsTrigger>
              <TabsTrigger value="timeline" style={{ color: '#C55A00' }}>
                {t('priceAnalysis.detailedAnalysis.tabs.timeline')}
              </TabsTrigger>
              <TabsTrigger value="quality" style={{ color: '#C55A00' }}>
                {t('priceAnalysis.detailedAnalysis.tabs.quality')}
              </TabsTrigger>
              <TabsTrigger value="savings" style={{ color: '#C55A00' }}>
                {t('priceAnalysis.detailedAnalysis.tabs.savings')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="mt-8">
              {/* Bar Chart Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Card
                  className="border-0"
                  style={{
                    backgroundColor: '#FFF5E6',
                    border: '1px solid #FFD0A0'
                  }}
                >
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('priceAnalysis.detailedAnalysis.charts.phaseWiseComparison')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={comparisonBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#FFD0A0" />
                        <XAxis dataKey="phase" stroke="#1a1a1a" />
                        <YAxis stroke="#1a1a1a" label={{ value: t('priceAnalysis.detailedAnalysis.charts.costLabel'), angle: -90, position: 'insideLeft' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="traditional" fill={COLORS.traditional} name={t('priceAnalysis.tooltips.traditional')} radius={[8, 8, 0, 0]} />
                        <Bar dataKey="prefab" fill={COLORS.prefab} name={t('priceAnalysis.tooltips.prefab')} radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-8">
              {/* Line Chart for Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0" style={{ backgroundColor: '#FFF5E6', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('priceAnalysis.detailedAnalysis.charts.timelineComparison')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={savingsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#FFD0A0" />
                        <XAxis dataKey="size" stroke="#1a1a1a" />
                        <YAxis stroke="#1a1a1a" label={{ value: t('priceAnalysis.detailedAnalysis.charts.monthsLabel'), angle: -90, position: 'insideLeft' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="traditional" stroke={COLORS.traditional} strokeWidth={3} name={t('priceAnalysis.tooltips.traditional')} dot={{ r: 6 }} />
                        <Line type="monotone" dataKey="prefab" stroke={COLORS.prefab} strokeWidth={3} name={t('priceAnalysis.tooltips.prefab')} dot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="quality" className="mt-8">
              {/* Radar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0" style={{ backgroundColor: '#FFF5E6', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('priceAnalysis.detailedAnalysis.charts.qualityComparison')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={qualityFactors.map(q => ({ subject: q.factor.split(' ')[0], traditional: q.traditional, prefab: q.prefab }))}>
                        <PolarGrid stroke="#FFD0A0" />
                        <PolarAngleAxis dataKey="subject" stroke="#1a1a1a" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#C55A00" />
                        <Radar name={t('priceAnalysis.tooltips.traditional')} dataKey="traditional" stroke={COLORS.traditional} fill={COLORS.traditional} fillOpacity={0.5} />
                        <Radar name={t('priceAnalysis.tooltips.prefab')} dataKey="prefab" stroke={COLORS.prefab} fill={COLORS.prefab} fillOpacity={0.5} />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="savings" className="mt-8">
              {/* Composed Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0" style={{ backgroundColor: '#FFF5E6', border: '1px solid #FFD0A0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('priceAnalysis.detailedAnalysis.charts.savingsAnalysis')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart data={savingsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#FFD0A0" />
                        <XAxis dataKey="size" stroke="#1a1a1a" />
                        <YAxis stroke="#1a1a1a" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="traditional" fill={COLORS.traditional} stroke={COLORS.traditional} fillOpacity={0.3} />
                        <Area type="monotone" dataKey="prefab" fill={COLORS.prefab} stroke={COLORS.prefab} fillOpacity={0.3} />
                        <Bar dataKey="savings" fill={COLORS.accent} radius={[8, 8, 0, 0]} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Disclaimer Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 p-4 rounded-lg"
        style={{
          backgroundColor: '#FFF5E6',
          borderLeft: '4px solid #FB921D'
        }}
      >
        <p className="ttext-sm leading-relaxed" style={{ color: '#666' }}>
          <strong style={{ color: '#FB921D' }}>Note:</strong>  {t('priceCalculator.disclaimer.text')}{' '}

          <button
            onClick={() => openPopup()}
            className="font-black underline hover:no-underline inline-flex items-center gap-0.5"
            style={{ color: '#FB921D' }}
          >
            {t('priceCalculator.disclaimer.contactExpert')}
            <ArrowRight className="h-3 w-3" />
          </button>
        </p>
      </motion.div>

      {/* Final CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 font-bold">
            {t('priceAnalysis.finalCta.title')}
          </h2>
          <p
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('priceCalculator.disclaimer.text')}{' '}

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
            onClick={openPopup}
          >
            {t('priceAnalysis.finalCta.button')}
          </Button>
        </div>
      </section>
    </div>
  );
}
