"use client";

import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { CustomWigOptionsResponse, fetchCustomWigOptions } from "@/services/api";
import WigBuilder from "./WigBuilder";

interface WigBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WigBuilderModal({ isOpen, onClose }: WigBuilderModalProps) {
  const [options, setOptions] = useState<CustomWigOptionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadOptions = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const data = await fetchCustomWigOptions();
    if (data) {
      setOptions(data);
    } else {
      setError("Failed to load options. Please try again.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (!options && !isLoading) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadOptions();
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, options, isLoading, loadOptions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="w-full h-full md:w-[90%] xl:w-[85%] max-w-[1440px] bg-pure-white shadow-2xl flex flex-col animate-slideInRight relative overflow-hidden rounded-l-[16px] md:rounded-l-[24px]">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-concrete-gray bg-pure-white z-10">
          <div>
            <h2 className="text-[20px] md:text-[28px] font-sans font-bold tracking-heading uppercase leading-none text-obsidian-black">
              Custom Wig Builder
            </h2>
            <p className="text-[12px] md:text-[14px] text-iron-gray font-sans mt-1">
              Design your perfect custom wig
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-mist-gray hover:bg-concrete-gray text-obsidian-black transition-colors"
            aria-label="Close builder"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-concrete-gray border-t-obsidian-black rounded-full animate-spin"></div>
              <p className="text-[12px] font-mono uppercase tracking-widest text-iron-gray">Loading options...</p>
            </div>
          ) : error ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              <p className="text-[12px] font-mono uppercase tracking-widest text-red-600 mb-4">{error}</p>
              <button
                onClick={loadOptions}
                className="px-6 py-3 bg-obsidian-black text-pure-white text-[11px] font-mono uppercase tracking-widest rounded-full hover:bg-champagne-gold hover:text-obsidian-black transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : options ? (
            <WigBuilder options={options} onClose={onClose} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
