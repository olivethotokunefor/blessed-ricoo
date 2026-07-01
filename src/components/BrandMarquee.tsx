import { motion } from 'framer-motion';

const brands = ['RILUX', 'FURNIX', 'FARMRICCO', 'Solar', 'CCTV', 'Automation'];

export default function BrandMarquee() {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-bg to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-bg to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            className="flex-shrink-0 mx-12 flex items-center"
          >
            <span className="text-2xl sm:text-3xl font-bold text-white/15 hover:text-brand-gold/60 transition-colors duration-300 cursor-default whitespace-nowrap">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
