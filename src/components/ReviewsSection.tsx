import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { createReview, getReviews, type Review } from '../lib/firebase';

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const newReview = await createReview({
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        message: formData.message,
      });
      
      setReviews(prev => [newReview, ...prev]);
      setFormData({ name: '', email: '', rating: 5, message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            className={`w-4 h-4 ${i <= rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Customer Reviews</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Share Your Experience</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Have you used our products or services? We'd love to hear your feedback!</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Review Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6">Leave a Review</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-200 focus:border-brand-gold focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-200 focus:border-brand-gold focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-200 focus:border-brand-gold focus:outline-none transition"
                  >
                    <option value="5">★★★★★ Excellent</option>
                    <option value="4">★★★★☆ Very Good</option>
                    <option value="3">★★★☆☆ Good</option>
                    <option value="2">★★☆☆☆ Fair</option>
                    <option value="1">★☆☆☆☆ Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Review</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your experience with us..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-gray-200 focus:border-brand-gold focus:outline-none transition resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {submitted && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
                    Thank you! Your review has been submitted.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-gold text-black font-bold py-3 rounded-lg hover:bg-brand-gold/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Reviews Display */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {reviews.length === 0 ? (
              <div className="text-center py-12 glass rounded-3xl p-8">
                <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="glass rounded-3xl p-6 sm:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-sm">{review.name}</h4>
                      
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.message}</p>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
