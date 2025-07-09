import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    title: "Unlock Micro-Earning Potential 💰",
    desc: "Join TaskHive and start earning from simple online tasks today.",
    image: "https://plus.unsplash.com/premium_photo-1679870442588-2e26c81eab42?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Post Tasks. Get Things Done ⚡",
    desc: "Easily outsource your micro-tasks to a vibrant community of developers.",
    image: "https://images.unsplash.com/photo-1684560208006-274881cc4c4b?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Earn Coins. Withdraw Fast 🚀",
    desc: "Work, earn, and get paid with our seamless and transparent system.",
    image: "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=1400&q=80",
  },
];

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto my-8 rounded-xl overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px] md:h-[600px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 md:px-24 text-white">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg max-w-xl drop-shadow-md">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
