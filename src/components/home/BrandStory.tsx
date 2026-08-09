import React from "react";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="aspect-[4/5] w-full bg-gray-200">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop')" }}
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square bg-brand-gold-light/20 -z-10" />
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <span className="text-brand-gold font-sans tracking-[0.2em] uppercase text-xs mb-4 block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-black mb-8 leading-tight">
              Crafted with <br /> Passion & Precision
            </h2>
            <p className="text-gray-600 mb-6 font-light leading-relaxed">
              TCW was born from a desire to provide women with hair extensions that don&apos;t just look beautiful, but feel authentic. We understand that your hair is a statement of your individuality and confidence.
            </p>
            <p className="text-gray-600 mb-10 font-light leading-relaxed">
              Every bundle, closure, and frontal is hand-selected, meticulously inspected, and handled with the utmost care to ensure you receive nothing but the highest quality raw hair available on the market.
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center text-sm uppercase tracking-widest font-semibold text-brand-black hover:text-brand-gold transition-colors"
            >
              Discover Our Story
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
