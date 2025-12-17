import React from 'react';
import { siteSettings, projects } from '@/data/data';
import HeroSection from '@/components/home/HeroSection';
import FeaturedWork from '@/components/home/FeaturedWork';
import Marquee from '@/components/home/Marquee';

export default function Home() {
  const settings = siteSettings;
  const featuredProjects = projects.filter(p => p.featured);

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
      <FeaturedWork projects={featuredProjects} />
    </div>
  );
}