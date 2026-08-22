"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/services/api";
import { useCart } from "@/context/CartContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedTexture, setSelectedTexture] = useState<string>("");
  const [selectedLaceType, setSelectedLaceType] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCart();
  
  const modalRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (product.variants?.length > 0) {
        const firstVariant = product.variants[0];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (firstVariant.length) setSelectedLength(firstVariant.length);
        if (firstVariant.size) setSelectedSize(firstVariant.size);
        if (firstVariant.texture) setSelectedTexture(firstVariant.texture);
        if (firstVariant.laceType) setSelectedLaceType(firstVariant.laceType);
        if (firstVariant.color) setSelectedColor(firstVariant.color);
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, product]);

  if (!isOpen) return null;

  const imageSrc = product.thumbnail?.url || product.images?.[0]?.url || "/products.jpg";
  
  const availableLengths = Array.from(new Set(product.variants.map(v => v.length).filter(Boolean))) as string[];
  const availableSizes = Array.from(new Set(product.variants.map(v => v.size).filter(Boolean))) as string[];
  const availableTextures = Array.from(new Set(product.variants.map(v => v.texture).filter(Boolean))) as string[];
  const availableLaceTypes = Array.from(new Set(product.variants.map(v => v.laceType).filter(Boolean))) as string[];
  const availableColors = Array.from(new Set(product.variants.map(v => v.color).filter(Boolean))) as string[];

  // Find currently selected variant matching all criteria
  const currentVariant = product.variants.find(v => 
    (!v.length || v.length === selectedLength) &&
    (!v.size || v.size === selectedSize) &&
    (!v.texture || v.texture === selectedTexture) &&
    (!v.laceType || v.laceType === selectedLaceType) &&
    (!v.color || v.color === selectedColor)
  );

  const price = currentVariant ? currentVariant.price : (product.variants?.[0]?.price || 0);

  const handleAddToCart = async () => {
    if (!currentVariant) return;
    setIsAdding(true);
    const added = await addToCart({
      itemType: "PRODUCT",
      product: product._id,
      variantSku: currentVariant.sku,
      quantity: 1
    });
    setIsAdding(false);
    if (added) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-modal-title"
        className="relative w-full max-w-6xl max-h-full bg-white flex flex-col md:flex-row overflow-hidden shadow-2xl animate-fadeIn"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-obsidian-black hover:text-champagne-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold rounded-sm"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Image (Light Gray Background) */}
        <div className="w-full md:w-1/2 bg-[#f4f4f4] relative flex items-center justify-center p-12 min-h-[40vh] md:min-h-[600px]">
          <div className="relative w-full h-full max-w-md aspect-[4/3] md:aspect-square">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 flex flex-col p-8 sm:p-12 overflow-y-auto">
          <div className="flex justify-between items-start mb-6 border-b border-[#a89d7e]/30 pb-6">
            <div>
              <p className="text-obsidian-black font-mono font-bold text-[13px] tracking-wider mb-1">
                ${price.toFixed(2)} USD
              </p>
            </div>
          </div>

          <div className="prose prose-sm prose-gray max-w-none mb-8">
            <h2 id="quickview-modal-title" className="text-obsidian-black font-mono font-bold text-[14px] uppercase tracking-wider mb-4 border-b border-[#a89d7e]/30 pb-4">
              {product.name}
            </h2>
            
            {product.description && (
              <p className="text-iron-gray text-[12px] leading-relaxed mb-6 font-mono whitespace-pre-line">
                {product.description}
              </p>
            )}
          </div>

          {/* Variants dynamically shown based on data */}
          <div className="space-y-6 mb-8">
            {availableLengths.length > 0 && (
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
                  Length: <span className="font-normal text-iron-gray">{selectedLength}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableLengths.map(len => (
                    <button 
                      key={len} 
                      onClick={() => setSelectedLength(len)}
                      className={`px-4 py-2 border text-[11px] font-mono font-medium transition-colors ${
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

            {availableSizes.length > 0 && (
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
                  Size: <span className="font-normal text-iron-gray">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border text-[11px] font-mono font-medium transition-colors ${
                        selectedSize === size 
                          ? "border-obsidian-black text-obsidian-black bg-gray-50" 
                          : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {availableTextures.length > 0 && (
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
                  Texture: <span className="font-normal text-iron-gray">{selectedTexture}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTextures.map(tex => (
                    <button 
                      key={tex} 
                      onClick={() => setSelectedTexture(tex)}
                      className={`px-4 py-2 border text-[11px] font-mono font-medium transition-colors ${
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
                  Lace Type: <span className="font-normal text-iron-gray">{selectedLaceType}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableLaceTypes.map(lace => (
                    <button 
                      key={lace} 
                      onClick={() => setSelectedLaceType(lace)}
                      className={`px-4 py-2 border text-[11px] font-mono font-medium transition-colors ${
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

            {availableColors.length > 0 && (
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase font-mono font-bold text-obsidian-black mb-3">
                  Color: <span className="font-normal text-iron-gray">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map(c => (
                    <button 
                      key={c} 
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 border text-[11px] font-mono font-medium transition-colors ${
                        selectedColor === c 
                          ? "border-obsidian-black text-obsidian-black bg-gray-50" 
                          : "border-[#a89d7e]/30 text-iron-gray hover:border-obsidian-black hover:text-obsidian-black"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAdding || !currentVariant}
            className="w-full bg-black text-white hover:bg-champagne-gold hover:text-black disabled:opacity-50 transition-colors duration-300 py-4 sm:py-5 text-[13px] font-mono font-bold uppercase tracking-[0.15em] mt-auto"
          >
            {isAdding ? "ADDING..." : "+ ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
}
