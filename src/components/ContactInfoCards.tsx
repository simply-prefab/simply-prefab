'use client'

import { Clock, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactInfoCards() {
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      title: t('contactPage.emailSupport.title'),
      details: ['Projects@simplyprefab.com'],
      action: t('contactPage.emailSupport.action'),
      onClick: () => window.open('mailto:Projects@simplyprefab.com', '_blank')
    },
    {
      icon: MapPin,
      title: t('contactPage.headOffice.title'),
      details: [t('contactPage.headOffice.location'), t('contactPage.headOffice.area')],
      action: t('contactPage.headOffice.action'),
      onClick: () => window.open('https://maps.google.com/?q=2+Kallang+Avenue+05-08+CT+Hub+Singapore', '_blank')
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

  return (
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
            <div className="mb-6">
              <info.icon
                className="w-16 h-16 mx-auto"
                style={{ color: '#FB921D', strokeWidth: 1.5 }}
              />
            </div>

            <div className="flex-1 mb-6">
              <h3
                className="text-xl mb-4 font-semibold"
                style={{ color: '#1a1a1a' }}
              >
                {info.title}
              </h3>

              <div className="space-y-1 mb-3">
                {info.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className="text-sm leading-relaxed"
                    style={{ color: '#666' }}
                  >
                    {detail}
                  </p>
                ))}
              </div>

              {info.description && (
                <p
                  className="text-xs mt-2"
                  style={{ color: '#C55A00' }}
                >
                  {info.description}
                </p>
              )}
            </div>

            <Button
              onClick={info.onClick}
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
  );
}
