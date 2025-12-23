'use client'

import { ArrowRight, Clock, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function ContactPage() {
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      title: t('contactPage.emailSupport.title'),
      details: ['enquiry@simplyprefab.com'],
      action: t('contactPage.emailSupport.action'),
      link: 'mailto:enquiry@simplyprefab.com'
    },
    {
      icon: MapPin,
      title: t('contactPage.headOffice.title'),
      details: [t('contactPage.headOffice.location'), t('contactPage.headOffice.area')],
      action: t('contactPage.headOffice.action'),
      link: 'https://maps.google.com/?q=2+Kallang+Avenue+05-08+CT+Hub+Singapore'
    },
    {
      icon: Clock,
      title: t('contactPage.workingHours.title'),
      details: [t('contactPage.workingHours.weekdays'), t('contactPage.workingHours.sunday')],
      description: t('contactPage.workingHours.description'),
      action: t('contactPage.workingHours.action'),
      onClick: () => openPopup()
    }
  ];

  const handleContactAction = (info: any) => {
    if (info.onClick) {
      info.onClick();
    } else if (info.link) {
      if (info.link.startsWith('#')) {
        document.querySelector(info.link)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(info.link, '_blank');
      }
    }
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
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 border-0"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
            >
              {t('contactPage.badge')}
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
              {t('contactPage.title')}
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('contactPage.subtitle')}
            </p>
          </div>

          {/* Contact Cards - 3 columns on desktop */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer border rounded-lg overflow-hidden"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#FFD0A0',
                  borderWidth: '1px'
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
                <CardContent className="p-8 flex flex-col items-center justify-between h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <info.icon
                      className="w-16 h-16 mx-auto"
                      style={{ color: '#FB921D', strokeWidth: 1.5 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 mb-6">
                    <h3
                      className="text-xl mb-4 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {info.title}
                    </h3>
                    
                    {/* Details */}
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail: string, idx: number) => (
                        <p
                          key={idx}
                          className="text-sm leading-relaxed"
                          style={{ color: '#666' }}
                        >
                          {detail}
                        </p>
                      ))}
                    </div>

                    {/* Description */}
                    {info.description && (
                      <p
                        className="text-xs mt-2"
                        style={{ color: '#C55A00' }}
                      >
                        {info.description}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleContactAction(info)}
                    variant="outline"
                    className="w-full border-2 font-semibold rounded-lg transition-all duration-300"
                    style={{
                      borderColor: '#C55A00',
                      color: '#C55A00',
                      backgroundColor: 'transparent'
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
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 font-bold">
            {t('contactPage.finalCta.title')}
          </h2>
          <p
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('contactPage.finalCta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => openPopup()}
              size="lg"
              className="font-semibold transition-all duration-300 border-2 rounded-lg"
              style={{
                backgroundColor: 'white',
                color: '#1a1a1a',
                borderColor: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('contactPage.finalCta.getQuote')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-2 font-semibold transition-all duration-300 rounded-lg"
                style={{
                  borderColor: 'white',
                  color: 'white',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t('contactPage.finalCta.viewProjects')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
