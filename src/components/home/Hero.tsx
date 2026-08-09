import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full bg-brand-black flex items-center justify-center overflow-hidden">
      {/* Background Placeholder Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=2071&auto=format&fit=crop')",
          backgroundPosition: "center 20%"
        }}
      />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-brand-gold font-sans tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block drop-shadow-md">
          Uncompromised Quality
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-6 drop-shadow-lg">
          The Epitome of <br className="hidden md:block" />
          <span className="italic font-light">Luxury Hair</span>
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-xl mx-auto mb-10 drop-shadow-md font-light">
          Experience the finest raw extensions, meticulously sourced and crafted for the modern, sophisticated woman.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/shop" 
            className="bg-brand-gold hover:bg-brand-gold-light text-brand-black px-10 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Shop Collection
          </Link>
          <Link 
            href="/custom-wigs" 
            className="bg-transparent border border-white text-white hover:bg-white hover:text-brand-black px-10 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300"
          >
            Custom Wigs
          </Link>
        </div>
      </div>
    </section>
  );
}
