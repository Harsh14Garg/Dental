import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { fadeInUp, fadeInStagger, revealOnScroll } from '../lib/animations';
import { useRef } from 'react';
import { services } from '../constants/services';

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
