import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import GrainOverlay from '@/components/ui/GrainOverlay';
import NavBar from '@/components/navigation/NavBar';
import Footer from '@/components/footer/footer';

export default function Layout({ children, currentPageName }) {
  // Fetch site settings
  const { data: settingsData } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
  });

  const settings = settingsData?.[0] || {};

  // Pages that don't need the standard footer
  const noFooterPages = ['ProjectDetail'];
  const showFooter = !noFooterPages.includes(currentPageName);

  return (
    <div className="min-h-screen bg-[#1a1814] text-[#f5f0e6] selection:bg-[#d4622a] selection:text-[#1a1814]">
      {/* Custom CSS for fonts and effects */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        :root {
          --color-bg: #1a1814;
          --color-text: #f5f0e6;
          --color-accent: #d4622a;
          --color-muted: #c4beb2;
          --color-teal: #4a7c7b;
          --color-rose: #c17a7a;
        }

        .font-display {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .font-mono {
          font-family: 'Space Mono', monospace;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1814;
        }
        ::-webkit-scrollbar-thumb {
          background: #c4beb2;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #d4622a;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Image grain on hover */
        .img-grain:hover::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.1;
          pointer-events: none;
        }
      `}</style>

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
