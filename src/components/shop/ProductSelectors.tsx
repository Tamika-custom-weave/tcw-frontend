"use client";

import React, { useState } from "react";
import { Product } from "@/services/api";
import { useCart } from "@/context/CartContext";

interface ProductSelectorsProps {
  product: Product;
}

export default function ProductSelectors({ product }: ProductSelectorsProps) {
  const availableLengths = Array.from(new Set(product.variants?.map(v => v.length).filter(Boolean))) as string[];
  const availableTextures = Array.from(new Set(product.variants?.map(v => v.texture).filter(Boolean))) as string[];
  const availableLaceTypes = Array.from(new Set(product.variants?.map(v => v.laceType).filter(Boolean))) as string[];

  const [selectedLength, setSelectedLength] = useState<string>(availableLengths.length === 1 ? availableLengths[0] : "");
  const [selectedTexture, setSelectedTexture] = useState<string>(availableTextures.length === 1 ? availableTextures[0] : "");
  const [selectedLaceType, setSelectedLaceType] = useState<string>(availableLaceTypes.length === 1 ? availableLaceTypes[0] : "");
  const [isAdding, setIsAdding] = useState(false);
  
  const { addToCart } = useCart();

  const currentVariant = product.variants?.find(v => 
    (!v.length || v.length === selectedLength) &&
    (!v.texture || v.texture === selectedTexture) &&
    (!v.laceType || v.laceType === selectedLaceType)
  );

  const price = currentVariant ? currentVariant.price : (product.variants?.[0]?.price || 0);

  const handleAddToCart = async () => {
    if (!currentVariant) return;
    setIsAdding(true);
    await addToCart({
      itemType: "PRODUCT",
      product: product._id,
      variantSku: currentVariant.sku,
      quantity: 1
    });
    setIsAdding(false);
  };

  return (
    <>
      <div className="text-[20px] font-mono font-semibold text-obsidian-black mb-8">
        ${price.toFixed(2)}
      </div>

      <div className="w-full h-px bg-[#a89d7e] mb-8" />

      <div className="space-y-6 mb-10">
        {availableLengths.length > 0 && (
          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
              Length
            </label>
            <div className="flex flex-wrap gap-2">
              {availableLengths.map(len => (
                <button 
                  key={len} 
                  onClick={() => setSelectedLength(len)}
                  className={`px-4 py-2 border text-[12px] font-medium transition-colors ${
                    selectedLength === len 
                      ? "border-obsidian-black text-obsidian-black bg-gray-50" 
                      : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black"
                  }`}
                >
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
                <button 
                  key={tex} 
                  onClick={() => setSelectedTexture(tex)}
                  className={`px-4 py-2 border text-[12px] font-medium transition-colors ${
                    selectedTexture === tex 
                      ? "border-obsidian-black text-obsidian-black bg-gray-50" 
                      : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black"
                  }`}
                >
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
                <button 
                  key={lace} 
                  onClick={() => setSelectedLaceType(lace)}
                  className={`px-4 py-2 border text-[12px] font-medium transition-colors ${
                    selectedLaceType === lace 
                      ? "border-obsidian-black text-obsidian-black bg-gray-50" 
                      : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black"
                  }`}
                >
                  {lace}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleAddToCart}
        disabled={isAdding || !currentVariant}
        className="w-full bg-obsidian-black text-pure-white hover:bg-champagne-gold disabled:opacity-50 py-4 text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 mb-10 shadow-lg"
      >
        {isAdding ? "Adding..." : "Add To Cart"}
      </button>
    </>
  );
}
