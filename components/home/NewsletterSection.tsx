'use client';

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NewsletterSection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sage to-sageDark opacity-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-surface border border-border rounded-sm p-12 md:p-24 text-center shadow-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-sageDark mb-8">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-text font-serif mb-6 italic">The Inner Circle</h2>
          <p className="text-muted text-lg mb-12 max-w-xl mx-auto font-medium">
            Join our curated list for exclusive previews, early access to new collections, and a bespoke welcome gift.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-grow h-12 bg-primary border border-border rounded-sm px-6 text-[10px] font-bold uppercase tracking-widest text-text placeholder:text-muted focus:outline-none focus:border-sageDark transition-colors"
            />
            <Button className="h-12 px-10 group shrink-0">
              JOIN
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="text-[10px] text-muted mt-10 uppercase tracking-[0.2em] font-bold">
            By joining, you agree to our <span className="underline cursor-pointer">Privacy Ethos</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
