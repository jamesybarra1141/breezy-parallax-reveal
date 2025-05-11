
import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-scroll';

const ParallaxSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        const offset = scrollPosition * 0.4;
        parallaxRef.current.style.backgroundPositionY = `${-offset}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section 
      ref={parallaxRef}
      className="relative py-32 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")'
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
