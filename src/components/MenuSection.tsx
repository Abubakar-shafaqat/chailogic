"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      className="flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
    >
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl bg-white">
        <Image
          src={page.src}
          alt={page.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gold text-brown font-bold py-3 px-6 rounded-full text-lg">
            View Full Size
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-brown">{page.title}</h3>
      </div>
    </motion.div>
  );
}

// Modal Component for viewing full menu page
function MenuPageModal({ 
  page, 
  onClose 
}: { 
  page: typeof menuPages[0] | null; 
  onClose: () => void;
}) {
  if (!page) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-brown/80 hover:bg-brown text-cream rounded-full flex items-center justify-center transition-colors text-xl font-bold"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full h-[80vh]">
          <Image
            src={page.src}
            alt={page.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Navigation hint */}
       
      </motion.div>
    </motion.div>
  );
}

export default function MenuSection() {
  const [selectedPage, setSelectedPage] = useState<typeof menuPages[0] | null>(null);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {menuPages.map((page, index) => (
            <MenuPageCard
              key={page.id}
              page={page}
              index={index}
              onClick={() => setSelectedPage(page)}
            />
          ))}
        </div>

        
      </div>

      {/* Full Size Modal */}
      {selectedPage && (
        <MenuPageModal
          page={selectedPage}
          onClose={() => setSelectedPage(null)}
        />
      )}
    </section>
  );
}
