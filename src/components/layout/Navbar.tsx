"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FiMenu, FiGlobe, FiShoppingBag, FiUser, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#a89d7e]/30 bg-pure-white flex flex-col">
      {/* Top Bar */}
      <div className="w-full border-b border-[#a89d7e]/30 bg-pure-white h-[28px] flex items-center">
        {/* Left vertical border divider */}
        <div className="w-[16px] md:w-[24px] h-full border-r border-[#a89d7e]/30 flex-shrink-0" />

        {/* Top Bar Content */}
        <div className="flex-grow flex items-center justify-between px-[8px] md:px-[16px] h-full">
          <div className="text-[10px] leading-none tracking-[0.05em] uppercase text-obsidian-black font-sans">
            TCW
          </div>
          <div className="text-[10px] leading-none tracking-[0.05em] uppercase text-obsidian-black font-sans">
            Language (EN)
          </div>
        </div>

        {/* Right vertical border divider */}
        <div className="w-[16px] md:w-[24px] h-full border-l border-[#a89d7e]/30 flex-shrink-0" />
      </div>

      {/* Main Navbar */}
      <div className="w-full h-[56px] flex items-center relative">
        {/* Left vertical border divider */}
        <div className="w-[16px] md:w-[24px] h-full border-r border-[#a89d7e]/30 flex-shrink-0" />

        {/* Main Navbar Content */}
        <div className="flex-grow h-full flex items-center justify-between px-[8px] md:px-[16px]">
          {/* Left: Desktop Navigation & Mobile Navigation (Hamburger + Globe) */}
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-[8px]">
              <Link href="/shop" className="bg-[#F8F5ED] hover:bg-[#f0ece0] text-obsidian-black rounded-full px-[16px] py-[8px] text-[10px] leading-none tracking-[0.05em] uppercase font-sans transition-colors">
                Products
              </Link>
              <Link href="/customize" className="bg-[#F8F5ED] hover:bg-[#f0ece0] text-obsidian-black rounded-full px-[16px] py-[8px] text-[10px] leading-none tracking-[0.05em] uppercase font-sans transition-colors">
                Customize
              </Link>
            </div>

            {/* Mobile Navigation (Hamburger + Globe) */}
            <div className="flex md:hidden items-center space-x-[6px]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-[36px] h-[36px] rounded-full bg-[#F8F5ED] hover:bg-[#f0ece0] flex items-center justify-center text-obsidian-black focus:outline-none"
              >
                <FiMenu size={20} />
              </button>
              <button className="w-[36px] h-[36px] rounded-full bg-[#F8F5ED] hover:bg-[#f0ece0] flex items-center justify-center text-obsidian-black">
                <FiGlobe size={18} />
              </button>
            </div>
          </div>

          {/* Center: Logo centered absolutely */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Link
              href="/"
              className="flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Image
                src="/tamikas-logo.png"
                alt="Tamika's Custom Weave"
                width={200}
                height={54}
                className="h-[54px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Cart and Search/Account inside circular buttons */}
          <div className="flex items-center space-x-[6px] md:space-x-[8px]">
            {/* Search Button (Desktop only) */}
            <button className="hidden md:flex w-[36px] h-[36px] rounded-full bg-[#F8F5ED] hover:bg-[#f0ece0] items-center justify-center text-obsidian-black transition-colors">
              <span className="sr-only">Search</span>
              <FiSearch size={20} />
            </button>

            {/* Cart Button (Always visible) */}
            <button className="w-[36px] h-[36px] rounded-full bg-[#F8F5ED] hover:bg-[#f0ece0] flex items-center justify-center text-obsidian-black transition-colors relative">
              <span className="sr-only">Cart</span>
              <FiShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-champagne-gold text-pure-white text-[9px] w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>

            {/* Account Button (Mobile only) */}
            <button className="flex md:hidden w-[36px] h-[36px] rounded-full bg-[#F8F5ED] hover:bg-[#f0ece0] items-center justify-center text-obsidian-black transition-colors">
              <span className="sr-only">Account</span>
              <FiUser size={20} />
            </button>
          </div>
        </div>

        {/* Right vertical border divider */}
        <div className="w-[16px] md:w-[24px] h-full border-l border-[#a89d7e]/30 flex-shrink-0" />
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full border-t border-[#a89d7e]/30 bg-pure-white flex flex-col py-[16px] px-[16px] space-y-[12px] animate-fadeIn">
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[12px] leading-none tracking-[0.05em] uppercase text-obsidian-black font-sans hover:text-champagne-gold py-[8px]"
          >
            Products
          </Link>
          <Link
            href="/customize"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[12px] leading-none tracking-[0.05em] uppercase text-obsidian-black font-sans hover:text-champagne-gold py-[8px]"
          >
            Customize
          </Link>
        </div>
      )}
    </header>

  );
}
