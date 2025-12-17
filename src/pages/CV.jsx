import React, { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Mail, Github, ExternalLink, Phone, MapPin, X, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';
import html2pdf from 'html2pdf.js';

export default function CV() {
  const urlParams = new URLSearchParams(window.location.search);
  const cvSlug = urlParams.get('type') || 'developer';
  const cvRef = useRef(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const { data: cvData } = useQuery({
    queryKey: ['cv', cvSlug],
    queryFn: async () => {
      const cvs = await base44.entities.CV.filter({ slug: cvSlug });
      return cvs[0];
    },
  });

  const handleDownloadClick = () => {
    setShowThemeModal(true);
  };

  const downloadPDF = async (theme) => {
    setShowThemeModal(false);
    setSelectedTheme(theme);

    // Wait for theme to apply
    await new Promise(resolve => setTimeout(resolve, 100));

    const element = cvRef.current;
    const cvType = cvSlug === 'developer' ? 'Developer' : 'QA_Tester';
    const filename = `Abenathi_Sindapi_${cvType}_CV.pdf`;

    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: theme === 'light' ? '#ffffff' : '#0f0e0c'
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success('CV downloaded successfully!');
      // Reset to dark theme after download
      setSelectedTheme('dark');
    } catch (error) {
      toast.error('Failed to download CV. Please try again.');
      console.error('PDF generation error:', error);
    }
  };

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-sm text-[#c4beb2]">Loading CV...</p>
      </div>
    );
  }

  // Theme colors
  const themeColors = selectedTheme === 'light' ? {
    bg: '#ffffff',
    text: '#1a1814',
    accent: '#d4622a',
    muted: '#6b6b6b',
    border: '#d1d5db'
  } : {
    bg: '#0f0e0c',
    text: '#f5f0e6',
    accent: '#d4622a',
    muted: '#c4beb2',
    border: '#c4beb2'
  };

  return (
    <>
      {/* Theme Modal */}
      <AnimatePresence>
        {showThemeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowThemeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1814] border border-[#c4beb2]/20 p-8 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-black text-[#f5f0e6] uppercase tracking-tight">
                  Choose Theme
                </h3>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="text-[#c4beb2] hover:text-[#f5f0e6] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="font-mono text-sm text-[#c4beb2] mb-8">
                Select the theme for your CV download:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => downloadPDF('light')}
                  className="group relative p-6 border-2 border-[#c4beb2]/30 hover:border-[#d4622a] transition-all"
                >
                  <Sun className="w-8 h-8 text-[#d4622a] mb-3 mx-auto" />
                  <p className="font-display text-lg font-bold text-[#f5f0e6] uppercase tracking-tight">
                    Light
                  </p>
                  <p className="font-mono text-xs text-[#c4beb2] mt-2">
                    White background
                  </p>
                </button>

                <button
                  onClick={() => downloadPDF('dark')}
                  className="group relative p-6 border-2 border-[#c4beb2]/30 hover:border-[#d4622a] transition-all"
                >
                  <Moon className="w-8 h-8 text-[#d4622a] mb-3 mx-auto" />
                  <p className="font-display text-lg font-bold text-[#f5f0e6] uppercase tracking-tight">
                    Dark
                  </p>
                  <p className="font-mono text-xs text-[#c4beb2] mt-2">
                    Dark background
                  </p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 md:pt-32">
        {/* Action buttons */}
        <div className="fixed top-24 right-6 md:right-12 z-40 flex gap-3 no-print">
          <Button
            onClick={handleDownloadClick}
            className="bg-[#d4622a] hover:bg-[#c45520] text-[#1a1814] font-mono text-xs uppercase tracking-wider h-10 px-6 rounded-full flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* CV type selector */}
        <div className="px-6 md:px-12 lg:px-20 mb-8 no-print">
          <div className="flex gap-3">
            <a
              href="?type=developer"
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-all ${
                cvSlug === 'developer'
                  ? 'bg-[#d4622a] border-[#d4622a] text-[#1a1814]'
                  : 'border-[#c4beb2]/30 text-[#c4beb2] hover:border-[#f5f0e6] hover:text-[#f5f0e6]'
              }`}
            >
              Developer CV
            </a>
            <a
              href="?type=qa-tester"
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-all ${
                cvSlug === 'qa-tester'
                  ? 'bg-[#d4622a] border-[#d4622a] text-[#1a1814]'
                  : 'border-[#c4beb2]/30 text-[#c4beb2] hover:border-[#f5f0e6] hover:text-[#f5f0e6]'
              }`}
            >
              QA Tester CV
            </a>
          </div>
        </div>
      </div>

      {/* CV Content */}
      <div
        ref={cvRef}
        className="cv-content"
        style={{
          backgroundColor: themeColors.bg,
          color: themeColors.text,
          maxWidth: '1024px',
          margin: '0 auto'
        }}
      >
        <style>{`
          .cv-content {
            padding: 1.25rem 2rem 1rem;
            font-size: 14px;
          }
          .cv-content h1, .cv-content h2, .cv-content h3 {
            color: ${themeColors.text} !important;
            page-break-after: avoid;
            break-after: avoid;
          }
          .cv-content p, .cv-content li, .cv-content span:not([class*="text-["]) {
            color: ${themeColors.muted} !important;
          }
          .cv-content a {
            color: ${themeColors.muted} !important;
          }
          .cv-content .accent-text {
            color: ${themeColors.accent} !important;
          }
          .cv-content [class*="border-"] {
            border-color: ${themeColors.border}33 !important;
          }
          .cv-content [class*="bg-["] {
            background-color: ${themeColors.bg}33 !important;
          }
          .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .cv-content li {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .cv-content div[class*="mb-"] {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .skills-grid {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          .skills-grid > div {
            width: 100%;
          }
        `}</style>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pb-3 mb-5 print-section"
          style={{ borderBottom: `2px solid ${themeColors.accent}` }}
        >
          <h1
            className="font-display text-4xl font-black uppercase tracking-tighter leading-none"
            style={{ color: themeColors.text }}
          >
            {cvData.contact?.name || 'Abenathi Sindapi'}
          </h1>
          <p
            className="font-mono text-base uppercase tracking-wider mt-2"
            style={{ color: themeColors.accent }}
          >
            {cvData.title}
          </p>

          {/* Contact info */}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs" style={{ color: themeColors.muted }}>
            {cvData.contact?.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <a href={`mailto:${cvData.contact.email}`} style={{ color: themeColors.muted }}>
                  {cvData.contact.email}
                </a>
              </div>
            )}
            {cvData.contact?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span>{cvData.contact.phone}</span>
              </div>
            )}
            {cvData.contact?.github && (
              <div className="flex items-center gap-2">
                <Github className="w-3 h-3 flex-shrink-0" />
                <a href={cvData.contact.github} target="_blank" rel="noopener noreferrer" style={{ color: themeColors.muted }}>
                  {cvData.contact.github.replace('https://github.com/', '')}
                </a>
              </div>
            )}
            {cvData.contact?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span>{cvData.contact.location}</span>
              </div>
            )}
            {cvData.contact?.portfolio && (
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                <a href={cvData.contact.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: themeColors.muted }}>
                  {cvData.contact.portfolio}
                </a>
              </div>
            )}
          </div>
        </motion.header>

        {/* Professional Summary */}
        {cvData.summary && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 print-section"
          >
            <h2 className="font-display text-xl font-black uppercase tracking-tight mb-2 flex items-center gap-2" style={{ color: themeColors.text }}>
              <span style={{ color: themeColors.accent }}>•</span>
              Professional Summary
            </h2>
            <p className="text-sm" style={{ color: themeColors.muted, lineHeight: '1.7' }}>
              {cvData.summary}
            </p>
          </motion.section>
        )}

        {/* Technical Skills */}
        {cvData.skills && cvData.skills.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 print-section"
          >
            <h2 className="font-display text-xl font-black uppercase tracking-tight mb-2 flex items-center gap-2" style={{ color: themeColors.text }}>
              <span style={{ color: themeColors.accent }}>•</span>
              Technical Skills
            </h2>
            <div className="skills-grid">
              {cvData.skills.map((skillGroup, index) => (
                <div key={index} className="relative pl-3 border-l-2" style={{ borderColor: `${themeColors.border}33` }}>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider mb-1" style={{ color: themeColors.accent }}>
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-0.5">
                    {skillGroup.items.map((skill, idx) => (
                      <li key={idx} className="font-mono text-xs leading-relaxed" style={{ color: themeColors.muted }}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Professional Experience */}
        {cvData.experience && cvData.experience.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 print-section"
          >
            <h2 className="font-display text-xl font-black uppercase tracking-tight mb-2 flex items-center gap-2" style={{ color: themeColors.text }}>
              <span style={{ color: themeColors.accent }}>•</span>
              Professional Experience
            </h2>
            {cvData.experience.map((job, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="font-display text-base font-bold tracking-tight" style={{ color: themeColors.text }}>
                  {job.title}
                </h3>
                <p className="font-mono text-xs mt-0.5" style={{ color: themeColors.muted }}>
                  {job.company} • {job.period}
                </p>
                <ul className="mt-2 space-y-1">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="text-sm flex" style={{ color: themeColors.muted, lineHeight: '1.5' }}>
                      <span className="mr-2 flex-shrink-0" style={{ color: themeColors.accent }}>◆</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>
        )}

        {/* Projects */}
        {cvData.projects && cvData.projects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cvData.education && cvData.education.length > 0 ? "mb-4 print-section" : "print-section"}
          >
            <h2 className="font-display text-xl font-black uppercase tracking-tight mb-2 flex items-center gap-2" style={{ color: themeColors.text }}>
              <span style={{ color: themeColors.accent }}>•</span>
              Projects
            </h2>
            {cvData.projects.map((project, index) => (
              <div key={index} className="mb-3 last:mb-0 p-3 border" style={{ backgroundColor: `${themeColors.bg}33`, borderColor: `${themeColors.border}10` }}>
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className="font-display text-base font-bold tracking-tight" style={{ color: themeColors.text }}>
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors no-print flex-shrink-0"
                      style={{ color: themeColors.accent }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <p className="font-mono text-xs mb-2" style={{ color: themeColors.accent }}>
                  {project.tech}
                </p>
                <ul className="space-y-1">
                  {project.description.map((item, idx) => (
                    <li key={idx} className="text-sm flex" style={{ color: themeColors.muted, lineHeight: '1.5' }}>
                      <span className="mr-2 flex-shrink-0" style={{ color: themeColors.accent }}>◆</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>
        )}

        {/* Education */}
        {cvData.education && cvData.education.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="print-section"
          >
            <h2 className="font-display text-xl font-black uppercase tracking-tight mb-2 flex items-center gap-2" style={{ color: themeColors.text }}>
              <span style={{ color: themeColors.accent }}>•</span>
              Education
            </h2>
            {cvData.education.map((edu, index) => (
              <div key={index} className="mb-1.5 last:mb-0">
                <h3 className="font-display text-base font-bold tracking-tight" style={{ color: themeColors.text }}>
                  {edu.degree}
                </h3>
                <p className="font-mono text-xs" style={{ color: themeColors.muted }}>
                  {edu.institution} • {edu.period}
                </p>
              </div>
            ))}
          </motion.section>
        )}
      </div>
    </>
  );
}