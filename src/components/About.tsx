import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Users, Heart } from 'lucide-react';
import { slideInLeft, fadeInUp, fadeInStagger } from '../lib/animations';

const stats = [
  { label: 'Years of Experience', value: '12+', icon: Award },
  { label: 'Happy Patients', value: '15k+', icon: Users },
  { label: 'Expert Doctors', value: '20+', icon: Heart },
  { label: 'Success Rate', value: '99%', icon: CheckCircle2 },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-[var(--color-bg-primary)] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden border border-[var(--color-brand-primary)]/20 aspect-[4/5] oval-mask">
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-[var(--color-brand-primary)]/5 rounded-full -z-10 blur-3xl"></div>
            
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 hidden xl:block">
              <div className="vertical-text text-[10px] uppercase tracking-[0.5em] text-[var(--color-brand-primary)] font-medium opacity-70 rotate-180">
                Established • 2014 • Varanasi
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-[var(--color-brand-primary)] font-medium tracking-[0.3em] uppercase text-[10px] mb-6">The Legacy</h2>
              <p className="text-5xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-8 leading-[1.1]">
                Crafting Smiles with <span className="italic text-[var(--color-brand-primary)]">Passion</span>
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed font-light">
                De Dental Square, led by <span className="text-[var(--color-text-primary)] font-medium">Dr. Neeraj Agrawal</span>, was founded on the principle of providing high-quality, compassionate dental care to the Varanasi community. 
              </p>
              
              <div className="mb-10 p-6 border-l-2 border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/5">
                <h3 className="text-xl font-serif text-[var(--color-text-primary)] mb-2">Credentials & Expertise</h3>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• BDS, MDS (Prosthodontics & Implantology)</li>
                  <li>• Fellow of International Congress of Oral Implantologists (FICOI)</li>
                  <li>• 12+ Years of Clinical Excellence</li>
                  <li>• Specialized in Full-Mouth Rehabilitation</li>
                </ul>
              </div>

              <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed font-light">
                Our state-of-the-art facility in Ravindrapuri is equipped with the latest technology to ensure your comfort and safety.
              </p>

              <motion.div 
                className="grid gap-6 mb-12"
                variants={fadeInStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  'Elite team of specialized surgeons',
                  'Next-gen diagnostic technology',
                  'Bespoke aesthetic treatment plans',
                  'Premium patient experience'
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full border border-[var(--color-brand-primary)]/30 flex items-center justify-center transition-all">
                      <CheckCircle2 className="text-[var(--color-brand-primary)]" size={12} strokeWidth={1.5} />
                    </div>
                    <span className="text-[var(--color-text-primary)] font-light tracking-wide text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-12 pt-12 border-t border-[var(--color-brand-primary)]/10"
                variants={fadeInStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <div className="text-3xl font-serif text-[var(--color-text-primary)] mb-2">{stat.value}</div>
                    <div className="text-[9px] text-[var(--color-brand-primary)] uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
