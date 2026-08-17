import React from "react";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-pure-white">
      <FiCheckCircle className="text-green-600 mb-6" size={64} />
      <h1 className="text-[24px] font-sans font-bold tracking-heading uppercase text-obsidian-black mb-4">
        Order Successful
      </h1>
      <p className="text-[14px] font-sans text-iron-gray max-w-md mb-8">
        Thank you for your purchase! We&apos;ve received your order and are getting it ready. You&apos;ll receive a confirmation email shortly.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-obsidian-black text-pure-white text-[11px] font-mono uppercase tracking-widest font-bold rounded-full hover:bg-champagne-gold hover:text-obsidian-black transition-all"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
