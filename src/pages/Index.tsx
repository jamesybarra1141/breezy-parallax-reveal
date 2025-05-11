
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import ParallaxSection from '@/components/ParallaxSection';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize any JS needed for parallax effects
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // Add any additional scroll-based animations or parallax effects here
      document.querySelectorAll('.parallax-element').forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
        const offset = scrollTop * speed;
        (element as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <ParallaxSection />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
