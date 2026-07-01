import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sun, Camera, Home, Leaf, Zap, ChevronRight, Phone } from 'lucide-react';

const floatingCards = [
  { icon: Sun, label: 'Solar Energy', position: 'top-10 right-[10%]', delay: 0 },
  { icon: Camera, label: 'CCTV Installation', position: 'top-[35%] right-[5%]', delay: 0.3 },
  { icon: Home, label: 'Smart Home', position: 'bottom-[30%] right-[12%]', delay: 0.6 },
  { icon: Leaf, label: 'Farming Equipment', position: 'bottom-10 right-[8%]', delay: 0.9 },
  { icon: Zap, label: 'Home Automation', position: 'top-[55%] right-[18%]', delay: 1.2 },
];

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg to-brand-gray/30" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <motion.div
          ref={ref}
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs text-white/80 font-medium">Premium Tech Solutions</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
            Power Your Home.
            <br />
            <span className="text-brand-gold">Protect</span> What Matters.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/60 max-w-lg leading-relaxed">
            Your trusted destination for Solar Solutions, CCTV Systems, Smart Homes, Home Automation, Farming Equipment and Smart Gadgets.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.a
              href="#products"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Products
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </motion.a>
          </div>
        </motion.div>

        {/* Right Content - Hero Image + Floating Cards */}
        <div className="relative h-[500px] lg:h-[600px] hidden md:block">
          <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-brand-gray to-brand-bg rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <Home className="w-24 h-24 text-white/10 mx-auto mb-4" />
                <p className="text-white/20 text-sm font-medium uppercase tracking-widest">Smart Home Preview</p>
                <p className="text-white/10 text-xs mt-2">Replace with real image</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent rounded-3xl" />
          </motion.div>

          {/* Floating cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={`absolute ${card.position} glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float`}
              style={{ animationDelay: `${i * 0.5}s` }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + card.delay, duration: 0.6 }}
            >
              <card.icon className="w-4 h-4 text-brand-gold" />
              <span className="text-xs text-white/80 font-medium whitespace-nowrap">{card.label}</span>
            </motion.div>
          ))}

          {/* Discount Badge */}
          <motion.div
            className="absolute top-6 left-6 bg-brand-gold/90 text-brand-bg font-bold text-sm px-4 py-2 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          >
            15% Discount Available
          </motion.div>
        </div>

        {/* Mobile floating cards */}
        <div className="md:hidden flex flex-wrap gap-3 justify-center">
          {floatingCards.slice(0, 3).map((card, i) => (
            <motion.div
              key={card.label}
              className="glass rounded-xl px-3 py-2 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.15 }}
            >
              <card.icon className="w-4 h-4 text-brand-gold" />
              <span className="text-xs text-white/80">{card.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
