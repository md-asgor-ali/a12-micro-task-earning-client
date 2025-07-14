import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    quote: 'TaskHive is a game changer! I earn daily just by doing small tasks.',
  },
  {
    id: 2,
    name: 'Jahid Hasan',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    quote: 'As a buyer, TaskHive helped me complete repetitive jobs fast and affordably.',
  },
  {
    id: 3,
    name: 'Sarah Jahan',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'Smooth withdrawals and fast approval — the best micro-earning platform!',
  },
  {
    id: 4,
    name: 'Rakibul Islam',
    image: 'https://randomuser.me/api/portraits/men/64.jpg',
    quote: 'I’ve earned more than I expected in a short time. Love the interface!',
  },
];

const Testimonial = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900">
        What Our Users Say 💬
      </h2>

      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-blue-50 shadow-md rounded-lg p-6 mx-2 h-full flex flex-col items-center text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-blue-800 mb-2">{testimonial.name}</h3>
              <p className="text-gray-600 text-sm">"{testimonial.quote}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
