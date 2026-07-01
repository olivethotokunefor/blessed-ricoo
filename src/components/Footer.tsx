import { Sun, Zap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-brand-gray/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Sun className="w-5 h-5 text-brand-gold" />
                <Zap className="w-5 h-5 text-brand-gold" />
              </div>
              <span className="font-bold text-lg tracking-tight">BLESSED RICCO</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Powering smarter living with premium solar, security, smart home, and farming solutions.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-gold/20 hover:text-brand-gold transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'Products', 'Services', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-white/50 hover:text-brand-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Solar Solutions', 'CCTV Installation', 'Smart Home', 'Home Automation', 'Farming Equipment'].map((link) => (
                <li key={link}>
                  <a href="#services" className="text-sm text-white/50 hover:text-brand-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                No.1 Yinka Fagbemi Avenue, Okun Ajah Community Road, Ajah, Lagos
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                09043820714
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                farmricco@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} BLESSED RICCO UNIVERSAL LIMITED. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
