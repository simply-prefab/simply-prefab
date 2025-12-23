'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Portland, OR",
      rating: 5,
      text: "Fast delivery, eco-materials, saved 20%. EcoPrefab exceeded all our expectations. The process was smooth from start to finish.",
      project: "Modern Family Home",
      image: "https://images.unsplash.com/photo-1494790108755-2616b152b7ad?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      location: "Austin, TX",
      rating: 5,
      text: "Highly recommend for green, cost-effective homes. The quality is outstanding and the energy efficiency is exactly what we wanted.",
      project: "Sustainable Cottage",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      location: "Denver, CO",
      rating: 5,
      text: "The entire process was transparent and professional. We moved in 8 weeks earlier than planned with traditional construction.",
      project: "Eco-Friendly Cabin",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Thompson",
      location: "Seattle, WA",
      rating: 5,
      text: "Amazing quality control and customer service. The factory-built precision is evident in every detail of our home.",
      project: "Contemporary Villa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lisa Park",
      location: "San Francisco, CA",
      rating: 5,
      text: "Sustainable materials, beautiful design, and incredible support team. Our dream home became a reality faster than we imagined.",
      project: "Urban Green Home",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #FFF5E6 0%, white 50%, #FFE0C0 100%)'
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-2" 
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl mb-4 font-bold"
            style={{ color: '#1a1a1a' }}
          >
            {t('testimonials.title')}
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#666' }}
          >
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Card 
                  className="h-full shadow-2xl border-0"
                  style={{
                    background: 'linear-gradient(135deg, #FFF5E6 0%, white 100%)',
                    border: '2px solid #FFD0A0'
                  }}
                >
                  <CardContent className="p-8 md:p-12 h-full flex flex-col justify-center">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <Quote 
                          className="h-12 w-12"
                          style={{ color: '#FB921D' }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex space-x-1 mb-4">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-5 w-5 fill-current"
                              style={{ color: '#FB921D' }}
                            />
                          ))}
                        </div>

                        <blockquote 
                          className="text-lg md:text-xl mb-6 leading-relaxed font-medium"
                          style={{ color: '#1a1a1a' }}
                        >
                          "{testimonials[currentTestimonial].text}"
                        </blockquote>

                        <div className="flex items-center space-x-4">
                          <img
                            src={testimonials[currentTestimonial].image}
                            alt={testimonials[currentTestimonial].name}
                            className="w-12 h-12 rounded-full object-cover"
                            style={{ border: '2px solid #FB921D' }}
                          />
                          <div>
                            <div 
                              className="font-semibold"
                              style={{ color: '#1a1a1a' }}
                            >
                              {testimonials[currentTestimonial].name}
                            </div>
                            <div 
                              className="text-sm"
                              style={{ color: '#666' }}
                            >
                              {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].project}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full shadow-lg border-2 transition-all duration-300"
              style={{
                backgroundColor: 'white',
                borderColor: '#C55A00',
                color: '#C55A00'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#C55A00';
                (e.target as HTMLElement).style.color = 'white';
                (e.target as HTMLElement).style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'white';
                (e.target as HTMLElement).style.color = '#C55A00';
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full shadow-lg border-2 transition-all duration-300"
              style={{
                backgroundColor: 'white',
                borderColor: '#C55A00',
                color: '#C55A00'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#C55A00';
                (e.target as HTMLElement).style.color = 'white';
                (e.target as HTMLElement).style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'white';
                (e.target as HTMLElement).style.color = '#C55A00';
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentTestimonial ? '#FB921D' : '#FFD0A0',
                  transform: index === currentTestimonial ? 'scale(1.2)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentTestimonial) {
                    (e.target as HTMLElement).style.backgroundColor = '#666';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentTestimonial) {
                    (e.target as HTMLElement).style.backgroundColor = '#FFD0A0';
                  }
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 hidden lg:block"
        >
          <div className="grid grid-cols-5 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => setCurrentTestimonial(index)}
                className={`cursor-pointer transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'opacity-100' 
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{
                  transform: index === currentTestimonial ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <Card 
                  className="p-4 text-center shadow-md border-0"
                  style={{
                    backgroundColor: 'white',
                    border: index === currentTestimonial ? '2px solid #FB921D' : '1px solid #FFD0A0'
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                    style={{ 
                      border: index === currentTestimonial ? '2px solid #FB921D' : '1px solid #FFD0A0' 
                    }}
                  />
                  <div 
                    className="text-sm font-semibold mb-1"
                    style={{ color: '#1a1a1a' }}
                  >
                    {testimonial.name}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: '#666' }}
                  >
                    {testimonial.location}
                  </div>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-3 w-3 fill-current"
                        style={{ color: '#FB921D' }}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div 
            className="rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, #FB921D 0%, #E67E0F 100%)',
              color: 'white'
            }}
          >
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                <div className="text-3xl font-bold mb-2">4.2/5</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {t('testimonials.stats.averageRating')}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {t('testimonials.stats.happyCustomers')}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">90%</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {t('testimonials.stats.wouldRecommend')}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-300" />
                  ))}
                </div>
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Verified Reviews
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="text-center p-6 rounded-xl"
              style={{ backgroundColor: '#FFF5E6' }}
            >
                <div 
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#FB921D' }}
                >
                  {t('testimonials.bottomStats.fasterTitle')}
                </div>
              <p style={{ color: '#666' }}>
                {t('testimonials.bottomStats.fasterDescription')}
              </p>
            </div>
            <div 
              className="text-center p-6 rounded-xl"
              style={{ backgroundColor: '#FFE0C0' }}
            >
              <h3 
                className="text-2xl font-bold mb-2"
                style={{ color: '#C55A00' }}
              >
                {t('testimonials.bottomStats.savingsTitle')}
              </h3>
              <p style={{ color: '#C55A00' }}>
                {t('testimonials.bottomStats.savingsDescription')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
