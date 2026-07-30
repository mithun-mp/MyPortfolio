"use client";

import React, { useState, useEffect } from "react";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { Plus, Edit2, Trash2, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { ISkillNode } from "@/types";

export default function StudioSkillsPage() {
  const [skills, setSkills] = useState<ISkillNode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Partial<ISkillNode> | null>(null);

  useEffect(() => {
    fetch("/api/studio/skills")
      .then((res) => res.json())
      .then((data) => setSkills(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.label) return;

    const isEdit = !!editingSkill._id;
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      ...editingSkill,
      id: editingSkill.id || editingSkill.label.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      category: editingSkill.category || "Core Capability",
      description: editingSkill.description || "",
      relatedTechs: typeof editingSkill.relatedTechs === "string"
        ? (editingSkill.relatedTechs as string).split(",").map((s) => s.trim())
        : editingSkill.relatedTechs || [],
      relatedCerts: typeof editingSkill.relatedCerts === "string"
        ? (editingSkill.relatedCerts as string).split("\n").filter(Boolean)
        : editingSkill.relatedCerts || [],
      relatedProjects: typeof editingSkill.relatedProjects === "string"
        ? (editingSkill.relatedProjects as string).split("\n").filter(Boolean)
        : editingSkill.relatedProjects || [],
    };

    try {
      const res = await fetch("/api/studio/skills", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isEdit) {
          setSkills(skills.map((s) => (s._id === saved._id ? saved : s)));
        } else {
          setSkills([...skills, saved]);
        }
        setIsModalOpen(false);
        setEditingSkill(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this skill node?")) return;
    try {
      await fetch(`/api/studio/skills?id=${id}`, { method: "DELETE" });
      setSkills(skills.filter((s) => s._id !== id));
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
                <Zap className="w-8 h-8 text-signal-violet" />
                SKILLS REACTOR NODE MANAGEMENT
              </h1>
              <p className="font-mono text-xs text-signal-violet mt-1">
                MANAGE CONSTELLATION CAPABILITIES AND ILLUMINATED EVIDENCE LINKS
              </p>
            </div>

            <CyberButton
              variant="secondary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingSkill({
                  label: "",
                  category: "Core Capability",
                  description: "",
                  relatedTechs: [],
                  relatedCerts: [],
                  relatedProjects: [],
                });
                setIsModalOpen(true);
              }}
            >
              ADD SKILL NODE
            </CyberButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <GlassCard key={skill._id || skill.id} glowColor="violet" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="violet">{skill.category}</Badge>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded bg-space-bg border border-space-border text-signal-violet"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 rounded bg-space-bg border border-space-border text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-white mb-2">{skill.label}</h3>
                  <p className="text-xs text-gray-300 font-sans line-clamp-3 mb-4">{skill.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Modal Editor */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="SKILL CONSTELLATION NODE EDITOR">
            {editingSkill && (
              <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-signal-violet mb-1">CAPABILITY LABEL</label>
                  <input
                    type="text"
                    value={editingSkill.label || ""}
                    onChange={(e) => setEditingSkill({ ...editingSkill, label: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-violet mb-1">CATEGORY</label>
                  <input
                    type="text"
                    value={editingSkill.category || ""}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                  />
                </div>

                <div>
                  <label className="block text-signal-violet mb-1">DESCRIPTION</label>
                  <textarea
                    rows={3}
                    value={editingSkill.description || ""}
                    onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-space-border">
                  <CyberButton variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                    CANCEL
                  </CyberButton>
                  <CyberButton variant="secondary" size="sm" type="submit">
                    SAVE SKILL NODE
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
