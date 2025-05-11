
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          transform: 'translateZ(-10px) scale(2)',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="container relative z-10 text-white text-center px-4">
        <h1 
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          Creating Digital Excellence
        </h1>
        <p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          We build stunning digital experiences that drive success for forward-thinking businesses
        </p>
        <div 
          className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
        >
          <Link to="portfolio" spy={true} smooth={true} offset={-70} duration={1000}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              View Our Work
            </Button>
          </Link>
          <Link to="contact" spy={true} smooth={true} offset={-70} duration={1000}>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Link to="about" spy={true} smooth={true} offset={-70} duration={1000} className="cursor-pointer">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
