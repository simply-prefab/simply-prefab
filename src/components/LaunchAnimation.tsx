'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';

const LaunchAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if animation has been shown before
    const hasSeenAnimation = localStorage.getItem('simplyprefab-launch-seen');
    
    if (!hasSeenAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  const handleClose = () => {
    setShowAnimation(false);
    localStorage.setItem('simplyprefab-launch-seen', 'true');
  };

  const handleTalkToExpert = () => {
    handleClose();
    openPopup();
  };

  // Prevent hydration issues
  if (!isMounted) {
    return null;
  }

  // Get features as an array
  const features = t('launch.features');
  const featuresArray = Array.isArray(features) ? features : [];

  return (
    <AnimatePresence>
      {showAnimation && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={handleClose}
          />
          
          {/* Animation Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              type: "spring", 
              duration: 0.8, 
              bounce: 0.4 
            }}
            className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
          >
            <div className="relative pointer-events-auto">
              {/* Blast Effect - Orange gradient */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1], 
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 1.5, 
                  times: [0, 0.6, 1],
                  ease: "easeOut" 
                }}
                className="absolute -top-8 -left-8 w-16 h-16 rounded-full"
                style={{ 
                  background: `conic-gradient(from 0deg, #FB921D, #E67E0F, #D66A00, #FB921D)` 
                }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>

              {/* Main Content Card */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 border-2"
                style={{ borderColor: '#FB921D' }}
              >
                {/* Close Button */}
                <motion.button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: '#FFF5E6',
                    color: '#D66A00'
                  }}
                  whileHover={{ 
                    backgroundColor: '#FFE0C0',
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-bold">×</span>
                </motion.button>

                {/* Animated Percentage - Orange */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.6 }}
                  className="text-center mb-6"
                >
                  <div 
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                    style={{ backgroundColor: 'rgba(251, 146, 29, 0.15)' }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="text-3xl font-bold"
                      style={{ color: '#FB921D' }}
                    >
                      30%
                    </motion.span>
                  </div>
                </motion.div>

                {/* Main Message */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-2xl font-bold mb-3" style={{ color: '#3C2414' }}>
                    {t('launch.heading')}
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#8B4513' }}>
                    <span className="font-semibold" style={{ color: '#3C2414' }}>
                      {t('launch.savingsLead')}
                    </span> {t('launch.savingsRest')}
                  </p>
                </motion.div>

                {/* Features - Orange bullets */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="space-y-3 mb-6"
                >
                  {featuresArray.map((feature: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#FB921D' }}
                      />
                      <span className="text-sm" style={{ color: '#8B4513' }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons - Orange gradient */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex flex-col space-y-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleTalkToExpert}
                      className="w-full py-3 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
                      style={{ 
                        background: 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)',
                        border: 'none'
                      }}
                    >
                      <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      {t('launch.cta.talkToExpert')}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                  
                  <motion.button
                    onClick={handleClose}
                    className="w-full py-3 text-sm font-medium rounded-lg border transition-all duration-200 hover:shadow-md"
                    style={{ 
                      borderColor: '#FFE0C0', 
                      color: '#8B4513',
                      backgroundColor: 'transparent' 
                    }}
                    whileHover={{ 
                      backgroundColor: '#FFF5E6',
                      color: '#3C2414'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('launch.cta.exploreFirst')}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Floating Particles - Orange gradient */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 1 : -1) * (50 + i * 20)],
                    y: [0, -50 - i * 10]
                  }}
                  transition={{ 
                    delay: 0.5 + i * 0.1, 
                    duration: 2,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full pointer-events-none"
                  style={{ 
                    backgroundColor: i % 2 === 0 ? '#FB921D' : '#E67E0F',
                    transform: `translate(-50%, -50%)`
                  }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LaunchAnimation;
