import React from 'react';
import { siteSettings } from '@/data/data';
import GrainOverlay from '@/components/ui/GrainOverlay';
import NavBar from '@/components/navigation/NavBar';
import Footer from '@/components/footer/footer';
import '@/styles/layout.css';

export default function Layout({ children, currentPageName }) {
  const settings = siteSettings;

  // Pages that don't need the standard footer
  const noFooterPages = ['ProjectDetail'];
  const showFooter = !noFooterPages.includes(currentPageName);

  return (
    <div className="min-h-screen bg-[#1a1814] text-[#f5f0e6] selection:bg-[#d4622a] selection:text-[#1a1814]">
      {/* Grain texture overlay */}
      <GrainOverlay opacity={0.035} />

      {/* Navigation */}
      <NavBar artistName={settings.artist_name} />

      {/* Page content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer settings={settings} />}
    </div>
  );
}
