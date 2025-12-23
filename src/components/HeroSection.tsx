'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Leaf, IndianRupee, Timer, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaXTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const HeroSection = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showSocial, setShowSocial] = useState(true);
  const { t } = useLanguage();

  const cards = [
    {
      icon: <Leaf className="h-8 w-8" style={{ color: '#FB921D' }} />,
      title: t('hero.cards.sustainable.title'),
      subtitle: t('hero.cards.sustainable.subtitle'),
      description: t('hero.cards.sustainable.description'),
      image: "/images/hero/house.jpg"
    },
    {
      icon: <IndianRupee className="h-8 w-8" style={{ color: '#FB921D' }} />,
      title: t('hero.cards.savings.title'),
      subtitle: t('hero.cards.savings.subtitle'),
      description: t('hero.cards.savings.description'),
      image: "/images/hero/Balacony.jpg"
    },
    {
      icon: <Timer className="h-8 w-8" style={{ color: '#FB921D' }} />,
      title: t('hero.cards.speed.title'),
      subtitle: t('hero.cards.speed.subtitle'),
      description: t('hero.cards.speed.description'),
      image: "/images/hero/3x-faster.jpg"
    }
  ];

  const socialLinks = [
    {
      name: 'X',
      icon: <FaXTwitter />,
      url: 'https://twitter.com/simplyprefab',
      color: '#000000'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com/simplyprefab',
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      url: 'https://facebook.com/simplyprefab',
      color: '#1877F2'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      url: 'https://linkedin.com/company/simplyprefab',
      color: '#0A66C2'
    },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      url: 'https://youtube.com/@simplyprefab',
      color: '#FF0000'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-16">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(to bottom right, rgba(251, 146, 29, 0.2), white, rgba(251, 146, 29, 0.2))' 
            }} 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-orange-900/40" />
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'radial-gradient(ellipse at top right, rgba(251, 146, 29, 0.25), transparent 50%), radial-gradient(ellipse at bottom left, rgba(251, 146, 29, 0.2), transparent 50%)' 
          }} 
        />
      </div>

      {/* Follow Us - Vertical Sidebar */}
      <AnimatePresence>
        {showSocial && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-50"
          >
            <div
              style={{
                background: '#FB921D',
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
                boxShadow: '2px 0 12px rgba(251, 146, 29, 0.3)',
                width: '50px'
              }}
            >
              {/* Close Button - Desktop Only */}
              <button
                onClick={() => setShowSocial(false)}
                className="hidden md:flex w-full items-center justify-center py-2 hover:bg-black/10 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>

              {/* Follow Us Text - Vertical */}
              <div className="flex items-center justify-center py-3">
                <div 
                  className="text-white font-bold text-[10px] tracking-[0.2em]"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed'
                  }}
                >
                  FOLLOW US
                </div>
              </div>

              {/* Social Icons - Vertical */}
              <div className="flex flex-col items-center space-y-2 py-3 px-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.08,
                      type: 'spring',
                      stiffness: 200
                    }}
                    className="group relative"
                    title={social.name}
                  >
                    <div
                      className="flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                      style={{ 
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div 
                        style={{ 
                          color: social.color,
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {social.icon}
                      </div>
                    </div>
                    
                    {/* Tooltip on hover - Desktop only */}
                    <div 
                      className="hidden md:block absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none"
                      style={{
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {social.name}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button when closed - Desktop Only */}
      {!showSocial && (
        <motion.button
          onClick={() => setShowSocial(true)}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex flex-col items-center fixed left-0 top-1/2 -translate-y-1/2 z-50 px-2 py-6"
          style={{
            background: '#FB921D',
            borderTopRightRadius: '12px',
            borderBottomRightRadius: '12px',
            boxShadow: '2px 0 12px rgba(251, 146, 29, 0.4)',
            width: '36px'
          }}
        >
          <div 
            className="text-white font-bold text-[9px] tracking-wider"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            FOLLOW
          </div>
        </motion.button>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="w-full space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 lg:mb-6 leading-tight font-bold drop-shadow-2xl">
                {t('hero.title')}
              </h1>
              <p 
                className="text-base sm:text-lg lg:text-xl text-white mb-0 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
                style={{
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.7)'
                }}
              >
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link href="/models" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="px-6 sm:px-8 w-full sm:w-auto py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
                  style={{
                    backgroundColor: '#FB921D',
                    color: 'white',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLElement).style.boxShadow = '0 12px 24px rgba(251, 146, 29, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {t('hero.cta1')}
                </Button>
              </Link>
              <Link href="/price-analysis" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto py-3 border-2 font-semibold transition-all duration-300 shadow-md"
                  style={{
                    borderColor: '#FB921D',
                    color: 'white',
                    backgroundColor: 'rgba(251, 146, 29, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                    (e.target as HTMLElement).style.borderColor = '#FB921D';
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(251, 146, 29, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(251, 146, 29, 0.1)';
                    (e.target as HTMLElement).style.borderColor = '#FB921D';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {t('hero.cta2')}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 lg:pt-8"
            >
              <div className="text-center lg:text-left bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-orange-400/30">
                <div 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg"
                  style={{ color: '#FB921D' }}
                >
                  100+
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">{t('hero.stats.homesBuilt')}</div>
              </div>
              <div className="text-center lg:text-left bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-orange-400/30">
                <div 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg"
                  style={{ color: '#FB921D' }}
                >
                  24%
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">{t('hero.stats.costSavings')}</div>
              </div>
              <div className="text-center lg:text-left bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-orange-400/30">
                <div 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg"
                  style={{ color: '#FB921D' }}
                >
                  60%
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">{t('hero.stats.lessWaste')}</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Unified Card Display */}
          <div className="w-full order-1 lg:order-2">
            {/* Card Container - Responsive */}
            <div className="relative h-[350px] sm:h-[450px] lg:h-[600px] mb-4 sm:mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div 
                    className="bg-white rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden h-full border-2 flex flex-col"
                    style={{ 
                      borderColor: '#FB921D',
                      boxShadow: '0 20px 50px rgba(251, 146, 29, 0.3)'
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative h-3/5 flex-shrink-0 overflow-hidden rounded-t-xl lg:rounded-t-2xl">
                      <ImageWithFallback
                        src={cards[currentCard].image}
                        alt={cards[currentCard].title}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to top, rgba(251, 146, 29, 0.6) 0%, transparent 60%)'
                        }}
                      />
                      
                      {/* Icon Badge */}
                      <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          {React.cloneElement(cards[currentCard].icon, { 
                            className: 'w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8',
                            style: { color: '#FB921D' }
                          })}
                        </div>
                      </div>
                      
                      {/* Card Number */}
                      <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
                        <div 
                          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white text-sm lg:text-base font-bold shadow-xl border-2 border-white"
                          style={{ backgroundColor: '#FB921D' }}
                        >
                          {currentCard + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-3 sm:p-4 lg:p-6 h-2/5 flex flex-col justify-center flex-shrink-0">
                      <h3 
                        className="text-base sm:text-lg lg:text-2xl mb-1 sm:mb-2 leading-tight font-bold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {cards[currentCard].title}
                      </h3>
                      <h4 
                        className="text-sm sm:text-base lg:text-lg mb-2 lg:mb-3 font-semibold"
                        style={{ color: '#FB921D' }}
                      >
                        {cards[currentCard].subtitle}
                      </h4>
                      <p 
                        className="text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-2 lg:line-clamp-none"
                        style={{ color: '#4a4a4a' }}
                      >
                        {cards[currentCard].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Desktop Tab Navigation - Bottom Right */}
              <div 
                className="hidden lg:flex absolute bottom-0 right-0 flex-col space-y-2 rounded-tl-2xl p-4 z-10"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(251, 146, 29, 0.2)'
                }}
              >
                {cards.map((card, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className="group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left min-w-[200px]"
                    style={{
                      backgroundColor: index === currentCard ? '#FB921D' : 'white',
                      color: index === currentCard ? 'white' : '#1a1a1a',
                      borderColor: index === currentCard ? '#FB921D' : '#FFE0C0',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      boxShadow: index === currentCard ? '0 4px 12px rgba(251, 146, 29, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (index !== currentCard) {
                        (e.currentTarget as HTMLElement).style.backgroundColor = '#FFF5E6';
                        (e.currentTarget as HTMLElement).style.borderColor = '#FB921D';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== currentCard) {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                        (e.currentTarget as HTMLElement).style.borderColor = '#FFE0C0';
                      }
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: index === currentCard ? 'rgba(255, 255, 255, 0.25)' : '#FFF5E6'
                      }}
                    >
                      {React.cloneElement(card.icon, { 
                        className: 'h-4 w-4',
                        style: { color: index === currentCard ? 'white' : '#FB921D' }
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div 
                        className="font-semibold text-sm"
                        style={{
                          color: index === currentCard ? 'white' : '#1a1a1a'
                        }}
                      >
                        {card.title}
                      </div>
                      <div 
                        className="text-xs truncate"
                        style={{
                          color: index === currentCard ? 'rgba(255, 255, 255, 0.85)' : '#666'
                        }}
                      >
                        {card.subtitle}
                      </div>
                    </div>
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: index === currentCard ? 'white' : '#FB921D'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Tab Navigation - Horizontal Scroll */}
            <div className="lg:hidden overflow-x-auto pb-2">
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
                div {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              <div className="flex space-x-2 sm:space-x-3 px-1">
                {cards.map((card, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className="flex-shrink-0 flex items-center space-x-2 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 min-w-[120px] sm:min-w-[140px] border-2"
                    style={{
                      backgroundColor: index === currentCard ? '#FB921D' : 'rgba(255, 255, 255, 0.95)',
                      color: index === currentCard ? 'white' : '#1a1a1a',
                      borderColor: index === currentCard ? '#FB921D' : '#FFD0A0',
                      boxShadow: index === currentCard ? '0 4px 12px rgba(251, 146, 29, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: index === currentCard ? 'rgba(255, 255, 255, 0.25)' : '#FFF5E6'
                      }}
                    >
                      {React.cloneElement(card.icon, { 
                        className: 'h-3 w-3 sm:h-4 sm:w-4',
                        style: { color: index === currentCard ? 'white' : '#FB921D' }
                      })}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div 
                        className="font-semibold text-xs sm:text-sm truncate"
                        style={{
                          color: index === currentCard ? 'white' : '#1a1a1a'
                        }}
                      >
                        {card.title.length > 12 ? card.title.substring(0, 12) + '...' : card.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
