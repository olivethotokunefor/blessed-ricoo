import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, ShoppingCart, Wrench, Headphones } from 'lucide-react';

const steps = [
  { icon: MessageSquare, step: '01', title: 'Consultation', desc: 'We assess your needs and recommend the best solutions.' },
  { icon: ShoppingCart, step: '02', title: 'Purchase', desc: 'Choose your products and finalize your order with us.' },
  { icon: Wrench, step: '03', title: 'Professional Installation', desc: 'Our certified technicians handle the entire setup.' },
  { icon: Headphones, step: '04', title: 'After-sales Support', desc: 'Ongoing maintenance and support you can rely on.' },
];

export default function InstallationProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-gray/20">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">How It Works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Installation Process</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">From first contact to ongoing support, we make every step seamless.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-12">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                className="relative flex items-start gap-6 sm:gap-8"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
              >
                <div className="relative z-10 w-16 h-16 sm:w-24 sm:h-24 rounded-2xl glass flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold" />
                </div>
                <div className="flex-1 pt-2 sm:pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-brand-gold font-bold">{item.step}</span>
                    <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-white/50 leading-relaxed max-w-md">{item.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="absolute left-8 sm:left-12 top-16 sm:top-24 h-12 w-px"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                    style={{ originY: 0 }}
                  >
                    <div className="w-full h-full bg-brand-gold/30" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
