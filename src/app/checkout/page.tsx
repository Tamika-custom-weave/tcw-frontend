import React from "react";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-pure-white">
      <h1 className="text-[24px] font-sans font-bold tracking-heading uppercase text-obsidian-black mb-4">
        Checkout Coming Soon
      </h1>
      <p className="text-[14px] font-sans text-iron-gray max-w-md mb-8">
        We are currently building our secure checkout system. Please check back later to complete your purchase!
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-obsidian-black text-pure-white text-[11px] font-mono uppercase tracking-widest font-bold rounded-full hover:bg-champagne-gold hover:text-obsidian-black transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
