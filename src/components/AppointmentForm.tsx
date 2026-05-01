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
      <section id="appointment" className="py-32 bg-[var(--color-warmgray)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="glass-card p-16 text-center max-w-2xl mx-auto border border-[var(--color-bronze)]/20"
          >
            <div className="w-24 h-24 bg-[var(--color-bronze)]/5 text-[var(--color-bronze)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--color-bronze)]/20">
              <CheckCircle2 size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-4xl font-serif text-[var(--color-cream)] mb-6">Request Received</h3>
            <p className="text-lg text-[var(--color-latte)]/80 mb-10 font-light leading-relaxed">
              Thank you for choosing <span className="text-[var(--color-cream)] font-medium">De Dental Square</span>. Our concierge will contact you shortly to finalize your appointment.
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
    <section id="appointment" className="py-32 bg-[var(--color-warmgray)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-caramel) 5%, transparent) 0%, transparent 70%)' }}></div>
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
            <h2 className="text-[var(--color-bronze)] font-medium tracking-[0.3em] uppercase text-[10px] mb-6">
              Reservations
            </h2>
            <p className="text-5xl md:text-6xl font-serif text-[var(--color-cream)] mb-8 leading-[1.1]">
              Begin Your <span className="italic text-[var(--color-bronze)]">Transformation</span>
            </p>
            <p className="text-lg text-[var(--color-latte)]/80 mb-12 leading-relaxed font-light max-w-xl mx-auto">
              Secure your private consultation today. Our elite team is ready to provide you with a bespoke dental experience.
            </p>
          </motion.div>

          <motion.div 
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card px-10 pb-10 pt-6 sm:px-16 sm:pb-16 sm:pt-8 border border-[var(--color-bronze)]/10 shadow-warm"
          >
            <h3 className="text-3xl font-serif text-[var(--color-cream)] mt-0 mb-12 sm:mb-20 text-center">Request Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-12 sm:space-y-16">
              <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-latte)]/80 flex items-center gap-3">
                    <User size={16} className="text-[var(--color-bronze)]" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-luxury text-lg py-5"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-latte)]/80 flex items-center gap-3">
                    <Mail size={16} className="text-[var(--color-bronze)]" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-luxury text-lg py-5"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-latte)]/80 flex items-center gap-3">
                    <Phone size={16} className="text-[var(--color-bronze)]" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="input-luxury text-lg py-5"
                    placeholder="0000000000"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-latte)]/80 flex items-center gap-3">
                    <Send size={16} className="text-[var(--color-bronze)]" /> Service
                  </label>
                  <select
                    required
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="input-luxury text-lg py-5 appearance-none cursor-pointer"
                  >
                    <option value="" className="text-[var(--color-latte)]/40 bg-[var(--color-espresso)]">Select a service</option>
                    <option value="general" className="bg-[var(--color-espresso)]">General Dentistry</option>
                    <option value="cosmetic" className="bg-[var(--color-espresso)]">Cosmetic Dentistry</option>
                    <option value="orthodontics" className="bg-[var(--color-espresso)]">Orthodontics</option>
                    <option value="surgery" className="bg-[var(--color-espresso)]">Oral Surgery</option>
                    <option value="pediatric" className="bg-[var(--color-espresso)]">Pediatric Care</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-latte)]/80 flex items-center gap-3">
                    <Calendar size={16} className="text-[var(--color-bronze)]" /> Preferred Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input-luxury text-lg py-5"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-latte)]/80 flex items-center gap-3">
                    <Clock size={16} className="text-[var(--color-bronze)]" /> Preferred Time
                  </label>
                  <input
                    required
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="input-luxury text-lg py-5"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-latte)]/80 flex items-center gap-3">
                  <MessageSquare size={16} className="text-[var(--color-bronze)]" /> Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="input-luxury text-lg py-5 resize-none min-h-[120px]"
                  placeholder="Tell us about your dental concerns..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full py-5 flex items-center justify-center gap-3 text-xs ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[var(--color-espresso)] border-t-transparent rounded-full animate-spin"></div>
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
            <motion.div variants={fadeInUp} className="flex items-center gap-6 justify-center bg-[var(--color-espresso)] p-8 border border-[var(--color-bronze)]/10 rounded-sm">
              <div className="w-14 h-14 border border-[var(--color-bronze)]/20 rounded-full flex items-center justify-center text-[var(--color-bronze)]">
                <Phone size={20} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-latte)]/60 font-medium mb-1">Direct Line</div>
                <div className="text-xl text-[var(--color-cream)] font-serif">+91 (555) 000-1234</div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-6 justify-center bg-[var(--color-espresso)] p-8 border border-[var(--color-bronze)]/10 rounded-sm">
              <div className="w-14 h-14 border border-[var(--color-bronze)]/20 rounded-full flex items-center justify-center text-[var(--color-bronze)]">
                <Mail size={20} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-latte)]/60 font-medium mb-1">Concierge</div>
                <div className="text-xl text-[var(--color-cream)] font-serif">hello@dedentalsquare.com</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
