import React, { useState } from 'react';
import { siteSettings } from '@/data/data';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import GlitchText from '@/components/ui/GlitchText';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const settings = siteSettings;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New message from ${formData.name}`,
          message: formData.message,
          from_name: formData.name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs text-[#d4622a] uppercase tracking-[0.3em]"
        >
          Get in touch
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-[#f5f0e6] tracking-tighter uppercase mt-2"
        >
          <GlitchText>Contact</GlitchText>
        </motion.h1>
      </header>
      
      {/* Main content */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#f5f0e6] tracking-tight mb-6">
              Let's create something together
            </h2>
            <p className="text-[#c4beb2] leading-relaxed mb-12">
              Available for freelance projects, collaborations, and interesting opportunities. 
              Let's talk about your vision.
            </p>
            
            {/* Contact details */}
            <div className="space-y-6">
              <a
                href={`mailto:${settings.email || 'abenathi.sindaphi201@gmail.com'}`}
                className="group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border border-[#c4beb2]/30 flex items-center justify-center group-hover:border-[#d4622a] group-hover:bg-[#d4622a]/10 transition-all">
                  <Mail className="w-5 h-5 text-[#c4beb2] group-hover:text-[#d4622a] transition-colors" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider block">
                    Email
                  </span>
                  <span className="text-[#f5f0e6] group-hover:text-[#d4622a] transition-colors">
                    {settings.email || 'abenathi.sindaphi201@gmail.com'}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#c4beb2]/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#c4beb2]" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider block">
                    Based in
                  </span>
                  <span className="text-[#f5f0e6]">
                    Cape Town, South Africa
                  </span>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="mt-12 pt-12 border-t border-[#c4beb2]/20">
              <span className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider block mb-4">
                Follow
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={'https://github.com/Abenathi201'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-all"
                >
                  GitHub
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href={settings.linkedin || 'https://www.linkedin.com/in/abenathi-sindapi-420969270/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-all"
                >
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                {settings.instagram && (
                  <a
                    href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-all"
                  >
                    Instagram
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {settings.twitter && (
                  <a
                    href={`https://twitter.com/${settings.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-all"
                  >
                    Twitter/X
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {settings.behance && (
                  <a
                    href={settings.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm text-[#f5f0e6] px-4 py-2 border border-[#c4beb2]/30 hover:border-[#d4622a] hover:text-[#d4622a] transition-all"
                  >
                    Behance
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider block mb-2">
                    Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-transparent border-[#c4beb2]/30 text-[#f5f0e6] placeholder:text-[#c4beb2]/40 focus:border-[#d4622a] rounded-none h-12"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider block mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-transparent border-[#c4beb2]/30 text-[#f5f0e6] placeholder:text-[#c4beb2]/40 focus:border-[#d4622a] rounded-none h-12"
                  />
                </div>
              </div>
              
              <div>
                <label className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider block mb-2">
                  Subject
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project inquiry, collaboration, etc."
                  className="bg-transparent border-[#c4beb2]/30 text-[#f5f0e6] placeholder:text-[#c4beb2]/40 focus:border-[#d4622a] rounded-none h-12"
                />
              </div>
              
              <div>
                <label className="font-mono text-xs text-[#c4beb2]/70 uppercase tracking-wider block mb-2">
                  Message *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-transparent border-[#c4beb2]/30 text-[#f5f0e6] placeholder:text-[#c4beb2]/40 focus:border-[#d4622a] rounded-none resize-none"
                />
              </div>
              
              <Button
                type="submit"
                disabled={sending}
                className="w-full h-14 bg-[#d4622a] hover:bg-[#c45520] text-[#1a1814] font-mono text-sm uppercase tracking-wider rounded-none transition-all group"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block"
                    >
                      ◌
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Large decorative text */}
      <section className="relative overflow-hidden py-20">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="whitespace-nowrap"
        >
          <span className="font-display text-[15vw] font-black text-[#f5f0e6]/[0.02] uppercase tracking-tighter">
            Let's Work Together • Let's Work Together • Let's Work Together •
          </span>
        </motion.div>
      </section>
    </div>
  );
}