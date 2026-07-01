import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Percent, Package, Wrench, Headphones } from 'lucide-react';

const stats = [
  { icon: Percent, value: 15, suffix: '%', label: 'Discount', desc: 'On selected products' },
  { icon: Package, value: 100, suffix: '+', label: 'Products', desc: 'Across all categories' },
  { icon: Wrench, value: 1, suffix: '', label: 'Professional Installation', desc: 'Certified technicians', isText: true },
  { icon: Headphones, value: 1, suffix: '', label: 'Reliable Support', desc: '24/7 customer service', isText: true },
];

function AnimatedCounter({ value, suffix, isText, isInView }: { value: number; suffix: string; isText?: boolean; isInView: boolean }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  if (isText) {
    return <span>{isInView ? '✓' : '0'}</span>;
  }

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Our Edge</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Why Choose Us</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">We combine quality products, expert service, and lasting support.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-3xl p-8 text-center hover:glow-gold transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-brand-gold" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-brand-gold mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isText={stat.isText} isInView={isInView} />
              </div>
              <h3 className="text-lg font-bold mb-1">{stat.label}</h3>
              <p className="text-sm text-white/50">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
