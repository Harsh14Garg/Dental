import { motion } from 'motion/react';
import { fadeInUp, fadeInStagger } from '../lib/animations';
import { Link } from 'react-router-dom';

const gallerySections = [
  {
    title: "Clinic Tour",
    description: "Experience our state-of-the-art facility designed for your comfort and expert care.",
    images: [
      { url: "/clinic-photo-outside-1.webp", alt: "Clinic Exterior" },
      { url: "/clinic-photo-outside-4.webp", alt: "Clinic Entrance" },
      { url: "/clinic-inside-photo-waiting-room.webp", alt: "Waiting Area" },
      { url: "/clinic-inside-photo-working-area.webp", alt: "Consultation Room" }
    ]
  },
  {
    title: "Before & After",
    description: "Witness the transformative power of our advanced aesthetic procedures.",
    images: [
      { url: "/orthodontics.webp", alt: "Smile Transformation 1" },
      { url: "/pediatric-care.webp", alt: "Smile Transformation 2" },
      { url: "/oral-surgery.webp", alt: "Smile Transformation 3" },
      { url: "/emergency-care.webp", alt: "Smile Transformation 4" }
    ]
  },
  {
    title: "Our Technology",
    description: "Equipped with the latest advancements in dental technology for precision and safety.",
    images: [
      { url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800", alt: "Dental Technology 1" },
      { url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800", alt: "Dental Technology 2" },
      { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", alt: "Dental Technology 3" },
      { url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800", alt: "Dental Technology 4" }
    ]
  },
  {
    title: "Our Team & Achievements",
    description: "Meet the dedicated professionals committed to your oral health and well-being.",
    images: [
      { url: "/doctor-with-staff.webp", alt: "Team" },
      { url: "/doctor-recieving-degree.webp", alt: "Receiving Degree" },
      { url: "/doctor-getting-felicitated-1.webp", alt: "Felicitated" },
      { url: "/doctor-getting-felicitated-2.webp", alt: "Achievement" }
    ]
  }
];

export default function Gallery() {
  return (
    <div className="bg-[var(--color-bg-primary)] min-h-screen pt-[72px] pb-24">
      {/* HEADER SECTION */}
      <section className="bg-[var(--color-bg-secondary)] py-20 px-6 border-b border-[var(--color-latte)]/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.03]"></div>
        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[var(--color-brand-accent)] font-medium tracking-[0.15em] uppercase text-xs mb-4">
              VISUAL JOURNEY
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-6">
              Our <span className="italic text-[var(--color-brand-accent)]">Gallery</span>
            </h1>
            <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed">
              Explore the elegance, technology, and transformations that define De Dental Square.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTIONS */}
      <div className="max-w-[1280px] mx-auto px-6 mt-16 space-y-24 md:space-y-32">
        {gallerySections.map((section, idx) => (
          <section key={idx}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center md:text-left mb-10 md:flex md:justify-between md:items-end border-b border-[var(--color-latte)]/10 pb-6"
            >
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-text-primary)] mb-4">
                  {section.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">
                  {section.description}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {section.images.map((img, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative overflow-hidden aspect-square group rounded-[16px] bg-[var(--color-bg-secondary)]"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-[var(--color-text-primary)] text-sm font-medium drop-shadow-md">
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>

      {/* CTA SECTION */}
      <section className="max-w-[1280px] mx-auto px-6 mt-32">
        <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-10 md:p-16 text-center border border-[var(--color-latte)]/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-brand-accent)]/50 to-transparent"></div>
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-text-primary)] mb-6">
            Make Your Smile Part of Our Gallery
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10 font-light">
            Book an appointment today and experience the premium care at De Dental Square.
          </p>
          <Link 
            to="/appointment"
            className="inline-flex items-center gap-2 bg-[var(--color-brand-accent)] text-[var(--color-brand-light)] font-medium text-[13px] uppercase tracking-[0.08em] px-8 py-4 rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-glow shadow-md group"
          >
            Book Appointment 
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
