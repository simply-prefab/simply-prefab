'use client'

import { ArrowRight, Award, Clock, IndianRupee, Leaf, Target, Users, Building2, Lightbulb,KeyRound ,Key  } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { openPopup } = useExpertConsultation();
  const { t } = useLanguage();

  const stats = [
    { 
      number: t('about.stats.projects.number'), 
      label: t('about.stats.projects.label'), 
      icon: Award 
    },
    { 
      number: t('about.stats.team.number'), 
      label: t('about.stats.team.label'), 
      icon: Users 
    },
    { 
      number: t('about.stats.experience.number'), 
      label: t('about.stats.experience.label'), 
      icon: Target 
    },
    { 
      number: t('about.stats.savings.number'), 
      label: t('about.stats.savings.label'), 
      icon: IndianRupee 
    },
  ];
  
  const values = [
    {
      icon: Leaf,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description'),
    },
    {
      icon: Clock,
      title: t('about.values.timeEfficiency.title'),
      description: t('about.values.timeEfficiency.description'),
    },
    {
      icon: KeyRound,
      title: t('about.values.Turnkey.title'),
      description: t('about.values.Turnkey.description'),
    },
  ];

  const timeline = [
    { year: '2012', event: t('about.timeline.2012') },
    { year: '2016', event: t('about.timeline.2016') },
    { year: '2018', event: t('about.timeline.2018') },
    { year: '2020', event: t('about.timeline.2020') },
    { year: '2022', event: t('about.timeline.2022') },
    { year: '2024', event: t('about.timeline.2024') },
  ];

  const leadership = [
    { 
      name: t('about.leadership.ceo.name'), 
      role: t('about.leadership.ceo.role'), 
      experience: t('about.leadership.ceo.experience'),
      imageId: '1472099645785-5658abf4ff4e'
    },
    { 
      name: t('about.leadership.founder.name'), 
      role: t('about.leadership.founder.role'), 
      experience: t('about.leadership.founder.experience'),
      imageId: '1494790108755-2616c0e9ce36'
    },
    { 
      name: t('about.leadership.cdo.name'), 
      role: t('about.leadership.cdo.role'), 
      experience: t('about.leadership.cdo.experience'),
      imageId: '1494790108755-2616c0e9ce36'
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #FFE0C0, #FFF5E6)'
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
              {t('about.badge')}
            </Badge>
            <h1
              className="text-4xl md:text-6xl mb-6 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('about.title')}
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: '#666' }}
            >
              {t('about.description')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #FFD0A0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = '#FB921D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#FFD0A0';
                }}
              >
                <CardContent className="p-0">
                  <stat.icon
                    className="w-8 h-8 mx-auto mb-4"
                    style={{ color: '#FB921D' }}
                  />
                  <div
                    className="text-3xl mb-2 font-bold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {stat.number}
                  </div>
                  <div style={{ color: '#666' }}>{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card
              className="p-8 border-0 hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: '#FFF5E6',
                border: '2px solid #FB921D'
              }}
            >
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#FB921D' }}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2
                    className="text-3xl font-bold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {t('about.visionTitle')}
                  </h2>
                </div>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: '#666' }}
                >
                  {t('about.visionDescription')}
                </p>
              </CardContent>
            </Card>

            <Card
              className="p-8 border-0 hover:shadow-xl transition-all duration-300"
              style={{
                backgroundColor: '#FFF5E6',
                border: '2px solid #C55A00'
              }}
            >
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#C55A00' }}
                  >
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h2
                    className="text-3xl font-bold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {t('about.missionTitle')}
                  </h2>
                </div>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: '#666' }}
                >
                  {t('about.missionDescription')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What Sets Us Apart */}
          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="text-2xl mb-6 font-bold"
                style={{ color: '#1a1a1a' }}
              >
                {t('about.whatSetsUsApart.title')}
              </h3>
              <div className="space-y-4">
                {[
                  t('about.whatSetsUsApart.point1'),
                  t('about.whatSetsUsApart.point2'),
                  t('about.whatSetsUsApart.point3'),
                  t('about.whatSetsUsApart.point4')
                ].map((text, idx) => (
                  <div className="flex items-start space-x-3" key={idx}>
                    <div
                      className="w-2 h-2 rounded-full mt-3 flex-shrink-0"
                      style={{ backgroundColor: '#FB921D' }}
                    />
                    <p style={{ color: '#666' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="/images/about/img1.jpg"
                alt={t('about.whatSetsUsApart.imageAlt')}
                className="rounded-lg shadow-lg w-full h-96 object-cover"
                style={{ border: '3px solid #FB921D' }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
                style={{ backgroundColor: '#FB921D' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section
        className="py-16"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('about.coreValues.title')}
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('about.coreValues.description')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-xl transition-all duration-300 border-0"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #FFD0A0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = '#FB921D';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(251, 146, 29, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#FFD0A0';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <CardContent className="p-0">
                  <value.icon
                    className="w-12 h-12 mx-auto mb-6"
                    style={{ color: '#FB921D' }}
                  />
                  <h3
                    className="text-xl mb-4 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: '#666' }}>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('about.journey.title')}
            </h2>
            <p
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('about.journey.subtitle')}
            </p>
          </div>
          <div className="space-y-8 relative">
            <div
              className="absolute left-6 top-6 bottom-6 w-0.5"
              style={{ backgroundColor: '#FFD0A0' }}
            />
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-sm z-10 relative"
                    style={{ backgroundColor: '#FB921D' }}
                  >
                    {item.year}
                  </div>
                </div>
                <div
                  className="pt-2 flex-1 p-4 rounded-lg"
                  style={{ backgroundColor: '#FFF5E6' }}
                >
                  <p
                    className="text-lg font-medium"
                    style={{ color: '#1a1a1a' }}
                  >
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      {/* <section
        className="py-16"
        style={{ backgroundColor: '#FFE0C0' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('about.leadership.title')}
            </h2>
            <p
              className="text-lg"
              style={{ color: '#666' }}
            >
              {t('about.leadership.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #FFD0A0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = '#FB921D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#FFD0A0';
                }}
              >
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-${member.imageId}?w=200&h=200&fit=crop&crop=face`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    style={{ border: '3px solid #FB921D' }}
                  />
                  <h3
                    className="text-xl mb-2 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="mb-2 font-medium"
                    style={{ color: '#FB921D' }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: '#666' }}
                  >
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 font-bold">
            {t('about.cta.title')}
          </h2>
          <p
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="font-semibold transition-all duration-300 border-2"
                style={{
                  backgroundColor: 'white',
                  color: '#1a1a1a',
                  borderColor: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
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
                {t('about.cta.viewProjects')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-2 font-semibold transition-all duration-300"
              style={{
                borderColor: 'white',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
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
              onClick={openPopup}
            >
              {t('about.cta.scheduleCall')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
