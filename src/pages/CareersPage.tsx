'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Award, Briefcase, CheckCircle, Clock, Loader2, MapPin, Upload, Users } from 'lucide-react';
import React, { useState } from 'react';

// Define proper type for job
interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
  department: string;
}

export default function CareersPage() {
  const { t } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: '',
    department: '',
    coverLetter: '',
    applyingFor: ''
  });

  // Job openings data structure - manually build each job
  const jobOpenings: Job[] = [
    {
      id: 1,
      title: t('careers.jobs.seniorPrefabEngineer.title'),
      department: t('careers.jobs.seniorPrefabEngineer.department'),
      location: t('careers.jobs.seniorPrefabEngineer.location'),
      type: t('careers.jobs.seniorPrefabEngineer.type'),
      experience: t('careers.jobs.seniorPrefabEngineer.experience'),
      description: t('careers.jobs.seniorPrefabEngineer.description'),
      requirements: t('careers.jobs.seniorPrefabEngineer.requirements') as unknown as string[],
      salary: t('careers.jobs.seniorPrefabEngineer.salary'),
      posted: t('careers.jobs.seniorPrefabEngineer.posted'),
    },
    {
      id: 2,
      title: t('careers.jobs.sustainabilityConsultant.title'),
      department: t('careers.jobs.sustainabilityConsultant.department'),
      location: t('careers.jobs.sustainabilityConsultant.location'),
      type: t('careers.jobs.sustainabilityConsultant.type'),
      experience: t('careers.jobs.sustainabilityConsultant.experience'),
      description: t('careers.jobs.sustainabilityConsultant.description'),
      requirements: t('careers.jobs.sustainabilityConsultant.requirements') as unknown as string[],
      salary: t('careers.jobs.sustainabilityConsultant.salary'),
      posted: t('careers.jobs.sustainabilityConsultant.posted'),
    },
    {
      id: 3,
      title: t('careers.jobs.manufacturingSupervisor.title'),
      department: t('careers.jobs.manufacturingSupervisor.department'),
      location: t('careers.jobs.manufacturingSupervisor.location'),
      type: t('careers.jobs.manufacturingSupervisor.type'),
      experience: t('careers.jobs.manufacturingSupervisor.experience'),
      description: t('careers.jobs.manufacturingSupervisor.description'),
      requirements: t('careers.jobs.manufacturingSupervisor.requirements') as unknown as string[],
      salary: t('careers.jobs.manufacturingSupervisor.salary'),
      posted: t('careers.jobs.manufacturingSupervisor.posted'),
    },
    {
      id: 4,
      title: t('careers.jobs.digitalMarketingSpecialist.title'),
      department: t('careers.jobs.digitalMarketingSpecialist.department'),
      location: t('careers.jobs.digitalMarketingSpecialist.location'),
      type: t('careers.jobs.digitalMarketingSpecialist.type'),
      experience: t('careers.jobs.digitalMarketingSpecialist.experience'),
      description: t('careers.jobs.digitalMarketingSpecialist.description'),
      requirements: t('careers.jobs.digitalMarketingSpecialist.requirements') as unknown as string[],
      salary: t('careers.jobs.digitalMarketingSpecialist.salary'),
      posted: t('careers.jobs.digitalMarketingSpecialist.posted'),
    },
    {
      id: 5,
      title: t('careers.jobs.projectManager.title'),
      department: t('careers.jobs.projectManager.department'),
      location: t('careers.jobs.projectManager.location'),
      type: t('careers.jobs.projectManager.type'),
      experience: t('careers.jobs.projectManager.experience'),
      description: t('careers.jobs.projectManager.description'),
      requirements: t('careers.jobs.projectManager.requirements') as unknown as string[],
      salary: t('careers.jobs.projectManager.salary'),
      posted: t('careers.jobs.projectManager.posted'),
    },
    {
      id: 6,
      title: t('careers.jobs.juniorArchitect.title'),
      department: t('careers.jobs.juniorArchitect.department'),
      location: t('careers.jobs.juniorArchitect.location'),
      type: t('careers.jobs.juniorArchitect.type'),
      experience: t('careers.jobs.juniorArchitect.experience'),
      description: t('careers.jobs.juniorArchitect.description'),
      requirements: t('careers.jobs.juniorArchitect.requirements') as unknown as string[],
      salary: t('careers.jobs.juniorArchitect.salary'),
      posted: t('careers.jobs.juniorArchitect.posted'),
    },
    {
      id: 7,
      title: 'Painter – Prefab Construction',
      department: 'carriers',
      location: 'Hyderabad & Out stations',
      type: 'Full-time',
      experience: '2–5 years (Prefab/Industrial painting preferred)',
      salary: 'As per industry standards',
      posted: 'Recently',
      description:
        'We are looking for skilled Painters experienced in residential, commercial, or prefab structure painting. The role includes surface preparation, applying coatings, and delivering high-quality finishing for prefab homes and structures.',
      requirements: [
        '2–5 years of experience in residential, commercial, or prefab painting',
        'Strong knowledge of surface preparation, priming, and finishing techniques',
        'Ability to work on prefab panels, steel structures, and interior finishes',
        'Understanding of safety practices, scaffolding, and PPE usage',
        'Willingness to travel to outstation project sites when required'
      ]
    },
    {
      id: 8,
      title: 'Plumber – Prefab Construction',
      department: 'carriers',
      location: 'Hyderabad & Out stations',
      type: 'Full-time',
      experience: '2–5 years',
      salary: 'As per industry standards',
      posted: 'Recently',
      description:
        'We are looking for qualified Plumbers to manage water supply lines, drainage lines, bathroom fittings, and plumbing installation in prefab homes.',
      requirements: [
        '2–5 years of plumbing experience in residential, commercial, or prefab projects',
        'Hands-on experience with water supply, drainage, and sanitary systems',
        'Ability to read basic plumbing layouts and coordinate with MEP teams',
        'Experience with bathroom fittings, pressure testing, and leak rectification',
        'Willingness to work at prefab sites in Hyderabad and outstation locations'
      ]
    },
    {
      id: 9,
      title: 'Electrician – Prefab Construction',
      department: 'carriers',
      location: 'Hyderabad & Out stations',
      type: 'Full-time',
      experience: '2–5 years',
      salary: 'As per industry standards',
      posted: 'Recently',
      description:
        'We are hiring experienced Electricians skilled in wiring, installation, and electrical fittings for prefab homes, steel structures, and modular buildings.',
      requirements: [
        '2–5 years of electrical work experience in residential, industrial, or prefab projects',
        'Good knowledge of wiring, DB installation, earthing, and lighting systems',
        'Ability to read basic electrical drawings and follow safety standards',
        'Experience with conduit laying in prefab panels and modular structures',
        'Willingness to travel and work at different prefab project sites'
      ]
    }
  ];

  const departments = [
    { id: 'all', label: t('careers.departments.all'), count: jobOpenings.length },
    { id: 'engineering', label: t('careers.departments.engineering'), count: jobOpenings.filter(j => j.department === 'engineering').length },
    { id: 'design', label: t('careers.departments.design'), count: jobOpenings.filter(j => j.department === 'design').length },
    { id: 'manufacturing', label: t('careers.departments.manufacturing'), count: jobOpenings.filter(j => j.department === 'manufacturing').length },
    { id: 'marketing', label: t('careers.departments.marketing'), count: jobOpenings.filter(j => j.department === 'marketing').length },
    { id: 'operations', label: t('careers.departments.operations'), count: jobOpenings.filter(j => j.department === 'operations').length },
    {
      id: 'carriers',
      label: 'Carriers / Skilled Trades',
      count: jobOpenings.filter(j => j.department === 'carriers').length
    }
  ];


  const filteredJobs = selectedDepartment === 'all'
    ? jobOpenings
    : jobOpenings.filter(job => job.department === selectedDepartment);

  const handleApplyNow = (jobTitle: string) => {
    setFormData({ ...formData, applyingFor: jobTitle });
    const applicationSection = document.getElementById('application-form');
    applicationSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert(t('careers.applicationForm.errors.resumeRequired') || 'Please upload your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('experienceLevel', formData.experienceLevel);
      submitData.append('department', formData.department);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('applyingFor', formData.applyingFor);
      submitData.append('resume', selectedFile);

      // Send to API
      const response = await fetch('/api/careers/submit', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            experienceLevel: '',
            department: '',
            coverLetter: '',
            applyingFor: ''
          });
          setSelectedFile(null);

          // Reset file input
          const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        }, 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
      alert(t('careers.applicationForm.errors.submitFailed') || 'Failed to submit application. Please try again.');
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
              {t('careers.hero.badge')}
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
              {t('careers.hero.title')}
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('careers.hero.subtitle')}
            </p>
          </div>

          {/* Why Join Us */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Award,
                title: t('careers.benefits.benefits.title'),
                description: t('careers.benefits.benefits.description')
              },
              {
                icon: Users,
                title: t('careers.benefits.team.title'),
                description: t('careers.benefits.team.description')
              },
              {
                icon: Briefcase,
                title: t('careers.benefits.growth.title'),
                description: t('careers.benefits.growth.description')
              }
            ].map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={idx}
                  className="text-center p-6 border hover:shadow-lg transition-all duration-300 rounded-lg"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#FFD0A0'
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
                  <IconComponent
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: '#FB921D' }}
                  />
                  <h3
                    className="text-xl mb-2 font-semibold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: '#666' }}>{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department Filter */}
      <section
        className="py-8"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant={selectedDepartment === dept.id ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept.id)}
                className="font-semibold transition-all duration-300 rounded-lg"
                style={{
                  backgroundColor: selectedDepartment === dept.id ? '#FB921D' : 'transparent',
                  color: selectedDepartment === dept.id ? 'white' : '#C55A00',
                  borderColor: selectedDepartment === dept.id ? '#FB921D' : '#C55A00',
                  borderWidth: '2px'
                }}
                onMouseEnter={(e) => {
                  if (selectedDepartment !== dept.id) {
                    e.currentTarget.style.backgroundColor = '#C55A00';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDepartment !== dept.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#C55A00';
                  }
                }}
              >
                {dept.label} ({dept.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl mb-8 font-semibold"
            style={{ color: '#1a1a1a' }}
          >
            {t('careers.jobListings.title')} ({filteredJobs.length})
          </h2>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border rounded-lg"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#FFD0A0'
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
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle
                        className="text-2xl mb-2"
                        style={{ color: '#1a1a1a' }}
                      >
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center">
                          <MapPin
                            className="w-4 h-4 mr-1"
                            style={{ color: '#FB921D' }}
                          />
                          <span style={{ color: '#666' }}>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock
                            className="w-4 h-4 mr-1"
                            style={{ color: '#FB921D' }}
                          />
                          <span style={{ color: '#666' }}>{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase
                            className="w-4 h-4 mr-1"
                            style={{ color: '#FB921D' }}
                          />
                          <span style={{ color: '#666' }}>{job.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Badge
                        className="text-sm font-semibold border"
                        style={{
                          backgroundColor: '#FFF5E6',
                          color: '#FB921D',
                          borderColor: '#FFD0A0'
                        }}
                      >
                        {job.salary}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p
                    className="mb-4"
                    style={{ color: '#666' }}
                  >
                    {job.description}
                  </p>

                  <div className="mb-6">
                    <h4
                      className="text-sm mb-2 font-semibold"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('careers.jobListings.requirements')}
                    </h4>
                    <ul className="space-y-1">
                      {job.requirements && Array.isArray(job.requirements) && job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle
                            className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                            style={{ color: '#FB921D' }}
                          />
                          <span style={{ color: '#666' }}>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div
                      className="text-sm"
                      style={{ color: '#C55A00' }}
                    >
                      {t('careers.jobListings.posted')} {job.posted}
                    </div>
                    <Button
                      onClick={() => handleApplyNow(job.title)}
                      className="font-semibold transition-all duration-300 rounded-lg"
                      style={{
                        backgroundColor: '#FB921D',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E67E0F';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FB921D';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {t('careers.jobListings.applyNow')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="application-form"
        className="py-16"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl mb-4 font-bold"
              style={{ color: '#1a1a1a' }}
            >
              {t('careers.applicationForm.title')}
            </h2>
            <p style={{ color: '#666' }}>
              {t('careers.applicationForm.subtitle')}
            </p>
          </div>

          <Card
            className="border-2 rounded-lg"
            style={{
              backgroundColor: 'white',
              borderColor: '#FFD0A0'
            }}
          >
            <CardContent className="p-8">
              {showSuccess ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#E8F5E9' }}
                  >
                    <CheckCircle className="w-8 h-8" style={{ color: '#4CAF50' }} />
                  </div>
                  <h3
                    className="text-2xl mb-2 font-bold"
                    style={{ color: '#1a1a1a' }}
                  >
                    {t('careers.applicationForm.success.title')}
                  </h3>
                  <p style={{ color: '#666' }}>
                    {t('careers.applicationForm.success.message')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm mb-2 font-medium"
                        style={{ color: '#1a1a1a' }}
                      >
                        {t('careers.applicationForm.fields.fullName.label')} *
                      </label>
                      <Input
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t('careers.applicationForm.fields.fullName.placeholder')}
                        className="rounded-lg"
                        style={{ borderColor: '#FFD0A0' }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-2 font-medium"
                        style={{ color: '#1a1a1a' }}
                      >
                        {t('careers.applicationForm.fields.email.label')} *
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('careers.applicationForm.fields.email.placeholder')}
                        className="rounded-lg"
                        style={{ borderColor: '#FFD0A0' }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm mb-2 font-medium"
                        style={{ color: '#1a1a1a' }}
                      >
                        {t('careers.applicationForm.fields.phone.label')} *
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('careers.applicationForm.fields.phone.placeholder')}
                        className="rounded-lg"
                        style={{ borderColor: '#FFD0A0' }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-2 font-medium"
                        style={{ color: '#1a1a1a' }}
                      >
                        {t('careers.applicationForm.fields.experienceLevel.label')} *
                      </label>
                      <Select value={formData.experienceLevel} onValueChange={(val) => setFormData({ ...formData, experienceLevel: val })}>
                        <SelectTrigger className="rounded-lg" style={{ borderColor: '#FFD0A0' }}>
                          <SelectValue placeholder={t('careers.applicationForm.fields.experienceLevel.placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">{t('careers.applicationForm.fields.experienceLevel.options.0-1')}</SelectItem>
                          <SelectItem value="1-3">{t('careers.applicationForm.fields.experienceLevel.options.1-3')}</SelectItem>
                          <SelectItem value="3-5">{t('careers.applicationForm.fields.experienceLevel.options.3-5')}</SelectItem>
                          <SelectItem value="5-10">{t('careers.applicationForm.fields.experienceLevel.options.5-10')}</SelectItem>
                          <SelectItem value="10+">{t('careers.applicationForm.fields.experienceLevel.options.10+')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm mb-2 font-medium"
                        style={{ color: '#1a1a1a' }}
                      >
                        {t('careers.applicationForm.fields.department.label')} *
                      </label>
                      <Select value={formData.department} onValueChange={(val) => setFormData({ ...formData, department: val })}>
                        <SelectTrigger className="rounded-lg" style={{ borderColor: '#FFD0A0' }}>
                          <SelectValue placeholder={t('careers.applicationForm.fields.department.placeholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">{t('careers.departments.engineering')}</SelectItem>
                          <SelectItem value="design">{t('careers.departments.design')}</SelectItem>
                          <SelectItem value="manufacturing">{t('careers.departments.manufacturing')}</SelectItem>
                          <SelectItem value="marketing">{t('careers.departments.marketing')}</SelectItem>
                          <SelectItem value="operations">{t('careers.departments.operations')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label
                        className="block text-sm mb-2 font-medium"
                        style={{ color: '#1a1a1a' }}
                      >
                        {t('careers.applicationForm.fields.applyingFor.label')}
                      </label>
                      <Input
                        value={formData.applyingFor}
                        onChange={(e) => setFormData({ ...formData, applyingFor: e.target.value })}
                        placeholder={t('careers.applicationForm.fields.applyingFor.placeholder')}
                        className="rounded-lg"
                        style={{ borderColor: '#FFD0A0' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-2 font-medium"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('careers.applicationForm.fields.coverLetter.label')}
                    </label>
                    <Textarea
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder={t('careers.applicationForm.fields.coverLetter.placeholder')}
                      rows={6}
                      className="rounded-lg"
                      style={{ borderColor: '#FFD0A0' }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-2 font-medium"
                      style={{ color: '#1a1a1a' }}
                    >
                      {t('careers.applicationForm.fields.resume.label')} *
                    </label>
                    <div
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300"
                      style={{ borderColor: '#FFD0A0' }}
                      onClick={() => document.getElementById('resume-upload')?.click()}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#FB921D';
                        e.currentTarget.style.backgroundColor = '#FFF5E6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#FFD0A0';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#FB921D' }} />
                      <p style={{ color: '#666' }}>
                        {selectedFile ? selectedFile.name : t('careers.applicationForm.fields.resume.placeholder')}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-semibold transition-all duration-300 rounded-lg"
                    style={{
                      backgroundColor: '#FB921D',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#E67E0F';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FB921D';
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('careers.applicationForm.buttons.submitting')}
                      </>
                    ) : (
                      t('careers.applicationForm.buttons.submit')
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
