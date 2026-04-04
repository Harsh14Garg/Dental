import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { services } from '../constants/services';
import { fadeInUp } from '../lib/animations';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-serif">Service not found</h2>
        <Link to="/services" className="text-[var(--color-brand-primary)] mt-4 inline-block">Back to Services</Link>
      </div>
    );
  }

  return (
    <section className="py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/services" className="inline-flex items-center gap-2 text-[var(--color-brand-primary)] mb-12 hover:underline">
          <ArrowLeft size={16} /> Back to Services
        </Link>
        
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" viewport={{ once: true }}>
          <img src={service.image} alt={service.title} className="w-full h-96 object-cover rounded-2xl mb-12" referrerPolicy="no-referrer" />
          
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-8">{service.title}</h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-12 font-light">{service.longDescription}</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-brand-primary)]/10">
              <h3 className="text-2xl font-serif text-[var(--color-text-primary)] mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--color-text-primary)]">
                    <CheckCircle2 className="text-[var(--color-brand-primary)]" size={20} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-brand-primary)]/10">
              <h3 className="text-2xl font-serif text-[var(--color-text-primary)] mb-6">Our Process</h3>
              <ol className="space-y-4 list-decimal list-inside text-[var(--color-text-primary)]">
                {service.process.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-brand-primary)]/10">
            <h3 className="text-2xl font-serif text-[var(--color-text-primary)] mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {service.faq.map((item, i) => (
                <div key={i}>
                  <h4 className="font-medium text-[var(--color-text-primary)] mb-1">{item.q}</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
