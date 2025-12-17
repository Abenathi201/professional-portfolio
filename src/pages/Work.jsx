import React, { useState } from 'react';
import { projects } from '@/data/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  { value: 'all', label: 'All Work' },
  { value: 'Full Stack', label: 'Full Stack' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Mobile App', label: 'Mobile App' },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects?.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Page header */}
      <header className="px-6 md:px-12 lg:px-20 mb-12 md:mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em]"
        >
          Portfolio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-[#f5f0e6] tracking-tighter uppercase mt-2"
        >
          Work
        </motion.h1>
        
        {/* Category filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-[#d4622a] border-[#d4622a] text-[#1a1814]'
                  : 'border-[#c4beb2]/30 text-[#c4beb2] hover:border-[#f5f0e6] hover:text-[#f5f0e6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </header>
      
      {/* Project grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link 
                    to={`${createPageUrl('ProjectDetail')}?id=${project.id}`}
                    className="group block relative"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Image container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#2a2520]">
                      {/* Halftone overlay */}
                      <div 
                        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle, #f5f0e6 1px, transparent 1px)`,
                          backgroundSize: '6px 6px'
                        }}
                      />
                      
                      <motion.img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={{ 
                          scale: hoveredProject === project.id ? 1.08 : 1 
                        }}
                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                      />
                      
                      {/* Glitch effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none mix-blend-multiply">
                        <div className="absolute inset-0 bg-[#00a8e8]" style={{ transform: 'translate(-3px, 1px)', opacity: 0.4 }} />
                        <div className="absolute inset-0 bg-[#e23c2e]" style={{ transform: 'translate(3px, -1px)', opacity: 0.4 }} />
                      </div>
                      
                      {/* View project indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: hoveredProject === project.id ? 1 : 0,
                          y: hoveredProject === project.id ? 0 : 20
                        }}
                        className="absolute bottom-4 right-4 z-20"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#d4622a] flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5 text-[#1a1814]" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Project info */}
                    <div className="mt-4">
                      <h3 className="font-display text-lg font-bold text-[#f5f0e6] uppercase tracking-tight group-hover:text-[#d4622a] transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider">
                          {project.category?.replace('_', ' ')}
                        </span>
                        {project.year && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#c4beb2]/40" />
                            <span className="font-mono text-xs text-[#c4beb2]/70">
                              {project.year}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        {/* Empty state */}
        {(!filteredProjects || filteredProjects.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
        )}
      </section>
    </div>
  );
}