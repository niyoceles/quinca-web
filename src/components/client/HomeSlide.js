import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link as ReactLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import constructionImage from '../../assets/images/home/construction1.jpg';
import constructionImage2 from '../../assets/images/home/construction2.jpg';
import constructionImage3 from '../../assets/images/home/construction3.jpg';

export const HomeSlide = () => {
  const slides = [
    {
      image: constructionImage,
      title: 'Premium Construction Materials',
      subtitle: 'Build your dream project with the best quality materials in Rwanda.',
      link: '/category/construction',
      buttonText: 'Shop Construction'
    },
    {
      image: constructionImage2,
      subtitle: 'Modern plumbing solutions for your home and industrial needs.',
      title: 'Efficient Plumbing Tools',
      link: '/category/plumbing',
      buttonText: 'View Plumbing'
    },
    {
      image: constructionImage3,
      title: 'Reliable Electrical Supplies',
      subtitle: 'Everything you need for safe and smart electrical installations.',
      link: '/category/electricity',
      buttonText: 'See Electricals'
    },
  ];

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-premium">
      <Carousel 
        autoPlay={6000} 
        infinite 
        slidesPerPage={1} 
        slides={slides.map((slide, index) => (
          <div key={index} className="relative h-[450px] w-full overflow-hidden">
            <ReactLink to={slide.link} className="block w-full h-full relative group">
              {/* Background Image */}
              <img 
                src={slide.image} 
                className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                alt={slide.title} 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent flex items-center px-10 md:px-20">
                <div className="max-w-md text-white">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                    Top Featured
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-slate-200 text-lg mb-8 leading-relaxed line-clamp-2">
                    {slide.subtitle}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="bg-white text-secondary px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 group/btn">
                      {slide.buttonText}
                      <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </ReactLink>
          </div>
        ))}
      />
    </div>
  );
};
