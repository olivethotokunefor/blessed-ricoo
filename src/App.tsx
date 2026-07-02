import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import HeroSection from './components/HeroSection';
import BrandMarquee from './components/BrandMarquee';
import ServicesSection from './components/ServicesSection';
import ProductsSection from './components/ProductsSection';
import SmartHomeSection from './components/SmartHomeSection';
import SolarEnergySection from './components/SolarEnergySection';
import FarmingSolutions from './components/FarmingSolutions';
import InstallationProcess from './components/InstallationProcess';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
const AdminProductUpload = lazy(() => import('./components/AdminProductUpload'));

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [ready, setReady] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdminMode(new URLSearchParams(window.location.search).get('admin') === '1');
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    const GA_ID = import.meta.env.VITE_GA_ID;
    if (!GA_ID) return;
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // @ts-ignore
    function gtag(){window.dataLayer.push(arguments)}
    // @ts-ignore
    gtag('js', new Date());
    // @ts-ignore
    gtag('config', GA_ID);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {ready && !isAdminMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <Helmet>
            <title>BLESSED RICCO UNIVERSAL LIMITED — Solar, CCTV, Smart Home & Farming</title>
            <meta name="description" content="Premium solar solutions, CCTV systems, smart home automation, and farming equipment. Powering smarter living in Lagos, Nigeria." />
            <meta name="keywords" content="solar, CCTV, smart home, home automation, farming, renewable energy, Lagos" />
            <link rel="canonical" href="https://blessed-rico.netlify.app/" />
            <meta property="og:title" content="BLESSED RICCO — Solar, CCTV, Smart Home & Farming" />
            <meta property="og:description" content="Premium solar solutions, CCTV systems, smart home automation, and farming equipment." />
            <meta property="og:url" content="https://blessed-rico.netlify.app/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://blessed-rico.netlify.app/og-image.svg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="BLESSED RICCO — Solar, CCTV, Smart Home & Farming" />
            <meta name="twitter:description" content="Premium solar solutions, CCTV systems, smart home automation, and farming equipment." />
            <meta name="twitter:image" content="https://blessed-rico.netlify.app/og-image.svg" />
            <script type="application/ld+json">
              {`{
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "name": "BLESSED RICCO UNIVERSAL LIMITED",
                    "url": "https://blessed-rico.netlify.app/",
                    "logo": "https://blessed-rico.netlify.app/og-image.svg",
                    "sameAs": []
                  },
                  {
                    "@type": "LocalBusiness",
                    "name": "BLESSED RICCO UNIVERSAL LIMITED",
                    "description": "Premium solar solutions, CCTV systems, smart home automation, and farming equipment.",
                    "telephone": "",
                    "email": "",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "",
                      "addressLocality": "Lagos",
                      "addressRegion": "",
                      "postalCode": "",
                      "addressCountry": "NG"
                    },
                    "openingHours": ["Mo-Fr 09:00-17:00"],
                    "image": "https://blessed-rico.netlify.app/og-image.svg",
                    "url": "https://blessed-rico.netlify.app/",
                    "sameAs": []
                  }
                ]
              }`}
            </script>
          </Helmet>
          <ScrollProgress />
          <Navbar />
          <main id="main-content" role="main">
            <HeroSection />
            <BrandMarquee />
            <ServicesSection />
            <ProductsSection />
            <SmartHomeSection />
            <SolarEnergySection />
            <FarmingSolutions />
            <InstallationProcess />
            <WhyChooseUs />
            <TestimonialsSection />
            <ReviewsSection />
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}

      {ready && isAdminMode && (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
          <AdminProductUpload />
        </Suspense>
      )}
    </>
  );
}

export default App;
