
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
  // Enable smooth scrolling with improved performance
  useEffect(() => {
    // Set smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // More efficient scroll handler for parallax
    const parallaxElements = document.querySelectorAll('.parallax-element');
    let ticking = false;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      if (!ticking) {
        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(() => {
          // Process parallax elements
          parallaxElements.forEach((element) => {
            const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
            const offset = scrollTop * speed;
            (element as HTMLElement).style.transform = `translateY(${offset}px)`;
          });
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check for reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const checkReveal = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach((element) => {
        const revealTop = (element as HTMLElement).getBoundingClientRect().top;
        
        if (revealTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      });
    };
    
    // Initial check for elements in viewport
    checkReveal();
    window.addEventListener('scroll', checkReveal, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', checkReveal);
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
