
import React from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: contentRef, inView: contentInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div 
          ref={titleRef} 
          className={`text-center max-w-3xl mx-auto mb-16 opacity-0 ${titleInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">About ACME Corp</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            For over 10 years, we've been at the forefront of digital innovation, 
            helping businesses transform their digital presence and achieve extraordinary results.
          </p>
        </div>
        
        <div 
          ref={contentRef} 
          className={`grid md:grid-cols-2 gap-10 items-center mb-16 opacity-0 ${contentInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-blue-600 rounded-lg hidden md:block"></div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
            <p className="text-gray-600">
              We're committed to helping businesses grow through strategic digital solutions that combine cutting-edge technology with creative excellence. Our mission is to transform your ideas into remarkable digital experiences.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900">Our Approach</h3>
            <p className="text-gray-600">
              We believe in collaborative partnerships, transparent processes, and delivering results that exceed expectations. Our team of experts works closely with you to understand your unique challenges and craft tailored solutions.
            </p>
          </div>
        </div>
        
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 text-center opacity-0 ${statsInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
        >
          {[
            { number: '10+', label: 'Years Experience' },
            { number: '200+', label: 'Projects Completed' },
            { number: '50+', label: 'Team Members' },
            { number: '98%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
