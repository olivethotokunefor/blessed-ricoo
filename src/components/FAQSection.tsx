import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { question: 'Do you install solar systems?', answer: 'Yes, we provide complete solar installation services including site assessment, system design, panel mounting, inverter setup, and grid connection for both residential and commercial properties.' },
  { question: 'Do you install CCTV?', answer: 'Absolutely. We install high-definition CCTV cameras with night vision, motion detection, and remote monitoring capabilities. Our team covers everything from wiring to app configuration.' },
  { question: 'Can you automate my home?', answer: 'Yes! We offer full home automation solutions including smart lighting, climate control, automated blinds, security systems, and voice assistant integration. We customize everything to your lifestyle.' },
  { question: 'Do you sell farming equipment?', answer: 'We supply a wide range of farming equipment including tractors, tillers, irrigation systems, sprayers, and harvesters. We also offer maintenance and spare parts support.' },
  { question: 'How can I request a quotation?', answer: 'You can request a quotation by filling out our contact form, calling us directly, or sending a WhatsApp message. Our team typically responds within 24 hours with a detailed estimate.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Common Questions</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">Quick answers to help you get started.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pl-14">
                      <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
