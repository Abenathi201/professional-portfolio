import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/home/HeroSection';
import FeaturedWork from '@/components/home/FeaturedWork';
import Marquee from '@/components/home/Marquee';
import HalftoneLoader from '@/components/ui/HalfToneLoader';

export default function Home() {
  // Fetch site settings
  const { data: settingsData } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
  });
  
  // Fetch featured projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: () => base44.entities.Project.filter({ featured: true }, 'order', 10),
  });
  
  const settings = settingsData?.[0] || {};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HalftoneLoader />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero */}
      <HeroSection 
        artistName={settings.artist_name} 
        tagline={settings.tagline}
      />
      
      {/* Scrolling marquee */}
      <Marquee />
      
      {/* Featured work grid */}
      <FeaturedWork projects={projects || []} />
    </div>
  );
}