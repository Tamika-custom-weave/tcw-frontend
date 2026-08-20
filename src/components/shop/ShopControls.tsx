"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/services/api";

interface ShopControlsProps {
  categories: Category[];
  totalProducts: number;
}

export default function ShopControls({ categories, totalProducts }: ShopControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategorySelect = (slug: string | null) => {
    setIsFilterOpen(false);
    if (slug) {
      router.push(`/shop?category=${slug}`);
    } else {
      router.push(`/shop`);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4 relative z-20 items-start">
      <div className="inline-flex relative w-max">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 text-obsidian-black hover:text-champagne-gold text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-widest transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          {currentCategory ? categories.find(c => c.slug === currentCategory)?.name || "Filter" : "Filter"}
        </button>

        {/* Dropdown Menu for Categories */}
        {isFilterOpen && (
          <div className="absolute top-full left-0 min-w-[160px] whitespace-nowrap mt-2 bg-white border border-[#a89d7e]/30 shadow-lg flex flex-col z-50">
            <button
              onClick={() => handleCategorySelect(null)}
              className={`text-left px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors ${!currentCategory ? 'bg-[#F9F7F4] text-champagne-gold' : 'text-obsidian-black hover:bg-gray-50'}`}
            >
             All Products
            </button>
            {categories.filter(c => c.isActive).map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`text-left px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest border-t border-gray-100 transition-colors ${currentCategory === cat.slug ? 'bg-[#F9F7F4] text-champagne-gold' : 'text-obsidian-black hover:bg-gray-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>   
        )}
      </div>
      <div className="text-iron-gray text-[11px] font-mono uppercase tracking-wider pl-1">
        {totalProducts} products
      </div>
    </div>
  );
}
