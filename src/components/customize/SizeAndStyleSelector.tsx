"use client";

import React from "react";

interface SizeAndStyleSelectorProps {
  headSizes: string[];
  wigStyles: string[];
  headSize: string;
  onChangeHeadSize: (val: string) => void;
  wigStyle: string;
  onChangeWigStyle: (val: string) => void;
}

export default function SizeAndStyleSelector({
  headSizes,
  wigStyles,
  headSize,
  onChangeHeadSize,
  wigStyle,
  onChangeWigStyle
}: SizeAndStyleSelectorProps) {
  return (
    <div className="p-8 md:p-12 border-b border-[#a89d7e]/30">
      <div className="mb-6">
        <h2 className="text-[20px] font-sans font-bold tracking-heading uppercase leading-none text-obsidian-black mb-2">
          3. Specifications <span className="text-champagne-gold">*</span>
        </h2>
        <p className="text-iron-gray text-[14px] font-sans">Finalize your wig with custom sizing and styling.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Head Size */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-obsidian-black font-bold mb-3">
            Head Size
          </label>
          <div className="flex flex-wrap gap-3">
            {headSizes.map((size) => (
              <button
                key={size}
                onClick={() => onChangeHeadSize(size)}
                className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-[4px] border transition-colors ${
                  headSize === size
                    ? "bg-obsidian-black text-pure-white border-obsidian-black"
                    : "bg-pure-white text-obsidian-black border-concrete-gray hover:border-obsidian-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-iron-gray mt-2 font-mono">
            Measure the circumference of your head for a perfect fit.
          </p>
        </div>

        {/* Wig Style */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-obsidian-black font-bold mb-3">
            Wig Style
          </label>
          <div className="flex flex-wrap gap-3">
            {wigStyles.map((style) => (
              <button
                key={style}
                onClick={() => onChangeWigStyle(style)}
                className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider rounded-[4px] border transition-colors ${
                  wigStyle === style
                    ? "bg-obsidian-black text-pure-white border-obsidian-black"
                    : "bg-pure-white text-obsidian-black border-concrete-gray hover:border-obsidian-black"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
