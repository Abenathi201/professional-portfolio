import React from 'react';
import { motion } from 'framer-motion';

export default function GlitchText({ children, className = "", as = "span" }) {
  const Tag = as;
  
  return (
    <span className={`relative inline-block group ${className}`}>
      {/* Cyan offset layer */}
      <Tag 
        className="absolute inset-0 text-[#00a8e8] opacity-0 group-hover:opacity-70 transition-opacity duration-100"
        style={{ transform: 'translate(-2px, 1px)' }}
        aria-hidden="true"
      >
        {children}
      </Tag>
      
      {/* Red offset layer */}
      <Tag 
        className="absolute inset-0 text-[#e23c2e] opacity-0 group-hover:opacity-70 transition-opacity duration-100"
        style={{ transform: 'translate(2px, -1px)' }}
        aria-hidden="true"
      >
        {children}
      </Tag>
      
      {/* Main text */}
      <Tag className="relative">
        {children}
      </Tag>
    </span>
  );
}