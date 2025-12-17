import React from 'react';
import { motion } from 'framer-motion';

export default function Marquee({ items = ['Web Development', 'Full Stack', 'React & Node.js', 'API Development', 'Software Testing', 'Database Management'] }) {
  // Double the items for seamless loop
  const doubledItems = [...items, ...items];
  
  return (
    <div className="relative py-8 md:py-12 overflow-hidden border-y border-[#c4beb2]/20">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
        className="flex items-center gap-8 md:gap-16 whitespace-nowrap"
      >
        {doubledItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className="font-display text-2xl md:text-4xl lg:text-5xl font-black text-[#f5f0e6]/20 uppercase tracking-tight">
              {item}
            </span>
            <span className="text-[#d4622a] text-xl md:text-2xl">✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}