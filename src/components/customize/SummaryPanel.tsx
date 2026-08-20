"use client";

import React from "react";
import { SelectedLaceSystem, SelectedBundle } from "./WigBuilder";

interface SummaryPanelProps {
  laceSystem: SelectedLaceSystem;
  bundles: SelectedBundle[];
  headSize: string;
  hairLength: string;
  wigStyle: string;
  styling: string;
  totalPrice: number | null;
  isCalculating: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  error: string | null;
  onSubmit: () => void;
}

export default function SummaryPanel({
  laceSystem,
  bundles,
  headSize,
  hairLength,
  wigStyle,
  styling,
  totalPrice,
  isCalculating,
  isSubmitting,
  isValid,
  error,
  onSubmit,
}: SummaryPanelProps) {
  const totalBundles = bundles.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="p-8 lg:p-12 flex flex-col bg-pure-white">
      <h2 className="text-[16px] font-mono font-bold tracking-widest uppercase leading-none text-obsidian-black border-b border-concrete-gray pb-4 mb-6">
        Summary
      </h2>

      <div className="flex-grow flex flex-col space-y-6">
        {/* Lace System Summary */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-iron-gray mb-1">Lace System</p>
            {laceSystem ? (
              <div>
                <p className="text-[12px] font-sans font-medium text-obsidian-black line-clamp-1">
                  {laceSystem.product.name}
                </p>
                <p className="text-[11px] font-mono text-iron-gray mt-1">
                  {laceSystem.variantSku}
                </p>
              </div>
            ) : (
              <p className="text-[12px] font-sans text-iron-gray italic">Not selected</p>
            )}
          </div>
        </div>

        {/* Bundles Summary */}
        <div className="flex justify-between items-start">
          <div className="w-full">
            <p className="text-[10px] font-mono uppercase tracking-widest text-iron-gray mb-1">
              Bundles ({totalBundles})
            </p>
            {bundles.length > 0 ? (
              <ul className="space-y-3 mt-2">
                {bundles.map((b, idx) => (
                  <li key={idx} className="flex justify-between items-start text-[12px] font-sans text-obsidian-black">
                    <span className="flex-grow pr-4">
                      {b.quantity}x {b.product.name}
                      <span className="block text-[11px] font-mono text-iron-gray mt-0.5">
                        {b.variantSku}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[12px] font-sans text-iron-gray italic">Not selected</p>
            )}
          </div>
        </div>

        {/* Specifications Summary */}
        <div className="border-t border-concrete-gray pt-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-iron-gray mb-1">Size</p>
              <p className="text-[12px] font-sans text-obsidian-black">
                {headSize || <span className="text-iron-gray italic">--</span>}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-iron-gray mb-1">Style</p>
              <p className="text-[12px] font-sans text-obsidian-black">
                {wigStyle || <span className="text-iron-gray italic">--</span>}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-iron-gray mb-1">Styling</p>
              <p className="text-[12px] font-sans text-obsidian-black">
                {styling || <span className="text-iron-gray italic">--</span>}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-iron-gray mb-1">Length</p>
              <p className="text-[12px] font-sans text-obsidian-black">
                {hairLength ? `${hairLength}"` : <span className="text-iron-gray italic">--</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price and Submit */}
      <div className="
        border-t border-[#a89d7e]/30 
        pt-4 pb-6 px-6 mt-8 
        fixed bottom-0 left-0 right-0 z-[100] bg-pure-white shadow-[0_-8px_30px_rgba(0,0,0,0.15)] 
        lg:static lg:p-0 lg:mt-8 lg:shadow-none lg:z-auto lg:bg-transparent
      ">
        <div className="flex justify-between items-end mb-6">
          <span className="text-[14px] font-mono uppercase tracking-widest text-obsidian-black">Estimated Total</span>
          <div className="flex items-center h-[32px]">
            {isCalculating ? (
              <div className="w-5 h-5 border-2 border-concrete-gray border-t-obsidian-black rounded-full animate-spin"></div>
            ) : (
              <span className="text-[24px] font-sans font-bold text-obsidian-black">
                ${totalPrice !== null ? totalPrice.toFixed(2) : "0.00"}
              </span>
            )}
          </div>
        </div>

        {error && (
          <p className="text-[11px] text-red-600 font-mono mb-4 text-center">{error}</p>
        )}

        <button
          onClick={onSubmit}
          disabled={!isValid || isSubmitting || isCalculating}
          className={`w-full py-4 px-6 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold transition-all flex justify-center items-center ${
            !isValid 
              ? "bg-mist-gray text-ash-gray cursor-not-allowed" 
              : "bg-obsidian-black text-pure-white hover:bg-champagne-gold hover:text-obsidian-black"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <div className="w-4 h-4 border-2 border-pure-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </span>
          ) : (
            "Build Custom Wig"
          )}
        </button>

        {!isValid && (
          <p className="text-[10px] font-mono text-center text-iron-gray mt-4">
            Please complete all selections to proceed.
          </p>
        )}
      </div>
    </div>
  );
}
