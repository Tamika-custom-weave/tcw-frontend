import React from "react";

export default function Newsletter() {
  return (
    <section className="py-24 bg-brand-gold-light/20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-brand-gold-dark font-sans tracking-[0.2em] uppercase text-xs mb-4 block">
          Exclusive Access
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-brand-black mb-6">
          The TCW Insider
        </h2>
        <p className="text-gray-600 mb-10 font-light">
          Join our mailing list to receive early access to restocks, exclusive offers, and expert hair care tips from Tamika.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="flex-grow bg-white border border-gray-300 py-3 px-6 text-sm focus:outline-none focus:border-brand-gold transition-colors"
          />
          <button 
            type="submit"
            className="bg-brand-black text-brand-white hover:bg-gray-800 py-3 px-8 text-sm tracking-wider uppercase font-semibold transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
