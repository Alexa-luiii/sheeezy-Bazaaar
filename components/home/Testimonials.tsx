'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Eleanor Vance",
    role: "Fashion Stylist",
    content: "Sheeezy Bazaar has completely transformed my shopping experience. The curation is unparalleled, and the quality of every piece I've received is top-notch.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Art Director",
    content: "Finding a marketplace that understands true luxury and minimalist aesthetics is rare. Sheeezy is now my first stop for everything.",
    rating: 5
  },
  {
    name: "Sophia Chen",
    role: "Content Creator",
    content: "The delivery is incredibly fast, and the packaging makes you feel like you're opening a gift from a high-end boutique. Exceptional service.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-surface/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-text font-serif">What Our Clients Say</h2>
          <div className="w-12 h-1 bg-sageDark mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface/40 border border-border p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-text/5" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sageDark text-sageDark" />
                ))}
              </div>
              <p className="text-text/80 leading-relaxed italic mb-8">
                &ldquo;{t.content}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-text">{t.name}</h4>
                <p className="text-sageDark text-xs uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
