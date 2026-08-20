"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/services/api";
import dynamic from 'next/dynamic';

const QuickViewModal = dynamic(() => import("./QuickViewModal"));
const QuickViewDrawer = dynamic(() => import("./QuickViewDrawer"));

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
        className="group relative flex flex-col bg-pure-white border-b border-r border-[#a89d7e]/30 hover:bg-neutral-50 transition-colors duration-300 h-full"
      >
        {/* Top Image Area */}
        <div className="relative w-full aspect-square flex items-center justify-center p-8 sm:p-12 border-b border-[#a89d7e]/30 overflow-hidden bg-white">
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-contain group-hover:scale-105 transition-all duration-700 ease-out"
            />
          </div>

          {/* Brutalist Quick View Button Overlay */}
          <div className="absolute inset-x-0 bottom-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20">
            <div
              onClick={handleQuickViewClick}
              className="w-full bg-obsidian-black hover:bg-champagne-gold text-white hover:text-obsidian-black border-t border-obsidian-black hover:border-champagne-gold text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] py-4 text-center transition-all cursor-pointer flex justify-center items-center gap-2"
            >
              <span>QUICK VIEW</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* Bottom Text Area */}
        <div className="w-full flex-grow p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-obsidian-black text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.1em] uppercase leading-snug mb-2 line-clamp-2">
              {product.name}
            </h3>
            {lengthString && (
              <p className="text-neutral-500 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] mb-4">
                {lengthString}
              </p>
            )}
          </div>
          <p className="text-obsidian-black text-[10px] sm:text-[11px] font-mono font-bold mt-4 pt-4 border-t border-[#a89d7e]/30 flex justify-between items-center w-full">
            <span>{priceString}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-champagne-gold font-bold">↗</span>
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
