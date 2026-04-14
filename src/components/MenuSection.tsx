"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Menu page images - Place your images in: public/images/menu/
const menuPages = [
  {
    id: 1,
    title: "Menu Page 1",
    src: "/images/menu/menu-page-1.png",
    alt: "Chai Logic Menu - Page 1",
  },
  {
    id: 2,
    title: "Menu Page 2",
    src: "/images/menu/menu-page-2.png",
    alt: "Chai Logic Menu - Page 2",
  },
  {
    id: 3,
    title: "Menu Page 3",
    src: "/images/menu/menu-page-3.png",
    alt: "Chai Logic Menu - Page 3",
  },
];

function MenuPageCard({ page, index, onClick }: {
  page: typeof menuPages[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="w-full cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
    >
      {/* Card Container - Fixed size, overflow hidden */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500 ease-in-out bg-white">

        {/* Image Wrapper - This handles the zoom */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={page.src}
            alt={page.alt}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Hover Overlay - Dark gradient + text */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-brown/0 to-brown/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-end justify-center pb-6">
          <div className="bg-gold/90 backdrop-blur-sm text-brown font-semibold py-3 px-8 rounded-full text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
            View Full Size
          </div>
        </div>
      </div>

      {/* Title Below Card */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-brown group-hover:text-gold transition-colors duration-300">
          {page.title}
        </h3>
      </div>
    </motion.div>
  );
}

// Full-screen Gallery Modal
function MenuPageModal({
  currentIndex,
  totalImages,
  onClose,
  onPrev,
  onNext
}: {
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);
  const lastTapRef = useRef(0);

  // Lock body scroll
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  // Keyboard navigation (desktop)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
    setIsZoomed(false);
  }, [currentIndex]);

  // Swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Double tap detection
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap - toggle zoom
      e.preventDefault();
      if (isZoomed) {
        setZoom(1);
        setIsZoomed(false);
      } else {
        setZoom(2);
        setIsZoomed(true);
      }
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;

    // Single touch - swipe detection
    if (!isZoomed) {
      touchStartX.current = e.touches[0].clientX;
      setIsSwiping(true);
    }
  }, [isZoomed]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping || isZoomed) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    setSwipeOffset(deltaX);
  }, [isSwiping, isZoomed]);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping || isZoomed) {
      setIsSwiping(false);
      setSwipeOffset(0);
      return;
    }

    const threshold = 80;
    if (Math.abs(swipeOffset) > threshold) {
      if (swipeOffset > 0) {
        onPrev();
      } else {
        onNext();
      }
    }
    setSwipeOffset(0);
    setIsSwiping(false);
  }, [isSwiping, isZoomed, swipeOffset, onPrev, onNext]);

  // Wheel zoom (desktop)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0 && !isZoomed) {
      setZoom(2);
      setIsZoomed(true);
    } else if (e.deltaY > 0 && isZoomed) {
      setZoom(1);
      setIsZoomed(false);
    }
  }, [isZoomed]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-40 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors hover:bg-black/70"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm font-medium">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Desktop Arrow Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-4 z-40 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-4 z-40 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full items-center justify-center text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        onClick={(e) => {
          if (isZoomed) {
            setZoom(1);
            setIsZoomed(false);
          }
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        animate={{
          x: isSwiping ? swipeOffset : 0,
          opacity: isSwiping ? 1 - Math.abs(swipeOffset) / 300 : 1,
        }}
        transition={isSwiping ? { type: "tween", ease: "linear" } : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ scale: zoom }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <Image
                src={menuPages[currentIndex].src}
                alt={menuPages[currentIndex].alt}
                fill
                className="object-contain select-none"
                sizes="100vw"
                priority
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Zoom Indicator */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/60 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            Double tap to zoom out
          </motion.div>
        )}
        {!isZoomed && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/40 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, delay: 1 }}
          >
            Swipe to navigate • Double tap to zoom
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MenuSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClose = () => setSelectedId(null);

  const handlePrev = () => {
    setSelectedId((prev) => {
      if (prev === null) return null;
      return prev === 0 ? menuPages.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setSelectedId((prev) => {
      if (prev === null) return null;
      return prev === menuPages.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-gradient-to-b from-cream to-brown/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-brown mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Menu
        </motion.h2>
        <motion.p
          className="text-center text-brown/70 mb-12 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Click on any page to view it in full size
        </motion.p>

        {/* Menu Pages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {menuPages.map((page, index) => (
            <MenuPageCard
              key={page.id}
              page={page}
              index={index}
              onClick={() => setSelectedId(index)}
            />
          ))}
        </div>


      </div>

      {/* Full Size Modal */}
      <AnimatePresence>
        {selectedId !== null && (
          <MenuPageModal
            currentIndex={selectedId}
            totalImages={menuPages.length}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
