
import React from 'react';
import { useInView } from 'react-intersection-observer';

const ServiceCard = ({ title, description, icon, index }: { title: string; description: string; icon: string; index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div 
      ref={ref} 
      className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 opacity-0 ${inView ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: `${300 + index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const services = [
    {
      title: 'Web Development',
      description: 'We build responsive, high-performance websites and web applications tailored to your specific business needs.',
      icon: '💻'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
      icon: '📱'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that combines aesthetics with functionality to create intuitive and engaging interfaces.',
      icon: '🎨'
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic digital marketing services that drive traffic, generate leads, and increase conversions.',
      icon: '📈'
    },
    {
      title: 'E-Commerce',
      description: 'Custom e-commerce solutions that streamline operations and enhance the customer shopping experience.',
      icon: '🛒'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable, secure cloud infrastructure and services to power your business applications and data.',
      icon: '☁️'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div 
          ref={titleRef} 
          className={`text-center max-w-3xl mx-auto mb-16 opacity-0 ${titleInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            We offer a comprehensive range of digital solutions to help your business thrive in today's competitive landscape.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              icon={service.icon} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
