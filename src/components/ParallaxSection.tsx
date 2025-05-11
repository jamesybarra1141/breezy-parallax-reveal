
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
  
  useEffect(() => {
    if (!parallaxRef.current) return;
    
    // More efficient parallax effect with requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const scrollPosition = window.scrollY;
            const elementTop = parallaxRef.current.offsetTop;
            const elementHeight = parallaxRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Only calculate parallax when element is in view
            if (scrollPosition + viewportHeight > elementTop && 
                scrollPosition < elementTop + elementHeight) {
              const offset = (scrollPosition - elementTop + viewportHeight) * 0.3;
              parallaxRef.current.style.backgroundPositionY = `${-offset}px`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section 
      ref={parallaxRef}
      className="relative py-32 bg-fixed bg-cover bg-center will-change-transform"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-blue-900/80"></div>
      <div 
        ref={ref}
        className={`container px-4 relative z-10 text-center text-white opacity-0 ${inView ? 'animate-fade-in' : ''}`}
        style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Let's collaborate to create digital experiences that drive growth and success for your business.
        </p>
        <Link to="contact" spy={true} smooth={true} offset={-70} duration={1000}>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Your Project
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ParallaxSection;
