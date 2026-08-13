import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white font-mono uppercase text-[10px] sm:text-[11px] w-full border-t border-[#a89d7e]/30 tracking-wider">
      <div className="w-full flex min-h-full">
        {/* Left Vertical Line Demarcation */}
        <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0 bg-black z-10" />

        <div className="flex-grow w-full">
          {/* Top Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#a89d7e]/30">
            
            {/* Column 1: Products */}
            <div className="border-r-0 border-b md:border-b-0 md:border-r border-[#a89d7e]/30 p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-center mb-6 text-neutral-500">
                <span className="inline-block w-1.5 h-1.5 bg-neutral-500 mr-3"></span>
                PRODUCTS
              </div>
              <ul className="space-y-3 text-neutral-300">
                <li><Link href="/shop/bundles" className="hover:text-white transition-colors block">RAW BUNDLES</Link></li>
                <li><Link href="/shop/closures" className="hover:text-white transition-colors block">LACE CLOSURES</Link></li>
                <li><Link href="/shop/frontals" className="hover:text-white transition-colors block">HD FRONTALS</Link></li>
                <li><Link href="/custom-wigs" className="hover:text-white transition-colors block">CUSTOM WIGS</Link></li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="border-r-0 border-b md:border-b-0 md:border-r border-[#a89d7e]/30 p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-center mb-6 text-neutral-500">
                <span className="inline-block w-1.5 h-1.5 bg-neutral-500 mr-3"></span>
                SERVICES
              </div>
              <ul className="space-y-3 text-neutral-300">
                <li><Link href="/custom-wigs" className="hover:text-white transition-colors block">CUSTOMIZATION</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors block">CONSULTATION</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors block">FAQ & SUPPORT</Link></li>
              </ul>
            </div>

            {/* Column 3: Social */}
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-center mb-6 text-neutral-500">
                <span className="inline-block w-1.5 h-1.5 bg-neutral-500 mr-3"></span>
                SOCIAL MEDIA
              </div>
              <ul className="space-y-3 text-neutral-300">
                <li><a href="#" className="hover:text-white transition-colors block">INSTAGRAM</a></li>
                <li><a href="#" className="hover:text-white transition-colors block">TIKTOK</a></li>
                <li><a href="#" className="hover:text-white transition-colors block">FACEBOOK</a></li>
                <li><a href="#" className="hover:text-white transition-colors block">YOUTUBE</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Row Grid */}
          <div className="grid grid-cols-1">
            {/* Column: Legal */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between relative">
              <div>
                <div className="flex items-center mb-6 md:mb-4 text-neutral-500">
                  <span className="inline-block w-1.5 h-1.5 bg-neutral-500 mr-3"></span>
                  LEGAL
                </div>
                <ul className="space-y-3 md:space-y-0 md:flex md:space-x-8 text-neutral-300">
                  <li><Link href="/terms" className="hover:text-white transition-colors block">GENERAL TERMS AND CONDITIONS</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors block">DATA PROTECTION</Link></li>
                </ul>
              </div>
              <div className="mt-8 md:mt-0 flex items-center text-neutral-400">
                <span className="inline-block w-1.5 h-1.5 bg-neutral-400 mr-3"></span>
                TCW {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Vertical Line Demarcation */}
        <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0 bg-black z-10" />
      </div>
    </footer>
  );
}
