import { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Star } from 'lucide-react';

export default function TestimonialForm() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('You must be logged in to add a testimonial.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'testimonials'), {
        name,
        service,
        content,
        rating: Number(rating),
        image: image || auth.currentUser?.photoURL || 'https://picsum.photos/seed/user/100/100',
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid
      });
      setName('');
      setService('');
      setContent('');
      setRating(0);
      setImage(null);
      alert('Testimonial added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add testimonial.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 mb-12">
      <h3 className="text-2xl font-serif mb-8 text-[var(--color-cream)]">Share Your Experience</h3>
      
      <div className="mb-8">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-latte)]/60 mb-2">Full Name</label>
        <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="input-luxury" required />
      </div>

      <div className="mb-8">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-latte)]/60 mb-2">Service Provided</label>
        <input type="text" placeholder="e.g. Teeth Whitening" value={service} onChange={e => setService(e.target.value)} className="input-luxury" required />
      </div>

      <div className="mb-8">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-latte)]/60 mb-2">Your Review</label>
        <textarea placeholder="Tell us about your experience..." value={content} onChange={e => setContent(e.target.value)} className="input-luxury min-h-[120px] resize-none" required />
      </div>

      <div className="mb-8">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-latte)]/60 mb-4">Rating</label>
        <div className="flex gap-2" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer transition-colors ${
                star <= (hoverRating || rating) ? 'fill-[var(--color-bronze)] text-[var(--color-bronze)] scale-110' : 'text-[var(--color-latte)]/20 hover:text-[var(--color-bronze)]/50'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
            />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-latte)]/60 mb-2">Upload Photo (Optional)</label>
        <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="w-full text-sm text-[var(--color-latte)]/80 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-[0.1em] file:bg-[var(--color-bronze)]/10 file:text-[var(--color-bronze)] hover:file:bg-[var(--color-bronze)]/20 transition-all cursor-pointer" />
        {image && <img src={image} alt="Preview" className="mt-4 w-20 h-20 object-cover rounded-full border border-[var(--color-bronze)]/30" />}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-5 text-xs">
        {loading ? 'Submitting...' : 'Submit Testimonial'}
      </button>
    </form>
  );
}
