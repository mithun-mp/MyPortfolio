"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Image as ImageIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { IGalleryItem } from "@/types";
import { cn } from "@/lib/utils";

interface MediaGalleryProps {
  items: IGalleryItem[];
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<IGalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        systemCode="GALLERY_08"
        title="Visual Media & Architecture Gallery"
        subtitle="UI visual design artifacts, system architecture schematics, and project screenshots."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all",
              activeCategory === cat
                ? "bg-signal-cyan text-space-bg font-bold shadow-cyan-glow"
                : "bg-space-card border border-space-border text-gray-400 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedItem(item)}
            className={cn(
              "group relative rounded-xl overflow-hidden border border-space-border/60 bg-space-card cursor-pointer shadow-glass transition-all duration-300 hover:border-signal-cyan/60 hover:shadow-cyan-glow",
              item.isFeatured ? "aspect-video sm:col-span-2" : "aspect-[4/3]"
            )}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-bg via-space-bg/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Badge variant="cyan">{item.category}</Badge>
                <div className="p-2 rounded-full bg-space-bg/80 border border-signal-cyan/40 text-signal-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="font-headline font-bold text-lg text-white group-hover:text-signal-cyan transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-300 font-sans line-clamp-1 mt-1">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title}
        maxWidth="4xl"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-space-border">
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                className="object-contain bg-black/60"
              />
            </div>
            <div className="flex items-center justify-between border-t border-space-border pt-4">
              <p className="text-sm text-gray-300 font-sans">{selectedItem.caption}</p>
              <Badge variant="cyan">{selectedItem.category}</Badge>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
