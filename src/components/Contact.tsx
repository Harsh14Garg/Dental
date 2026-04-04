import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { fadeInUp, fadeInStagger, scaleIn } from '../lib/animations';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-[var(--color-bg-primary)] relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeInStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-[var(--color-brand-primary)] font-medium tracking-[0.3em] uppercase text-[10px] mb-6 text-center"
            >
              Contact
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-8 text-center"
            >
              Get in <span className="italic text-[var(--color-brand-primary)]">Touch</span>
            </motion.p>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-[var(--color-text-secondary)] mb-12 leading-relaxed font-light text-center max-w-xl mx-auto"
            >
              Have questions about our elite services or want to schedule a private consultation? Our dedicated team is here to assist you.
            </motion.p>

            <div className="space-y-12">
              <motion.div variants={fadeInUp} className="flex items-start gap-6 group p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-brand-primary)]/10 hover:border-[var(--color-brand-primary)]/30 transition-all">
                <div className="w-16 h-16 border border-[var(--color-brand-primary)]/20 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all duration-500">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-2">Our Location</h4>
                  <p className="text-base text-[var(--color-text-secondary)] font-light leading-relaxed">Lane No 14 (Main Road, Ravindrapuri Rd,<br />opposite to Bank Of India ATM, Colony,<br />Varanasi, Uttar Pradesh 221001</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=DE+Dental+Square+Lane+No+14+Ravindrapuri+Varanasi+221001" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand-primary)] text-xs font-medium uppercase tracking-[0.2em] mt-4 inline-flex items-center gap-2 hover:text-[var(--color-text-primary)] transition-colors">
                    View on Map <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-6 group p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-brand-primary)]/10 hover:border-[var(--color-brand-primary)]/30 transition-all">
                <div className="w-16 h-16 border border-[var(--color-brand-primary)]/20 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all duration-500">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-2">Direct Line</h4>
                  <p className="text-lg text-[var(--color-text-secondary)] font-light">+91 (555) 000-1234</p>
                  <p className="text-xs text-[var(--color-brand-primary)]/60 uppercase tracking-[0.2em] mt-1 font-medium">10 AM - 8 PM (Sunday Closed)</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-6 group p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-brand-primary)]/10 hover:border-[var(--color-brand-primary)]/30 transition-all">
                <div className="w-16 h-16 border border-[var(--color-brand-primary)]/20 rounded-full flex items-center justify-center text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all duration-500">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-text-primary)] mb-2">Email Concierge</h4>
                  <p className="text-lg text-[var(--color-text-secondary)] font-light">hello@dedentalsquare.com</p>
                  <p className="text-xs text-[var(--color-brand-primary)]/60 uppercase tracking-[0.2em] mt-1 font-medium">Response within 12 hours</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
      </div>
    </section>
  );
}
