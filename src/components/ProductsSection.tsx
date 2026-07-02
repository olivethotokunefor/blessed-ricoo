import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionMeta from '../lib/SectionMeta';

type GalleryItem = {
  name: string;
  category: string;
  image: string;
};

const defaultGallery: GalleryItem[] = [
  {
    name: 'Solar Setup',
    category: 'Solar',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Smart Living',
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Security Detail',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Cozy Bedding',
    category: 'Furniture + Beddings',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Farm Machinery',
    category: 'Farming',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Modern Control',
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
  },
];

function loadGallery() {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem('blessed-rico-gallery');
  if (!stored) return [];
  try {
    return JSON.parse(stored) as GalleryItem[];
  } catch {
    return [];
  }
}

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setGallery(loadGallery());

    const handleGalleryUpdate = () => setGallery(loadGallery());
    window.addEventListener('gallery-update', handleGalleryUpdate);
    return () => window.removeEventListener('gallery-update', handleGalleryUpdate);
  }, []);

  const galleryItems = useMemo(() => (gallery.length ? gallery : defaultGallery), [gallery]);
  const bentoClasses = ['col-span-2 row-span-2', 'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-2 row-span-1', 'col-span-1 row-span-1'];

  const visibleItems = showAll ? galleryItems : galleryItems.slice(0, 5);

  return (
    <section id="products" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-gray/20">
      <SectionMeta
        title="Products — BLESSED RICCO Gallery"
        description="Explore our product gallery featuring solar installations, smart home devices, and farming equipment in a playful bento grid." 
        url="https://blessed-rico.netlify.app/#products"
        image="https://blessed-rico.netlify.app/og_products.jpg"
        keywords="products, gallery, solar, smart home, farming"
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Visual Gallery</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Our Product Gallery</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">A playful bento layout showcasing the look and feel of our products, services, and spaces.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleItems.map((item, i) => (
            <motion.article
              key={`${item.name}-${i}`}
              className={`group relative overflow-hidden rounded-[32px] bg-brand-gray shadow-2xl shadow-black/30 ${bentoClasses[i % bentoClasses.length]} min-h-[260px]`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width={1000}
                height={600}
              />
              <div className="absolute inset-0 bg-brand-bg/70 group-hover:bg-brand-bg/50 transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-flex rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.name}</h3>
              </div>
            </motion.article>
          ))}
        </div>

        {galleryItems.length > 5 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors"
            >
              {showAll ? 'Show less' : 'See more'}
            </button>
          </div>
        )}

        {/* <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
          <div className="flex items-center gap-3 text-brand-gold font-semibold mb-3">
            Admin uploads sync to the gallery.
          </div>
          <p>Use the admin upload page at <span className="text-white">?admin=1</span> to add images that appear here automatically.</p>
        </div> */}
      </div>
    </section>
  );
}
