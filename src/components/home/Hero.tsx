"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SLIDES = [
  {
    id: 1,
    image: "/hero.jpg",
    objectPosition: "center 20%",
    tag: "The Collection",
    title: "Luxury,\nRedefined",
    subtitle: "Experience the pinnacle of raw extensions and custom craftsmanship.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: 2,
    image: "/customization.jpg",
    objectPosition: "center center",
    tag: "Bespoke Wigs",
    title: "Made\nFor You",
    subtitle: "Tailored wig creation built to your exact specifications.",
    buttonText: "Customize Yours",
    buttonLink: "/#custom-wig",
  },
  {
    id: 3,
    image: "/products.jpg",
    objectPosition: "center center",
    tag: "Raw Extensions",
    title: "Luxury In\nEvery Strand",
    subtitle: "Unprocessed 100% human hair extensions sourced directly.",
    buttonText: "Shop Hair",
    buttonLink: "/shop",
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds per slide

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="w-full bg-pure-white border-b border-[#a89d7e]/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full flex min-h-full">
        {/* Left Vertical Line */}
        <div className="w-[16px] md:w-[24px] border-r border-[#a89d7e]/30 flex-shrink-0 bg-pure-white z-10" />

        {/* Main Slider Container */}
        <div className="flex-grow min-w-0 relative h-[65vh] md:h-[70vh] lg:h-[calc(100vh-92px)] min-h-[480px] lg:min-h-[650px] overflow-hidden bg-obsidian-black">

          {/* Top Segment Progress Bars (Hidden on Big Screens - lg:hidden) */}
          <div className="absolute top-4 left-4 right-4 z-30 flex lg:hidden gap-2 max-w-md mx-auto md:max-w-xl">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="flex-1 h-[2px] bg-white/30 overflow-hidden transition-all focus:outline-none cursor-pointer"
              >
                <div
                  className={`h-full bg-pure-white transition-all duration-300 ${idx === currentIndex
                      ? "w-full bg-champagne-gold"
                      : idx < currentIndex
                        ? "w-full bg-white/70"
                        : "w-0"
                    }`}
                />
              </button>
            ))}
          </div>

          {/* Slides Carousel Wrapper */}
          <div
            className="w-full h-full flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className="w-full h-full flex-shrink-0 relative bg-obsidian-black"
              >
                {/* Slide Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  sizes="100vw"
                  priority={idx === 0}
                  style={{ objectPosition: slide.objectPosition }}
                  className="object-cover opacity-85 grayscale transition-all duration-[2000ms] ease-out hover:grayscale-0 hover:scale-105"
                />

                {/* Dark Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 xl:p-24 z-20 text-pure-white w-full">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="flex items-center gap-3 mb-4 lg:mb-6">
                      <span className="inline-block w-1.5 h-1.5 bg-champagne-gold"></span>
                      <span className="text-champagne-gold text-[10px] lg:text-[11px] leading-none tracking-[0.2em] uppercase font-mono">
                        {slide.tag}
                      </span>
                    </div>
                    <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] xl:text-[84px] leading-[0.95] text-pure-white uppercase font-mono mb-6 lg:mb-8 whitespace-pre-line font-medium">
                      {slide.title}
                    </h1>
                    <p className="text-[12px] sm:text-[13px] lg:text-[14px] leading-relaxed text-concrete-gray font-mono max-w-md lg:max-w-lg mb-8 lg:mb-10 uppercase tracking-[0.05em]">
                      {slide.subtitle}
                    </p>
                    <div>
                      <Link
                        href={slide.buttonLink}
                        className="group inline-flex items-center justify-center bg-transparent border border-white text-white hover:bg-white hover:text-obsidian-black px-[28px] lg:px-[32px] py-[16px] lg:py-[20px] text-[10px] sm:text-[11px] leading-none tracking-[0.15em] uppercase font-mono transition-all duration-300"
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-white group-hover:bg-obsidian-black mr-4 transition-colors"></span>
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrow Controls */}
          <div className="absolute right-0 bottom-0 z-30 hidden lg:flex border-t border-l border-white/20 bg-black/30 backdrop-blur-md">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-[64px] h-[64px] flex items-center justify-center border-r border-white/20 text-white hover:bg-white hover:text-black transition-colors focus:outline-none"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-[64px] h-[64px] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors focus:outline-none"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right Vertical Line */}
        <div className="w-[16px] md:w-[24px] border-l border-[#a89d7e]/30 flex-shrink-0 bg-pure-white z-10" />
      </div>
    </section>
  );
}
