"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertCircle, FiRefreshCcw } from "react-icons/fi";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Shop page error:", error);
  }, [error]);

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center bg-pure-white min-h-[60vh] py-20 px-4">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6 text-red-500">
          <FiAlertCircle size={32} />
        </div>
        
        <h2 className="text-[24px] font-sans font-bold tracking-heading uppercase text-obsidian-black mb-4">
          Failed to Load Products
        </h2>
        
        <p className="text-[14px] text-iron-gray mb-8">
          We encountered an issue while loading the shop collection. Please check your connection and try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center bg-obsidian-black text-pure-white hover:bg-champagne-gold px-6 py-3 text-[11px] font-mono tracking-widest uppercase transition-colors"
          >
            <FiRefreshCcw className="mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center bg-transparent border border-obsidian-black text-obsidian-black hover:bg-mist-gray px-6 py-3 text-[11px] font-mono tracking-widest uppercase transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
