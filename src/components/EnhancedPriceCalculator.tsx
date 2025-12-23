'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Calculator, CheckCircle, Clock, Home, IndianRupee, Phone, Ruler, TrendingDown, Zap, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  calculateCosts,
  calculateTime,
  formatCurrency,
  priceCalculatorConfig
} from '@/config/priceCalculator.config';
import { useLanguage } from '@/contexts/LanguageContext';

// Animated Counter with stagger effect
const AnimatedCounter = ({ value, prefix = '₹' }: { value: number; prefix?: string }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {prefix}{display.toLocaleString()}
    </motion.span>
  );
};

// Comparison Animation Component
const ComparisonAnimation = ({ traditional, prefab, t }: { traditional: number; prefab: number; t: (key: string) => string }) => {
  const savings = traditional - prefab;
  const savingsPercent = ((savings / traditional) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Traditional */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-black" style={{ color: '#6B5A4C' }}>
            {t('priceCalculator.comparison.traditional')}
          </span>
          <span className="text-lg font-black text-red-600">{formatCurrency(traditional, true)}</span>
        </div>
        <motion.div
          className="relative h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: '#FFE0C0' }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Arrow Down Animation */}
      <motion.div
        className="flex justify-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl"
        >
          📉
        </motion.div>
      </motion.div>

      {/* SimplyPrefab */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-black" style={{ color: '#6B5A4C' }}>
            {t('priceCalculator.comparison.simplyprefab')}
          </span>
          <motion.span
            className="text-lg font-black"
            style={{ color: '#FB921D' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {formatCurrency(prefab, true)}
          </motion.span>
        </div>
        <motion.div
          className="relative h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: '#FFF0E6' }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(prefab / traditional) * 100}%` }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.7 }}
          />
        </motion.div>
      </motion.div>

      {/* Savings Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="p-4 rounded-xl text-center border-2"
        style={{ backgroundColor: '#FFF0E6', borderColor: '#FB921D' }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 1.5 }}
          className="text-3xl font-black mb-1"
          style={{ color: '#FB921D' }}
        >
          💰 <AnimatedCounter value={Math.round(savings)} prefix="" />
        </motion.div>
        <div className="text-xs font-black uppercase tracking-wide" style={{ color: '#FB921D' }}>
          {t('priceCalculator.comparison.youSave')} {savingsPercent}%
        </div>
      </motion.div>
    </div>
  );
};

const EnhancedPriceCalculator = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [area, setArea] = useState(priceCalculatorConfig.defaults.area);
  const [constructionType, setConstructionType] = useState(priceCalculatorConfig.defaults.constructionType);
  const [city, setCity] = useState(priceCalculatorConfig.defaults.city);
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const costs = calculateCosts(area, constructionType, city);
  const time = calculateTime(area);
  const { openPopup } = useExpertConsultation();
  
  // Check if volume discount is active
  const isVolumeDiscount = area > priceCalculatorConfig.volumeDiscounts.threshold;

  useEffect(() => {
    setMounted(true);
    setArea(priceCalculatorConfig.defaults.area);
    setConstructionType(priceCalculatorConfig.defaults.constructionType);
    setCity(priceCalculatorConfig.defaults.city);
  }, []);

  if (!mounted) return null;

  return (
    <section id="calculator" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F4E8DC' }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 -ml-40 -mt-40" style={{ backgroundColor: '#FB921D' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 -mr-40 -mb-40" style={{ backgroundColor: '#FB921D' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5 -translate-x-32 -translate-y-32" style={{ backgroundColor: '#FB921D' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            className="mb-4 text-lg px-4 py-2 shadow-md border-2"
            style={{
              backgroundColor: '#FFF5E6',
              color: '#FB921D',
              borderColor: '#FB921D'
            }}
          >
            <Calculator className="h-5 w-5 mr-2" />
            {t('priceCalculator.badge')}
          </Badge>

          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#2C2C2C' }}>
            {t('priceCalculator.title')} <span style={{ color: '#FB921D' }}>{t('priceCalculator.titleHighlight')}</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('priceCalculator.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="shadow-2xl border-0 overflow-hidden" style={{ backgroundColor: '#FFFBF8' }}>
              <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-black flex items-center" style={{ color: '#2C2C2C' }}>
                  <Home className="h-6 w-6 mr-3" style={{ color: '#FB921D' }} />
                  {t('priceCalculator.projectDetails.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('priceCalculator.projectDetails.description')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Area Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <Label htmlFor="area" className="text-sm font-black flex items-center gap-2" style={{ color: '#2C2C2C' }}>
                    <Ruler className="h-4 w-4" style={{ color: '#FB921D' }} />
                    {t('priceCalculator.area.label')}
                  </Label>

                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        id="area"
                        type="number"
                        value={area}
                        onChange={(e) => setArea(Math.max(100, Math.min(5000, Number(e.target.value))))}
                        className="text-lg h-14 pl-4 pr-16 border-2 font-black"
                        style={{ borderColor: '#E8D4C0', backgroundColor: '#FFF5E6', color: '#2C2C2C' }}
                        placeholder={t('priceCalculator.area.placeholder')}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#FB921D'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = '#E8D4C0'; }}
                      />
                      <motion.div
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 font-black text-lg"
                        style={{ color: '#FB921D' }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.3 }}
                      >
                        {t('priceCalculator.area.unit')}
                      </motion.div>
                    </div>

                    <input
                      type="range"
                      min="100"
                      max="5000"
                      step="100"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
                      style={{ backgroundColor: '#E8D4C0', accentColor: '#FB921D' }}
                    />
                    
                    {/* Volume Discount Badge */}
                    {isVolumeDiscount && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 p-3 rounded-lg border-2"
                        style={{ backgroundColor: '#FFF0E6', borderColor: '#FB921D' }}
                      >
                        <Star className="h-5 w-5" style={{ color: '#FB921D' }} />
                        <span className="text-sm font-black" style={{ color: '#FB921D' }}>
                          Extra 5% Prefab Discount Applied! (Area &gt; 2000 sq ft)
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Construction Type
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <Label htmlFor="constructionType" className="text-sm font-black" style={{ color: '#2C2C2C' }}>
                    {t('priceCalculator.constructionType.label')}
                  </Label>
                  <Select value={constructionType} onValueChange={setConstructionType}>
                    <SelectTrigger className="h-14 border-2 font-semibold" style={{ borderColor: '#E8D4C0' }}>
                      <SelectValue placeholder={t('priceCalculator.constructionType.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {priceCalculatorConfig.constructionTypes.map((type, idx) => (
                        <motion.div
                          key={type.value}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <SelectItem value={type.value} className="font-semibold">
                            {type.emoji} {type.label}
                          </SelectItem>
                        </motion.div>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div> */}

                {/* City */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <Label htmlFor="city" className="text-sm font-black" style={{ color: '#2C2C2C' }}>
                    {t('priceCalculator.city.label')}
                  </Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="h-14 border-2 font-semibold" style={{ borderColor: '#E8D4C0' }}>
                      <SelectValue placeholder={t('priceCalculator.city.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {priceCalculatorConfig.cities.map((cityOption) => (
                        <SelectItem key={cityOption.value} value={cityOption.value} className="font-semibold">
                          {cityOption.emoji} {cityOption.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Cost Summary - Flip Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="pt-6 border-t"
                  style={{ borderColor: '#E8D4C0' }}
                >
                  <motion.button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {!isFlipped ? (
                        <>
                          <motion.div
                            className="text-center p-4 rounded-xl"
                            style={{ backgroundColor: '#F5E6D3' }}
                            whileHover={{ y: -4 }}
                          >
                            <div className="text-xs font-black text-gray-600 mb-1 uppercase tracking-wide">
                              {t('priceCalculator.breakdown.traditionalConstruction')}
                            </div>
                            <div className="text-lg font-black" style={{ color: '#2C2C2C' }}>₹{costs.traditional}/sq ft</div>
                          </motion.div>
                          <motion.div
                            className="text-center p-4 rounded-xl"
                            style={{ backgroundColor: '#FFF0E6' }}
                            whileHover={{ y: -4 }}
                          >
                            <div className="text-xs font-black mb-1 uppercase tracking-wide" style={{ color: '#FB921D' }}>
                              {t('priceCalculator.breakdown.simplyprefab')}
                            </div>
                            <div className="text-lg font-black" style={{ color: '#FB921D' }}>₹{costs.prefab}/sq ft</div>
                          </motion.div>
                        </>
                      ) : (
                        <motion.div
                          className="col-span-2 text-center p-4 rounded-xl"
                          style={{
                            background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE0C0 100%)',
                            rotateY: 180
                          }}
                          animate={{ scale: [0.9, 1] }}
                        >
                          <div className="text-xs font-black mb-2 uppercase tracking-wide" style={{ color: '#FB921D' }}>
                            {t('priceCalculator.perSqFtSavings')}
                          </div>
                          <motion.div
                            className="text-2xl font-black"
                            style={{ color: '#FB921D' }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            ₹{costs.traditional - costs.prefab}
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.button>
                  <div className="text-center mt-2 text-xs font-semibold" style={{ color: '#A0704D' }}>
                    {t('priceCalculator.clickToCompare')}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Main Savings Card */}
            <Card
              className="shadow-2xl overflow-hidden relative border-0"
              style={{
                background: 'linear-gradient(135deg, #FB921D 0%, #FFB04F 100%)',
                color: 'white'
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16" />

              <CardContent className="p-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <IndianRupee className="h-8 w-8 mr-3" />
                      <h3 className="text-2xl font-black">{t('priceCalculator.totals.totalSavings')}</h3>
                    </div>
                    <motion.div
                      className="text-5xl font-black mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <AnimatedCounter value={costs.savings} />
                    </motion.div>
                    <div className="flex items-center text-white/95 font-bold">
                      <TrendingDown className="h-5 w-5 mr-2" />
                      {costs.savingsPercentage}% {t('priceCalculator.totals.lessThanTraditional')}
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-end mb-4">
                      <Clock className="h-8 w-8 mr-3" />
                      <h3 className="text-2xl font-black">{t('priceCalculator.totals.timeSaved')}</h3>
                    </div>
                    <motion.div
                      className="text-5xl font-black mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      {time.timeSaved}mo
                    </motion.div>
                    <div className="text-white/95 font-semibold">
                      {time.prefab} {t('priceCalculator.totals.monthsVs')} {time.traditional} {t('priceCalculator.totals.months')}
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Cost Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-xl border-2 h-full" style={{ borderColor: '#E8D4C0', backgroundColor: '#FFFBF8' }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-black" style={{ color: '#2C2C2C' }}>
                      {t('priceCalculator.breakdown.traditionalConstruction')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="text-3xl font-black mb-2"
                      style={{ color: '#2C2C2C' }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1 }}
                    >
                      {formatCurrency(costs.traditionalTotal, true)}
                    </motion.div>
                    <div className="text-sm text-gray-600 font-semibold mb-4">
                      {t('priceCalculator.breakdown.totalProjectCost')}
                    </div>

                    <div className="space-y-3">
                      {['materials', 'labor', 'others'].map((item, idx) => (
                        <motion.div
                          key={item}
                          className="flex justify-between text-sm font-semibold"
                          style={{ color: '#6B5A4C' }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                        >
                          <span>{t(`priceCalculator.breakdown.${item}`)}</span>
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                          >
                            {item === 'materials' && formatCurrency(costs.traditionalTotal * priceCalculatorConfig.costBreakdown.traditional.materials, true)}
                            {item === 'labor' && formatCurrency(costs.traditionalTotal * priceCalculatorConfig.costBreakdown.traditional.labor, true)}
                            {item === 'others' && formatCurrency(costs.traditionalTotal * priceCalculatorConfig.costBreakdown.traditional.others, true)}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card
                  className="shadow-xl border-2 h-full"
                  style={{
                    borderColor: '#FB921D',
                    backgroundColor: '#FFF0E6'
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-black flex items-center justify-between" style={{ color: '#FB921D' }}>
                      <span>{t('priceCalculator.breakdown.simplyprefab')}</span>
                      {isVolumeDiscount && (
                        <Badge className="text-xs font-black" style={{ backgroundColor: '#FB921D', color: 'white' }}>
                          -5%
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="text-3xl font-black mb-2"
                      style={{ color: '#FB921D' }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, delay: 0.1 }}
                    >
                      {formatCurrency(costs.prefabTotal, true)}
                    </motion.div>
                    <div className="text-sm font-semibold mb-4" style={{ color: '#A0704D' }}>
                      {t('priceCalculator.breakdown.totalProjectCost')}
                    </div>

                    <div className="space-y-3">
                      {['prefabModules', 'assembly', 'others'].map((item, idx) => (
                        <motion.div
                          key={item}
                          className="flex justify-between text-sm font-semibold"
                          style={{ color: '#6B5A4C' }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                        >
                          <span>{t(`priceCalculator.breakdown.${item}`)}</span>
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                          >
                            {item === 'prefabModules' && formatCurrency(costs.prefabTotal * priceCalculatorConfig.costBreakdown.prefab.modules, true)}
                            {item === 'assembly' && formatCurrency(costs.prefabTotal * priceCalculatorConfig.costBreakdown.prefab.assembly, true)}
                            {item === 'others' && formatCurrency(costs.prefabTotal * priceCalculatorConfig.costBreakdown.prefab.others, true)}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Zap, label: 'faster', value: priceCalculatorConfig.benefits.speed, color: '#FB921D' },
                { icon: CheckCircle, label: 'quality', value: priceCalculatorConfig.benefits.quality, color: '#E67E0F' },
                { icon: Home, label: 'lessWaste', value: priceCalculatorConfig.benefits.waste, color: '#FB921D' }
              ].map((benefit, idx) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="shadow-lg border-2"
                    style={{
                      background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE0C0 100%)',
                      borderColor: '#FFD0A0'
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      >
                        <benefit.icon className="h-8 w-8 mx-auto mb-3" style={{ color: benefit.color }} />
                      </motion.div>
                      <motion.div
                        className="text-2xl font-black mb-1"
                        style={{ color: benefit.color }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      >
                        {benefit.value}%
                      </motion.div>
                      <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                        {t(`priceCalculator.benefits.${benefit.label}`)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button
                  className="w-full h-14 text-base font-black shadow-lg rounded-lg text-white"
                  style={{ backgroundColor: '#FB921D' }}
                  onClick={() => openPopup()}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('priceCalculator.actions.scheduleCall')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                viewport={{ once: true }}
              >
                <Button
                  className="w-full h-14 border-2 text-base font-black rounded-lg transition-all"
                  style={{
                    borderColor: '#FB921D',
                    color: '#FB921D',
                    backgroundColor: '#FFFBF8'
                  }}
                  onClick={() => router.push('/price-analysis')}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  {t('priceCalculator.actions.detailedAnalysis')}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div
            className="flex items-start gap-3 p-4 rounded-lg border-l-4"
            style={{
              backgroundColor: '#FFF9F0',
              borderColor: '#FB921D'
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="w-5 h-5"
                style={{ color: '#FB921D' }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs leading-relaxed font-semibold flex-1" style={{ color: '#6B5A4C' }}>
              <span className="font-black" style={{ color: '#FB921D' }}>
                {t('priceCalculator.disclaimer.note')}:{' '}
              </span>
              {t('priceCalculator.disclaimer.text')}{' '}
              <button
                onClick={() => openPopup()}
                className="font-black underline hover:no-underline inline-flex items-center gap-0.5"
                style={{ color: '#FB921D' }}
              >
                {t('priceCalculator.disclaimer.contactExpert')}
                <ArrowRight className="h-3 w-3" />
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedPriceCalculator;
