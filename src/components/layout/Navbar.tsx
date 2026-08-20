"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FiMenu, FiShoppingBag, FiHome } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import dynamic from 'next/dynamic';
const CartDrawer = dynamic(() => import("../cart/CartDrawer"));

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const cartQuantity = cart?.totalQuantity || 0;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#a89d7e]/30 bg-pure-white flex flex-col">
        {/* Top Bar */}
        <div className="w-full border-b border-[#a89d7e]/30 bg-pure-white h-[28px] flex items-center">
          {/* Left vertical border divider */}
          <div className="w-[16px] md:w-[24px] h-full border-r border-[#a89d7e]/30 flex-shrink-0" />

          {/* Top Bar Content */}
          <div className="flex-grow flex items-center justify-between px-[8px] md:px-[16px] h-full">
            <div className="text-[9px] leading-none tracking-[0.1em] uppercase text-neutral-500 font-mono">
              TCW OFFICIAL STORE
            </div>
          </div>

          {/* Right vertical border divider */}
          <div className="w-[16px] md:w-[24px] h-full border-l border-[#a89d7e]/30 flex-shrink-0" />
        </div>

        {/* Main Navbar */}
        <div className="w-full h-[64px] flex items-center relative bg-pure-white">
          {/* Left vertical border divider */}
          <div className="w-[16px] md:w-[24px] h-full border-r border-[#a89d7e]/30 flex-shrink-0" />

          {/* Main Navbar Content */}
          <div className="flex-grow h-full flex items-center justify-between relative">
            {/* Left: Desktop Navigation & Mobile Navigation */}
            <div className="flex items-center h-full">
              {/* Desktop Navigation */}
              <div className="hidden md:flex h-full">
                <Link href="/shop" className="flex items-center justify-center h-full border-r border-[#a89d7e]/30 px-[24px] text-[10px] tracking-[0.15em] uppercase font-mono text-obsidian-black hover:bg-neutral-50 hover:text-champagne-gold transition-colors">
                  PRODUCTS
                </Link>
                <Link href="/#custom-wig" className="flex items-center justify-center h-full border-r border-[#a89d7e]/30 px-[24px] text-[10px] tracking-[0.15em] uppercase font-mono text-obsidian-black hover:bg-neutral-50 hover:text-champagne-gold transition-colors">
                  CUSTOMIZE
                </Link>
              </div>

              {/* Mobile Navigation */}
              <div className="flex md:hidden items-center h-full border-r border-[#a89d7e]/30">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-[48px] h-full flex items-center justify-center text-obsidian-black hover:bg-neutral-50 transition-colors focus:outline-none"
                >
                  <FiMenu size={20} />
                </button>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex-grow flex justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
              <Link
                href="/"
                className="flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/tamikas-logo.png"
                  alt="Tamika's Custom Weave"
                  width={180}
                  height={48}
                  className="h-[36px] md:h-[48px] w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right: Cart and Home inside bordered grid cells */}
            <div className="flex items-center h-full">
              {/* Home Button */}
              <Link href="/" className="hidden md:flex w-[48px] md:w-[64px] h-full border-l border-[#a89d7e]/30 items-center justify-center text-obsidian-black hover:bg-neutral-50 transition-colors">
                <span className="sr-only">Home</span>
                <FiHome size={20} />
              </Link>

              {/* Cart Button (Always visible) */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-[48px] md:w-[64px] h-full border-l border-[#a89d7e]/30 flex items-center justify-center text-obsidian-black hover:bg-neutral-50 transition-colors relative"
              >
                <span className="sr-only">Cart</span>
                <FiShoppingBag size={20} />
                {cartQuantity > 0 && (
                  <span className="absolute top-[12px] right-[12px] bg-champagne-gold text-obsidian-black text-[9px] w-[16px] h-[16px] flex items-center justify-center font-mono tracking-tighter">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Right vertical border divider */}
          <div className="w-[16px] md:w-[24px] h-full border-l border-[#a89d7e]/30 flex-shrink-0" />
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full border-t border-[#a89d7e]/30 bg-pure-white flex flex-col animate-fadeIn divide-y divide-[#a89d7e]/30 border-b border-[#a89d7e]/30">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[11px] tracking-[0.15em] uppercase text-obsidian-black font-mono hover:bg-neutral-50 py-[20px] px-8 transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[11px] tracking-[0.15em] uppercase text-obsidian-black font-mono hover:bg-neutral-50 py-[20px] px-8 transition-colors"
            >
              PRODUCTS
            </Link>
            <Link
              href="/#custom-wig"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[11px] tracking-[0.15em] uppercase text-obsidian-black font-mono hover:bg-neutral-50 py-[20px] px-8 transition-colors"
            >
              CUSTOMIZE
            </Link>

          </div>
        )}
      </header>

      {/* Cart Drawer Overlay */}
      <CartDrawer />
    </>
  );
}
