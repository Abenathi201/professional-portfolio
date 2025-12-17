import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import GlitchText from '@/components/ui/GlitchText';

export default function Footer({ settings = {} }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-[#c4beb2]/20">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[#d4622a]/5"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link to={createPageUrl('Home')}>
              <span className="font-display text-2xl font-black text-[#f5f0e6] tracking-tighter uppercase">
                <GlitchText>{settings.artist_name || 'Artist'}</GlitchText>
              </span>
            </Link>
            <p className="font-mono text-xs text-[#c4beb2]/70 mt-4 max-w-xs leading-relaxed">
              {settings.tagline || 'Graphic Designer & Illustrator'}
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.2em] mb-4">Navigate</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: 'Work', page: 'Work' },
                { label: 'About', page: 'About' },
                { label: 'CV', page: 'CV' },
                { label: 'Contact', page: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className="font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.2em] mb-4">Connect</h4>
            <nav className="flex flex-col gap-2">
              <a
                href={'https://github.com/Abenathi201'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors w-fit"
              >
                GitHub
              </a>
              <a
                href={settings.linkedin || 'https://www.linkedin.com/in/abenathi-sindapi-420969270/'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors w-fit"
              >
                LinkedIn
              </a>
              {settings.instagram && (
                <a
                  href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors w-fit"
                >
                  Instagram
                </a>
              )}
              {settings.twitter && (
                <a
                  href={`https://twitter.com/${settings.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors w-fit"
                >
                  Twitter/X
                </a>
              )}
              {settings.behance && (
                <a
                  href={settings.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors w-fit"
                >
                  Behance
                </a>
              )}
              <a
                href={`mailto:${settings.email || 'abenathi.sindaphi201@gmail.com'}`}
                className="font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors w-fit"
              >
                Email
              </a>
            </nav>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#c4beb2]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#c4beb2]/50">
            © {currentYear} {settings.artist_name || 'Artist'}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#c4beb2]/30">
            Designed with controlled chaos
          </p>
        </div>
      </div>
    </footer>
  );
}