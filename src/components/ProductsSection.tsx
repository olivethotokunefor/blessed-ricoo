import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const products = [
  { name: 'Solar Panels', desc: 'High-efficiency monocrystalline panels for maximum energy capture.', category: 'Solar' },
  { name: 'Inverters', desc: 'Pure sine wave inverters for stable, reliable power conversion.', category: 'Solar' },
  { name: 'CCTV Cameras', desc: '4K night vision cameras with AI-powered motion detection.', category: 'Security' },
  { name: 'Smart Locks', desc: 'Fingerprint, PIN, and app-controlled digital door locks.', category: 'Smart Home' },
  { name: 'Smart Lighting', desc: 'Color-changing, voice-controlled LED lighting systems.', category: 'Smart Home' },
  { name: 'Smart Switches', desc: 'WiFi-enabled switches for seamless automation control.', category: 'Smart Home' },
  { name: 'Farming Seeds', desc: 'Certified, high-germination seeds for diverse crops.', category: 'Farming' },
  { name: 'Farming Machinery', desc: 'Tractors, tillers, and irrigation equipment for modern farms.', category: 'Farming' },
];

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="products" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-gray/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Premium Collection</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Featured Products</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">Explore our curated range of cutting-edge technology and agricultural solutions.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              className="group relative bg-brand-gray rounded-3xl overflow-hidden cursor-pointer hover:glow-gold transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.08, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="h-48 bg-gradient-to-br from-brand-gray to-brand-bg flex items-center justify-center relative overflow-hidden">
                <span className="text-xs text-white/20 uppercase tracking-wider">Product Image</span>
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <span className="text-xs text-brand-gold font-semibold uppercase tracking-wider">{product.category}</span>
                <h3 className="mt-2 text-lg font-bold group-hover:text-brand-gold transition-colors">{product.name}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{product.desc}</p>
                <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/70 group-hover:text-brand-gold transition-colors">
                  View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
