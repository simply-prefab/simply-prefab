'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    { id: 'all', label: t('faqsPage.categories.all'), icon: HelpCircle },
    { id: 'general', label: t('faqsPage.categories.general'), icon: HelpCircle },
    { id: 'cost', label: t('faqsPage.categories.cost'), icon: HelpCircle },
    { id: 'construction', label: t('faqsPage.categories.construction'), icon: HelpCircle },
    { id: 'materials', label: t('faqsPage.categories.materials'), icon: HelpCircle },
    { id: 'design', label: t('faqsPage.categories.design'), icon: HelpCircle },
    { id: 'technical', label: t('faqsPage.categories.technical'), icon: HelpCircle }
  ];

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: t('faqsPage.faqs.1.question'),
      answer: t('faqsPage.faqs.1.answer')
    },
    {
      id: 2,
      category: 'materials',
      question: t('faqsPage.faqs.2.question'),
      answer: t('faqsPage.faqs.2.answer')
    },
    {
      id: 3,
      category: 'general',
      question: t('faqsPage.faqs.3.question'),
      answer: t('faqsPage.faqs.3.answer')
    },
    {
      id: 4,
      category: 'materials',
      question: t('faqsPage.faqs.4.question'),
      answer: t('faqsPage.faqs.4.answer')
    },
    {
      id: 5,
      category: 'general',
      question: t('faqsPage.faqs.5.question'),
      answer: t('faqsPage.faqs.5.answer')
    },
    {
      id: 6,
      category: 'general',
      question: t('faqsPage.faqs.6.question'),
      answer: t('faqsPage.faqs.6.answer')
    },
    {
      id: 7,
      category: 'general',
      question: t('faqsPage.faqs.7.question'),
      answer: t('faqsPage.faqs.7.answer')
    },
    {
      id: 8,
      category: 'design',
      question: t('faqsPage.faqs.8.question'),
      answer: t('faqsPage.faqs.8.answer')
    },
    {
      id: 9,
      category: 'design',
      question: t('faqsPage.faqs.9.question'),
      answer: t('faqsPage.faqs.9.answer')
    },
    {
      id: 10,
      category: 'design',
      question: t('faqsPage.faqs.10.question'),
      answer: t('faqsPage.faqs.10.answer')
    },
    {
      id: 11,
      category: 'cost',
      question: t('faqsPage.faqs.11.question'),
      answer: t('faqsPage.faqs.11.answer')
    },
    {
      id: 12,
      category: 'cost',
      question: t('faqsPage.faqs.12.question'),
      answer: t('faqsPage.faqs.12.answer')
    },
    {
      id: 13,
      category: 'technical',
      question: t('faqsPage.faqs.13.question'),
      answer: t('faqsPage.faqs.13.answer')
    },
    {
      id: 14,
      category: 'technical',
      question: t('faqsPage.faqs.14.question'),
      answer: t('faqsPage.faqs.14.answer')
    },
    {
      id: 15,
      category: 'general',
      question: t('faqsPage.faqs.15.question'),
      answer: t('faqsPage.faqs.15.answer')
    },
    {
      id: 16,
      category: 'technical',
      question: t('faqsPage.faqs.16.question'),
      answer: t('faqsPage.faqs.16.answer')
    },
    {
      id: 17,
      category: 'technical',
      question: t('faqsPage.faqs.17.question'),
      answer: t('faqsPage.faqs.17.answer')
    },
    {
      id: 18,
      category: 'technical',
      question: t('faqsPage.faqs.18.question'),
      answer: t('faqsPage.faqs.18.answer')
    },
    {
      id: 19,
      category: 'construction',
      question: t('faqsPage.faqs.19.question'),
      answer: t('faqsPage.faqs.19.answer')
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = [faqs[0], faqs[1], faqs[2], faqs[5], faqs[7], faqs[8]];

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
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <Badge 
              className="mb-4 border-0"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
            >
              {t('faqsPage.hero.badge')}
            </Badge>
            <h1 
              className="text-4xl md:text-6xl mb-6 font-bold"
              style={{
                background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('faqsPage.hero.title')}
            </h1>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('faqsPage.hero.description')}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: '#FB921D' }}
              />
              <Input
                type="text"
                placeholder={t('faqsPage.hero.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 rounded-lg transition-colors"
                style={{
                  borderColor: '#FFD0A0',
                  color: '#1a1a1a'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#FB921D';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#FFD0A0';
                }}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { value: `${faqs.length}+`, label: t('faqsPage.stats.questionsAnswered') },
              { value: t('faqsPage.stats.support.value'), label: t('faqsPage.stats.support.label') },
              { value: t('faqsPage.stats.resolution.value'), label: t('faqsPage.stats.resolution.label') },
              { value: t('faqsPage.stats.responseTime.value'), label: t('faqsPage.stats.responseTime.label') }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="text-center p-4 border rounded-lg"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#FFD0A0'
                }}
              >
                <CardContent className="p-0">
                  <div 
                    className="text-2xl mb-2 font-bold"
                    style={{ color: '#FB921D' }}
                  >
                    {stat.value}
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
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section 
        className="py-8"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            {faqCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.div 
                  key={category.id} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <Button
                    onClick={() => setSelectedCategory(category.id)}
                    className="h-auto px-4 py-3 flex items-center gap-2 font-semibold transition-all duration-300 rounded-lg whitespace-nowrap"
                    style={{
                      backgroundColor: selectedCategory === category.id ? '#FB921D' : 'white',
                      color: selectedCategory === category.id ? 'white' : '#C55A00',
                      borderColor: selectedCategory === category.id ? '#FB921D' : '#FFD0A0',
                      borderWidth: '2px',
                      borderStyle: 'solid'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = '#FFF5E6';
                        e.currentTarget.style.borderColor = '#FB921D';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#FFD0A0';
                      }
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{category.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-16"
          style={{
            background: 'linear-gradient(to right, rgba(255, 224, 192, 0.5), rgba(255, 245, 230, 0.5))'
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-3xl mb-8 text-center font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('faqsPage.popular.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {popularFAQs.map((faq) => (
                <motion.div 
                  key={faq.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                >
                  <Card 
                    className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg"
                    onClick={() => setSelectedCategory(faq.category)}
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#FFD0A0',
                      borderWidth: '1px',
                      borderStyle: 'solid'
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
                    <h3 
                      className="text-lg mb-3 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {faq.question}
                    </h3>
                    <p 
                      className="text-sm mb-4"
                      style={{ color: '#666' }}
                    >
                      {faq.answer.substring(0, 120)}...
                    </p>
                    <Badge 
                      className="text-xs capitalize"
                      style={{
                        backgroundColor: '#FFF5E6',
                        color: '#C55A00',
                        borderColor: '#FFD0A0',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      {faq.category.replace('-', ' ')}
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* FAQ List */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 
              className="text-3xl font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {selectedCategory === 'all' ? t('faqsPage.allQuestions.title') : faqCategories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <div 
              className="text-sm"
              style={{ color: '#666' }}
            >
              {filteredFAQs.length} {t('faqsPage.allQuestions.questionsFound')}
            </div>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Search 
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: '#FFD0A0' }}
              />
              <h3 
                className="text-xl mb-2"
                style={{ color: '#666' }}
              >
                {t('faqsPage.noResults.title')}
              </h3>
              <p style={{ color: '#C55A00' }}>
                {t('faqsPage.noResults.message')}
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <motion.div 
                  key={faq.id} 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  viewport={{ once: true }}
                >
                  <AccordionItem 
                    value={`item-${faq.id}`} 
                    className="border-b"
                    style={{ borderColor: '#FFD0A0' }}
                  >
                    <AccordionTrigger 
                      className="text-left text-lg py-6 font-semibold hover:no-underline transition-colors duration-300"
                      style={{ color: '#1a1a1a' }}
                    >
                      <span className="pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-base leading-relaxed pb-6"
                      style={{ color: '#666' }}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </div>
      </motion.section>

      {/* Contact Support Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl mb-4 font-bold"
            style={{ color: '#1a1a1a' }}
          >
            {t('faqsPage.contact.title')}
          </h2>
          <p 
            className="text-lg mb-8"
            style={{ color: '#666' }}
          >
            {t('faqsPage.contact.description')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Phone,
                title: t('faqsPage.contact.phone.title'),
                description: t('faqsPage.contact.phone.description'),
                button: t('faqsPage.contact.phone.number')
              },
              {
                icon: Mail,
                title: t('faqsPage.contact.email.title'),
                description: t('faqsPage.contact.email.description'),
                button: t('faqsPage.contact.email.address')
              },
              {
                icon: MessageCircle,
                title: t('faqsPage.contact.chat.title'),
                description: t('faqsPage.contact.chat.description'),
                button: t('faqsPage.contact.chat.button')
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card 
                    className="p-6 text-center hover:shadow-lg transition-all duration-300 rounded-lg"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#FFD0A0',
                      borderWidth: '1px',
                      borderStyle: 'solid'
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
                    <IconComponent 
                      className="w-12 h-12 mx-auto mb-4"
                      style={{ color: '#FB921D' }}
                    />
                    <h3 
                      className="text-lg mb-2 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="mb-4"
                      style={{ color: '#666' }}
                    >
                      {item.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 font-semibold rounded-lg"
                      style={{
                        borderColor: '#C55A00',
                        color: '#C55A00'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#C55A00';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#C55A00';
                      }}
                    >
                      {item.button}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg p-6"
            style={{
              background: 'linear-gradient(to right, rgba(255, 224, 192, 0.7), rgba(255, 245, 230, 0.7))'
            }}
          >
            <h3 
              className="text-xl mb-2 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('faqsPage.contact.consultation.title')}
            </h3>
            <p 
              className="mb-4"
              style={{ color: '#666' }}
            >
              {t('faqsPage.contact.consultation.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E67E0F';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(251, 146, 29, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FB921D';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('faqsPage.contact.consultation.button')}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Knowledge Base Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('faqsPage.knowledgeBase.title')}
            </h2>
            <p 
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('faqsPage.knowledgeBase.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('faqsPage.knowledgeBase.constructionGuide.title'),
                description: t('faqsPage.knowledgeBase.constructionGuide.description'),
                button: t('faqsPage.knowledgeBase.constructionGuide.button')
              },
              {
                title: t('faqsPage.knowledgeBase.designOptions.title'),
                description: t('faqsPage.knowledgeBase.designOptions.description'),
                button: t('faqsPage.knowledgeBase.designOptions.button')
              },
              {
                title: t('faqsPage.knowledgeBase.costCalculator.title'),
                description: t('faqsPage.knowledgeBase.costCalculator.description'),
                button: t('faqsPage.knowledgeBase.costCalculator.button')
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05 }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 rounded-lg"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#FFD0A0',
                    borderWidth: '1px',
                    borderStyle: 'solid'
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
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'linear-gradient(to right, rgba(255, 224, 192, 0.7), rgba(255, 245, 230, 0.7))'
                    }}
                  >
                    <HelpCircle 
                      className="w-6 h-6"
                      style={{ color: '#FB921D' }}
                    />
                  </div>
                  <h3 
                    className="text-xl mb-2 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ color: '#666' }}
                  >
                    {item.description}
                  </p>
                  <Button 
                    variant="outline"
                    className="border-2 font-semibold rounded-lg"
                    style={{
                      borderColor: '#C55A00',
                      color: '#C55A00'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C55A00';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#C55A00';
                    }}
                  >
                    {item.button}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
