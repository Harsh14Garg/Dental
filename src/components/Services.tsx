import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { fadeInUp } from '../lib/animations';
import { services } from '../constants/services';
import Estimator from './Estimator';

export default function Services() {
  return (
    <>
      <section id="services" className="py-32 bg-[var(--color-warmgray)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <motion.div className="w-8 h-[1px] bg-[var(--color-bronze)]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 1 }} />
              <h2 className="text-[var(--color-bronze)] font-medium tracking-[0.3em] uppercase text-[10px]">Our Expertise</h2>
              <motion.div className="w-8 h-[1px] bg-[var(--color-bronze)]" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 0 }} />
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-serif text-[var(--color-cream)] mb-8"
            >
              Premium Dental <span className="italic text-[var(--color-bronze)]">Solutions</span>
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div key={service.title} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.1 }}>
                <Link to={`/services/${service.id}`} className="block h-full outline-none">
                  <TiltCard tiltAmount={8} glowColor="color-mix(in srgb, var(--color-caramel) 25%, transparent)">
                    <motion.div 
                      className="glass-card p-10 lg:p-12 border border-[var(--color-latte)]/10 group relative overflow-hidden transition-all duration-700 ease-out h-full rounded-xl hover:-translate-y-2 hover:shadow-2xl" 
                      whileHover={{ borderColor: 'var(--color-bronze)' }}
                    >
                      <motion.div className={`absolute inset-0 bg-gradient-to-br from-[var(--color-espresso)] via-[var(--color-espresso)]/80 to-[var(--color-bronze)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`} />
                      
                      {/* Background oversized icon on hover */}
                      <motion.div 
                        className="absolute -bottom-6 -right-6 opacity-0 group-hover:opacity-[0.03] text-[var(--color-cream)] transition-all duration-700 ease-out z-0 pointer-events-none transform group-hover:scale-150 group-hover:-rotate-12"
                      >
                        <service.icon size={250} strokeWidth={1} />
                      </motion.div>
                      
                      <div className="relative flex flex-col md:flex-row items-start gap-8 z-10">
                        <motion.div 
                          className="relative w-16 h-16 border border-[var(--color-bronze)]/50 flex items-center justify-center flex-shrink-0 bg-[var(--color-warmgray)] group-hover:bg-[var(--color-bronze)] transition-all duration-500 rounded-xl shadow-lg" 
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <service.icon size={28} strokeWidth={1.5} className="text-[var(--color-bronze)] group-hover:text-white transition-colors duration-500 group-hover:scale-110" />
                        </motion.div>
                        
                        <div className="flex-1 transform transition-all duration-500 group-hover:translate-x-2">
                          <h3 className="text-2xl md:text-[28px] font-serif text-[var(--color-cream)] mb-4 group-hover:text-[var(--color-bronze)] transition-colors duration-500">{service.title}</h3>
                          <p className="text-[var(--color-latte)]/80 leading-relaxed mb-8 font-light text-[15px] group-hover:text-[var(--color-cream)]/90 transition-colors duration-500 opacity-80 group-hover:opacity-100">{service.description}</p>
                          
                          <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-bronze)] group-hover:text-[var(--color-caramel)] transition-colors duration-300">
                            <span className="transform transition-transform duration-500 group-hover:translate-x-1">Discover More</span>
                            <div className="flex items-center overflow-hidden">
                              <div className="w-8 h-[1px] bg-[var(--color-bronze)] transition-all duration-500 group-hover:w-4 group-hover:bg-[var(--color-caramel)]" />
                              <ArrowRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out text-[var(--color-caramel)] ml-2" />
                            </div>
                          </div>
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

      {/* Estimator Section added here */}
      <Estimator />
    </>
  );
}
