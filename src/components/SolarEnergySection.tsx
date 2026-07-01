import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Wrench, Clock, PiggyBank } from 'lucide-react';

const features = [
  { icon: PiggyBank, title: 'Energy Savings', desc: 'Slash your electricity bills with efficient solar power.' },
  { icon: Zap, title: 'Reliable Power', desc: 'Consistent energy supply even during outages.' },
  { icon: Wrench, title: 'Easy Installation', desc: 'Expert team handles everything from start to finish.' },
  { icon: Clock, title: 'Long-lasting Systems', desc: '25+ year warranty on premium solar components.' },
];

export default function SolarEnergySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gray/30 to-brand-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-gold/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        <div className="relative h-[300px] sm:h-[400px] rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-brand-gray to-brand-bg flex items-center justify-center">
          <div className="text-center">
<img src="https://images.unsplash.com/photo-1594818379496-da1e345b0ded?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-brand-bg/30" />
          <motion.div
            className="absolute bottom-8 left-8 sm:left-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Solar Energy</h2>
            <p className="mt-2 text-white/60 max-w-md">Harness the sun's power for a cleaner, more reliable future.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass rounded-3xl p-6 hover:glow-gold transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
