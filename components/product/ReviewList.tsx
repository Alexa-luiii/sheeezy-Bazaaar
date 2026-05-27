'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    user: 'Alexandra R.',
    rating: 5,
    date: '2 months ago',
    comment: 'Absolutely stunning! The quality is even better than I expected. The fit is perfect and the material feels incredibly luxurious.',
    verified: true,
  },
  {
    id: '2',
    user: 'Michael B.',
    rating: 4,
    date: '1 month ago',
    comment: 'Great purchase. Shipping was fast and the packaging was beautiful. My only small issue is that the color is slightly darker in person than in the photos.',
    verified: true,
  },
  {
    id: '3',
    user: 'Elena S.',
    rating: 5,
    date: '3 weeks ago',
    comment: 'I am in love with this piece. It has become a staple in my wardrobe. I get compliments every time I wear it!',
    verified: true,
  },
];

export default function ReviewList({ productId }: { productId: string }) {
  return (
    <div className="space-y-12">
      {/* Review Summary */}
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        <div className="text-center">
          <div className="text-6xl font-serif text-white mb-2">4.8</div>
          <div className="flex items-center gap-1 text-accent mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
            ))}
          </div>
          <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Based on 124 reviews</p>
        </div>

        <div className="flex-1 w-full max-w-md space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = rating === 5 ? 85 : rating === 4 ? 20 : 5;
            const percentage = (count / 110) * 100;
            return (
              <div key={rating} className="flex items-center gap-4">
                <span className="text-white/40 text-xs font-bold w-3">{rating}</span>
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className="h-full bg-accent"
                  />
                </div>
                <span className="text-white/40 text-xs font-bold w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-white/5 w-full" />

      {/* Individual Reviews */}
      <div className="space-y-10">
        {mockReviews.map((review) => (
          <div key={review.id} className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold">{review.user}</span>
                  {review.verified && (
                    <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <span className="text-white/40 text-xs">{review.date}</span>
            </div>
            <p className="text-white/70 leading-relaxed italic">"{review.comment}"</p>
          </div>
        ))}
      </div>

      <button className="w-full py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-colors">
        Read All Reviews
      </button>
    </div>
  );
}
