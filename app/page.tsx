import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import FlashDeals from "@/components/home/FlashDeals";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BestSellers from "@/components/home/BestSellers";
import AIRecommendations from "@/components/home/AIRecommendations";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Brand Value Props */}
      <section className="py-24 bg-surface/50 border-y border-foreground/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold">Free Shipping</h3>
              <p className="text-sm text-foreground/60">Complimentary delivery on all orders over $200</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold">Premium Quality</h3>
              <p className="text-sm text-foreground/60">Hand-picked curation of world-class luxury goods</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold">Secure Payment</h3>
              <p className="text-sm text-foreground/60">Encryption-protected checkout with global standards</p>
            </div>
          </div>
        </div>
      </section>

      <TrendingSection />
      <FlashDeals />
      <FeaturedCollections />
      <BestSellers />
      <AIRecommendations />
      <Testimonials />
      <NewsletterSection />
    </main>
  );
}
