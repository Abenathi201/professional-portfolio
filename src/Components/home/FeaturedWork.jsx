import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedWork({ projects = [] }) {
  // Asymmetric grid positions for that "pinned to wall" feel
  const gridPositions = [
    { size: 'large', offset: 'ml-0 mt-0' },
    { size: 'medium', offset: 'ml-auto mr-8 -mt-20' },
    { size: 'small', offset: 'ml-12 mt-8' },
    { size: 'medium', offset: 'ml-auto mt-0' },
    { size: 'large', offset: 'ml-8 -mt-12' },
    { size: 'small', offset: 'ml-auto mr-20 mt-4' },
  ];
  
  const sizeClasses = {
    large: 'w-full md:w-[55%] aspect-[4/5]',
    medium: 'w-full md:w-[40%] aspect-square',
    small: 'w-full md:w-[30%] aspect-[3/4]',
  };

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20 md:py-32">
      {/* Section header */}
      <div className="flex items-end justify-between mb-16 md:mb-24">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em]"
          >
            Selected
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-[#f5f0e6] tracking-tighter uppercase mt-2"
          >
            Work
          </motion.h2>
        </div>
        <Link 
          to={createPageUrl('Work')}
          className="hidden md:flex items-center gap-2 font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors uppercase tracking-wider"
        >
          <span>All Projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Asymmetric grid */}
      <div className="relative space-y-8 md:space-y-0">
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <p className="font-mono text-sm text-[#c4beb2]/70">
              This section is under construction. Stay tuned — good things loading
              <span className="inline-flex">
                <span className="animate-dot-1">.</span>
                <span className="animate-dot-2">.</span>
                <span className="animate-dot-3">.</span>
              </span>
            </p>
          </motion.div>
        ) : (
          projects.slice(0, 6).map((project, index) => {
            const position = gridPositions[index] || gridPositions[0];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative ${sizeClasses[position.size]} ${position.offset}`}
              >
                <Link
                  to={`${createPageUrl('ProjectDetail')}?id=${project.id}`}
                  className="group block relative overflow-hidden"
                >
                  {/* Image container with geometric frame */}
                  <div className="relative overflow-hidden bg-[#2a2520]">
                    {/* Halftone overlay on hover */}
                    <div
                      className="absolute inset-0 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle, #f5f0e6 1px, transparent 1px)`,
                        backgroundSize: '8px 8px'
                      }}
                    />

                    <motion.img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Color offset effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none mix-blend-multiply">
                      <div className="absolute inset-0 bg-[#00a8e8]" style={{ transform: 'translate(-4px, 2px)', opacity: 0.3 }} />
                      <div className="absolute inset-0 bg-[#e23c2e]" style={{ transform: 'translate(4px, -2px)', opacity: 0.3 }} />
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-[#f5f0e6] uppercase tracking-tight group-hover:text-[#d4622a] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider mt-1">
                        {project.category?.replace('_', ' ')} {project.year && `— ${project.year}`}
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-[#d4622a]"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Index number */}
                  <span className="absolute -top-2 -left-2 md:-top-4 md:-left-4 font-mono text-6xl md:text-8xl font-bold text-[#f5f0e6]/5 select-none pointer-events-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
      
      {/* Mobile CTA */}
      <Link 
        to={createPageUrl('Work')}
        className="md:hidden flex items-center justify-center gap-2 mt-12 font-mono text-sm text-[#c4beb2] hover:text-[#f5f0e6] transition-colors uppercase tracking-wider"
      >
        <span>View All Projects</span>
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </section>
  );
}