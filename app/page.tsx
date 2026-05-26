import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Other sections will be added here */}
      <section className="py-24 bg-surface/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold">Free Shipping</h3>
              <p className="text-sm text-foreground/60">On all orders over $200</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold">Premium Quality</h3>
              <p className="text-sm text-foreground/60">Hand-picked curation of luxury goods</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-playfair font-bold">Secure Payment</h3>
              <p className="text-sm text-foreground/60">100% secure checkout process</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
