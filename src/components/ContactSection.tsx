import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will contact you shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-brand-gray/20">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Contact Us</h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">Ready to upgrade your home or farm? Reach out today.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-2">Let's Talk</h3>
            <p className="text-white/50 mb-8 leading-relaxed">Whether you need a solar system, CCTV setup, or smart home automation, our team is ready to help.</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a href="tel:09043820714" className="inline-flex items-center gap-2 px-5 py-3 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="https://wa.me/2349043820714" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="mailto:farmricco@gmail.com" className="inline-flex items-center gap-2 px-5 py-3 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>

            <div className="glass rounded-3xl p-6 sm:p-8 mb-8">
              <h4 className="font-bold text-lg mb-4 text-brand-gold">Company Information</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">BLESSED RICCO UNIVERSAL LIMITED</p>
                    <p className="text-sm text-white/50 mt-1">No.1 Yinka Fagbemi Avenue, Okun Ajah Community Road, Ajah, Lagos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <div className="text-sm text-white/50 mt-1 space-y-0.5">
                      <p>09043820714</p>
                      <p>08139608078</p>
                      <p>08079056947</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-sm text-white/50 mt-1">farmricco@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Business Hours</p>
                    <p className="text-sm text-white/50 mt-1">Mon - Sat: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="h-48 rounded-3xl bg-gradient-to-br from-brand-gray to-brand-bg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-white/10 mx-auto mb-2" />
                <p className="text-white/20 text-sm font-medium uppercase tracking-widest">Map Location</p>
                <p className="text-white/10 text-xs mt-1">Replace with real map</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold mb-2">Send a Message</h3>
              <div>
                <label className="block text-sm text-white/60 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
