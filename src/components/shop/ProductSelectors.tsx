"use client";

import React, { useState } from "react";
import { Product, addToCart as apiAddToCart, createCheckoutSession } from "@/services/api";
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
  const [isBuying, setIsBuying] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  
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
    setCheckoutError(null);
    await addToCart({
      itemType: "PRODUCT",
      product: product._id,
      variantSku: currentVariant.sku,
      quantity: 1
    });
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    if (!currentVariant) return;
    setIsBuying(true);
    setCheckoutError(null);
    try {
      const updatedCart = await apiAddToCart({
        itemType: "PRODUCT",
        product: product._id,
        variantSku: currentVariant.sku,
        quantity: 1
      });
      
      if (updatedCart && updatedCart.cartId) {
        const url = await createCheckoutSession(updatedCart.cartId);
        if (url) {
          window.location.href = url;
        } else {
          setCheckoutError("Failed to initialize checkout.");
        }
      } else {
        setCheckoutError("Failed to add item to cart.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setCheckoutError(err.message || "An error occurred.");
      } else {
        setCheckoutError("An error occurred.");
      }
    } finally {
      setIsBuying(false);
    }
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
              {availableLengths.map(len => {
                const isSelected = selectedLength === len;
                return (
                  <button 
                    key={len} 
                    onClick={() => setSelectedLength(len)}
                    className={`px-4 py-2 border text-[12px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-champagne-gold ${
                      isSelected 
                        ? "border-obsidian-black bg-obsidian-black text-white font-bold shadow-md" 
                        : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black bg-white font-medium"
                    }`}
                  >
                    {len}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {availableTextures.length > 0 && (
          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
              Texture
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTextures.map(tex => {
                const isSelected = selectedTexture === tex;
                return (
                  <button 
                    key={tex} 
                    onClick={() => setSelectedTexture(tex)}
                    className={`px-4 py-2 border text-[12px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-champagne-gold ${
                      isSelected 
                        ? "border-obsidian-black bg-obsidian-black text-white font-bold shadow-md" 
                        : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black bg-white font-medium"
                    }`}
                  >
                    {tex}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {availableLaceTypes.length > 0 && (
          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
              Lace Type
            </label>
            <div className="flex flex-wrap gap-2">
              {availableLaceTypes.map(lace => {
                const isSelected = selectedLaceType === lace;
                return (
                  <button 
                    key={lace} 
                    onClick={() => setSelectedLaceType(lace)}
                    className={`px-4 py-2 border text-[12px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-champagne-gold ${
                      isSelected 
                        ? "border-obsidian-black bg-obsidian-black text-white font-bold shadow-md" 
                        : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black bg-white font-medium"
                    }`}
                  >
                    {lace}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button 
          onClick={handleAddToCart}
          disabled={isAdding || isBuying || !currentVariant || currentVariant.stock <= 0}
          className="w-full sm:w-1/2 bg-white border border-obsidian-black text-obsidian-black hover:bg-obsidian-black hover:text-white disabled:opacity-50 py-4 text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 shadow-sm"
        >
          {isAdding ? "Adding..." : (currentVariant?.stock && currentVariant.stock > 0 ? "Add To Cart" : "Out of Stock")}
        </button>

        <button 
          onClick={handleBuyNow}
          disabled={isAdding || isBuying || !currentVariant || currentVariant.stock <= 0}
          className="w-full sm:w-1/2 bg-obsidian-black text-pure-white hover:bg-champagne-gold hover:text-obsidian-black disabled:opacity-50 py-4 text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 shadow-lg flex justify-center items-center"
        >
          {isBuying ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Buy It Now"
          )}
        </button>
      </div>
      
      {checkoutError && (
        <div className="text-red-600 text-[11px] text-center font-sans mb-10">
          {checkoutError}
        </div>
      )}
      {!checkoutError && <div className="mb-10"></div>}
    </>
  );
}
