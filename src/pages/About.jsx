import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';
import HalftoneLoader from '@/components/ui/HalftoneLoader';

export default function About() {
  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
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
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em]"
        >
          About
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-[#f5f0e6] tracking-tighter uppercase mt-2"
        >
          <GlitchText>The Developer</GlitchText>
        </motion.h1>
      </header>
      
      {/* Main content */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Geometric frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#d4622a]/30" />
              
              <div className="relative overflow-hidden bg-[#2a2520] aspect-[3/4]">
                {settings.profile_image ? (
                  <img
                    src={settings.profile_image}
                    alt={settings.artist_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-8xl font-black text-[#f5f0e6]/10">
                      {settings.artist_name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                
                {/* Halftone overlay */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, #f5f0e6 1px, transparent 1px)`,
                    backgroundSize: '4px 4px'
                  }}
                />
              </div>
              
              {/* Name tag */}
              <div className="absolute -bottom-4 -right-4 bg-[#1a1814] px-6 py-3 border border-[#c4beb2]/20">
                <span className="font-mono text-xs text-[#c4beb2] uppercase tracking-wider">
                  {settings.tagline || 'Designer & Illustrator'}
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="max-w-xl">
              {/* Large intro */}
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#f5f0e6] tracking-tight leading-tight mb-8">
                {settings.artist_name || 'Artist Name'}
              </h2>
              
              {/* Bio */}
              <div className="space-y-6 text-[#c4beb2] leading-relaxed">
                {settings.bio ? (
                  settings.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p className="text-[#c4beb2]/50 italic">
                    Bio coming soon...
                  </p>
                )}
              </div>
              
              {/* Stats / highlights */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-[#c4beb2]/20">
                <div>
                  <span className="font-display text-4xl font-black text-[#d4622a]">8+</span>
                  <p className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider mt-1">Months Pro Experience</p>
                </div>
                <div>
                  <span className="font-display text-4xl font-black text-[#4a7c7b]">100+</span>
                  <p className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider mt-1">Bugs Identified</p>
                </div>
                <div>
                  <span className="font-display text-4xl font-black text-[#c17a7a]">10+</span>
                  <p className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider mt-1">Technologies</p>
                </div>
              </div>
              
              {/* Professional links */}
              <div className="flex flex-wrap gap-4 mt-12">
                {settings.github && (
                  <a
                    href={`https://github.com/${settings.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-colors"
                  >
                    Email
                  </a>
                )}
                <a
                  href="/Abenathi_Sindapi_Resume.pdf"
                  download
                  className="font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-colors"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#f5f0e6] tracking-tighter uppercase mb-12">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#c4beb2]/20 p-6">
            <h3 className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em] mb-4">Frontend</h3>
            <ul className="space-y-2 text-[#c4beb2]">
              <li>React (Hooks, Router, Query)</li>
              <li>Vue.js</li>
              <li>HTML, CSS, JavaScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
            </ul>
          </div>

          <div className="border border-[#c4beb2]/20 p-6">
            <h3 className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em] mb-4">Backend</h3>
            <ul className="space-y-2 text-[#c4beb2]">
              <li>Node.js, Express</li>
              <li>MySQL, MongoDB</li>
              <li>RESTful APIs</li>
              <li>SQL Queries</li>
              <li>Database Management</li>
            </ul>
          </div>

          <div className="border border-[#c4beb2]/20 p-6">
            <h3 className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em] mb-4">QA & Testing</h3>
            <ul className="space-y-2 text-[#c4beb2]">
              <li>Manual Testing</li>
              <li>Test Case Development</li>
              <li>Bug Documentation</li>
              <li>User Support</li>
              <li>Excel, Tawk.to</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Decorative section */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <span className="font-display text-[30vw] font-black text-[#f5f0e6] uppercase">
            Code
          </span>
        </div>
      </section>
    </div>
  );
}