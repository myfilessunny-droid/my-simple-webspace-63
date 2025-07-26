import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import OurStorySection from '@/components/OurStorySection';
import MissionVisionSection from '@/components/MissionVisionSection';
import AreaOfWorkSection from '@/components/AreaOfWorkSection';
import TrustSection from '@/components/TrustSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';

const Index = () => {
  const { content: heroContent, loading: heroLoading } = useWebsiteContent('hero');
  const { content: statsContent, loading: statsLoading } = useWebsiteContent('stats');
  const { content: missionContent, loading: missionLoading } = useWebsiteContent('mission');
  const { content: ctaContent, loading: ctaLoading } = useWebsiteContent('cta');
  const loading = heroLoading || statsLoading || missionLoading || ctaLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <LoadingSpinner size="lg" className="mb-6" />
        <h2 className="text-xl font-medium text-primary mb-2">Loading Garuda Dhruvam Foundation</h2>
        <p className="text-muted-foreground">Preparing inspiring content...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Pass fetched content as props to each section */}
        <HeroSection content={heroContent} stats={statsContent} />
        <OurStorySection />
        <MissionVisionSection content={missionContent} />
        <AreaOfWorkSection />
        <TrustSection />
        <ShowcaseSection />
        <CTASection content={ctaContent} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
