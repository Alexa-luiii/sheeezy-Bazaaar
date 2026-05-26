'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-brand">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(201,168,76,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(201,168,76,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(201,168,76,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(201,168,76,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(201,168,76,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight">
              Join the Elite <br /> Inner Circle
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Subscribe to receive early access to new collections, exclusive event invitations, and curated style insights.
            </p>

            <div className="pt-8">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent/10 border border-accent/20 rounded-2xl p-8 max-w-md mx-auto flex flex-col items-center gap-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-accent" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">Welcome to the Club</h3>
                    <p className="text-white/60 text-sm">You&apos;ve successfully subscribed to our newsletter.</p>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-accent text-brand font-bold uppercase tracking-widest px-10 py-5 rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 group"
                  >
                    Subscribe
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>

            <p className="text-white/30 text-[10px] uppercase tracking-widest pt-8">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
