
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import ParallaxSection from '@/components/ParallaxSection';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  // Enable smooth scrolling with improved performance
  useEffect(() => {
    // Set smooth scrolling with improved easing
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // More efficient scroll handler for parallax
    const parallaxElements = document.querySelectorAll('.parallax-element');
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleParallax = () => {
      if (!ticking) {
        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const scrollDelta = scrollTop - lastScrollY;
          lastScrollY = scrollTop;
          
          // Process parallax elements with optimized calculations
          parallaxElements.forEach((element) => {
            const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
            const offset = scrollTop * speed;
            (element as HTMLElement).style.transform = `translateY(${offset}px)`;
          });
          
          // Apply parallax effect to sections with .parallax-section class
          document.querySelectorAll('.parallax-section').forEach((section) => {
            const rect = section.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Only process if section is in viewport or nearby
            if (rect.top < viewHeight + 300 && rect.bottom > -300) {
              const sectionTop = rect.top;
              const parallaxSpeed = parseFloat((section as HTMLElement).dataset.speed || '0.2');
              const yPos = sectionTop * parallaxSpeed;
              
              // Apply smooth transform
              (section as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
              
              // Apply opacity effect based on position
              const opacity = Math.min(1, 1 - (Math.abs(sectionTop) / viewHeight) * 0.5);
              (section as HTMLElement).style.opacity = opacity.toString();
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // Improved reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const checkReveal = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach((element) => {
        const revealTop = (element as HTMLElement).getBoundingClientRect().top;
        
        if (revealTop < windowHeight - revealPoint) {
          element.classList.add('active');
        } else {
          // Optional: remove class when scrolling back up
          // element.classList.remove('active');
        }
      });
    };
    
    // Initial check for elements in viewport
    checkReveal();
    window.addEventListener('scroll', checkReveal, { passive: true });
    
    // Initial parallax calculation on load
    handleParallax();
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('scroll', checkReveal);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="parallax-section" data-speed="0.1">
        <About />
      </div>
      <Services />
      <div className="parallax-section" data-speed="0.15">
        <Projects />
      </div>
      <ParallaxSection />
      <div className="parallax-section" data-speed="0.2">
        <Testimonials />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
