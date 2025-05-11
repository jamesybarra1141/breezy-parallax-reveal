
import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'A high-performance e-commerce platform with seamless payment integration.'
  },
  {
    title: 'Travel App',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'An intuitive travel application with personalized recommendations.'
  },
  {
    title: 'Corporate Rebrand',
    category: 'Branding & Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'Complete brand identity redesign for a financial technology company.'
  },
  {
    title: 'Social Media Dashboard',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'Centralized dashboard for managing multiple social media accounts.'
  }
];

const PortfolioItem = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for image on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollPosition = window.scrollY;
        const offset = scrollPosition * 0.05;
        imageRef.current.style.transform = `translateY(${offset * (index % 2 === 0 ? -1 : 1)}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index]);
  
  return (
    <div 
      ref={ref} 
      className={`grid md:grid-cols-2 gap-8 items-center mb-20 opacity-0 ${inView ? 'animate-fade-in' : ''}`}
      style={{ animationDelay: `${300 + index * 200}ms`, animationFillMode: 'forwards' }}
    >
      <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <div className="overflow-hidden rounded-lg shadow-lg h-80">
          <div 
            ref={imageRef} 
            className="w-full h-full bg-cover bg-center transition-transform" 
            style={{
              backgroundImage: `url('${project.image}')`,
            }}
          ></div>
        </div>
      </div>
      
      <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
        <span className="text-blue-600 font-medium mb-2 block">{project.category}</span>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{project.title}</h3>
        <p className="text-gray-600 mb-6">{project.description}</p>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600/10">View Project</Button>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div 
          ref={titleRef} 
          className={`text-center max-w-3xl mx-auto mb-16 opacity-0 ${titleInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Projects</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Explore our innovative solutions and creative projects that deliver real results for our clients.
          </p>
        </div>
        
        {projects.map((project, index) => (
          <PortfolioItem key={index} project={project} index={index} />
        ))}
        
        <div className="text-center mt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">View All Projects</Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
