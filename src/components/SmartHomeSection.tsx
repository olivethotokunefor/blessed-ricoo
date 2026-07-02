import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Smartphone, Wifi, Shield, ChevronRight } from 'lucide-react';
import SectionMeta from '../lib/SectionMeta';

export default function SmartHomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const [lightsOn, setLightsOn] = useState(false);

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLightsOn(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <SectionMeta
        title="Smart Home — BLESSED RICCO"
        description="Control your home from anywhere with smart lighting, security, and app control solutions."
        url="https://blessed-rico.netlify.app/#smart-home"
        keywords="smart home, home automation, smart lighting, security"
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" ref={ref}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Smart Living</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Control Your Home
              <br />
              <span className="text-brand-gold">From Anywhere.</span>
            </h2>
            <p className="mt-6 text-white/50 leading-relaxed max-w-md">
              Manage your lights, security, climate, and appliances from your smartphone. Experience the future of living with intelligent automation that adapts to your lifestyle.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { icon: Lightbulb, label: 'Smart Lighting', status: lightsOn ? 'On' : 'Off' },
                { icon: Shield, label: 'Security', status: 'Active' },
                { icon: Wifi, label: 'Connectivity', status: 'Connected' },
                { icon: Smartphone, label: 'App Control', status: 'Ready' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="glass rounded-xl px-4 py-3 flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}
                >
                  <item.icon className={`w-5 h-5 ${item.status === 'On' || item.status === 'Active' || item.status === 'Connected' ? 'text-brand-green' : 'text-white/40'}`} />
                  <div>
                    <p className="text-xs text-white/60">{item.label}</p>
                    <p className={`text-sm font-semibold ${item.status === 'On' || item.status === 'Active' || item.status === 'Connected' ? 'text-brand-green' : 'text-white/80'}`}>{item.status}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="relative h-[450px] lg:h-[550px]"
            style={{ y }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-gray to-brand-bg overflow-hidden flex items-center justify-center">
              <div className="text-center relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1608377205619-03a0b4c4e270?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Smart home control interface on a mobile device"
                  loading="lazy"
                  decoding="async"
                  width="410"
                  height="273"
                />
              </div>
              {/* Animated light glows */}
              <motion.div
                className="absolute top-[20%] left-[30%] w-24 h-24 rounded-full bg-brand-gold/20 blur-2xl"
                animate={lightsOn ? { opacity: [0, 1, 0.7], scale: [0.5, 1.2, 1] } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.5 }}
              />
              <motion.div
                className="absolute top-[40%] right-[25%] w-20 h-20 rounded-full bg-brand-green/20 blur-2xl"
                animate={lightsOn ? { opacity: [0, 1, 0.7], scale: [0.5, 1.2, 1] } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <motion.div
                className="absolute bottom-[25%] left-[40%] w-28 h-28 rounded-full bg-brand-gold/15 blur-3xl"
                animate={lightsOn ? { opacity: [0, 1, 0.6], scale: [0.5, 1.3, 1] } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.5, delay: 0.6 }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/40 via-transparent to-brand-bg/20 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
