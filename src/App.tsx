import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <ScrollProgress />
          <Navbar />
          <main>
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
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
