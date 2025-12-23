'use client'

import { Calendar, CheckCircle2, MessageCircle, PaintBucket, Phone, Truck, Users } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedStep, setSelectedStep] = useState(1);
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: MessageCircle,
      title: t('howItWorks.steps.request.title'),
      description: t('howItWorks.steps.request.description'),
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0YXRpb24lMjBtZWV0aW5nJTIwaG9tZSUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NTY5OTI2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      details: t('howItWorks.steps.request.details')
    },
    {
      id: 2,
      icon: Users,
      title: t('howItWorks.steps.meet.title'),
      description: t('howItWorks.steps.meet.description'),
      image: "https://images.unsplash.com/photo-1600880292149-d9c0c3b4b0e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHBlcnQlMjBjb25zdWx0YXRpb24lMjBhcmNoaXRlY3R8ZW58MXx8fHwxNzU2OTkyNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      details: t('howItWorks.steps.meet.details')
    },
    {
      id: 3,
      icon: Calendar,
      title: t('howItWorks.steps.book.title'),
      description: t('howItWorks.steps.book.description'),
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcHJvamVjdCUyMHNjaGVkdWxlJTIwaG9tZXxlbnwxfHx8fDE3NTY5OTI2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      details: t('howItWorks.steps.book.details')
    },
    {
      id: 4,
      icon: PaintBucket,
      title: t('howItWorks.steps.designs.title'),
      description: t('howItWorks.steps.designs.description'),
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      details: t('howItWorks.steps.designs.details')
    },
    {
      id: 5,
      icon: Truck,
      title: t('howItWorks.steps.track.title'),
      description: t('howItWorks.steps.track.description'),
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
      details: t('howItWorks.steps.track.details')
    },
    {
      id: 6,
      icon: CheckCircle2,
      title: t('howItWorks.steps.settle.title'),
      description: t('howItWorks.steps.settle.description'),
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      details: t('howItWorks.steps.settle.details')
    }
  ];

  const getStepImage = () => {
    const step = steps.find(s => s.id === selectedStep);
    return step?.image || '';
  };

  const getStepDetails = () => {
    const step = steps.find(s => s.id === selectedStep);
    return step?.details || step?.description || "";
  };

  return (
    <section 
      id="how-it-works" 
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFE0C0 0%, #FFF5E6 100%)'
      }}
    >
      {/* Orange accent line at top */}
      <div 
        className="absolute top-0 left-0 w-full h-2" 
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      {/* Background decoration with Orange Theme */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full translate-x-48 -translate-y-48"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 146, 29, 0.2) 0%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge 
            className="mb-4 text-lg px-4 py-2 border-0"
            style={{
              backgroundColor: '#FB921D',
              color: 'white'
            }}
          >
            {t('howItWorks.badge')}
          </Badge>
          <h2 
            className="text-4xl md:text-5xl mb-6 font-bold tracking-tight"
            style={{ color: '#1a1a1a' }}
          >
            {t('howItWorks.heading')}
          </h2>
          <p 
            className="text-xl max-w-4xl mx-auto"
            style={{ color: '#666' }}
          >
            <strong>{t('howItWorks.planBuildTrackSettle.bold')}</strong> {t('howItWorks.planBuildTrackSettle.rest')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Steps with Animated Connection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Animated Connection Line with Orange Theme */}
            <div 
              className="absolute left-8 top-16 bottom-16 w-0.5"
              style={{ backgroundColor: '#FFD0A0' }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                className="w-full"
                style={{
                  background: 'linear-gradient(to bottom, #FB921D, #C55A00)'
                }}
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className="relative flex items-start space-x-6"
                  >
                    {/* Step Icon Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        bounce: 0.4
                      }}
                      className="relative z-10 flex-shrink-0"
                    >
                      <button
                        onClick={() => setSelectedStep(step.id)}
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                        style={{
                          backgroundColor: selectedStep === step.id ? '#FB921D' : '#C55A00',
                          color: 'white',
                          transform: selectedStep === step.id ? 'scale(1.1)' : 'scale(1)',
                          boxShadow: selectedStep === step.id
                            ? '0 20px 25px -5px rgba(251, 146, 29, 0.3), 0 8px 10px -6px rgba(251, 146, 29, 0.3)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedStep !== step.id) {
                            (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                            (e.target as HTMLElement).style.transform = 'scale(1.05)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedStep !== step.id) {
                            (e.target as HTMLElement).style.backgroundColor = '#C55A00';
                            (e.target as HTMLElement).style.transform = 'scale(1)';
                          }
                        }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </button>
                      
                      {/* Step number badge */}
                      <div 
                        className="absolute -top-1 -right-1 w-6 h-6 text-white text-xs rounded-full flex items-center justify-center font-bold"
                        style={{ backgroundColor: '#8B4513' }}
                      >
                        {step.id}
                      </div>
                    </motion.div>

                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        className="text-xl font-semibold mb-2"
                        style={{
                          color: selectedStep === step.id ? '#FB921D' : '#1a1a1a'
                        }}
                      >
                        {step.title}
                        <span 
                          className="ml-2 text-sm"
                          style={{ color: '#666' }}
                        >
                          ({t('howItWorks.clickToPreview')})
                        </span>
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="text-base leading-relaxed"
                        style={{ color: '#666' }}
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <Card 
              className="shadow-2xl border-0 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE0C0 100%)',
                border: '1px solid #FFD0A0'
              }}
            >
              <CardContent className="p-0 relative">
                {/* Step Preview Image */}
                <motion.div
                  key={selectedStep}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-64"
                >
                  <ImageWithFallback
                    src={getStepImage()}
                    alt={`Step ${selectedStep}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Step indicator */}
                  <div className="absolute top-4 right-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ backgroundColor: '#FB921D' }}
                    >
                      {selectedStep}
                    </div>
                  </div>

                  {/* Step title overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-semibold">
                      {steps.find(s => s.id === selectedStep)?.title}
                    </div>
                  </div>
                </motion.div>

                {/* Step Details */}
                <div className="p-6">
                  <motion.div
                    key={selectedStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p
                      className="leading-relaxed mb-6"
                      style={{ color: '#666' }}
                    >
                      {getStepDetails()}
                    </p>

                    {/* Talk to Expert Button */}
                    <div className="flex flex-col space-y-3">
                      <Button
                        onClick={openPopup}
                        className="w-full text-white font-medium transition-all duration-300 border-2"
                        style={{
                          backgroundColor: '#FB921D',
                          borderColor: '#FB921D'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                          (e.target as HTMLElement).style.borderColor = '#E67E0F';
                          (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                          (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(251, 146, 29, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                          (e.target as HTMLElement).style.borderColor = '#FB921D';
                          (e.target as HTMLElement).style.transform = 'translateY(0)';
                          (e.target as HTMLElement).style.boxShadow = 'none';
                        }}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {t('howItWorks.scheduleCall')}
                      </Button>

                      {/* Step Navigation Dots */}
                      <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            onClick={() => setSelectedStep(num)}
                            className="w-3 h-3 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: selectedStep === num ? '#FB921D' : '#FFD0A0',
                              transform: selectedStep === num ? 'scale(1.25)' : 'scale(1)',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              if (selectedStep !== num) {
                                (e.target as HTMLElement).style.backgroundColor = '#666';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedStep !== num) {
                                (e.target as HTMLElement).style.backgroundColor = '#FFD0A0';
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements with Orange Theme */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-4 -right-4 z-0"
                >
                  <div 
                    className="w-24 h-24 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251, 146, 29, 0.2) 0%, rgba(197, 90, 0, 0.2) 100%)'
                    }}
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Stats with Orange Theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 rounded-2xl p-8 text-white"
          style={{
            background: 'linear-gradient(135deg, #FB921D 0%, #D66A00 100%)'
          }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <div className="text-4xl font-bold mb-2">2-3</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{t('howItWorks.stats.weeksPlanning')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="text-4xl font-bold mb-2">4-6</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{t('howItWorks.stats.weeksManufacturing')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <div className="text-4xl font-bold mb-2">Real-time</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{t('howItWorks.stats.progressTracking')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <div className="text-4xl font-bold mb-2">2-3</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{t('howItWorks.stats.daysAssembly')}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;