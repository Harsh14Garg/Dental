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

  if (loading) return <section className="py-32 text-center">Loading testimonials...</section>;
  if (error) return <section className="py-32 text-center text-red-500">{error}</section>;

  return (
    <section className="py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif text-[var(--color-text-primary)]">Patient Reviews</h2>
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
              className="bg-[var(--color-bg-secondary)] p-6 rounded-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div className="flex-grow">
                  <h4 className="font-medium text-[var(--color-text-primary)]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">5 reviews</p>
                </div>
                <MoreVertical className="text-gray-400 cursor-pointer" />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[var(--color-brand-primary)]">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                </div>
                <span className="text-sm text-gray-500">{getRelativeTime(testimonial.createdAt)}</span>
              </div>
              
              <p className="text-[var(--color-text-secondary)] mb-6">{testimonial.content}</p>
              
              {testimonial.reply && (
                <div className="bg-[var(--color-bg-primary)] p-4 rounded-md border-l-4 border-[var(--color-brand-primary)] mt-4">
                  <h5 className="font-semibold text-sm text-[var(--color-text-primary)] mb-1">Admin Reply:</h5>
                  <p className="text-sm text-[var(--color-text-secondary)]">{testimonial.reply}</p>
                </div>
              )}
              
              <div className="flex gap-6 pt-4">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--color-brand-primary)]">
                  <ThumbsUp size={18} /> Like
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--color-brand-primary)]">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
