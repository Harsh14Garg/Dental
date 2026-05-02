import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { 
  MapPin, Phone, Mail, Clock, ExternalLink, 
  ChevronDown, Calendar 
} from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

const faqData = [
  {
    q: "How do I book an appointment?",
    a: "You can book directly through our online form above, call us at +91 88400 66719, or walk in during operating hours. We recommend booking in advance for specialist consultations."
  },
  {
    q: "What should I bring to my first visit?",
    a: "Please bring a valid ID, any previous dental records or X-rays, and a list of current medications. Arrive 15 minutes early to complete your patient profile."
  },
  {
    q: "Do you offer emergency dental services?",
    a: "Yes, we provide same-day emergency care for severe pain, broken teeth, and infections. Call our emergency line for immediate assistance."
  },
  {
    q: "What payment options are available?",
    a: "We accept cash, all major credit/debit cards, UPI, and bank transfers. We also offer flexible EMI options through our partner financiers for treatments above ₹25,000."
  },
  {
    q: "Is there parking available at the clinic?",
    a: "Yes, we have dedicated parking for patients. The entrance is on Lane No 14, directly opposite the Bank of India ATM."
  }
];

export default function Contact() {
  const [MousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentDay, setCurrentDay] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const ySpring = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.02;
        const y = (e.clientY - top - height / 2) * 0.02;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const utcOffset = now.getTimezoneOffset() * 60000;
      const istTime = new Date(now.getTime() + utcOffset + 330 * 60000);
      
      const day = istTime.getDay();
      const hour = istTime.getHours();
      
      const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      setCurrentDay(days[day]);
      
      if (day === 0) {
        setIsOpenNow(false); // Sunday
      } else if (day === 6) {
        setIsOpenNow(hour >= 10 && hour < 18); // Sat 10am-6pm
      } else {
        setIsOpenNow(hour >= 10 && hour < 20); // Mon-Fri 10am-8pm
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen font-sans text-[var(--color-text-secondary)] selection:bg-[var(--color-brand-accent)]/20">
      <Toaster position="top-right" />
      
      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--color-bronze)] origin-left z-50 rounded-r"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="pt-[140px] md:pt-[100px] min-h-[calc(100vh-72px)] flex items-center relative overflow-hidden bg-[var(--color-bg-secondary)]">
        <div className="max-w-[1280px] mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
          
          {/* Left Column */}
          <div className="w-full md:w-[45%] z-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-8 h-px bg-[var(--color-brand-primary)]"></div>
              <span className="text-[var(--color-brand-primary)] text-[12px] font-semibold tracking-[0.2em] uppercase font-['Inter']">REACH OUT</span>
              <div className="w-8 h-px bg-[var(--color-brand-primary)]"></div>
            </motion.div>

            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-[64px] font-[400] font-serif leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)] mb-6"
            >
              Get in <span className="text-[var(--color-brand-primary)] italic">Touch</span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[18px] text-[var(--color-text-secondary)] max-w-[460px] leading-[1.7] mb-10 font-['Inter']"
            >
              Have questions about our elite services or want to schedule a private consultation? Our dedicated team is here to assist you.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 border-l-2 border-[var(--color-brand-primary)]/30 pl-4">
              <motion.a 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}
                href="tel:+918840066719" 
                className="flex items-center gap-3 text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] font-medium transition-colors font-['Inter'] text-[15px]"
              >
                <Phone size={16} className="text-[var(--color-brand-primary)]" /> 
                +91 88400 66719
              </motion.a>
              <motion.a 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }}
                href="mailto:hello@dedentalsquare.com" 
                className="flex items-center gap-3 text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] font-medium transition-colors font-['Inter'] text-[15px]"
              >
                <Clock size={16} className="text-[var(--color-brand-primary)]" /> 
                Mon–Sat: 10AM – 8PM
              </motion.a>
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                <img src={`https://i.pravatar.cc/100?img=1`} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white relative z-30" />
                <img src={`https://i.pravatar.cc/100?img=5`} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white relative z-20" />
                <img src={`https://i.pravatar.cc/100?img=9`} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white relative z-10" />
              </div>
              <span className="text-[var(--color-text-secondary)] font-medium text-[14px]">Trusted by 15,000+ patients</span>
            </motion.div>
          </div>

          {/* Right Column - Parallax Orbs */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 h-full w-full mt-12 md:mt-0">
            <motion.a 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
              style={{ transform: `translate(${MousePosition.x * -1}px, ${MousePosition.y * -1}px)` }}
              className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] bg-[var(--color-bg-primary)] rounded-full border border-[var(--color-latte)]/30 shadow-[0_20px_60px_rgba(31,28,27,0.08)] flex flex-col items-center justify-center p-2 sm:p-4 hover:scale-105 hover:border-[var(--color-bronze)] transition-all duration-500 cursor-pointer group z-20"
              href="https://maps.google.com/?q=DE+Dental+Square+Varanasi" target="_blank" rel="noreferrer"
            >
              <MapPin size={24} className="text-[var(--color-bronze)] mb-1 sm:mb-2 group-hover:-translate-y-1 transition-transform sm:w-[28px] sm:h-[28px]" />
              <span className="text-[var(--color-text-primary)] font-semibold text-[10px] sm:text-[13px] uppercase tracking-wide text-center">Visit Us</span>
            </motion.a>

            <motion.a 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.45, duration: 0.8, type: "spring", stiffness: 100 }}
              style={{ transform: `translate(${MousePosition.x * -1.5}px, ${MousePosition.y * -1.5}px)` }}
              className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] bg-[var(--color-bg-primary)] rounded-full border border-[var(--color-latte)]/30 shadow-[0_20px_60px_rgba(31,28,27,0.08)] flex flex-col items-center justify-center p-2 sm:p-4 hover:scale-105 hover:border-[var(--color-bronze)] transition-all duration-500 cursor-pointer group z-20"
              href="tel:+918840066719"
            >
              <Phone size={24} className="text-[var(--color-bronze)] mb-1 sm:mb-2 group-hover:-translate-y-1 transition-transform sm:w-[28px] sm:h-[28px]" />
              <span className="text-[var(--color-text-primary)] font-semibold text-[10px] sm:text-[13px] uppercase tracking-wide text-center">Call Us</span>
            </motion.a>

            <motion.a 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
              style={{ transform: `translate(${MousePosition.x * -0.8}px, ${MousePosition.y * -0.8}px)` }}
              className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] bg-[var(--color-bg-primary)] rounded-full border border-[var(--color-latte)]/30 shadow-[0_20px_60px_rgba(31,28,27,0.08)] flex flex-col items-center justify-center p-2 sm:p-4 hover:scale-105 hover:border-[var(--color-bronze)] transition-all duration-500 cursor-pointer group z-20"
              href="mailto:hello@dedentalsquare.com"
            >
              <Mail size={24} className="text-[var(--color-bronze)] mb-1 sm:mb-2 group-hover:-translate-y-1 transition-transform sm:w-[28px] sm:h-[28px]" />
              <span className="text-[var(--color-text-primary)] font-semibold text-[10px] sm:text-[13px] uppercase tracking-wide text-center">Email Us</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS */}
      <section className="py-[100px] bg-[var(--color-bg-primary)] px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
              <span className="text-[var(--color-bronze)] text-[12px] font-semibold tracking-[0.2em] uppercase">CONNECT WITH US</span>
              <div className="w-8 h-px bg-[var(--color-bronze)]"></div>
            </div>
            <h2 className="text-[42px] font-serif text-[var(--color-text-primary)] mb-4">
              Three Ways to <span className="text-[var(--color-bronze)] italic">Connect</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-[var(--color-bg-primary)] border border-[var(--color-text-primary)]/5 rounded-[16px] p-10 flex flex-col items-start group hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="w-14 h-14 rounded-full border-[1.5px] border-[var(--color-latte)]/30 flex items-center justify-center group-hover:border-[var(--color-brand-primary)] transition-colors duration-400">
                <MapPin size={24} className="text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="mt-6 text-[14px] font-semibold tracking-[0.08em] text-[var(--color-text-primary)] uppercase">Our Location</h3>
              <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] leading-[1.7] flex-grow">
                Lane No 14 (Main Road), Ravindrapuri Rd, opposite to Bank Of India ATM, Varanasi - 221001
              </p>
              <a href="https://maps.google.com/?q=DE+Dental+Square+Varanasi" target="_blank" rel="noreferrer" className="mt-6 text-[13px] font-semibold tracking-[0.08em] uppercase text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-1 group/link">
                VIEW ON MAP <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.12 }} viewport={{ once: true }}
              className="bg-[var(--color-bg-primary)] border border-[var(--color-text-primary)]/5 rounded-[16px] p-10 flex flex-col items-start group hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="w-14 h-14 rounded-full border-[1.5px] border-[var(--color-latte)]/30 flex items-center justify-center group-hover:border-[var(--color-brand-primary)] transition-colors duration-400">
                <Phone size={24} className="text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="mt-6 text-[14px] font-semibold tracking-[0.08em] text-[var(--color-text-primary)] uppercase">Direct Line</h3>
              <p className="mt-3 text-[18px] text-[var(--color-text-primary)] font-medium">+91 88400 66719</p>
              <p className="mt-4 text-[13px] font-semibold tracking-[0.08em] text-[var(--color-brand-primary)] uppercase">10 AM – 8 PM Mon-Sat</p>
              
              <div className="flex-grow"></div>
              <a href="tel:+918840066719" className="mt-6 text-[13px] font-semibold tracking-[0.08em] uppercase text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-1 group/link">
                CALL NOW <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.24 }} viewport={{ once: true }}
              className="bg-[var(--color-bg-primary)] border border-[var(--color-text-primary)]/5 rounded-[16px] p-10 flex flex-col items-start group hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="w-14 h-14 rounded-full border-[1.5px] border-[var(--color-latte)]/30 flex items-center justify-center group-hover:border-[var(--color-brand-primary)] transition-colors duration-400">
                <Mail size={24} className="text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="mt-6 text-[14px] font-semibold tracking-[0.08em] text-[var(--color-text-primary)] uppercase">Email Concierge</h3>
              <p className="mt-3 text-[18px] text-[var(--color-text-primary)] font-medium">hello@dedentalsquare.com</p>
              <p className="mt-4 text-[13px] font-semibold tracking-[0.08em] text-[var(--color-brand-primary)] uppercase text-center md:text-left">RESPONSE WITHIN 12 HOURS</p>
              
              <div className="flex-grow"></div>
              <a href="mailto:hello@dedentalsquare.com" className="mt-6 text-[13px] font-semibold tracking-[0.08em] uppercase text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-1 group/link">
                SEND EMAIL <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MAP */}
      <section className="bg-[var(--color-espresso)] w-full h-[600px] md:h-[500px] relative flex flex-col md:flex-row">
        {/* We use an iframe map and overlay the panel */}
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14433.090589886915!2d82.9904261623871!3d25.2917757973713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e31006eb4a055%3A0xc3f6e1f0212f45ea!2sRavindrapuri%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709477380123!5m2!1sen!2sin&amp;layer=c" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'sepia(30%) hue-rotate(340deg) saturate(80%) map-color-warm opacity(0.8)' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative z-10 w-full md:w-[40%] bg-[#FDFDFD]/95 backdrop-blur-md md:rounded-r-[16px] p-8 md:p-12 flex flex-col justify-center h-full shadow-[20px_0_40px_rgba(31,28,27,0.05)] pt-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#A24B0E]"></div>
            <span className="text-[#A24B0E] text-[12px] font-semibold tracking-[0.2em] uppercase">OUR LOCATION</span>
          </div>
          <h2 className="text-[32px] font-serif text-[#1F1C1B] mb-4">
            Find Us in <span className="text-[#A24B0E] italic">Varanasi</span>
          </h2>
          <p className="text-[15px] text-[#616777] leading-[1.7] mb-8">
            Lane No 14 (Main Road), Ravindrapuri Rd, opposite to Bank Of India ATM, Colony, Varanasi, Uttar Pradesh 221001
          </p>
          <a 
            href="https://maps.google.com/?q=DE+Dental+Square+Varanasi" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#A24B0E] hover:bg-[#8A3F0C] text-white px-7 py-3.5 rounded-[8px] font-semibold text-[13px] tracking-[0.08em] transition-colors w-fit shadow-[0_8px_20px_rgba(162,75,14,0.25)]"
          >
            GET DIRECTIONS <ExternalLink size={16} />
          </a>
          
          <div className="mt-6 flex items-center gap-2 text-[#A9A6A2]">
            <MapPin size={16} />
            <span className="text-[14px]">Near Bank of India ATM, Ravindrapuri</span>
          </div>
        </motion.div>
      </section>



      {/* 5. OPERATING HOURS */}
      <section className="py-[80px] bg-[var(--color-bg-primary)] px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-[var(--color-brand-primary)]"></div>
              <span className="text-[var(--color-brand-primary)] text-[12px] font-semibold tracking-[0.2em] uppercase">OUR HOURS</span>
              <div className="w-8 h-px bg-[var(--color-brand-primary)]"></div>
            </div>
            <h2 className="text-[36px] font-serif text-[var(--color-text-primary)] mb-4">Clinic <span className="text-[var(--color-brand-primary)] italic">Timings</span></h2>
            <p className="text-[var(--color-text-secondary)] max-w-[500px] mx-auto">We are open 6 days a week to provide dedicated care. Please book in advance for specialist consultations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-text-primary)]/10 p-8 rounded-[16px]">
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-4">Weekdays</h4>
              <p className="text-[24px] font-serif text-[var(--color-text-primary)] mb-2">10 AM – 8 PM</p>
              <p className="text-[14px] text-[var(--color-text-secondary)]">Monday to Friday</p>
            </div>
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-text-primary)]/10 p-8 rounded-[16px]">
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-4">Saturday</h4>
              <p className="text-[24px] font-serif text-[var(--color-text-primary)] mb-2">10 AM – 6 PM</p>
              <p className="text-[14px] text-[var(--color-text-secondary)]">Limited availability</p>
            </div>
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-text-primary)]/10 p-8 rounded-[16px]">
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-4">Sunday</h4>
              <p className="text-[24px] font-serif text-[var(--color-text-primary)] mb-2">Closed</p>
              <p className="text-[14px] text-[var(--color-text-secondary)]">For Emergencies Only</p>
            </div>
            <div className="bg-[var(--color-brand-primary)]/10 border border-[var(--color-brand-primary)]/20 p-8 rounded-[16px] flex flex-col justify-center">
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-2">Emergency Care</h4>
              <p className="text-[14px] text-[var(--color-text-primary)] font-medium">Available for severe pain/injuries. Please call our emergency line first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-[100px] bg-[var(--color-espresso)] px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-px bg-[var(--color-brand-primary)]"></div>
              <span className="text-[var(--color-brand-primary)] text-[12px] font-semibold tracking-[0.2em] uppercase">FAQ</span>
              <div className="w-8 h-px bg-[var(--color-brand-primary)]"></div>
            </div>
            <h2 className="text-[36px] font-serif text-[var(--color-text-primary)]">
              Common <span className="text-[var(--color-brand-primary)] italic">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqData.map((item, index) => (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                key={index} 
                className={`bg-[var(--color-bg-primary)] border rounded-[12px] overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-[var(--color-brand-primary)]/30 bg-[var(--color-bg-primary)]' : 'border-[var(--color-text-primary)]/[0.06] hover:bg-[var(--color-text-primary)]/[0.02] hover:border-[var(--color-brand-primary)]/15'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-6 flex items-center justify-between group"
                >
                  <span className="text-[16px] font-semibold text-[var(--color-text-primary)]">{item.q}</span>
                  <ChevronDown className={`text-[var(--color-brand-primary)] transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} size={20} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[15px] text-[var(--color-text-secondary)] leading-[1.7]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker {
          border-radius: 12px;
          border: 1px solid var(--color-latte);
          background-color: var(--color-bg-primary);
          font-family: 'Inter', sans-serif;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .react-datepicker__header {
          background-color: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-latte);
          border-top-left-radius: 12px !important;
          border-top-right-radius: 12px !important;
          padding-top: 12px;
        }
        .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
          background-color: var(--color-brand-primary) !important;
          color: white;
        }
        .react-datepicker__day:hover {
          background-color: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
          color: var(--color-brand-primary);
        }
        .react-datepicker-popper {
          z-index: 50;
        }
      `}} />
    </div>
  );
}
