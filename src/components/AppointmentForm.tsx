import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { bookAppointment } from '../firebase';
import { fadeInUp, fadeInStagger, scaleIn, slideInRight } from '../lib/animations';

export default function AppointmentForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookAppointment({
        ...formData,
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error booking your appointment. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <section id="appointment" className="py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="bg-[var(--color-bg-primary)] p-16 border border-[var(--color-brand-primary)]/20 text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--color-brand-primary)]/20">
              <CheckCircle2 size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-4xl font-serif text-[var(--color-text-primary)] mb-6">Request Received</h3>
            <p className="text-lg text-[var(--color-text-secondary)] mb-10 font-light leading-relaxed">
              Thank you for choosing <span className="text-[var(--color-text-primary)] font-medium">De Dental Square</span>. Our concierge will contact you shortly to finalize your appointment.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="btn-primary px-10 py-4 text-xs"
            >
              Book Another Session
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-brand-primary)]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-[var(--color-brand-primary)] font-medium tracking-[0.3em] uppercase text-[10px] mb-6">
              Reservations
            </h2>
            <p className="text-5xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-8 leading-[1.1]">
              Begin Your <span className="italic text-[var(--color-brand-primary)]">Transformation</span>
            </p>
            <p className="text-lg text-[var(--color-text-secondary)] mb-12 leading-relaxed font-light max-w-xl mx-auto">
              Secure your private consultation today. Our elite team is ready to provide you with a bespoke dental experience.
            </p>
          </motion.div>

          <motion.div 
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[var(--color-bg-primary)] px-10 pb-10 pt-6 sm:px-16 sm:pb-16 sm:pt-8 border border-[var(--color-brand-primary)]/10 shadow-xl"
          >
            <h3 className="text-3xl font-serif text-[var(--color-text-primary)] mt-0 mb-32 text-center">Request Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-16">
              <div className="grid sm:grid-cols-2 gap-16">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] flex items-center gap-3">
                    <User size={16} className="text-[var(--color-brand-primary)]" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[var(--color-brand-primary)]/30 px-0 py-5 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--color-text-muted)] text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] flex items-center gap-3">
                    <Mail size={16} className="text-[var(--color-brand-primary)]" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[var(--color-brand-primary)]/30 px-0 py-5 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--color-text-muted)] text-lg"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-16">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] flex items-center gap-3">
                    <Phone size={16} className="text-[var(--color-brand-primary)]" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="w-full bg-transparent border-b border-[var(--color-brand-primary)]/30 px-0 py-5 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] outline-none transition-all placeholder:text-[var(--color-text-muted)] text-lg"
                    placeholder="0000000000"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] flex items-center gap-3">
                    <Send size={16} className="text-[var(--color-brand-primary)]" /> Service
                  </label>
                  <select
                    required
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[var(--color-brand-primary)]/30 px-0 py-5 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] outline-none transition-all appearance-none cursor-pointer text-lg bg-[var(--color-bg-primary)]"
                  >
                    <option value="" className="text-[var(--color-text-muted)]">Select a service</option>
                    <option value="general">General Dentistry</option>
                    <option value="cosmetic">Cosmetic Dentistry</option>
                    <option value="orthodontics">Orthodontics</option>
                    <option value="surgery">Oral Surgery</option>
                    <option value="pediatric">Pediatric Care</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-16">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] flex items-center gap-3">
                    <Calendar size={16} className="text-[var(--color-brand-primary)]" /> Preferred Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[var(--color-brand-primary)]/30 px-0 py-5 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] outline-none transition-all text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] flex items-center gap-3">
                    <Clock size={16} className="text-[var(--color-brand-primary)]" /> Preferred Time
                  </label>
                  <input
                    required
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[var(--color-brand-primary)]/30 px-0 py-5 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] outline-none transition-all text-lg"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-text-secondary)] flex items-center gap-3">
                  <MessageSquare size={16} className="text-[var(--color-brand-primary)]" /> Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-transparent border-b border-[var(--color-brand-primary)]/30 px-0 py-5 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] outline-none transition-all resize-none placeholder:text-[var(--color-text-muted)] text-lg"
                  placeholder="Tell us about your dental concerns..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full py-4 flex items-center justify-center gap-3 text-xs ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[var(--color-bg-primary)] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={14} />
                    Confirm Request
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-10">
            <motion.div variants={fadeInUp} className="flex items-center gap-6 justify-center bg-[var(--color-bg-primary)] p-8 border border-[var(--color-brand-primary)]/10">
              <div className="w-14 h-14 border border-[var(--color-brand-primary)]/20 rounded-full flex items-center justify-center text-[var(--color-brand-primary)]">
                <Phone size={20} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] font-medium mb-1">Direct Line</div>
                <div className="text-xl text-[var(--color-text-primary)] font-serif">+91 (555) 000-1234</div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-6 justify-center bg-[var(--color-bg-primary)] p-8 border border-[var(--color-brand-primary)]/10">
              <div className="w-14 h-14 border border-[var(--color-brand-primary)]/20 rounded-full flex items-center justify-center text-[var(--color-brand-primary)]">
                <Mail size={20} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] font-medium mb-1">Concierge</div>
                <div className="text-xl text-[var(--color-text-primary)] font-serif">hello@dedentalsquare.com</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
