"use client";

import React, { useState } from "react";
import Image from "next/image";
import WigBuilderModal from "@/components/customize/WigBuilderModal";

export default function CustomWigCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="custom-wig" className="w-full bg-black text-white border-t border-b border-[#a89d7e]/30 tracking-wider">
        <div className="w-full flex min-h-full">
          {/* Left Vertical Line Demarcation */}
          <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0 bg-black z-10" />

          {/* Main Content */}
          <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column - Text Content */}
            <div className="flex flex-col border-r-0 md:border-r border-[#a89d7e]/30">
              <div className="p-8 md:p-12 lg:p-16 border-b border-[#a89d7e]/30 flex-grow flex flex-col justify-center">
                <div className="flex items-center mb-10 text-neutral-500 font-mono text-[10px] sm:text-[11px] uppercase">
                  <span className="inline-block w-1.5 h-1.5 bg-neutral-500 mr-3"></span>
                  BESPOKE SERVICE
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono uppercase leading-[1.1] mb-8">
                  DESIGN YOUR <br />
                  CUSTOM WIG
                </h2>
                
                <p className="font-mono text-neutral-400 text-xs sm:text-[13px] max-w-md leading-relaxed uppercase">
                  EXPERIENCE THE LUXURY OF A WIG TAILORED EXACTLY TO YOUR SPECIFICATIONS. SELECT YOUR PREFERRED PREMIUM LACE SYSTEM, BUNDLES, LENGTH, AND STYLE. OUR MASTER STYLISTS WILL CONSTRUCT YOUR MASTERPIECE WITH PRECISION.
                </p>
              </div>
              
              {/* Action Area */}
              <div className="p-8 md:p-12 lg:p-16 flex items-center bg-neutral-950">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group px-8 py-5 bg-transparent border border-white/50 text-white font-mono text-[11px] uppercase tracking-widest hover:bg-champagne-gold hover:text-obsidian-black hover:border-champagne-gold transition-all flex items-center w-fit"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-white group-hover:bg-obsidian-black mr-4 transition-colors"></span>
                  START BUILDING NOW
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative border-t md:border-t-0 border-[#a89d7e]/30 p-8 md:p-12 lg:p-16 flex items-center justify-center">
              <div className="absolute top-8 left-8 flex items-center text-neutral-500 font-mono text-[10px] sm:text-[11px] uppercase z-10">
                <span className="inline-block w-1.5 h-1.5 bg-neutral-500 mr-3"></span>
                PREMIUM CRAFTSMANSHIP
              </div>
              
              <div className="relative w-full aspect-[4/5] max-w-[500px] border border-[#a89d7e]/30 p-3 mt-8">
                 <div className="relative w-full h-full overflow-hidden bg-neutral-900 transition-all duration-700 grayscale hover:grayscale-0">
                    <Image 
                      src="/products.jpg" 
                      alt="Custom Wig Craftsmanship" 
                      fill 
                      className="object-cover opacity-80"
                    />
                 </div>
              </div>
            </div>
          </div>

          {/* Right Vertical Line Demarcation */}
          <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0 bg-black z-10" />
        </div>
      </section>

      {/* The Full-Screen Modal */}
      <WigBuilderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
