import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import ProductRecommendations from '@/components/product/ProductRecommendations';
import FrequentlyBoughtTogether from '@/components/product/FrequentlyBoughtTogether';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const specifications = {
    Brand: product.brand,
    Category: product.category,
    Material: '100% Premium Quality',
    Origin: 'Crafted with care',
    Shipping: product.shipping.type,
    Weight: '0.5 kg',
  };

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <div className="py-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: product.category, href: `/category/${product.category.toLowerCase().replace(/ /g, '-')}` },
              { label: product.title, active: true },
            ]}
          />
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* Frequently Bought Together */}
        <div className="mb-24">
          <FrequentlyBoughtTogether currentProduct={product} />
        </div>

        {/* Detailed Info Tabs */}
        <div className="mb-24">
          <ProductTabs
            productId={product.id}
            description={product.description}
            specifications={specifications}
          />
        </div>

        {/* Recommendations */}
        <div className="border-t border-border pt-20">
          <ProductRecommendations currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
}
