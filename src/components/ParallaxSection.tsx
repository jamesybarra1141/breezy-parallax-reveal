
import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-scroll';

const ParallaxSection = () => {
  const { ref, inView } = useInView({ 
    threshold: 0.1, 
    triggerOnce: true,
    rootMargin: '0px 0px -10% 0px' // Trigger a bit earlier
  });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!parallaxRef.current) return;
    
    // More efficient parallax effect with requestAnimationFrame
    let ticking = false;
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;
    
    const handleParallax = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const scrollPosition = window.scrollY;
            const elementTop = parallaxRef.current.offsetTop;
            const elementHeight = parallaxRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Only calculate parallax when element is in view (performance optimization)
            if (scrollPosition + viewportHeight > elementTop && 
                scrollPosition < elementTop + elementHeight) {
                
              // Calculate position relative to viewport with improved accuracy
              const relativePos = Math.min(1, Math.max(0, (scrollPosition + viewportHeight - elementTop) / (viewportHeight + elementHeight)));
              const bgOffset = (relativePos * 100) - 50; // -50% to 50% range
              
              // Apply transform with hardware acceleration
              if (layer1Ref.current) {
                layer1Ref.current.style.transform = `translate3d(0, ${bgOffset * 0.15}px, 0)`;
              }
              
              if (layer2Ref.current) {
                layer2Ref.current.style.transform = `translate3d(0, ${bgOffset * 0.3}px, 0)`;
              }
              
              if (layer3Ref.current) {
                layer3Ref.current.style.transform = `translate3d(0, ${bgOffset * -0.1}px, 0)`;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // Initial call to set position
    handleParallax();
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);
  
  return (
    <section 
      id="cta"
      ref={parallaxRef}
      className="relative py-32 overflow-hidden"
      style={{
        backgroundColor: '#0a1e3b',
      }}
    >
      {/* Parallax background layers with hardware acceleration */}
      <div 
        ref={layer1Ref}
        className="absolute inset-0 will-change-transform hardware-accelerated"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.2,
          transform: 'translate3d(0, 0, 0)',
        }}
      ></div>
      
      <div 
        ref={layer2Ref}
        className="absolute inset-0 will-change-transform hardware-accelerated"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(10, 30, 59, 0) 70%)',
          backgroundSize: '120% 120%',
          backgroundPosition: 'center center',
          transform: 'translate3d(0, 0, 0)',
        }}
      ></div>
      
      <div
        ref={layer3Ref}
        className="absolute inset-0 will-change-transform hardware-accelerated"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(10, 30, 59, 0.8) 100%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      ></div>
      
      <div 
        ref={ref}
        className={`container px-4 relative z-10 text-center text-white opacity-0 ${inView ? 'animate-fade-in' : ''}`}
        style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 smooth-scroll-element">Ready to Transform Your Business?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 smooth-scroll-element stagger-delay-2">
          Let's collaborate to create digital experiences that drive growth and success for your business.
        </p>
        <Link 
          to="contact" 
          spy={true} 
          smooth={true} 
          offset={-70} 
          duration={1000}
          className="inline-block smooth-scroll-element stagger-delay-3"
        >
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Start Your Project
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ParallaxSection;
