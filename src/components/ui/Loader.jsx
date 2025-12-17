import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-[#1a1814] flex items-center justify-center"
    >
      {/* Halftone background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #f5f0e6 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-6xl md:text-8xl font-black text-[#f5f0e6] uppercase tracking-tighter mb-4">
            <GlitchText>Loading</GlitchText>
          </h1>
        </motion.div>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <motion.div
            className="w-3 h-3 bg-[#d4622a] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-3 h-3 bg-[#d4622a] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-3 h-3 bg-[#d4622a] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>

        {/* Progress bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-[#2a2520] rounded-full overflow-hidden mx-auto"
        >
          <motion.div
            className="h-full bg-[#d4622a]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#d4622a]/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#d4622a]/30" />
    </motion.div>
  );
}
