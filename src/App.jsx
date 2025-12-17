import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Work from '@/pages/Work';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import CV from '@/pages/CV';
import ProjectDetails from '@/pages/ProjectDetails';
import Loader from '@/components/ui/Loader';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <Toaster position="bottom-right" />
          <Routes>
            <Route path="/" element={
              <Layout currentPageName="Home">
                <Home />
              </Layout>
            } />
            <Route path="/work" element={
              <Layout currentPageName="Work">
                <Work />
              </Layout>
            } />
            <Route path="/about" element={
              <Layout currentPageName="About">
                <About />
              </Layout>
            } />
            <Route path="/cv" element={
              <Layout currentPageName="CV">
                <CV />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout currentPageName="Contact">
                <Contact />
              </Layout>
            } />
            <Route path="/project/:id" element={
              <Layout currentPageName="ProjectDetail">
                <ProjectDetails />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      )}
    </QueryClientProvider>
  );
}