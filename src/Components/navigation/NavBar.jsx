import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';

export default function NavBar({ artistName = "ARTIST" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Work', page: 'Work' },
    { label: 'About', page: 'About' },
    { label: 'CV', page: 'CV' },
    { label: 'Contact', page: 'Contact' },
  ];

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between p-6 md:p-8">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="relative z-50">
            <motion.span 
              className="font-display text-xl md:text-2xl font-black text-[#f5f0e6] tracking-tighter"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <GlitchText>{artistName?.split(' ')[0]?.toUpperCase() || 'ARTIST'}</GlitchText>
            </motion.span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className="relative group"
              >
                <span className="font-mono text-sm text-[#f5f0e6] uppercase tracking-wider">
                  <GlitchText>{item.label}</GlitchText>
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[2px] bg-[#d4622a] w-0 group-hover:w-full transition-all duration-300"
                />
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          >
            <motion.span 
              className="w-6 h-0.5 bg-[#f5f0e6] block"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-[#f5f0e6] block"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-[#f5f0e6] block"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
            />
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-0 z-40 bg-[#1a1814] flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    to={createPageUrl(item.page)}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl md:text-6xl font-black text-[#f5f0e6] uppercase tracking-tighter"
                  >
                    <GlitchText>{item.label}</GlitchText>
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Decorative elements */}
            <div className="absolute bottom-8 left-8 font-mono text-xs text-[#c4beb2]/50 uppercase tracking-widest">
              Menu
            </div>
            <div className="absolute bottom-8 right-8 font-mono text-xs text-[#c4beb2]/50">
              ©2025
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}