import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/services/api";
import ProductGallery from "@/components/shop/ProductGallery";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await fetchProductBySlug(resolvedParams.slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const startingPrice = product.variants?.[0]?.price || 0;
  
  // Basic extraction of variant options for UI (assume consistent options across variants for now)
  const availableLengths = Array.from(new Set(product.variants.map(v => v.length).filter(Boolean)));
  const availableTextures = Array.from(new Set(product.variants.map(v => v.texture).filter(Boolean)));
  const availableLaceTypes = Array.from(new Set(product.variants.map(v => v.laceType).filter(Boolean)));

  return (
    <div className="w-full min-h-screen bg-pure-white flex flex-col">
      {/* Breadcrumb / Top Bar */}
      <div className="w-full border-b border-[#a89d7e]/30 py-4 px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-mono font-medium text-iron-gray">
          <Link href="/" className="hover:text-obsidian-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-obsidian-black transition-colors">Shop</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-obsidian-black transition-colors">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-obsidian-black">{product.name}</span>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto">
        
        {/* Left Column: Image Gallery (Client Component) */}
        <ProductGallery 
          productName={product.name} 
          images={product.images} 
          thumbnail={product.thumbnail} 
        />

        {/* Right Column: Product Details */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[0.95] tracking-[-0.02em] text-obsidian-black uppercase font-sans font-bold mb-4">
            {product.name}
          </h1>
          
          <div className="text-[20px] font-mono font-semibold text-obsidian-black mb-8">
            ${startingPrice.toFixed(2)}
          </div>

          <div className="w-full h-px bg-[#a89d7e] mb-8" />

          {/* Dummy Selectors based on variants */}
          <div className="space-y-6 mb-10">
            {availableLengths.length > 0 && (
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
                  Length
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableLengths.map(len => (
                    <button key={len} className="px-4 py-2 border border-[#a89d7e]/30 text-[12px] font-medium text-iron-gray hover:border-obsidian-black hover:text-obsidian-black transition-colors">
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {availableTextures.length > 0 && (
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
                  Texture
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTextures.map(tex => (
                    <button key={tex} className="px-4 py-2 border border-[#a89d7e]/30 text-[12px] font-medium text-iron-gray hover:border-obsidian-black hover:text-obsidian-black transition-colors">
                      {tex}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {availableLaceTypes.length > 0 && (
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
                  Lace Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableLaceTypes.map(lace => (
                    <button key={lace} className="px-4 py-2 border border-[#a89d7e]/30 text-[12px] font-medium text-iron-gray hover:border-obsidian-black hover:text-obsidian-black transition-colors">
                      {lace}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart (UI Only) */}
          <button className="w-full bg-obsidian-black text-pure-white hover:bg-champagne-gold py-4 text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 mb-10 shadow-lg">
            Add To Cart
          </button>

          {/* Description */}
          {product.description && (
            <div className="prose prose-sm max-w-none text-iron-gray">
              <h3 className="text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-4">
                Description
              </h3>
              <p className="whitespace-pre-line text-[14px] leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
