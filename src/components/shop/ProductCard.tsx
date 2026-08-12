"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/services/api";
import QuickViewModal from "./QuickViewModal";
import QuickViewDrawer from "./QuickViewDrawer";

interface ProductCardProps {
  product: Product;
  quickViewType?: "modal" | "drawer" | "none";
}

export default function ProductCard({ product, quickViewType = "none" }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageSrc = product.thumbnail?.url || product.images?.[0]?.url || "/products.jpg";

  // Calculate price range
  const prices = product.variants?.map(v => v.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  
  // Calculate length range (e.g. 10 - 30)
  const lengthStrings = Array.from(new Set(product.variants?.map(v => v.length).filter(Boolean))) as string[];
  const lengthNumbers = lengthStrings.map(l => parseInt(l.replace(/\D/g, ''))).filter(n => !isNaN(n));
  let lengthString = "";
  if (lengthNumbers.length > 0) {
    const minLen = Math.min(...lengthNumbers);
    const maxLen = Math.max(...lengthNumbers);
    lengthString = minLen === maxLen ? `${minLen}` : `${minLen}-${maxLen}`;
  }

  const priceString = minPrice === maxPrice 
    ? `$${minPrice.toFixed(2)}` 
    : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;

  const handleCardClick = (e: React.MouseEvent) => {
    if (quickViewType !== "none") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    if (quickViewType !== "none") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Link
        href={`/product/${product.slug}`}
        onClick={handleCardClick}
        className="group relative flex flex-col bg-white border-b border-r border-[#a89d7e]/20 hover:bg-gray-50 transition-colors duration-300 h-full"
      >
        {/* Top Image Area */}
        <div className="relative w-full aspect-square flex items-center justify-center p-8 sm:p-12 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          
          {/* "Quick View" Bar - Slides up from the bottom */}
          <div className="absolute inset-x-0 bottom-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20">
            <div 
              onClick={handleQuickViewClick}
              className="w-full bg-[#2a2a2a] hover:bg-black text-white text-[11px] sm:text-[12px] font-mono font-bold uppercase tracking-widest py-3 sm:py-3.5 text-center transition-colors cursor-pointer"
            >
              Quick View
            </div>
          </div>
        </div>

        {/* Bottom Text Area */}
        <div className="w-full flex-grow p-4 sm:p-5 flex flex-col justify-start group-hover:bg-gray-50 transition-colors duration-300 border-t border-[#a89d7e]/30">
          <h3 className="text-black text-[11px] sm:text-[12px] font-mono font-bold tracking-widest uppercase leading-tight mb-1.5 line-clamp-2">
            {product.name}
          </h3>
          {lengthString && (
            <p className="text-iron-gray text-[10px] sm:text-[11px] font-mono mb-2 uppercase tracking-wider">
              Length: {lengthString}
            </p>
          )}
          <p className="text-gray-600 text-[11px] sm:text-[12px] font-mono font-medium mt-auto">
            {priceString}
          </p>
        </div>
      </Link>

      {/* Render Modals based on type */}
      {quickViewType === "modal" && (
        <QuickViewModal 
          product={product} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
      
      {quickViewType === "drawer" && (
        <QuickViewDrawer 
          product={product} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
