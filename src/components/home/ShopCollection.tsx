import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCategories } from "@/services/api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  bundles: "/products.jpg",
  bundle: "/products.jpg",
  customization: "/customization.jpg",
  wigs: "/customization.jpg",
  closures: "/hero.jpg",
  closure: "/hero.jpg",
  frontals: "/products.jpg",
  frontal: "/products.jpg",
};

const getCategoryFallbackImage = (slug: string, index: number): string => {
  if (DEFAULT_CATEGORY_IMAGES[slug.toLowerCase()]) {
    return DEFAULT_CATEGORY_IMAGES[slug.toLowerCase()];
  }
  const fallbackList = ["/products.jpg", "/customization.jpg", "/hero.jpg"];
  return fallbackList[index % fallbackList.length];
};

const formatCategoryName = (name: string): string => {
  return name.trim().toUpperCase();
};

export default async function ShopCollection() {
  let categories: Category[] = [];
  let error: string | null = null;

  try {
    const data = await fetchCategories();
    // fetchCategories from api.ts already handles the JSON unpacking, but we must ensure we only show active ones
    categories = data.filter((cat) => cat.isActive === true);
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'digest' in err && (err as { digest?: string }).digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    if (process.env.NODE_ENV === 'development') {
      console.error("Categories fetch error:", err);
    }
    error = "Unable to load categories. Please try again later.";
  }

  return (
    <section className="w-full bg-pure-white text-obsidian-black tracking-wider">
      <div className="w-full flex min-h-full">
        {/* Left Vertical Line Demarcation (matching Navbar) */}
        <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0" />

        {/* Main Content Container */}
        <div className="flex-grow min-w-0 border-b border-[#a89d7e]/30">
          
          {/* Header Grid Section */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 border-b border-[#a89d7e]/30">
            {/* Title Column */}
            <div className="p-8 sm:p-12 md:p-16 border-r-0 md:border-r border-[#a89d7e]/30 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-block w-1.5 h-1.5 bg-obsidian-black"></span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-mono text-neutral-500">
                  SHOP OUR COLLECTION
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.1] font-mono mb-4">
                LUXURY HAIR <br/>
                EXTENSIONS
              </h2>
              <p className="font-mono text-neutral-500 text-xs sm:text-[13px] max-w-md leading-relaxed uppercase mt-4">
                CUSTOM WIGS AND PRECISION LACE ATTACHMENTS TAILORED FOR THE PERFECT FIT.
              </p>
            </div>
            
            {/* Action Area */}
            <div className="p-8 sm:p-12 md:p-16 flex items-center border-t md:border-t-0 border-[#a89d7e]/30 bg-[#F9F7F4]/30">
              <Link
                href="/shop"
                className="group px-8 py-5 bg-transparent border border-obsidian-black text-obsidian-black font-mono text-[11px] uppercase tracking-widest hover:bg-obsidian-black hover:text-pure-white transition-all flex items-center w-fit"
              >
                <span className="inline-block w-1.5 h-1.5 bg-obsidian-black group-hover:bg-pure-white mr-4 transition-colors"></span>
                TO THE PRODUCTS
              </Link>
            </div>
          </div>

          {error && (
            <div className="p-16 text-center border-b border-[#a89d7e]/30 bg-red-50/20">
              <p className="font-mono text-obsidian-black uppercase text-[13px] mb-6">{error}</p>
            </div>
          )}

          {!error && categories.length === 0 && (
            <div className="p-16 text-center border-b border-[#a89d7e]/30">
              <p className="font-mono text-neutral-500 uppercase text-[13px]">
                NO ACTIVE COLLECTIONS AVAILABLE AT THE MOMENT.
              </p>
            </div>
          )}

          {/* Categories Grid - Brutalist layout */}
          {!error && categories.length > 0 && (
            <div className="flex md:grid overflow-x-auto md:overflow-visible md:grid-cols-3 md:divide-x divide-[#a89d7e]/30 border-b border-[#a89d7e]/30 snap-x snap-mandatory scrollbar-hide gap-4 md:gap-0 p-6 md:p-0 bg-neutral-50/30 md:bg-transparent">
              {categories.map((category, idx) => {
                const imageSrc =
                  category.image && category.image.trim() !== ""
                    ? category.image
                    : getCategoryFallbackImage(category.slug, idx);

                const formattedTitle = formatCategoryName(category.name);

                return (
                  <div key={category._id} className="w-[75vw] sm:w-[50vw] md:w-full flex-shrink-0 snap-center group">
                    <Link
                      href={`/shop?category=${category.slug}`}
                      className="relative w-full aspect-[4/5] flex flex-col justify-between p-6 md:p-8 bg-obsidian-black overflow-hidden transition-all duration-300 block border border-[#a89d7e]/30 md:border-none"
                    >
                      {/* Background Category Image */}
                      <Image
                        src={imageSrc}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {/* Gradient Overlay for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 opacity-70 transition-opacity duration-300" />

                      {/* Top Content */}
                      <div className="relative z-10 flex items-center gap-2 md:gap-3 text-pure-white text-[9px] md:text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-mono">
                        <span className="w-1.5 h-1.5 bg-pure-white inline-block" />
                        <span>TCW COLLECTION</span>
                      </div>

                      {/* Bottom Content */}
                      <div className="relative z-10 flex flex-col items-start w-full">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-mono text-pure-white uppercase leading-[1.1] mb-4 md:mb-6 group-hover:text-champagne-gold transition-colors duration-300">
                          {formattedTitle}
                        </h3>

                        {/* Square Brutalist Button */}
                        <div className="w-full border border-white/50 text-white group-hover:bg-white group-hover:text-obsidian-black group-hover:border-white px-4 md:px-5 py-3 md:py-4 text-[9px] md:text-[10px] sm:text-[11px] uppercase tracking-wider font-mono transition-all duration-300 flex items-center justify-between">
                          <span>DISCOVER</span>
                          <span>→</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Vertical Line Demarcation (matching Navbar) */}
        <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0" />
      </div>
    </section>
  );
}
