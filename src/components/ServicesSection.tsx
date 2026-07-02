import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sun, Camera, Home, Zap, Leaf, Bed } from 'lucide-react';
import SectionMeta from '../lib/SectionMeta';

const services = [
  { icon: Sun, title: 'Solar Solutions', desc: 'Premium solar panels and inverters for homes and businesses.', color: 'text-brand-gold' },
  { icon: Camera, title: 'CCTV Installation', desc: 'Smart surveillance systems with seamless remote access.', color: 'text-white' },
  { icon: Home, title: 'Smart Home', desc: 'Transform your living space into an intelligent, connected home.', color: 'text-brand-green' },
  { icon: Zap, title: 'Home Automation', desc: 'Automate lighting, climate, security, and entertainment with ease.', color: 'text-brand-gold' },
  { icon: Leaf, title: 'Furniture + Beddings', desc: 'Comfortable furniture and luxury bedding for every room.', color: 'text-brand-green' },
  { icon: Leaf, title: 'Farming Solutions', desc: 'Seed, equipment, and guidance to grow more with less.', color: 'text-brand-gold' },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <SectionMeta
        title="Services — BLESSED RICCO"
        description="Our Services include solar solutions, CCTV installation, smart home automation, furniture & beddings, and farming solutions."
        url="https://blessed-rico.netlify.app/#services"
        keywords="services, solar, cctv, smart home, furniture, farming"
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">What We Offer</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Our Services</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">A modern mix of energy, home comfort, and agricultural living for every space.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-brand-gray/90 p-6 shadow-2xl shadow-black/20 transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
            >
              <div className="absolute inset-y-0 left-0 w-1.5 rounded-r-full bg-brand-gold/80" />
              <div className="relative flex flex-col gap-6 pl-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 text-2xl shadow-inner">
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm text-white/50">{service.desc}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-white/5 to-brand-gray/30 p-5 text-sm text-white/60 border border-white/10">
                  <p className="font-medium text-white/80">What to expect</p>
                  <p className="mt-2 leading-relaxed">Reliable, design-forward service that feels premium and performs better.</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
