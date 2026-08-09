import React from "react";
import Link from "next/link";

export default function CustomWig() {
  return (
    <section className="py-0">
      <div className="w-full flex flex-col md:flex-row">
        {/* Image Side */}
        <div className="w-full md:w-1/2 min-h-[500px] md:min-h-[700px] relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574621100236-d25b64dc8cc9?q=80&w=1964&auto=format&fit=crop')" }}
          />
        </div>
        
        {/* Content Side */}
        <div className="w-full md:w-1/2 bg-brand-black text-brand-white flex items-center justify-center py-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-md">
            <span className="text-brand-gold font-sans tracking-[0.2em] uppercase text-xs mb-4 block">
              Signature Service
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Custom Wigs &amp; <br />
              <span className="italic font-light">Flawless Installation</span>
            </h2>
            <div className="w-12 h-px bg-brand-gold mb-8"></div>
            <p className="text-gray-300 font-light leading-relaxed mb-10">
              Beyond our premium extensions, TCW offers an exclusive custom wig making and installation service. Experience a personalized consultation, precise customization, and a seamless melt that transforms your look instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/book" 
                className="bg-brand-gold hover:bg-brand-gold-light text-brand-black px-8 py-3 uppercase tracking-widest text-xs font-semibold text-center transition-colors"
              >
                Book Appointment
              </Link>
              <Link 
                href="/custom-wigs" 
                className="border border-white hover:bg-white hover:text-brand-black px-8 py-3 uppercase tracking-widest text-xs font-semibold text-center transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
