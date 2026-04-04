import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart, ArrowUpRight } from 'lucide-react';
import Magnetic from '../ui/Magnetic';

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Our Services', path: '/services' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Book Appointment', path: '/appointment' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  { name: 'Dental Implants', path: '/services/oral-surgery' },
  { name: 'Smile Makeover', path: '/services/cosmetic-dentistry' },
  { name: 'Root Canal', path: '/services/general-dentistry' },
  { name: 'Teeth Whitening', path: '/services/cosmetic-dentistry' },
  { name: 'Orthodontics', path: '/services/orthodontics' },
  { name: 'Pediatric Care', path: '/services/pediatric-care' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.6 },
  },
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-white/70 pt-16 md:pt-24 pb-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 bg-[var(--color-brand-primary)]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-5 bg-[var(--color-brand-primary)]" />
      
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 mb-16 md:mb-20 text-center md:text-left"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="col-span-1 flex flex-col items-center md:items-start" variants={staggerItem}>
            <Magnetic>
              <Link to="/" className="flex items-center gap-4 mb-6 group">
                <motion.div 
                  className="w-10 h-10 border border-[var(--color-brand-primary)]/50 flex items-center justify-center text-[var(--color-brand-primary)] font-serif text-xl"
                  whileHover={{ scale: 1.05, borderColor: 'var(--color-brand-primary)' }}
                >
                  D
                </motion.div>
                <span className="text-xl font-serif text-white group-hover:text-[var(--color-brand-primary)] transition-colors">
                  DE Dental Square
                </span>
              </Link>
            </Magnetic>
            
            <p className="text-base leading-relaxed mb-10 font-light text-white/60 max-w-sm">
              Redefining dental excellence in Varanasi. Precision technology meets artistic care — for the smile you deserve.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 border border-white/10 flex items-center justify-center transition-all hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="text-white font-medium uppercase tracking-[0.2em] text-lg mb-10">Quick Links</h4>
            <ul className="space-y-6">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-base flex items-center justify-center md:justify-start gap-4 group transition-colors hover:text-[var(--color-brand-primary)] text-white/60">
                    <motion.span className="w-1.5 h-1.5 bg-[var(--color-brand-primary)]/50 group-hover:bg-[var(--color-brand-primary)] transition-all" whileHover={{ scale: 1.5 }} />
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="text-white font-medium uppercase tracking-[0.2em] text-lg mb-10">Services</h4>
            <ul className="space-y-6">
              {services.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-base flex items-center justify-center md:justify-start gap-4 group transition-colors hover:text-[var(--color-brand-primary)] text-white/60">
                    <motion.span className="w-1.5 h-1.5 bg-[var(--color-brand-primary)]/50 group-hover:bg-[var(--color-brand-primary)] transition-all" whileHover={{ scale: 1.5 }} />
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-medium uppercase tracking-[0.2em] text-lg mb-10">Contact</h4>
            <ul className="space-y-8">
              {[
                { icon: Phone, label: 'Phone', value: '+91 8840066719', href: 'tel:8840066719' },
                { icon: Mail, label: 'Email', value: 'info@dedentalsquare.com', href: 'mailto:info@dedentalsquare.com' },
                { icon: MapPin, label: 'Location', value: 'Varanasi, Uttar Pradesh', href: '/contact' },
              ].map((item, i) => (
                <motion.li key={i} className="flex items-start gap-5 group" whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>
                  <motion.div className="w-12 h-12 border border-[var(--color-brand-primary)]/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all duration-300" whileHover={{ scale: 1.05 }}>
                    <item.icon size={18} strokeWidth={1.5} />
                  </motion.div>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-[0.2em] font-medium mb-1.5 text-white/40">{item.label}</div>
                    {item.href.startsWith('/') ? (
                        <Link to={item.href} className="text-base text-white hover:text-[var(--color-brand-primary)] transition-colors">
                          {item.value}
                        </Link>
                    ) : (
                        <a href={item.href} className="text-base text-white hover:text-[var(--color-brand-primary)] transition-colors">
                          {item.value}
                        </a>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            © 2025 DE DENTAL SQUARE — ALL RIGHTS RESERVED
          </p>
          
          <motion.p className="text-xs flex items-center gap-2 text-white/40" whileHover={{ color: 'var(--color-brand-primary)' }}>
            Made with 
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart size={10} className="fill-[var(--color-brand-primary)] text-[var(--color-brand-primary)]" />
            </motion.span>
            for better smiles
          </motion.p>
          
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link key={item} to="#" className="text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-[var(--color-brand-primary)] text-white/40">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 bg-[var(--color-brand-primary)] text-white flex items-center justify-center shadow-lg z-40"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpRight size={20} />
        </motion.button>
      </div>
    </footer>
  );
}
