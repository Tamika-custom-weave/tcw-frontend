"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface ComboboxOption {
  id: string;
  label: string;
  subLabel?: string;
  price?: number;
  image?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // original item data
}

interface SearchableComboboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  onSelect: (option: ComboboxOption) => void;
  disabled?: boolean;
}

export default function SearchableCombobox({
  options,
  placeholder = "Search...",
  onSelect,
  disabled = false,
}: SearchableComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opt.subLabel && opt.subLabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className={`flex items-center w-full border rounded-[4px] bg-pure-white transition-colors
          ${disabled ? "opacity-50 cursor-not-allowed border-mist-gray" : isOpen ? "border-obsidian-black ring-1 ring-obsidian-black" : "border-concrete-gray hover:border-obsidian-black"}
        `}
      >
        <input
          type="text"
          className="w-full bg-transparent px-4 py-3 text-[12px] font-mono focus-visible:outline-none disabled:cursor-not-allowed"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
        />
        <div className="px-3">
          <svg className={`w-4 h-4 text-iron-gray transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-pure-white border border-concrete-gray shadow-md max-h-60 overflow-y-auto rounded-[4px]">
          {filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map((opt) => (
                <li
                  key={opt.id}
                  onClick={() => {
                    onSelect(opt);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className="px-4 py-3 hover:bg-mist-gray cursor-pointer border-b border-mist-gray last:border-b-0 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center flex-grow">
                    {opt.image && (
                      <div className="relative w-10 h-10 mr-3 flex-shrink-0 bg-gray-50 rounded-[2px] overflow-hidden">
                        <Image src={opt.image} alt={opt.label} fill sizes="40px" className="object-cover" />
                      </div>
                    )}
                    <div>
                      <span className="block text-[12px] font-mono text-obsidian-black group-hover:text-champagne-gold transition-colors line-clamp-1">
                        {opt.label}
                      </span>
                      {opt.subLabel && (
                        <span className="block text-[10px] font-mono text-iron-gray mt-0.5 line-clamp-1">
                          {opt.subLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  {opt.price !== undefined && (
                    <span className="text-[12px] font-sans font-bold text-obsidian-black ml-4 flex-shrink-0">
                      ${opt.price.toFixed(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-[11px] font-mono text-iron-gray text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
