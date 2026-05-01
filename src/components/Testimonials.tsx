import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MoreVertical, ThumbsUp, Share2 } from 'lucide-react';
import { fadeInUp, fadeInStagger } from '../lib/animations';
import { db, auth } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import TestimonialForm from './TestimonialForm';

function getRelativeTime(timestamp: any) {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'testimonials'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((t: any) => !t.hidden);
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(`Could not load testimonials: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="py-32 text-center text-[var(--color-latte)]/60 bg-[var(--color-espresso)]">Loading testimonials...</section>;
  if (error) return <section className="py-32 text-center text-[var(--color-bronze)] bg-[var(--color-espresso)]">{error}</section>;

  return (
    <section className="py-32 bg-[var(--color-espresso)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif text-[var(--color-cream)]">Patient Reviews</h2>
        </div>

        {user && (
          <div className="mb-20">
            <TestimonialForm />
          </div>
        )}

        <div className="space-y-8">
          {testimonials.map((testimonial: any) => (
            <motion.div 
              key={testimonial.id} 
              className="bg-[var(--color-warmgray)] p-6 rounded-sm border border-[var(--color-latte)]/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-[var(--color-bronze)]/30" referrerPolicy="no-referrer" />
                <div className="flex-grow">
                  <h4 className="font-medium text-[var(--color-cream)]">{testimonial.name}</h4>
                  <p className="text-sm text-[var(--color-latte)]/60">Verified Patient</p>
                </div>
                <MoreVertical className="text-[var(--color-latte)]/40 cursor-pointer hover:text-[var(--color-bronze)] transition-colors" />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[var(--color-bronze)]">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                </div>
                <span className="text-sm text-[var(--color-latte)]/60">{getRelativeTime(testimonial.createdAt)}</span>
              </div>
              
              <p className="text-[var(--color-latte)]/80 mb-6 font-light leading-relaxed">{testimonial.content}</p>
              
              {testimonial.reply && (
                <div className="bg-[var(--color-espresso)] p-4 rounded-sm border-l-4 border-[var(--color-bronze)] mt-4">
                  <h5 className="font-serif text-sm text-[var(--color-cream)] mb-1">Dr. Neeraj Agrawal Reply:</h5>
                  <p className="text-sm text-[var(--color-latte)]/80 font-light">{testimonial.reply}</p>
                </div>
              )}
              
              <div className="flex gap-6 pt-4 border-t border-[var(--color-latte)]/5">
                <button className="flex items-center gap-2 text-sm text-[var(--color-latte)]/60 hover:text-[var(--color-bronze)] transition-colors">
                  <ThumbsUp size={16} /> Helpful
                </button>
                <button className="flex items-center gap-2 text-sm text-[var(--color-latte)]/60 hover:text-[var(--color-bronze)] transition-colors">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
