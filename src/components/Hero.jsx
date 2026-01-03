import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    img: "https://plus.unsplash.com/premium_photo-1679870442588-2e26c81eab42?q=80&w=1332&auto=format&fit=crop",
    title: "Unlock Micro-Earning Potential",
    desc: "Join TaskHive and start earning from simple online tasks today.",
    cta: "Start Earning",
    link: "/register",
  },
  {
    img: "https://images.unsplash.com/photo-1684560208006-274881cc4c4b?q=80&w=1334&auto=format&fit=crop",
    title: "Post Tasks. Get Things Done",
    desc: "Outsource your micro-tasks to a skilled and growing workforce.",
    cta: "Post a Task",
    link: "/dashboard/buyer",
  },
  {
    img: "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=1400&q=80",
    title: "Earn Coins. Withdraw Fast",
    desc: "Complete tasks, earn coins, and withdraw securely & quickly.",
    cta: "View Tasks",
    link: "/tasks",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full flex items-center justify-center">

              {/* Background Image */}
              <motion.img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                draggable={false}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

              {/* Content */}
              <motion.div
                key={active}
                className="relative z-10 text-center px-6 max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
                  <Typewriter
                    options={{
                      strings: [slide.title],
                      autoStart: true,
                      delay: 55,
                      cursor: "_",
                    }}
                  />
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  {slide.desc}
                </p>

                <a
                  href={slide.link}
                  className="inline-flex items-center gap-2 px-8 py-3
                    rounded-full bg-amber-400 text-black font-semibold
                    hover:bg-amber-300 transition shadow-lg"
                >
                  {slide.cta}
                  <ArrowRight size={18} />
                </a>

                {/* Stats */}
                <div className="mt-10 flex justify-center gap-6 text-sm text-amber-200/90">
                  <span><strong>50k+</strong> Tasks</span>
                  <span><strong>20k+</strong> Workers</span>
                  <span><strong>Fast</strong> Withdrawals</span>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
