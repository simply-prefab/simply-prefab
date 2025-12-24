'use client'

import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import EmailService from '@/utils/emailService';
import { PAYMENT_CONFIG, PaymentGateway, formatCurrency } from '@/utils/paymentGateway';
import { AlertCircle, ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock, CreditCard, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';

const CONSULTATION_SLOTS = [
  { time: '00:00', label: '12:00 AM' },
  { time: '01:00', label: '1:00 AM' },
  { time: '02:00', label: '2:00 AM' },
  { time: '03:00', label: '3:00 AM' },
  { time: '04:00', label: '4:00 AM' },
  { time: '05:00', label: '5:00 AM' },
  { time: '06:00', label: '6:00 AM' },
  { time: '07:00', label: '7:00 AM' },
  { time: '08:00', label: '8:00 AM' },
  { time: '09:00', label: '9:00 AM' },
  { time: '10:00', label: '10:00 AM' },
  { time: '11:00', label: '11:00 AM' },
  { time: '12:00', label: '12:00 PM' },
  { time: '13:00', label: '1:00 PM' },
  { time: '14:00', label: '2:00 PM' },
  { time: '15:00', label: '3:00 PM' },
  { time: '16:00', label: '4:00 PM' },
  { time: '17:00', label: '5:00 PM' },
  { time: '18:00', label: '6:00 PM' },
  { time: '19:00', label: '7:00 PM' },
  { time: '20:00', label: '8:00 PM' },
  { time: '21:00', label: '9:00 PM' },
  { time: '22:00', label: '10:00 PM' },
  { time: '23:00', label: '11:00 PM' }
];

interface SlotData {
  time: string;
  available: boolean;
  booked: boolean;
}

const ExpertPopup = () => {
  const { isPopupOpen, closePopup } = useExpertConsultation();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'form' | 'schedule' | 'payment' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    projectType: '',
    message: ''
  });

  const [scheduleData, setScheduleData] = useState({
    selectedDate: undefined as Date | undefined,
    selectedTimeSlot: ''
  });

  const [availableSlots, setAvailableSlots] = useState<SlotData[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [bookingError, setBookingError] = useState('');

  // 🆕 ADD THIS STATE
  const [policyAccepted, setPolicyAccepted] = useState(false);

  useEffect(() => {
    if (scheduleData.selectedDate) {
      fetchAvailableSlots(scheduleData.selectedDate);
    }
  }, [scheduleData.selectedDate]);

  const fetchAvailableSlots = async (date: Date) => {
    setLoadingSlots(true);
    setSlotError('');

    try {
      const dateString = date.toISOString().split('T')[0];
      const response = await fetch('/api/slots/available', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateString })
      });

      if (!response.ok) {
        throw new Error(t('expertConsultation.errors.failedToFetch'));
      }

      const data = await response.json();
      setAvailableSlots(data.slots);
      setScheduleData(prev => ({ ...prev, selectedTimeSlot: '' }));
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlotError(t('expertConsultation.schedule.slotError'));
      setAvailableSlots(
        CONSULTATION_SLOTS.map(slot => ({
          time: slot.time,
          available: true,
          booked: false
        }))
      );
    } finally {
      setLoadingSlots(false);
    }
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPast = date < today;
    const isTooFarFuture = date > new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

    return !isWeekend && !isPast && !isTooFarFuture;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('schedule');
  };

  const handleScheduleSubmit = () => {
    setCurrentStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setBookingError('');

    try {
      const paymentGateway = PaymentGateway.getInstance();
      const consultationFee = PAYMENT_CONFIG.consultationFee['expert-consultation'];
      const totalAmount = consultationFee;

      await new Promise(resolve => setTimeout(resolve, 500));

      const paymentResult = await paymentGateway.processRazorpayPayment({
        amount: totalAmount,
        currency: PAYMENT_CONFIG.currency,
        description: t('expertConsultation.payment.consultationTitle'),
        customerEmail: formData.email,
        customerName: formData.name,
        customerPhone: formData.mobile,
        consultationType: 'expert-consultation',
        metadata: {
          formData: formData,
          scheduleData: {
            appointmentDate: scheduleData.selectedDate?.toISOString() || new Date().toISOString(),
            appointmentTime: scheduleData.selectedTimeSlot || '10:00'
          }
        }
      });

      if (paymentResult.success) {
        const dateString = scheduleData.selectedDate?.toISOString().split('T')[0];

        const bookingResponse = await fetch('/api/booking/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: dateString,
            timeSlot: scheduleData.selectedTimeSlot,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.mobile,
            projectType: formData.projectType,
            location: formData.location,
            message: formData.message,
            paymentId: paymentResult.paymentId,
            orderId: paymentResult.orderId,
            amount: totalAmount
          })
        });

        if (bookingResponse.status === 409) {
          const errorData = await bookingResponse.json();
          throw new Error('SLOT_ALREADY_BOOKED: ' + errorData.message);
        }

        if (!bookingResponse.ok) {
          throw new Error(t('expertConsultation.errors.failedToCreate'));
        }

        const bookingData = await bookingResponse.json();
        const booking = {
          bookingId: bookingData.bookingId,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.mobile,
          consultationType: 'expert-consultation',
          appointmentDate: scheduleData.selectedDate?.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          appointmentTime: scheduleData.selectedTimeSlot,
          paymentId: paymentResult.paymentId,
          orderId: paymentResult.orderId,
          amount: totalAmount,
          location: formData.location,
          projectType: formData.projectType,
          message: formData.message
        };

        // 🚀 SEND EMAILS WITH DELAYS (600ms between each)
        const emailService = EmailService.getInstance();

        try {
          // Email 1: Customer confirmation
          await emailService.sendCustomerConfirmation(booking);
          console.log('✅ Customer confirmation sent');

          // ⏰ Wait 600ms
          await new Promise(resolve => setTimeout(resolve, 600));

          // Email 2: Team notification
          await emailService.sendTeamNotification(booking);
          console.log('✅ Team notification sent');

          // ⏰ Wait 600ms
          await new Promise(resolve => setTimeout(resolve, 600));

          // Email 3: Calendar invitation
          await emailService.sendCalendarInvitation(booking);
          console.log('✅ Calendar invitation sent');

        } catch (emailError) {
          console.error('⚠️ Email sending failed:', emailError);
          // Don't fail the booking if emails fail
        }

        setBookingDetails(booking);
        setCurrentStep('success');

        await new Promise(resolve => setTimeout(resolve, 300));

        window.dispatchEvent(new CustomEvent('expertConsultationSuccess', {
          detail: { booking, currentStep: 'success', shouldReopen: true }
        }));

      } else {
        throw new Error(paymentResult.error || t('expertConsultation.errors.paymentError'));
      }
    } catch (error) {
      console.error('Payment/Booking failed:', error);

      let errorMessage = t('expertConsultation.errors.bookingFailed');
      let showRetry = true;

      if (error instanceof Error) {
        if (error.message.includes('SLOT_ALREADY_BOOKED')) {
          errorMessage = t('expertConsultation.errors.slotAlreadyBooked');
          showRetry = false;
        } else if (error.message.includes('not configured')) {
          errorMessage = t('expertConsultation.errors.paymentUnavailable');
        } else if (error.message.includes('network')) {
          errorMessage = t('expertConsultation.errors.networkError');
        } else if (error.message.includes('Razorpay')) {
          errorMessage = t('expertConsultation.errors.paymentError');
        } else if (error.message.includes('user closed')) {
          errorMessage = t('expertConsultation.errors.paymentCancelled');
        }
      }

      setBookingError(errorMessage);
      alert(errorMessage);

      window.dispatchEvent(new CustomEvent('expertConsultationPaymentFailed', {
        detail: {
          error: errorMessage,
          shouldReopen: true,
          goToStep: showRetry ? 'payment' : 'schedule'
        }
      }));

    } finally {
      setIsProcessing(false);
    }
  };


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setCurrentStep('form');
    setFormData({
      name: '',
      mobile: '',
      email: '',
      location: '',
      projectType: '',
      message: ''
    });
    setScheduleData({
      selectedDate: undefined,
      selectedTimeSlot: ''
    });
    setBookingDetails(null);
    setBookingError('');
    setSlotError('');
    setPolicyAccepted(false); // 🆕 ADD THIS LINE
  };

  const handleClose = () => {
    closePopup();
    resetForm();
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'form': return 20;
      case 'schedule': return 60;
      case 'payment': return 80;
      case 'success': return 100;
      default: return 0;
    }
  };

  const renderForm = () => (
    <>
      <DialogHeader className="text-center">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #FDB515 0%, #DAA520 100%)'
              }}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-left min-w-0">
              <DialogTitle
                className="text-base sm:text-xl font-bold truncate"
                style={{ color: '#3C2414' }}
              >
                {t('expertConsultation.form.title')}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm truncate" style={{ color: '#A0522D' }}>
                {t('expertConsultation.form.description')}
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs sm:text-sm"
              style={{ color: '#A0522D' }}
            >
              {t('expertConsultation.step')} 1 {t('expertConsultation.of')} 4
            </span>
            <span
              className="text-xs sm:text-sm"
              style={{ color: '#A0522D' }}
            >
              {getStepProgress()}%
            </span>
          </div>
          <Progress
            value={getStepProgress()}
            className="h-2"
            style={{
              backgroundColor: '#E5D5B7',
            }}
          />
        </div>
      </DialogHeader>

      <div
        className="border rounded-lg sm:rounded-xl p-3 sm:p-4"
        style={{
          background: 'linear-gradient(to right, rgba(253, 248, 232, 0.7), rgba(245, 222, 179, 0.3))',
          borderColor: '#E5D5B7'
        }}
      >
        <div className="flex items-start space-x-2 sm:space-x-4">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#FDB515' }}
          >
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2"
              style={{ color: '#3C2414' }}
            >
              {t('expertConsultation.form.consultationFee')} - {formatCurrency(PAYMENT_CONFIG.consultationFee['expert-consultation'])}
            </h3>
            <div
              className="flex flex-wrap gap-2 text-xs sm:text-sm font-medium"
              style={{ color: '#A0522D' }}
            >
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{t('expertConsultation.form.duration')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{t('expertConsultation.form.certifiedExpert')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{t('expertConsultation.form.personalizedSolutions')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block"
              style={{ color: '#3C2414' }}
            >
              {t('expertConsultation.form.fullName')} *
            </Label>
            <Input
              id="name"
              placeholder={t('expertConsultation.form.fullNamePlaceholder')}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="h-10 sm:h-12 border-2 transition-all text-sm sm:text-base"
              style={{
                backgroundColor: '#FDF8E8',
                borderColor: '#E5D5B7',
                color: '#3C2414'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#FDB515';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = '#FDF8E8';
                e.target.style.borderColor = '#E5D5B7';
              }}
            />
          </div>

          <div>
            <Label
              htmlFor="mobile"
              className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block"
              style={{ color: '#3C2414' }}
            >
              {t('expertConsultation.form.mobileNumber')} *
            </Label>
            <div className="relative">
              <Phone
                className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none"
                style={{ color: '#FDB515' }}
              />
              <Input
                id="mobile"
                placeholder={t('expertConsultation.form.mobilePlaceholder')}
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                required
                className="h-10 sm:h-12 pl-10 sm:pl-12 pr-3 border-2 transition-all text-sm sm:text-base"
                style={{
                  backgroundColor: '#FDF8E8',
                  borderColor: '#E5D5B7',
                  color: '#3C2414'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#FDB515';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#FDF8E8';
                  e.target.style.borderColor = '#E5D5B7';
                }}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block"
              style={{ color: '#3C2414' }}
            >
              {t('expertConsultation.form.emailAddress')} *
            </Label>
            <div className="relative">
              <Mail
                className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none"
                style={{ color: '#FDB515' }}
              />
              <Input
                id="email"
                type="email"
                placeholder={t('expertConsultation.form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="h-10 sm:h-12 pl-10 sm:pl-12 pr-3 border-2 transition-all text-sm sm:text-base"
                style={{
                  backgroundColor: '#FDF8E8',
                  borderColor: '#E5D5B7',
                  color: '#3C2414'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#FDB515';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#FDF8E8';
                  e.target.style.borderColor = '#E5D5B7';
                }}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="location"
              className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block"
              style={{ color: '#3C2414' }}
            >
              {t('expertConsultation.form.location')} *
            </Label>
            <div className="relative">
              <MapPin
                className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none"
                style={{ color: '#FDB515' }}
              />
              <Input
                id="location"
                placeholder={t('expertConsultation.form.locationPlaceholder')}
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
                className="h-10 sm:h-12 pl-10 sm:pl-12 pr-3 border-2 transition-all text-sm sm:text-base"
                style={{
                  backgroundColor: '#FDF8E8',
                  borderColor: '#E5D5B7',
                  color: '#3C2414'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#FDB515';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#FDF8E8';
                  e.target.style.borderColor = '#E5D5B7';
                }}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="message"
              className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block"
              style={{ color: '#3C2414' }}
            >
              {t('expertConsultation.form.projectDetails')}
            </Label>
            <Textarea
              id="message"
              placeholder={t('expertConsultation.form.projectDetailsPlaceholder')}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
              className="border-2 transition-all resize-none text-sm sm:text-base p-3"
              style={{
                backgroundColor: '#FDF8E8',
                borderColor: '#E5D5B7',
                color: '#3C2414'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#FDB515';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = '#FDF8E8';
                e.target.style.borderColor = '#E5D5B7';
              }}
            />
          </div>
        </div>

        <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="flex-1 h-10 sm:h-12 text-sm sm:text-base transition-colors"
            style={{ color: '#A0522D' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#8B4513';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = '#A0522D';
            }}
          >
            {t('expertConsultation.form.maybeLater')}
          </Button>

          <Button
            type="submit"
            className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #FDB515 0%, #DAA520 100%)',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            {t('expertConsultation.form.continueToSchedule')}
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
          </Button>
        </div>
      </form>
    </>
  );

  const renderSchedule = () => (
    <>
      <DialogHeader className="text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
              }}
            >
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <DialogTitle
                className="text-xl font-bold"
                style={{ color: '#3C2414' }}
              >
                {t('expertConsultation.schedule.title')}
              </DialogTitle>
              <DialogDescription style={{ color: '#A0522D' }}>
                {t('expertConsultation.schedule.description')}
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-sm"
              style={{ color: '#A0522D' }}
            >
              {t('expertConsultation.step')} 2 {t('expertConsultation.of')} 4
            </span>
            <span
              className="text-sm"
              style={{ color: '#A0522D' }}
            >
              {getStepProgress()}%
            </span>
          </div>
          <Progress
            value={getStepProgress()}
            className="h-2"
            style={{
              backgroundColor: '#E5D5B7',
            }}
          />
        </div>
      </DialogHeader>

      <div className="space-y-6 w-[90%]">
        <div
          className="border rounded-xl p-4"
          style={{
            background: 'linear-gradient(to right, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.1))',
            borderColor: '#8B4513'
          }}
        >
          <p
            className="text-sm flex items-center font-medium"
            style={{ color: '#8B4513' }}
          >
            <Clock className="w-4 h-4 mr-2" />
            {t('expertConsultation.schedule.instructionText')}
          </p>
        </div>

        <div className="space-y-4">
          <Label
            className="text-base font-bold"
            style={{ color: '#3C2414' }}
          >
            📅 {t('expertConsultation.schedule.selectDate')}
          </Label>
          <div
            className="border rounded-lg p-4"
            style={{
              backgroundColor: 'white',
              borderColor: '#E5D5B7'
            }}
          >
            <CalendarComponent
              mode="single"
              selected={scheduleData.selectedDate}
              onSelect={(date) => setScheduleData(prev => ({ ...prev, selectedDate: date, selectedTimeSlot: '' }))}
              disabled={(date) => !isDateAvailable(date)}
              className="rounded-md border-0"
            />
          </div>
          <p
            className="text-xs"
            style={{ color: '#8B4513' }}
          >
            {t('expertConsultation.schedule.availabilityNote')}
          </p>
        </div>

        {scheduleData.selectedDate && (
          <div className="space-y-4">
            <Label
              className="text-base font-bold"
              style={{ color: '#3C2414' }}
            >
              ⏰ {t('expertConsultation.schedule.selectTimeSlot')}
            </Label>

            {loadingSlots && (
              <div
                className="border rounded-lg p-4 text-center"
                style={{
                  backgroundColor: '#FDF8E8',
                  borderColor: '#FFD0A0'
                }}
              >
                <div className="inline-block">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"
                    style={{ borderTopColor: '#FDB515' }}
                  ></div>
                </div>
                <p style={{ color: '#A0522D' }}>{t('expertConsultation.schedule.loadingSlots')}</p>
              </div>
            )}

            {slotError && (
              <div
                className="border rounded-lg p-4 flex items-start gap-3"
                style={{
                  backgroundColor: 'rgba(255, 84, 89, 0.1)',
                  borderColor: '#FF5459'
                }}
              >
                <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: '#FF5459' }} />
                <p style={{ color: '#8B0000' }} className="text-sm">{slotError}</p>
              </div>
            )}

            {!loadingSlots && (
              <div className="grid grid-cols-3 gap-3">
                {availableSlots.map((slot) => {
                  const slotConfig = CONSULTATION_SLOTS.find(s => s.time === slot.time);
                  return (
                    <button
                      key={slot.time}
                      onClick={() => setScheduleData(prev => ({ ...prev, selectedTimeSlot: slot.time }))}
                      disabled={!slot.available}
                      className="p-3 text-sm rounded-lg border transition-all"
                      style={{
                        backgroundColor: scheduleData.selectedTimeSlot === slot.time
                          ? '#FDB515'
                          : slot.available ? 'white' : '#F0F0F0',
                        color: scheduleData.selectedTimeSlot === slot.time
                          ? 'white'
                          : slot.available ? '#3C2414' : '#999',
                        borderColor: scheduleData.selectedTimeSlot === slot.time
                          ? '#FDB515'
                          : slot.available ? '#E5D5B7' : '#DDD',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        opacity: slot.available ? 1 : 0.6
                      }}
                      onMouseEnter={(e) => {
                        if (slot.available && scheduleData.selectedTimeSlot !== slot.time) {
                          e.currentTarget.style.borderColor = '#FDB515';
                          e.currentTarget.style.backgroundColor = '#FDF8E8';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (slot.available && scheduleData.selectedTimeSlot !== slot.time) {
                          e.currentTarget.style.borderColor = '#E5D5B7';
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      <div>{slotConfig?.label}</div>
                      {slot.booked && <div className="text-xs opacity-70">🔒 {t('expertConsultation.schedule.booked')}</div>}
                    </button>
                  );
                })}
              </div>
            )}

            <p
              className="text-xs"
              style={{ color: '#8B4513' }}
            >
              {t('expertConsultation.schedule.timeSlotNote')}
            </p>
          </div>
        )}

        {scheduleData.selectedDate && scheduleData.selectedTimeSlot && (
          <div
            className="border rounded-xl p-4"
            style={{
              background: 'linear-gradient(to right, rgba(253, 248, 232, 0.7), rgba(245, 222, 179, 0.3))',
              borderColor: '#E5D5B7'
            }}
          >
            <h4
              className="font-semibold mb-2 flex items-center"
              style={{ color: '#3C2414' }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('expertConsultation.schedule.selectedSchedule')}
            </h4>
            <div
              className="text-sm font-medium"
              style={{ color: '#A0522D' }}
            >
              <div className="flex items-center justify-between">
                <span>📅 {t('expertConsultation.schedule.date')}:</span>
                <span className="font-semibold">{scheduleData.selectedDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span>⏰ {t('expertConsultation.schedule.time')}:</span>
                <span className="font-semibold">
                  {CONSULTATION_SLOTS.find(s => s.time === scheduleData.selectedTimeSlot)?.label} IST
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button
            onClick={() => setCurrentStep('form')}
            variant="outline"
            className="flex-1 h-12 border-2 font-semibold"
            style={{
              borderColor: '#8B4513',
              color: '#8B4513'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#8B4513';
              (e.target as HTMLElement).style.color = 'white';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.color = '#8B4513';
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('expertConsultation.schedule.back')}
          </Button>
          <Button
            onClick={handleScheduleSubmit}
            disabled={!scheduleData.selectedDate || !scheduleData.selectedTimeSlot}
            className="flex-1 h-12 font-semibold transition-all duration-200"
            style={{
              background: !scheduleData.selectedDate || !scheduleData.selectedTimeSlot
                ? '#E0E0E0'
                : 'linear-gradient(135deg, #FDB515 0%, #DAA520 100%)',
              color: !scheduleData.selectedDate || !scheduleData.selectedTimeSlot ? '#A0A0A0' : 'white',
              cursor: !scheduleData.selectedDate || !scheduleData.selectedTimeSlot ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (scheduleData.selectedDate && scheduleData.selectedTimeSlot) {
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (scheduleData.selectedDate && scheduleData.selectedTimeSlot) {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }
            }}
          >
            {t('expertConsultation.schedule.continueToPayment')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </>
  );

  const renderPayment = () => {
    const consultationFee = PAYMENT_CONFIG.consultationFee['expert-consultation'];
    const totalAmount = consultationFee;

    return (
      <>
        <DialogHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FDB515 0%, #DAA520 100%)'
                }}
              >
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <DialogTitle
                  className="text-xl font-bold"
                  style={{ color: '#3C2414' }}
                >
                  {t('expertConsultation.payment.title')}
                </DialogTitle>
                <DialogDescription style={{ color: '#A0522D' }}>
                  {t('expertConsultation.payment.description')}
                </DialogDescription>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm"
                style={{ color: '#A0522D' }}
              >
                {t('expertConsultation.step')} 3 {t('expertConsultation.of')} 4
              </span>
              <span
                className="text-sm"
                style={{ color: '#A0522D' }}
              >
                {getStepProgress()}%
              </span>
            </div>
            <Progress
              value={getStepProgress()}
              className="h-2"
              style={{
                backgroundColor: '#E5D5B7',
              }}
            />
          </div>
        </DialogHeader>

        <div className="space-y-6 w-[90%]">
          {bookingError && (
            <div
              className="border rounded-lg p-4 flex items-start gap-3"
              style={{
                backgroundColor: 'rgba(255, 84, 89, 0.1)',
                borderColor: '#FF5459'
              }}
            >
              <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: '#FF5459' }} />
              <p style={{ color: '#8B0000' }} className="text-sm">{bookingError}</p>
            </div>
          )}

          <div
            className="border rounded-xl p-6"
            style={{
              background: 'linear-gradient(to right, rgba(253, 248, 232, 0.7), rgba(245, 222, 179, 0.3))',
              borderColor: '#E5D5B7'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: '#3C2414' }}
                >
                  {t('expertConsultation.payment.consultationTitle')}
                </h3>
                <div
                  className="flex items-center space-x-4 text-sm font-medium"
                  style={{ color: '#A0522D' }}
                >
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {t('expertConsultation.payment.duration')}
                  </span>
                  <span className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {t('expertConsultation.payment.certifiedExpert')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-2xl font-bold"
                  style={{ color: '#3C2414' }}
                >
                  {formatCurrency(totalAmount)}
                </div>
                <div
                  className="text-sm"
                  style={{ color: '#FDB515' }}
                >
                  {t('expertConsultation.payment.inclusiveTaxes')}
                </div>
              </div>
            </div>
          </div>

          <div
            className="border rounded-xl p-6"
            style={{
              backgroundColor: 'white',
              borderColor: '#E5D5B7'
            }}
          >
            <h4
              className="font-semibold mb-4 flex items-center"
              style={{ color: '#3C2414' }}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" style={{ color: '#FDB515' }} />
              {t('expertConsultation.payment.whatsIncluded')}
            </h4>
            <ul className="space-y-2">
              {[
                t('expertConsultation.payment.includes.oneOnOne'),
                t('expertConsultation.payment.includes.personalized'),
                t('expertConsultation.payment.includes.timeline'),
                t('expertConsultation.payment.includes.recommendations'),
                t('expertConsultation.payment.includes.emailSummary')
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-sm" style={{ color: '#6B5A4C' }}>
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: '#FDB515' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="border rounded-xl p-6"
            style={{
              backgroundColor: '#FFF5E6',
              borderColor: '#FFD0A0'
            }}
          >
            <h4
              className="font-semibold mb-4"
              style={{ color: '#3C2414' }}
            >
              {t('expertConsultation.payment.bookingSummary')}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.payment.customerName')}:</span>
                <span className="font-semibold" style={{ color: '#3C2414' }}>{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.payment.email')}:</span>
                <span className="font-semibold" style={{ color: '#3C2414' }}>{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.payment.phone')}:</span>
                <span className="font-semibold" style={{ color: '#3C2414' }}>{formData.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.payment.location')}:</span>
                <span className="font-semibold" style={{ color: '#3C2414' }}>{formData.location}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.payment.date')}:</span>
                <span className="font-semibold" style={{ color: '#3C2414' }}>
                  {scheduleData.selectedDate?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.payment.time')}:</span>
                <span className="font-semibold" style={{ color: '#3C2414' }}>
                  {CONSULTATION_SLOTS.find(s => s.time === scheduleData.selectedTimeSlot)?.label}
                </span>
              </div>
              {formData.projectType && (
                <div className="flex justify-between">
                  <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.payment.projectType')}:</span>
                  <span className="font-semibold" style={{ color: '#3C2414' }}>{formData.projectType}</span>
                </div>
              )}
            </div>
          </div>

          <div
            className="border rounded-xl p-4"
            style={{
              background: 'linear-gradient(to right, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.1))',
              borderColor: '#8B4513'
            }}
          >
            <p className="text-sm flex items-start" style={{ color: '#8B4513' }}>
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                <strong>{t('expertConsultation.payment.importantNote')}</strong> {t('expertConsultation.payment.paymentRedirectNote')}
              </span>
            </p>
          </div>

          {/* 🆕 POLICY CONSENT SECTION - ADD THIS */}
          <div
            className="border rounded-xl p-4"
            style={{
              backgroundColor: '#FFF5E6',
              borderColor: '#FFD0A0'
            }}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="policy-consent"
                checked={policyAccepted}
                onChange={(e) => setPolicyAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 flex-shrink-0 cursor-pointer"
                style={{ accentColor: '#FDB515' }}
              />
              <label
                htmlFor="policy-consent"
                className="text-sm cursor-pointer"
                style={{ color: '#3C2414' }}
              >
                I have read and agree to SimplePrefab's{' '}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline transition-colors"
                  style={{ color: '#FDB515' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#DAA520';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = '#FDB515';
                  }}
                >
                  Terms & Conditions
                </a>
                ,{' '}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline transition-colors"
                  style={{ color: '#FDB515' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#DAA520';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = '#FDB515';
                  }}
                >
                  Privacy Policy
                </a>
                , and{' '}
                <a
                  href="/refund-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline transition-colors"
                  style={{ color: '#FDB515' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#DAA520';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = '#FDB515';
                  }}
                >
                  Cancellation & Refund Policy
                </a>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => setCurrentStep('schedule')}
              variant="outline"
              className="flex-1 h-12 border-2 font-semibold"
              style={{
                borderColor: '#8B4513',
                color: '#8B4513'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#8B4513';
                (e.target as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.color = '#8B4513';
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('expertConsultation.payment.back')}
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !policyAccepted}  // 🆕 UPDATED THIS LINE
              className="flex-1 h-12 font-semibold transition-all duration-200"
              style={{
                background: (isProcessing || !policyAccepted) ? '#E0E0E0' : 'linear-gradient(135deg, #FDB515 0%, #DAA520 100%)',  // 🆕 UPDATED THIS LINE
                color: (isProcessing || !policyAccepted) ? '#A0A0A0' : 'white',  // 🆕 UPDATED THIS LINE
                cursor: (isProcessing || !policyAccepted) ? 'not-allowed' : 'pointer'  // 🆕 UPDATED THIS LINE
              }}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t('expertConsultation.payment.processing')}
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t('expertConsultation.payment.pay')} {formatCurrency(totalAmount)}
                </>
              )}
            </Button>
          </div>
        </div>
      </>
    );
  };

  const renderSuccess = () => (
    <>
      <DialogHeader className="text-center">
        <div className="flex justify-end mb-4">
          {/* Close button commented out */}
        </div>

        <div className="mb-6">
          <Progress
            value={100}
            className="h-2"
            style={{
              backgroundColor: '#E5D5B7',
            }}
          />
          <p className="text-sm mt-2" style={{ color: '#A0522D' }}>
            {t('expertConsultation.completed')}!
          </p>
        </div>
      </DialogHeader>

      <div className="space-y-6 w-[90%]">
        <div className="text-center py-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
            }}
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2
            className="text-3xl font-black mb-3"
            style={{ color: '#3C2414' }}
          >
            {t('expertConsultation.success.successHeading')}
          </h2>
          <p
            className="text-lg"
            style={{ color: '#A0522D' }}
          >
            {t('expertConsultation.success.confirmationMessage')}
          </p>
        </div>

        <div
          className="border rounded-xl p-6"
          style={{
            background: 'linear-gradient(to right, rgba(253, 248, 232, 0.7), rgba(245, 222, 179, 0.3))',
            borderColor: '#E5D5B7'
          }}
        >
          <h4
            className="font-semibold mb-4 flex items-center"
            style={{ color: '#3C2414' }}
          >
            <Star className="w-5 h-5 mr-2" style={{ color: '#FDB515' }} />
            {t('expertConsultation.success.bookingDetails')}
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.success.bookingId')}:</span>
              <span className="font-bold" style={{ color: '#FDB515' }}>{bookingDetails?.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.success.amountPaid')}:</span>
              <span className="font-semibold" style={{ color: '#3C2414' }}>{formatCurrency(bookingDetails?.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.success.dateScheduled')}:</span>
              <span className="font-semibold" style={{ color: '#3C2414' }}>{bookingDetails?.appointmentDate}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#6B5A4C' }}>{t('expertConsultation.success.timeScheduled')}:</span>
              <span className="font-semibold" style={{ color: '#3C2414' }}>{bookingDetails?.appointmentTime}</span>
            </div>
          </div>
        </div>

        <div
          className="border rounded-xl p-6"
          style={{
            backgroundColor: 'white',
            borderColor: '#E5D5B7'
          }}
        >
          <h4
            className="font-semibold mb-4"
            style={{ color: '#3C2414' }}
          >
            {t('expertConsultation.success.communicationStatus')}
          </h4>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#10B981' }} />
              <div>
                <p className="font-semibold" style={{ color: '#3C2414' }}>✉️ {t('expertConsultation.success.emailConfirmation')}</p>
                <p style={{ color: '#6B5A4C' }}>{t('expertConsultation.success.sentTo')} {bookingDetails?.customerEmail}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#10B981' }} />
              <div>
                <p className="font-semibold" style={{ color: '#3C2414' }}>📱 {t('expertConsultation.success.whatsappNotification')}</p>
                <p style={{ color: '#6B5A4C' }}>{t('expertConsultation.success.sentTo')} {bookingDetails?.customerPhone}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border rounded-xl p-4"
          style={{
            background: 'linear-gradient(to right, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.1))',
            borderColor: '#8B4513'
          }}
        >
          <p className="text-sm flex items-start" style={{ color: '#8B4513' }}>
            <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>
              <strong>{t('expertConsultation.success.nextStep')}:</strong> {t('expertConsultation.success.expertContact')}
            </span>
          </p>
        </div>

        <Button
          onClick={handleClose}
          className="w-full h-12 font-semibold rounded-lg transition-all duration-200 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FDB515 0%, #DAA520 100%)',
            color: 'white'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          {t('expertConsultation.success.close')}
        </Button>
      </div>
    </>
  );

  return (
    <Dialog open={isPopupOpen} onOpenChange={closePopup}>
      <DialogContent
        className="sm:max-w-2xl max-h-[95vh] overflow-y-auto border-0 shadow-2xl"
        style={{
          backgroundColor: 'white',
          border: '2px solid #FDB515'
        }}
      >
        {currentStep === 'form' && renderForm()}
        {currentStep === 'schedule' && renderSchedule()}
        {currentStep === 'payment' && renderPayment()}
        {currentStep === 'success' && renderSuccess()}
      </DialogContent>
    </Dialog>
  );
};

export default ExpertPopup;
