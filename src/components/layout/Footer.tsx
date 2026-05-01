import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart, ArrowUpRight, Clock } from 'lucide-react';
import { services } from '../../constants/services';

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
  { name: 'Book Appointment', path: '/appointment' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter/X' },
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] pt-[80px] pb-[32px] px-6 text-[14px]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Column 1 - Brand */}
          <motion.div variants={staggerItem} className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group cursor-pointer w-fit inline-flex">
              <div className="w-[32px] h-[32px] border border-[var(--color-caramel)] flex items-center justify-center text-[var(--color-caramel)] font-serif text-[18px]">
                D
              </div>
              <span className="text-[18px] font-semibold text-[var(--color-cream)] font-[Inter]">
                DE Dental Square
              </span>
            </Link>
            <p className="text-[14px] text-[var(--color-text-muted)] max-w-[280px] font-[Inter] leading-[1.6] mt-4">
              Redefining dental excellence in Varanasi. Precision technology meets artistic care.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-caramel)] transition-colors duration-300 w-8 h-8 rounded-full border border-[var(--color-latte)]/10 flex items-center justify-center hover:border-[var(--color-caramel)]/50"
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div variants={staggerItem} className="md:col-span-1">
            <h4 className="text-[var(--color-bronze)] font-semibold uppercase tracking-[0.08em] text-[13px] mb-5 font-[Inter]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={item.path} 
                    className="text-[14px] text-[var(--color-latte)] hover:text-[var(--color-cream)] transition-all hover:translate-x-1 inline-block font-[Inter]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Services */}
          <motion.div variants={staggerItem} className="md:col-span-1">
            <h4 className="text-[var(--color-bronze)] font-semibold uppercase tracking-[0.08em] text-[13px] mb-5 font-[Inter]">
              Services
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service, idx) => (
                <li key={idx}>
                  <Link 
                    to={`/services/\${service.id}`} 
                    className="text-[14px] text-[var(--color-latte)] hover:text-[var(--color-cream)] transition-all hover:translate-x-1 inline-block font-[Inter]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Contact Info */}
          <motion.div variants={staggerItem} className="md:col-span-1">
            <h4 className="text-[var(--color-bronze)] font-semibold uppercase tracking-[0.08em] text-[13px] mb-5 font-[Inter]">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[var(--color-latte)]">
                <MapPin size={16} className="text-[var(--color-bronze)] mt-0.5 shrink-0" />
                <span className="text-[14px] leading-[1.6]">
                  Lane No 14 (Main Road), Ravindrapuri Rd, opposite to Bank Of India ATM, Colony, Varanasi, Uttar Pradesh 221001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--color-bronze)] shrink-0" />
                <a href="tel:+918840066719" className="text-[var(--color-cream)] font-medium text-[14px] hover:text-[var(--color-caramel)] transition-colors">
                  +91 88400 66719
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--color-bronze)] shrink-0" />
                <a href="mailto:hello@dedentalsquare.com" className="text-[var(--color-cream)] font-medium text-[14px] hover:text-[var(--color-caramel)] transition-colors">
                  hello@dedentalsquare.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-cream)]">
                <Clock size={16} className="text-[var(--color-bronze)] shrink-0" />
                <span className="font-medium text-[14px]">Mon–Sat: 10AM – 8PM</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          variants={staggerItem}
          className="border-t border-[var(--color-latte)]/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] font-[Inter]"
        >
          <div className="text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} DE Dental Square. All rights reserved.
          </div>
          <div className="text-[var(--color-text-muted)]">
            Made with care in Varanasi
          </div>
          <div className="flex gap-6 text-[var(--color-text-muted)]">
            <Link to="/privacy-policy" className="hover:text-[var(--color-cream)] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[var(--color-cream)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
