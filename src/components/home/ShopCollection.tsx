"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function ShopCollection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    // Note: To avoid the setState in effect warning, we only set state if mounted 
    // or if the component is explicitly trying to refetch via the button.
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${baseUrl}/categories`);

      if (!res.ok) {
        throw new Error(`Failed to fetch categories (${res.status})`);
      }

      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        const activeCategories = json.data.filter(
          (cat: Category) => cat.isActive === true
        );
        setCategories(activeCategories);
      } else {
        throw new Error(json.message || "Invalid categories data format");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unable to load categories";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const initialFetch = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseUrl}/categories`);

        if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);

        const json = await res.json();

        if (isMounted) {
          if (json.success && Array.isArray(json.data)) {
            const activeCategories = json.data.filter(
              (cat: Category) => cat.isActive === true
            );
            setCategories(activeCategories);
          } else {
            throw new Error(json.message || "Invalid categories data format");
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMsg = err instanceof Error ? err.message : "Unable to load categories";
          setError(errorMsg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initialFetch();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-pure-white border-b border-[#a89d7e]">
      <div className="w-full flex min-h-full">
        {/* Left Vertical Line Demarcation (matching Navbar) */}
        <div className="w-[16px] md:w-[24px] lg:w-[32px] border-r border-[#a89d7e] flex-shrink-0" />

        {/* Main Content Container with extra side spacing */}
        <div className="flex-grow py-12 md:py-16 lg:py-20 px-6 sm:px-10 md:px-14 lg:px-20 max-w-[1440px] mx-auto w-full">
          {/* Header Section with horizontal line demarcation */}
          <div className="mb-10 sm:mb-12 border-b border-[#a89d7e] pb-8 md:pb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-obsidian-black inline-block flex-shrink-0" />
              <span className="text-obsidian-black text-[11px] tracking-[0.15em] uppercase font-mono font-bold">
                SHOP OUR COLLECTION
              </span>
            </div>
            <h2 className="text-[22px] sm:text-[34px] md:text-[42px] lg:text-[45px] leading-[0.95] tracking-[-0.02em] text-obsidian-black uppercase font-sans font-bold mb-6 max-w-5xl">
              LUXURY HAIR EXTENSIONS, CUSTOM WIGS AND PRECISION LACE ATTACHMENTS
            </h2>
            <div>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-pure-white border border-obsidian-black hover:bg-obsidian-black hover:text-pure-white text-obsidian-black px-6 py-2.5 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm"
              >
                → TO THE PRODUCTS
              </Link>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full aspect-[16/11] bg-mist-gray rounded-[16px] animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-8 border border-red-200 bg-red-50/50 rounded-[16px] text-center max-w-xl mx-auto my-8">
              <p className="text-obsidian-black font-medium text-[15px] mb-3">
                Unable to load collections
              </p>
              <p className="text-ash-gray text-[13px] mb-6">{error}</p>
              <button
                onClick={fetchCategories}
                className="inline-flex items-center justify-center bg-obsidian-black text-pure-white hover:bg-champagne-gold transition-colors px-6 py-2.5 rounded-full text-[11px] uppercase tracking-wider font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && categories.length === 0 && (
            <div className="p-12 border border-[#a89d7e] rounded-[16px] text-center max-w-xl mx-auto my-8">
              <p className="text-iron-gray text-[15px]">
                No active collections available at the moment.
              </p>
            </div>
          )}

          {/* Categories Grid - Boxed layout with demarcations */}
          {!loading && !error && categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#a89d7e] overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#a89d7e]">
              {categories.map((category, idx) => {
                const imageSrc =
                  category.image && category.image.trim() !== ""
                    ? category.image
                    : getCategoryFallbackImage(category.slug, idx);

                const formattedTitle = formatCategoryName(category.name);

                return (
                  <div key={category._id} className="p-4 sm:p-6 lg:p-8 bg-pure-white">
                    <Link
                      href={`/shop?category=${category.slug}`}
                      className="group relative w-full aspect-[16/16] bg-obsidian-black border border-[#a89d7e] rounded-[16px] overflow-hidden transition-all duration-300 hover:shadow-xl block min-w-0"
                    >
                      {/* Background Category Image */}
                      <Image
                        src={imageSrc}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Gradient Overlay for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-opacity duration-300" />

                      {/* Top-left small badge tag */}
                      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2 text-pure-white text-[10px] tracking-[0.15em] uppercase font-mono font-medium">
                        <span className="w-2 h-2 bg-pure-white inline-block" />
                        <span>TCW COLLECTION</span>
                      </div>

                      {/* Bottom Content Overlay */}
                      <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col items-start justify-end">
                        {/* Category Title */}
                        <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-pure-white uppercase tracking-tight leading-none mb-3 group-hover:text-champagne-gold transition-colors duration-300">
                          {formattedTitle}
                        </h3>

                        {/* Pill Button Overlay */}
                        <span className="inline-flex items-center justify-center bg-pure-white text-obsidian-black group-hover:bg-champagne-gold group-hover:text-pure-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 shadow-md">
                          → DISCOVER COLLECTION
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Vertical Line Demarcation (matching Navbar) */}
        <div className="w-[16px] md:w-[24px] lg:w-[32px] border-l border-[#a89d7e] flex-shrink-0" />
      </div>
    </section>
  );
}
