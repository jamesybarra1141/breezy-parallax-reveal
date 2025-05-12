
import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'A high-performance e-commerce platform with seamless payment integration and optimized user experience.'
  },
  {
    title: 'Finance Dashboard',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'Interactive financial analytics dashboard with real-time data visualization and reporting capabilities.'
  },
  {
    title: 'Mobile Travel App',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'An intuitive travel application with personalized recommendations and offline functionality.'
  },
  {
    title: 'Corporate Website',
    category: 'Branding & Design',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    description: 'Complete brand identity implementation with responsive design and optimized performance.'
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const { ref, inView } = useInView({ 
    threshold: 0.2, 
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px'
  });
  
  return (
    <div 
      ref={ref} 
      className={`opacity-0 transform translate-y-10 ${inView ? 'animate-fade-in-up' : ''}`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
        transitionProperty: 'all',
        transitionDuration: '800ms',
        willChange: 'opacity, transform'
      }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-700" 
            style={{ backgroundImage: `url('${project.image}')` }}
          ></div>
        </div>
        <CardContent className="p-6">
          <span className="text-blue-600 font-medium text-sm mb-2 block">{project.category}</span>
          <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
          <p className="text-gray-600 mb-5">{project.description}</p>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600/10">
            View Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Projects = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });
  
  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div 
          ref={titleRef} 
          className={`text-center max-w-3xl mx-auto mb-16 opacity-0 ${titleInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Projects</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Explore our innovative solutions and creative projects that deliver real results for our clients.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <div 
          className={`text-center mt-12 opacity-0 ${titleInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
