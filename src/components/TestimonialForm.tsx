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
        image: image || 'https://picsum.photos/seed/user/100/100',
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
    <form onSubmit={handleSubmit} className="bg-[var(--color-bg-secondary)] p-8 rounded-xl border border-[var(--color-brand-primary)]/10 shadow-lg">
      <h3 className="text-2xl font-serif mb-6 text-[var(--color-text-primary)]">Share Your Experience</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Full Name</label>
        <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-[var(--color-bg-primary)] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none" required />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Service Provided</label>
        <input type="text" placeholder="e.g. Teeth Whitening" value={service} onChange={e => setService(e.target.value)} className="w-full p-3 bg-[var(--color-bg-primary)] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none" required />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Your Review</label>
        <textarea placeholder="Tell us about your experience..." value={content} onChange={e => setContent(e.target.value)} className="w-full p-3 bg-[var(--color-bg-primary)] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] outline-none h-32" required />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Rating</label>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`cursor-pointer transition-colors ${
                star <= (hoverRating || rating) ? 'fill-[var(--color-brand-primary)] text-[var(--color-brand-primary)]' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Upload Photo</label>
        <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="w-full p-3 bg-[var(--color-bg-primary)] border border-gray-300 rounded-lg" />
        {image && <img src={image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-full" />}
      </div>

      <button type="submit" disabled={loading} className="w-full p-4 bg-[var(--color-brand-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-brand-primary)]/90 transition-colors">
        {loading ? 'Submitting...' : 'Submit Testimonial'}
      </button>
    </form>
  );
}
