"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product, addToCart as apiAddToCart, createCheckoutSession } from "@/services/api";
import { useCart } from "@/context/CartContext";

interface QuickViewDrawerProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewDrawer({ product, isOpen, onClose }: QuickViewDrawerProps) {
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedTexture, setSelectedTexture] = useState<string>("");
  const [selectedLaceType, setSelectedLaceType] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const { addToCart } = useCart();

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
      setQuantity(1);
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
    setCheckoutError(null);
    const added = await addToCart({
      itemType: "PRODUCT",
      product: product._id,
      variantSku: currentVariant.sku,
      quantity
    });
    setIsAdding(false);
    if (added) {
      onClose();
    }
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
        quantity
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
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md h-full bg-white flex flex-col shadow-2xl animate-slideInRight">
        <div className="flex justify-between items-center p-6 border-b border-[#a89d7e]/30">
          <h2 className="text-obsidian-black font-mono font-bold text-[13px] uppercase tracking-widest">
            SELECT OPTIONS
          </h2>
          <button 
            onClick={onClose}
            className="text-obsidian-black hover:text-champagne-gold transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="relative w-full aspect-square bg-[#f4f4f4] mb-6 flex items-center justify-center p-4">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="text-obsidian-black font-mono font-bold text-[15px] uppercase tracking-wider mb-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-obsidian-black font-mono font-bold text-[13px]">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="space-y-6 mb-8">
            {availableColors.length > 0 && (
              <div>
                <p className="text-obsidian-black font-mono font-bold text-[11px] uppercase tracking-widest mb-3">
                  COLOR: <span className="font-normal text-iron-gray">{selectedColor || "Select"}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {availableColors.map((color, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 border text-[11px] font-mono transition-colors uppercase ${
                        selectedColor === color
                          ? "border-obsidian-black text-obsidian-black bg-gray-50"
                          : "border-gray-300 text-iron-gray hover:border-black hover:text-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {availableLengths.length > 0 && (
              <div>
                <p className="text-obsidian-black font-mono font-bold text-[11px] uppercase tracking-widest mb-3">
                  LENGTH: <span className="font-normal text-iron-gray">{selectedLength || "Select"}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {availableLengths.map((len, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedLength(len)}
                      className={`px-3 py-1.5 border text-[11px] font-mono transition-colors uppercase ${
                        selectedLength === len
                          ? "border-obsidian-black text-obsidian-black bg-gray-50"
                          : "border-gray-300 text-iron-gray hover:border-black hover:text-black"
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
                <p className="text-obsidian-black font-mono font-bold text-[11px] uppercase tracking-widest mb-3">
                  SIZE: <span className="font-normal text-iron-gray">{selectedSize || "Select"}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {availableSizes.map((size, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 border text-[11px] font-mono transition-colors uppercase ${
                        selectedSize === size
                          ? "border-obsidian-black text-obsidian-black bg-gray-50"
                          : "border-gray-300 text-iron-gray hover:border-black hover:text-black"
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
                <p className="text-obsidian-black font-mono font-bold text-[11px] uppercase tracking-widest mb-3">
                  TEXTURE: <span className="font-normal text-iron-gray">{selectedTexture || "Select"}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {availableTextures.map((tex, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedTexture(tex)}
                      className={`px-3 py-1.5 border text-[11px] font-mono transition-colors uppercase ${
                        selectedTexture === tex
                          ? "border-obsidian-black text-obsidian-black bg-gray-50"
                          : "border-gray-300 text-iron-gray hover:border-black hover:text-black"
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
                <p className="text-obsidian-black font-mono font-bold text-[11px] uppercase tracking-widest mb-3">
                  LACE TYPE: <span className="font-normal text-iron-gray">{selectedLaceType || "Select"}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {availableLaceTypes.map((lace, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedLaceType(lace)}
                      className={`px-3 py-1.5 border text-[11px] font-mono transition-colors uppercase ${
                        selectedLaceType === lace
                          ? "border-obsidian-black text-obsidian-black bg-gray-50"
                          : "border-gray-300 text-iron-gray hover:border-black hover:text-black"
                      }`}
                    >
                      {lace}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mb-4 mt-auto">
            <div className="flex items-center border border-gray-300 w-24">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-500 hover:text-black transition-colors">-</button>
              <span className="flex-1 text-center font-mono text-[13px]">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-gray-500 hover:text-black transition-colors">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={isAdding || isBuying || !currentVariant}
              className="flex-1 border border-black text-black hover:bg-black hover:text-white disabled:opacity-50 transition-colors duration-300 font-mono font-bold text-[11px] uppercase tracking-widest"
            >
              {isAdding ? "Adding..." : "ADD TO CART"}
            </button>
          </div>

          {checkoutError && (
            <div className="text-red-600 text-[11px] text-center font-sans mb-2">
              {checkoutError}
            </div>
          )}
          <button 
            onClick={handleBuyNow}
            disabled={isAdding || isBuying || !currentVariant}
            className="w-full bg-black text-white hover:bg-champagne-gold hover:text-black disabled:opacity-50 transition-colors duration-300 py-4 font-mono font-bold text-[11px] uppercase tracking-widest mb-8 flex justify-center items-center"
          >
            {isBuying ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "BUY IT NOW"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
