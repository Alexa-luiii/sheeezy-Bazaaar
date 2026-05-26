'use client';

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-surface/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 md:p-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/10 text-brand-accent mb-8">
            <Mail className="w-8 h-8" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">Join the Inner Circle</h2>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
            Subscribe to receive exclusive offers, early access to new collections, and a 15% discount on your first order.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-colors"
            />
            <button className="h-14 bg-brand-accent text-brand-primary px-8 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors group">
              SUBSCRIBE
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="text-[10px] text-white/30 mt-8 uppercase tracking-widest">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
