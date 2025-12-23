'use client'

import { motion } from 'motion/react';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQ = () => {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const faqs = [
    {
      question: t('faq.questions.whatIsPrefab.question'),
      answer: t('faq.questions.whatIsPrefab.answer')
    },
    {
      question: t('faq.questions.howMuchSave.question'),
      answer: t('faq.questions.howMuchSave.answer')
    },
    {
      question: t('faq.questions.constructionTime.question'),
      answer: t('faq.questions.constructionTime.answer')
    },
    {
      question: t('faq.questions.materialQuality.question'),
      answer: t('faq.questions.materialQuality.answer')
    },
    {
      question: t('faq.questions.structuralLifespan.question'),
      answer: t('faq.questions.structuralLifespan.answer')
    },
    {
      question: t('faq.questions.customization.question'),
      answer: t('faq.questions.customization.answer')
    },
    {
      question: t('faq.questions.buildingCodes.question'),
      answer: t('faq.questions.buildingCodes.answer')
    },
    {
      question: t('faq.questions.basePrice.question'),
      answer: t('faq.questions.basePrice.answer')
    },
    {
      question: t('faq.questions.financing.question'),
      answer: t('faq.questions.financing.answer')
    },
    {
      question: t('faq.questions.warranty.question'),
      answer: t('faq.questions.warranty.answer')
    },
    {
      question: t('faq.questions.ecoFriendly.question'),
      answer: t('faq.questions.ecoFriendly.answer')
    },
    {
      question: t('faq.questions.extremeWeather.question'),
      answer: t('faq.questions.extremeWeather.answer')
    },
    {
      question: t('faq.questions.panIndia.question'),
      answer: t('faq.questions.panIndia.answer')
    },
    {
      question: t('faq.questions.consultationCharge.question'),
      answer: t('faq.questions.consultationCharge.answer')
    }
  ];
  
  return (
    <section
      className="py-20 relative"
      style={{
        background: 'linear-gradient(135deg, #FFE0C0 0%, #FFF5E6 100%)'
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t('faq.title')}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#666' }}
          >
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-lg shadow-md border-0 overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #FFD0A0'
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-4 text-left hover:no-underline transition-all duration-300"
                    style={{
                      borderLeft: '4px solid #FB921D'
                    }}
                    onMouseEnter={(e) => {
                      const item = e.currentTarget.closest('.rounded-lg');
                      if (item) {
                        (item as HTMLElement).style.boxShadow = '0 6px 12px rgba(251, 146, 29, 0.15)';
                        (item as HTMLElement).style.transform = 'translateY(-2px)';
                      }
                      e.currentTarget.style.backgroundColor = '#FFF5E6';
                      e.currentTarget.style.borderLeftWidth = '6px';
                    }}
                    onMouseLeave={(e) => {
                      const item = e.currentTarget.closest('.rounded-lg');
                      if (item) {
                        (item as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                        (item as HTMLElement).style.transform = 'translateY(0)';
                      }
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderLeftWidth = '4px';
                    }}
                  >
                    <span
                      className="pr-4 font-semibold text-sm md:text-base"
                      style={{ color: '#1a1a1a' }}
                    >
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-6 pb-4 leading-relaxed text-sm md:text-base"
                    style={{ color: '#666' }}
                  >
                    <div
                      className="pl-4 border-l-2"
                      style={{ borderColor: '#FFD0A0' }}
                    >
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div
            className="rounded-2xl p-8 shadow-lg border-2"
            style={{
              background: 'linear-gradient(135deg, #FFF5E6 0%, white 100%)',
              borderColor: '#FB921D'
            }}
          >
            <h3
              className="text-2xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('faq.stillHaveQuestions.title')}
            </h3>
            <p
              className="mb-6"
              style={{ color: '#666' }}
            >
              {t('faq.stillHaveQuestions.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 border-2"
                style={{
                  backgroundColor: '#FB921D',
                  borderColor: '#FB921D',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                  (e.target as HTMLElement).style.borderColor = '#E67E0F';
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(251, 146, 29, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                  (e.target as HTMLElement).style.borderColor = '#FB921D';
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
                onClick={openPopup}
              >
                {t('faq.stillHaveQuestions.button')}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
