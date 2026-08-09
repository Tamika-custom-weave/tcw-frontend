import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button (placeholder) */}
          <div className="flex items-center md:hidden">
            <button className="text-gray-900 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/shop" className="text-sm tracking-widest uppercase hover:text-brand-gold transition-colors">Shop</Link>
            <Link href="/custom-wigs" className="text-sm tracking-widest uppercase hover:text-brand-gold transition-colors">Custom Wigs</Link>
            <Link href="/about" className="text-sm tracking-widest uppercase hover:text-brand-gold transition-colors">Our Story</Link>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-center">
              TCW
              <span className="block text-[0.65rem] md:text-xs font-sans tracking-[0.3em] font-normal uppercase text-gray-500 mt-1">
                Tamika Custom Weave
              </span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-900 hover:text-brand-gold transition-colors">
              <span className="sr-only">Search</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="hidden md:block text-gray-900 hover:text-brand-gold transition-colors">
              <span className="sr-only">Account</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="text-gray-900 hover:text-brand-gold transition-colors relative">
              <span className="sr-only">Cart</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-brand-gold text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
