
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Emma Thompson',
    position: 'CEO, TechStart',
    content: 'ACME Corp transformed our online presence completely. Their team delivered a beautiful website that not only looks stunning but also converts visitors into customers.',
    image: 'https://randomuser.me/api/portraits/women/23.jpg'
  },
  {
    name: 'Michael Chen',
    position: 'Marketing Director, GrowthLabs',
    content: 'The team at ACME Corp went above and beyond our expectations. Their attention to detail and commitment to excellence is truly unmatched in the industry.',
    image: 'https://randomuser.me/api/portraits/men/54.jpg'
  },
  {
    name: 'Sarah Johnson',
    position: 'Founder, CreativeHub',
    content: 'Working with ACME Corp was a game-changer for our business. They understood our vision perfectly and executed it flawlessly. I highly recommend their services.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  }
];

const Testimonials = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div 
          ref={titleRef} 
          className={`text-center max-w-3xl mx-auto mb-16 opacity-0 ${titleInView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Client Testimonials</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
            
            return (
              <div 
                key={index}
                ref={ref} 
                className={`opacity-0 ${inView ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${300 + index * 200}ms`, animationFillMode: 'forwards' }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
