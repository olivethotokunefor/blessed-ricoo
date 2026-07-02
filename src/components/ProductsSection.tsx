import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionMeta from '../lib/SectionMeta';
import { getProducts, type Product } from '../lib/firebase';

const placeholderProducts: Product[] = Array.from({ length: 5 }, (_, index) => ({
  id: `placeholder-${index}`,
  name: 'Loading product...',
  description: '',
  category: 'Loading',
  price: 0,
  image: 'https://via.placeholder.com/1000x600/111827/cccccc?text=Loading',
  featured: false,
  createdAt: null,
  updatedAt: null,
}));

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetched = await getProducts();
        setProducts(fetched);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();

    const handleProductUpdate = async () => {
      setIsLoading(true);
      await loadProducts();
    };

    window.addEventListener('product-updated', handleProductUpdate);
    return () => window.removeEventListener('product-updated', handleProductUpdate);
  }, []);

  const galleryItems = useMemo(() => products, [products]);
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
          {(isLoading ? placeholderProducts : visibleItems).map((item, i) => (
            <motion.article
              key={`${item.id}-${i}`}
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

        {!isLoading && galleryItems.length > 5 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors"
            >
              {showAll ? 'Show less' : 'See more'}
            </button>
          </div>
        )}
        {!isLoading && !galleryItems.length && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
            <p className="text-lg font-semibold text-white">No products found in Firestore.</p>
            <p className="mt-2 text-sm">Upload products using the admin panel and redeploy once your Firestore rules are set.</p>
          </div>
        )}
      </div>
    </section>
  );
}
