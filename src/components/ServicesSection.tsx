import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sun, Camera, Home, Zap, Leaf, Tractor } from 'lucide-react';

const services = [
  { icon: Sun, title: 'Solar Solutions', desc: 'Premium solar panels and inverters for homes and businesses.', color: 'text-brand-gold' },
  { icon: Camera, title: 'CCTV Installation', desc: 'State-of-the-art surveillance systems with remote monitoring.', color: 'text-white' },
  { icon: Home, title: 'Smart Home', desc: 'Transform your living space into an intelligent, connected home.', color: 'text-brand-green' },
  { icon: Zap, title: 'Home Automation', desc: 'Automate lighting, climate, security, and more with ease.', color: 'text-brand-gold' },
  { icon: Leaf, title: 'Farming Seeds', desc: 'High-quality seeds for maximum yield and crop health.', color: 'text-brand-green' },
  { icon: Tractor, title: 'Farming Machinery', desc: 'Modern equipment to boost agricultural productivity.', color: 'text-brand-gold' },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
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
          <p className="mt-4 text-white/50 max-w-xl mx-auto">Comprehensive solutions tailored to power, protect, and modernize your world.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative glass rounded-3xl p-6 sm:p-8 overflow-hidden cursor-default hover:glow-gold transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-gold/10 transition-colors">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <div className="w-full h-32 rounded-xl bg-brand-gray/50 mb-6 flex items-center justify-center">
                  <span className="text-xs text-white/20 uppercase tracking-wider">Image Placeholder</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
