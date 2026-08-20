"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { createCheckoutSession } from "@/services/api";

export default function CartDrawer() {
  const { cart, isLoading, isCartOpen, setIsCartOpen, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!cart) return;
    setIsCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const url = await createCheckoutSession(cart.cartId);
      if (url) {
        window.location.href = url;
      } else {
        setCheckoutError("Failed to initialize checkout. Please try again.");
      }
    } catch (err: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Checkout error:", err);
      }
      setCheckoutError("An error occurred during checkout. Please try again later.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  // Close drawer on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsCartOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-obsidian-black/50 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
    >
      <div 
        className="absolute top-0 right-0 h-[100dvh] w-full max-w-md bg-pure-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#a89d7e]/30">
          <h2 className="text-[16px] font-mono font-bold tracking-widest uppercase text-obsidian-black flex items-center">
            <FiShoppingBag className="mr-3" />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-iron-gray hover:text-obsidian-black transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-8 h-8 border-2 border-concrete-gray border-t-obsidian-black rounded-full animate-spin"></div>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-[#F8F5ED] rounded-full flex items-center justify-center text-champagne-gold">
                <FiShoppingBag size={32} />
              </div>
              <p className="text-iron-gray font-mono uppercase tracking-widest text-[12px] mb-2">Your cart is empty</p>
              <p className="text-neutral-500 font-sans text-[13px] mb-4">Discover our premium extensions and closures.</p>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  window.location.href = '/shop';
                }}
                className="px-8 py-4 bg-obsidian-black text-pure-white text-[11px] font-mono uppercase tracking-widest font-bold hover:bg-champagne-gold hover:text-obsidian-black transition-colors mt-2"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.items.map((item) => {
                // Determine item details based on type
                let title = "";
                let subtitle = "";
                let imageSrc = "/products.jpg";
                let price = 0;

                if (item.itemType === "PRODUCT" && item.product) {
                  title = item.product.name;
                  const variant = item.product.variants.find(v => v.sku === item.variantSku);
                  subtitle = variant ? [variant.length, variant.texture].filter(Boolean).join(" - ") || "Standard" : item.variantSku || "";
                  imageSrc = item.product.thumbnail?.url || item.product.images?.[0]?.url || imageSrc;
                  // @ts-expect-error - price field from populated cart item
                  price = item.price || (variant?.price ?? 0);
                } else if (item.itemType === "CUSTOM_WIG" && item.customWig) {
                  title = "Custom Built Wig";
                  subtitle = `${item.customWig.hairLength} ${item.customWig.wigStyle} - ${item.customWig.headSize} Size${item.customWig.styling ? `, ${item.customWig.styling}` : ''}`;
                  // @ts-expect-error - price field from populated cart item
                  price = item.price || item.customWig.totalPrice;
                }

                return (
                  <div key={item._id} className="flex gap-4 p-4 border border-concrete-gray rounded-[4px] bg-pure-white relative">
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="absolute top-2 right-2 p-2 text-iron-gray hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={16} />
                    </button>

                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-[2px] overflow-hidden">
                      <Image src={imageSrc} alt={title} fill sizes="96px" className="object-cover" />
                    </div>

                    <div className="flex-grow flex flex-col justify-between py-1 pr-6">
                      <div>
                        <h3 className="text-[12px] font-mono font-bold tracking-widest uppercase leading-tight text-obsidian-black line-clamp-2">
                          {title}
                        </h3>
                        <p className="text-[11px] font-sans text-iron-gray mt-1">
                          {subtitle}
                        </p>
                        <p className="text-[12px] font-bold text-obsidian-black mt-2">
                          ${price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 mt-4 self-start bg-[#F8F5ED] border border-concrete-gray rounded-full px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-iron-gray hover:text-obsidian-black disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-gold rounded-full"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="text-[12px] font-mono font-bold w-6 text-center select-none">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-iron-gray hover:text-obsidian-black transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-gold rounded-full"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="p-6 border-t border-[#a89d7e]/30 bg-pure-white">
            <div className="flex justify-between items-end mb-6">
              <span className="text-[12px] font-mono uppercase tracking-widest text-iron-gray">Subtotal</span>
              <span className="text-[20px] font-sans font-bold text-obsidian-black">
                ${cart.subtotal.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-3">
              {checkoutError && (
                <div className="text-red-600 text-[11px] text-center font-sans mb-2">
                  {checkoutError}
                </div>
              )}
              <button
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
                className="flex items-center justify-center w-full py-4 bg-obsidian-black text-pure-white text-[11px] font-mono uppercase tracking-widest font-bold rounded-full hover:bg-champagne-gold hover:text-obsidian-black transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isCheckoutLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Checkout"
                )}
              </button>
              
              <button 
                onClick={() => clearCart()}
                className="w-full py-3 text-[10px] font-mono uppercase tracking-widest text-iron-gray hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
