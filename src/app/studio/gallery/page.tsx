"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { Plus, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { IGalleryItem } from "@/types";

export default function StudioGalleryPage() {
  const [gallery, setGallery] = useState<IGalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<IGalleryItem> | null>(null);

  useEffect(() => {
    fetch("/api/studio/gallery")
      .then((res) => res.json())
      .then((data) => setGallery(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.imageUrl) return;

    try {
      const res = await fetch("/api/studio/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        const saved = await res.json();
        setGallery([...gallery, saved]);
        setIsModalOpen(false);
        setEditingItem(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete media item?")) return;
    try {
      await fetch(`/api/studio/gallery?id=${id}`, { method: "DELETE" });
      setGallery(gallery.filter((g) => g._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-space-bg text-gray-100 font-sans">
      <StudioSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StudioHeader />

        <main className="p-8 max-w-6xl w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
                <ImageIcon className="w-8 h-8 text-signal-cyan" />
                MEDIA GALLERY & CLOUDINARY UPLOADS
              </h1>
              <p className="font-mono text-xs text-signal-cyan mt-1">
                MANAGE VISUAL SCREENSHOTS, ARCHITECTURE SCHEMATICS, AND ASSETS
              </p>
            </div>

            <CyberButton
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingItem({
                  title: "",
                  caption: "",
                  category: "Architecture",
                  imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
                  isFeatured: false,
                  order: gallery.length + 1,
                });
                setIsModalOpen(true);
              }}
            >
              ADD MEDIA ASSET
            </CyberButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((g) => (
              <GlassCard key={g._id || g.title} glowColor="cyan" className="flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3 border border-space-border">
                    <Image src={g.imageUrl} alt={g.title} fill className="object-cover" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-headline font-bold text-white text-base truncate">{g.title}</h3>
                    <Badge variant="cyan">{g.category}</Badge>
                  </div>
                  <p className="text-xs text-gray-300 font-sans line-clamp-2">{g.caption}</p>
                </div>

                <div className="flex justify-end pt-3 border-t border-space-border/50 mt-3">
                  <button
                    onClick={() => handleDelete(g._id)}
                    className="p-1.5 rounded bg-space-bg border border-space-border text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Modal Editor */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="MEDIA ASSET UPLOADER">
            {editingItem && (
              <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-signal-cyan mb-1">ASSET TITLE</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-cyan mb-1">IMAGE URL (CLOUDINARY / HTTPS)</label>
                  <input
                    type="url"
                    value={editingItem.imageUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-cyan mb-1">CAPTION</label>
                  <textarea
                    rows={3}
                    value={editingItem.caption || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-space-border">
                  <CyberButton variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                    CANCEL
                  </CyberButton>
                  <CyberButton variant="primary" size="sm" type="submit">
                    SAVE ASSET
                  </CyberButton>
                </div>
              </form>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}
