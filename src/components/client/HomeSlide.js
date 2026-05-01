import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link as ReactLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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
      link: '/category/electrical',
      buttonText: 'See Electricals'
    },
  ];

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-premium">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="h-[300px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
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
                    <span className="inline-block px-3 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-2">
                      Top Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-slate-200 text-sm mb-5 leading-relaxed line-clamp-2">
                      {slide.subtitle}
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="bg-white text-secondary px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 group/btn">
                        {slide.buttonText}
                        <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </ReactLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Pagination */}
      <style>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          background: #ff6600 !important;
        }
      `}</style>
    </div>
  );
};
