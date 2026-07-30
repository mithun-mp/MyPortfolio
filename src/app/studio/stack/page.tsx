"use client";

import React, { useState, useEffect } from "react";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { Plus, Edit2, Trash2, Cpu } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { ITechnology } from "@/types";

export default function StudioStackPage() {
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Partial<ITechnology> | null>(null);

  useEffect(() => {
    fetch("/api/studio/technologies")
      .then((res) => res.json())
      .then((data) => setTechnologies(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTech?.name) return;

    const isEdit = !!editingTech._id;
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      ...editingTech,
      category: editingTech.category || "Technologies",
      iconName: editingTech.iconName || "Cpu",
      description: editingTech.description || "",
      relatedProjectSlugs: typeof editingTech.relatedProjectSlugs === "string"
        ? (editingTech.relatedProjectSlugs as string).split(",").map((s) => s.trim())
        : editingTech.relatedProjectSlugs || [],
    };

    try {
      const res = await fetch("/api/studio/technologies", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isEdit) {
          setTechnologies(technologies.map((t) => (t._id === saved._id ? saved : t)));
        } else {
          setTechnologies([...technologies, saved]);
        }
        setIsModalOpen(false);
        setEditingTech(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this technology item?")) return;
    try {
      await fetch(`/api/studio/technologies?id=${id}`, { method: "DELETE" });
      setTechnologies(technologies.filter((t) => t._id !== id));
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
                <Cpu className="w-8 h-8 text-signal-lime" />
                STACK LAB & TOOLS MANAGEMENT
              </h1>
              <p className="font-mono text-xs text-signal-lime mt-1">
                MANAGE LANGUAGES, TECHNOLOGIES, AND TOOLS CAPABILITY DESCRIPTIONS
              </p>
            </div>

            <CyberButton
              variant="accent"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingTech({
                  name: "",
                  category: "Technologies",
                  iconName: "Cpu",
                  description: "",
                  relatedProjectSlugs: [],
                });
                setIsModalOpen(true);
              }}
            >
              ADD TECHNOLOGY
            </CyberButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <GlassCard key={tech._id || tech.name} glowColor="lime" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="lime">{tech.category}</Badge>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingTech(tech);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded bg-space-bg border border-space-border text-signal-lime"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(tech._id)}
                        className="p-1.5 rounded bg-space-bg border border-space-border text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-white mb-2">{tech.name}</h3>
                  <p className="text-xs text-gray-300 font-sans line-clamp-3 mb-4">{tech.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Modal Editor */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="TECHNOLOGY NODE EDITOR">
            {editingTech && (
              <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-signal-lime mb-1">NAME</label>
                  <input
                    type="text"
                    value={editingTech.name || ""}
                    onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-lime mb-1">CATEGORY</label>
                  <select
                    value={editingTech.category || "Technologies"}
                    onChange={(e) => setEditingTech({ ...editingTech, category: e.target.value as any })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                  >
                    <option value="Languages">Languages</option>
                    <option value="Technologies">Technologies</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-signal-lime mb-1">CAPABILITY DESCRIPTION</label>
                  <textarea
                    rows={4}
                    value={editingTech.description || ""}
                    onChange={(e) => setEditingTech({ ...editingTech, description: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-space-border">
                  <CyberButton variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                    CANCEL
                  </CyberButton>
                  <CyberButton variant="accent" size="sm" type="submit">
                    SAVE TECHNOLOGY
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
