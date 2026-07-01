import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star, User } from 'lucide-react';

const testimonials = [
  { name: 'Chijioke Okonkwo', text: 'The solar installation was seamless. My electricity bills have dropped by over 60%. Highly recommended!' },
  { name: 'Amina Bello', text: 'Their CCTV system gives me peace of mind. Crystal clear footage and the app works flawlessly.' },
  { name: 'Emmanuel Adeyemi', text: 'Best farming equipment supplier in Lagos. The machinery is durable and their support is excellent.' },
  { name: 'Ngozi Eze', text: 'Smart home automation transformed our living space. Controlling everything from my phone is incredible.' },
  { name: 'Ibrahim Musa', text: 'Professional team, quality products, and great after-sales service. Would buy again without hesitation.' },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-gray/20">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Testimonials</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">What Our Customers Say</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="glass rounded-3xl p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed flex-1">"{t.text}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
