
import React, { useEffect, useRef } from 'react';
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Enable smooth scrolling with improved performance
  useEffect(() => {
    // Set smooth scrolling with improved easing
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Create intersection observer for smooth scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    // Observe all smooth scroll elements
    const smoothScrollElements = document.querySelectorAll('.smooth-scroll-element');
    smoothScrollElements.forEach(element => {
      observerRef.current?.observe(element);
    });
    
    // More efficient scroll handler for parallax
    const parallaxElements = document.querySelectorAll('.parallax-element');
    let ticking = false;
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;
    
    const handleParallax = () => {
      if (!ticking) {
        // Use requestAnimationFrame for better performance
        rafId = window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const scrollDelta = scrollTop - lastScrollY;
          lastScrollY = scrollTop;
          
          // Process parallax elements with optimized calculations
          parallaxElements.forEach((element) => {
            const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
            const offset = scrollTop * speed;
            (element as HTMLElement).style.transform = `translate3d(0, ${offset}px, 0)`;
          });
          
          // Apply parallax effect to sections with .parallax-section class
          document.querySelectorAll('.parallax-section').forEach((section) => {
            const rect = section.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Only process if section is in viewport or nearby (performance optimization)
            if (rect.top < viewHeight + 300 && rect.bottom > -300) {
              const sectionTop = rect.top;
              const parallaxSpeed = parseFloat((section as HTMLElement).dataset.speed || '0.2');
              const yPos = sectionTop * parallaxSpeed;
              
              // Apply smooth transform with hardware acceleration
              (section as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
              
              // Apply opacity effect based on position for visual enhancement
              if ((section as HTMLElement).dataset.fade === "true") {
                const opacity = Math.min(1, 1 - (Math.abs(sectionTop) / viewHeight) * 0.5);
                (section as HTMLElement).style.opacity = opacity.toString();
              }
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // Initialize smooth scroll elements on page load
    const initSmoothScroll = () => {
      // Add smooth-scroll-element class to appropriate elements
      document.querySelectorAll('h2, h3, p:not(.no-animate), .card, .section-content').forEach((element, index) => {
        if (!element.classList.contains('smooth-scroll-element') && !element.closest('.no-animate')) {
          element.classList.add('smooth-scroll-element');
          
          // Add staggered delay based on position
          const delayClass = `stagger-delay-${(index % 5) + 1}`;
          element.classList.add(delayClass);
          
          observerRef.current?.observe(element);
        }
      });
    };
    
    // Initialize after a small delay to ensure DOM is fully rendered
    setTimeout(initSmoothScroll, 100);
    
    // Improved reveal animation on scroll with better performance
    const revealElements = document.querySelectorAll('.reveal');
    const checkReveal = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const revealPoint = 150;
          
          revealElements.forEach((element) => {
            const revealTop = (element as HTMLElement).getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
              element.classList.add('active');
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
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
      
      // Clean up intersection observer
      if (observerRef.current) {
        smoothScrollElements.forEach(element => {
          observerRef.current?.unobserve(element);
        });
        observerRef.current.disconnect();
      }
      
      // Cancel any pending animation frames
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="parallax-section" data-speed="0.1" data-fade="true">
        <About />
      </div>
      <Services />
      <div className="parallax-section" data-speed="0.15" data-fade="true">
        <Projects />
      </div>
      <ParallaxSection />
      <div className="parallax-section" data-speed="0.2" data-fade="true">
        <Testimonials />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
