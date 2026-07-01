import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Tractor, MessageCircle, ChevronRight } from 'lucide-react';

const cards = [
  { icon: Leaf, title: 'Seeds', desc: 'Certified, high-germination seeds for maximum yield and crop health.' },
  { icon: Tractor, title: 'Machinery', desc: 'Modern tractors, tillers, and irrigation equipment for efficient farming.' },
  { icon: MessageCircle, title: 'Agricultural Consultation', desc: 'Expert guidance on crop management, soil health, and farm planning.' },
];

export default function FarmingSolutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-brand-bg" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-green/10 to-brand-bg flex items-center justify-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <Tractor className="w-24 h-24 text-brand-green/15 mx-auto mb-4" />
              <p className="text-white/20 text-sm font-medium uppercase tracking-widest">Farming Solutions</p>
              <p className="text-white/10 text-xs mt-2">Replace with real image</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-green text-sm font-semibold tracking-widest uppercase">Agriculture</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Farming
              <span className="text-brand-green"> Solutions.</span>
            </h2>
            <p className="mt-6 text-white/50 leading-relaxed max-w-md">
              From premium seeds to modern machinery, we equip farmers with the tools and knowledge to increase productivity and profitability.
            </p>

            <div className="mt-8 grid gap-4">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  className="group glass rounded-2xl p-5 flex items-start gap-4 hover:bg-brand-green/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  whileHover={{ x: 6 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-brand-green transition-colors">{card.title}</h3>
                    <p className="mt-1 text-sm text-white/50 leading-relaxed">{card.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-brand-green group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
