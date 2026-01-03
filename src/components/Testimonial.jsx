import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    role: 'Freelancer',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    quote: 'TaskHive is a game changer! I earn daily just by doing small tasks.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jahid Hasan',
    role: 'Buyer',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    quote: 'As a buyer, TaskHive helped me complete repetitive jobs fast and affordably.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Jahan',
    role: 'Freelancer',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'Smooth withdrawals and fast approval — the best micro-earning platform!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Rakibul Islam',
    role: 'Worker',
    image: 'https://randomuser.me/api/portraits/men/64.jpg',
    quote: 'I’ve earned more than I expected in a short time. Love the interface!',
    rating: 4,
  },
  {
    id: 5,
    name: 'Priya Ahmed',
    role: 'Freelancer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'TaskHive makes it so easy to find small gigs and earn consistently.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Fahim Khan',
    role: 'Worker',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    quote: 'A smooth, user-friendly platform. I highly recommend it to all freelancers!',
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-blue-900/95">
      {/* Animated Floating Circles */}
      <motion.div
        className="absolute top-0 left-0 w-[200px] h-[200px] bg-yellow-400 rounded-full opacity-20"
        animate={{ x: [0, 800, 0], y: [0, 400, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-400 rounded-full opacity-10"
        animate={{ x: [-200, 0, -200], y: [-100, 200, -100] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-white">What Our</span>{' '}
            <span className="text-yellow-400">Users Say</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Real stories from freelancers and buyers who grew with TaskHive. See how our platform transforms work into rewards.
          </p>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          centeredSlides
          effect="coverflow"
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12 relative z-10"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-gray-700"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 ring-2 ring-yellow-400"
                />
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <p className="text-yellow-400 text-sm mb-2">{t.role}</p>
                <div className="flex gap-1 justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < t.rating ? 'text-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <div className="relative">
                  <FaQuoteLeft className="text-yellow-400 text-3xl absolute -top-4 -left-2 opacity-50" />
                  <p className="text-gray-200 text-sm md:text-base mt-2">{t.quote}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
