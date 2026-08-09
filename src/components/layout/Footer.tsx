import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight mb-6 block">
              TCW
              <span className="block text-[0.6rem] font-sans tracking-[0.2em] font-normal uppercase text-gray-400 mt-1">
                Tamika Custom Weave
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium luxury hair extensions, custom wigs, and professional installation services tailored to perfection.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-brand-gold">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/shop/bundles" className="hover:text-brand-gold transition-colors">Raw Bundles</Link></li>
              <li><Link href="/shop/closures" className="hover:text-brand-gold transition-colors">Lace Closures</Link></li>
              <li><Link href="/shop/frontals" className="hover:text-brand-gold transition-colors">HD Frontals</Link></li>
              <li><Link href="/custom-wigs" className="hover:text-brand-gold transition-colors">Custom Wigs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-brand-gold">Client Care</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-brand-gold transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/book" className="hover:text-brand-gold transition-colors">Book Installation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-brand-gold">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border border-gray-700 py-3 px-4 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button 
                type="submit"
                className="bg-brand-gold text-brand-black font-semibold text-sm uppercase tracking-wider py-3 px-4 hover:bg-brand-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Tamika Custom Weave. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
