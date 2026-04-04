import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, HeartPulse, ShieldCheck, Microscope, Smile, Activity, ArrowRight } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { fadeInUp, fadeInStagger, revealOnScroll } from '../lib/animations';
import { useRef } from 'react';

const services = [
  { 
    id: "general-dentistry",
    title: "General Dentistry", 
    description: "Routine checkups, cleanings, and preventative care to keep your smile healthy.",
    longDescription: "Our general dentistry services focus on maintaining your oral health through regular checkups, professional cleanings, and preventative care. We believe in early intervention to prevent more complex issues down the line.",
    icon: HeartPulse, 
    color: "from-rose-500/10 to-rose-600/5",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    benefits: ["Regular checkups", "Professional cleaning", "Early cavity detection", "Oral cancer screening"]
  },
  { 
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry", 
    description: "Teeth whitening, veneers, and smile makeovers to boost your confidence.",
    longDescription: "Enhance the natural beauty of your smile with our cosmetic dentistry solutions. From professional teeth whitening to custom-crafted veneers, we help you achieve the smile you've always wanted.",
    icon: Sparkles, 
    color: "from-amber-500/10 to-amber-600/5",
    image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&q=80&w=800",
    benefits: ["Teeth whitening", "Porcelain veneers", "Smile makeovers", "Bonding"]
  },
  { 
    id: "orthodontics",
    title: "Orthodontics", 
    description: "Braces and clear aligners to straighten your teeth and improve your bite.",
    longDescription: "Achieve a straighter, healthier smile with our orthodontic treatments. We offer both traditional braces and modern clear aligner solutions tailored to your specific needs.",
    icon: Activity, 
    color: "from-blue-500/10 to-blue-600/5",
    image: "https://images.unsplash.com/photo-1599775740643-34e89987178c?auto=format&fit=crop&q=80&w=800",
    benefits: ["Traditional braces", "Clear aligners", "Bite correction", "Improved oral function"]
  },
  { 
    id: "oral-surgery",
    title: "Oral Surgery", 
    description: "Expert surgical procedures including wisdom teeth removal and implants.",
    longDescription: "Our skilled oral surgeons provide expert care for complex dental procedures, including wisdom teeth extractions, dental implants, and corrective jaw surgeries, all in a comfortable environment.",
    icon: Microscope, 
    color: "from-emerald-500/10 to-emerald-600/5",
    image: "https://images.unsplash.com/photo-1579684385127-1d15d5b855e7?auto=format&fit=crop&q=80&w=800",
    benefits: ["Wisdom teeth removal", "Dental implants", "Corrective jaw surgery", "Bone grafting"]
  },
  { 
    id: "pediatric-care",
    title: "Pediatric Care", 
    description: "Gentle dental care specifically designed for our youngest patients.",
    longDescription: "We provide a welcoming and gentle environment for children's dental care. Our focus is on making every visit positive, educational, and comfortable for your little ones.",
    icon: Smile, 
    color: "from-purple-500/10 to-purple-600/5",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    benefits: ["Child-friendly environment", "Preventative care", "Education", "Early intervention"]
  },
  { 
    id: "emergency-care",
    title: "Emergency Care", 
    description: "Rapid response for dental emergencies when you need us most.",
    longDescription: "Dental emergencies can happen unexpectedly. We offer rapid response and expert care to alleviate pain and address urgent dental issues promptly.",
    icon: ShieldCheck, 
    color: "from-red-500/10 to-red-600/5",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    benefits: ["Same-day appointments", "Pain relief", "Urgent care", "Expert diagnosis"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <motion.div className="w-8 h-[1px] bg-[var(--color-brand-primary)]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 1 }} />
            <h2 className="text-[var(--color-brand-primary)] font-medium tracking-[0.3em] uppercase text-[10px]">Our Expertise</h2>
            <motion.div className="w-8 h-[1px] bg-[var(--color-brand-primary)]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 0 }} />
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-8"
          >
            Premium Dental <span className="italic text-[var(--color-brand-primary)]">Solutions</span>
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.title} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link to={`/services/${service.id}`} className="block h-full">
                <TiltCard tiltAmount={5} glowColor="rgba(184, 134, 11, 0.15)">
                  <motion.div className="bg-[var(--color-bg-primary)] p-10 border border-[var(--color-brand-primary)]/10 group relative overflow-hidden transition-all duration-500 h-full" whileHover={{ borderColor: 'rgba(184, 134, 11, 0.3)' }}>
                    <motion.div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative flex items-start gap-6">
                      <motion.div className="relative w-14 h-14 border border-[var(--color-brand-primary)]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-brand-primary)] group-hover:border-[var(--color-brand-primary)] transition-all duration-500" whileHover={{ rotate: 5, scale: 1.05 }}>
                        <service.icon size={24} strokeWidth={1.5} className="text-[var(--color-brand-primary)] group-hover:text-white transition-colors duration-500" />
                      </motion.div>
                      
                      <div>
                        <h3 className="text-2xl font-serif text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">{service.title}</h3>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 font-light text-sm">{service.description}</p>
                        
                        <motion.div 
                          className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--color-brand-primary)]"
                          whileHover={{ x: 5 }}
                        >
                          Discover More
                          <motion.div className="w-8 h-[1px] bg-[var(--color-brand-primary)]" whileHover={{ width: 48 }} transition={{ duration: 0.3 }} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
