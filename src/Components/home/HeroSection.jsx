import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowDownRight } from 'lucide-react';

export default function HeroSection({ artistName = "ARTIST NAME", tagline = "Graphic Designer & Illustrator" }) {
  const firstName = artistName?.split(' ')[0] || 'ARTIST';
  const lastName = artistName?.split(' ').slice(1).join(' ') || 'NAME';
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background texture shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
          className="absolute top-20 right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-2 border-[#d4622a]/20"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-40 left-[5%] w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-[#4a7c7b]/10"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/3 left-1/4 font-display text-[20vw] font-black text-[#f5f0e6] select-none pointer-events-none"
          style={{ transform: 'rotate(-5deg)' }}
        >
          ★
        </motion.div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs md:text-sm text-[#d4622a] uppercase tracking-[0.3em] mb-4 md:mb-6"
        >
          {tagline}
        </motion.p>
        
        {/* Name - massive typography */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-display text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-[#f5f0e6] leading-[0.85] tracking-tighter uppercase"
          >
            {firstName}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
            className="font-display text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-transparent leading-[0.85] tracking-tighter uppercase"
            style={{ 
              WebkitTextStroke: '2px #f5f0e6',
              marginLeft: '5vw'
            }}
          >
            {lastName}
          </motion.h1>
          
          {/* Accent marks */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -right-4 top-1/2 w-20 md:w-32 h-1 bg-[#d4622a] origin-left"
          />
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 md:mt-16"
        >
          <Link 
            to={createPageUrl('Work')}
            className="group inline-flex items-center gap-3 font-mono text-sm text-[#f5f0e6] uppercase tracking-wider hover:text-[#d4622a] transition-colors"
          >
            <span>View Work</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDownRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-[#c4beb2]/60 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-[#c4beb2]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}