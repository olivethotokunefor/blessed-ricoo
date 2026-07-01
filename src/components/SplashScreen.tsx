import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-[36px] border border-brand-gold/20 bg-brand-gold/10 shadow-[0_0_60px_rgba(246,184,0,0.18)]">
              <span className="text-4xl font-black text-brand-gold">B+</span>
              <span className="absolute -right-2 -top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-brand-bg text-sm font-bold">
                +
              </span>
            </div>
            <div className="absolute inset-0 rounded-full blur-3xl bg-brand-gold/20 animate-glow-pulse" />
            <motion.h1
              className="relative text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-center"
              animate={{ textShadow: ['0 0 20px rgba(246,184,0,0.3)', '0 0 40px rgba(246,184,0,0.6)', '0 0 20px rgba(246,184,0,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              BLESSED RICCO
              <br />
              <span className="text-brand-gold">UNIVERSAL LIMITED</span>
            </motion.h1>
          </motion.div>
          <motion.p
            className="mt-6 text-sm sm:text-lg text-white/60 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Powering Smarter Living
          </motion.p>
          <motion.div
            className="mt-12 h-1 w-32 bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-brand-gold rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
