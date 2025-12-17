import React from 'react';
import { motion } from 'framer-motion';

export default function HalftoneLoader() {
  const dots = Array.from({ length: 9 });
  
  return (
    <div className="flex items-center justify-center gap-2">
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[#f5f0e6]"
          initial={{ scale: 0.5, opacity: 0.3 }}
          animate={{ 
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}