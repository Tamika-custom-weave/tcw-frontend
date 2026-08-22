import React from "react";
import { fetchProducts, Product } from "@/services/api";
import ProductCard from "@/components/shop/ProductCard";

export default async function FeaturedProducts() {
  let products: Product[] = [];
  try {
    const data = await fetchProducts();
    // Filter active products
    const activeProducts = data.filter(p => p.isActive);
    
    // Shuffle algorithm (Fisher-Yates)
    const shuffled = [...activeProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      // eslint-disable-next-line react-hooks/purity
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Pick top 15 for the featured section
    products = shuffled.slice(0, 16);
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'digest' in error && (error as { digest?: string }).digest === 'DYNAMIC_SERVER_USAGE') {
      throw error;
    }
    console.error("Failed to load featured products:", error);
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-pure-white border-b border-[#a89d7e]/30">
      <div className="w-full flex min-h-full">
        {/* Left Vertical Line Demarcation */}
        <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0" />

        {/* Main Content */}
        <div className="flex-grow min-w-0">
          <div className="px-8 sm:px-12 md:px-16 lg:px-24 py-8 border-b border-[#a89d7e]/30 flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-obsidian-black"></span>
            <h2 className="text-obsidian-black font-mono font-bold text-[11px] md:text-[13px] uppercase tracking-[0.15em] leading-none mt-0.5">
              FEATURED PRODUCTS
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 w-full">
            {products.map((product, idx) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                quickViewType="drawer" 
                priority={idx < 4}
              />
            ))}
          </div>
        </div>

        {/* Right Vertical Line Demarcation */}
        <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0" />
      </div>
    </section>
  );
}
