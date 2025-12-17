import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import HalftoneLoader from '@/components/ui/HalftoneLoader';
import GlitchText from '@/components/ui/GlitchText';

export default function ProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);
  
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const projects = await base44.entities.Project.filter({ id: projectId });
      return projects[0];
    },
    enabled: !!projectId,
  });
  
  // Fetch all projects for navigation
  const { data: allProjects } = useQuery({
    queryKey: ['allProjects'],
    queryFn: () => base44.entities.Project.list('order'),
  });
  
  // Find next project
  const currentIndex = allProjects?.findIndex(p => p.id === projectId);
  const nextProject = allProjects && currentIndex !== -1 
    ? allProjects[(currentIndex + 1) % allProjects.length] 
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HalftoneLoader />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="font-mono text-sm text-[#c4beb2]">Project not found</p>
        <Link 
          to={createPageUrl('Work')}
          className="mt-4 font-mono text-sm text-[#d4622a] hover:underline"
        >
          Back to work
        </Link>
      </div>
    );
  }

  const allImages = [project.thumbnail, ...(project.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 left-6 md:left-12 z-40"
      >
        <Link 
          to={createPageUrl('Work')}
          className="flex items-center gap-2 font-mono text-xs text-[#c4beb2] hover:text-[#f5f0e6] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </motion.div>
      
      {/* Hero image - full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814] via-transparent to-[#1a1814]/30" />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em] block mb-3"
          >
            {project.category?.replace('_', ' ')} {project.year && `— ${project.year}`}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-[#f5f0e6] tracking-tighter uppercase"
          >
            <GlitchText>{project.title}</GlitchText>
          </motion.h1>
        </div>
      </motion.div>
      
      {/* Project info */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Metadata */}
            <div className="space-y-6">
              {project.client && (
                <div>
                  <span className="font-mono text-xs text-[#d4622a] uppercase tracking-wider block mb-1">
                    Client
                  </span>
                  <span className="font-mono text-sm text-[#f5f0e6]">
                    {project.client}
                  </span>
                </div>
              )}
              <div>
                <span className="font-mono text-xs text-[#d4622a] uppercase tracking-wider block mb-1">
                  Category
                </span>
                <span className="font-mono text-sm text-[#f5f0e6] capitalize">
                  {project.category?.replace('_', ' ')}
                </span>
              </div>
              {project.year && (
                <div>
                  <span className="font-mono text-xs text-[#d4622a] uppercase tracking-wider block mb-1">
                    Year
                  </span>
                  <span className="font-mono text-sm text-[#f5f0e6]">
                    {project.year}
                  </span>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div className="md:col-span-2">
              {project.description && (
                <p className="text-lg md:text-xl text-[#c4beb2] leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Image gallery */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
        <div className="space-y-8 md:space-y-12">
          {allImages.slice(1).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative ${index % 3 === 1 ? 'md:w-[80%] md:ml-auto' : index % 3 === 2 ? 'md:w-[70%]' : ''}`}
            >
              <img
                src={image}
                alt={`${project.title} - Image ${index + 2}`}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Next project */}
      {nextProject && (
        <Link 
          to={`${createPageUrl('ProjectDetail')}?id=${nextProject.id}`}
          className="group block relative border-t border-[#c4beb2]/20"
        >
          <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider">
                  Next Project
                </span>
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-[#f5f0e6] tracking-tighter uppercase mt-2 group-hover:text-[#d4622a] transition-colors">
                  <GlitchText>{nextProject.title}</GlitchText>
                </h2>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="w-16 h-16 rounded-full border border-[#c4beb2]/30 flex items-center justify-center group-hover:bg-[#d4622a] group-hover:border-[#d4622a] transition-all"
              >
                <ArrowUpRight className="w-6 h-6 text-[#f5f0e6]" />
              </motion.div>
            </div>
          </div>
          
          {/* Preview image on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none overflow-hidden">
            <img
              src={nextProject.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      )}
    </div>
  );
}