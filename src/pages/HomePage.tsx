'use client'

import SimplyPrefabProcess from '@/components/SimplyPrefabProcess';
import EnhancedPriceCalculator from '../components/EnhancedPriceCalculator';
import FAQ from '../components/FAQ';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import RollingGallery from '../components/RollingGallery';


const HomePage = () => {
  return (
    <>
      {/* <LaunchAnimation /> */}
      <HeroSection />
      <EnhancedPriceCalculator />
      {/* <ServicesShowcase /> */}
      <SimplyPrefabProcess />
      {/* <HowItWorks /> */}
      <RollingGallery />
      <Features />
      {/* <Testimonials /> */}
      <FAQ />
    </>
  );
};

export default HomePage;