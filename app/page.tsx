import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import FlashDeals from "@/components/home/FlashDeals";
import BestSellers from "@/components/home/BestSellers";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AIRecommendations from "@/components/home/AIRecommendations";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
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
