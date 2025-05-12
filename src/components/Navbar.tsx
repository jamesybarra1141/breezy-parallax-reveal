
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold ${scrolled ? 'text-primary' : 'text-white'}`}>
            ACME Corp
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'].map((item) => (
              <li key={item}>
                <Link
                  to={item}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000} 
                  delay={100}
                  isDynamic={true}
                  spyThrottle={500}
                  className={`cursor-pointer font-medium hover:text-blue-500 transition-colors relative group ${
                    scrolled ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to="contact"
          spy={true} 
          smooth={true} 
          offset={-70} 
          duration={1000}
        >
          <Button variant="outline" className={`hidden md:block ${scrolled ? 'border-primary text-primary hover:bg-primary/10' : 'border-white text-white hover:bg-white/10'}`}>
            Get in Touch
          </Button>
        </Link>
        <button className="md:hidden text-2xl">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Navbar;
