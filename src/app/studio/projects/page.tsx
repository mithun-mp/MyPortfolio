"use client";

import React, { useState, useEffect } from "react";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { Plus, Edit2, Trash2, FolderGit2, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { IProject } from "@/types";

export default function StudioProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<IProject> | null>(null);

  useEffect(() => {
    fetch("/api/studio/projects")
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    const isEdit = !!editingProject._id;
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      ...editingProject,
      slug: editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      status: editingProject.status || "published",
      order: editingProject.order || projects.length + 1,
      technologies: typeof editingProject.technologies === "string" 
        ? (editingProject.technologies as string).split(",").map((s) => s.trim()) 
        : editingProject.technologies || ["Python"],
      keyLearnings: typeof editingProject.keyLearnings === "string"
        ? (editingProject.keyLearnings as string).split("\n").filter(Boolean)
        : editingProject.keyLearnings || [],
      images: editingProject.images || [
        { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80", caption: editingProject.title }
      ]
    };

    try {
      const res = await fetch("/api/studio/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isEdit) {
          setProjects(projects.map((p) => (p._id === saved._id ? saved : p)));
        } else {
          setProjects([...projects, saved]);
        }
        setIsModalOpen(false);
        setEditingProject(null);
      }
    } catch (err) {
      console.error("Save project error:", err);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/studio/projects?id=${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p._id !== id));
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
                <FolderGit2 className="w-8 h-8 text-signal-cyan" />
                PROJECTS COMMAND DECK CRUD
              </h1>
              <p className="font-mono text-xs text-signal-cyan mt-1">
                MANAGE FEATURED MISSIONS, DOSSIERS, LINKS, AND DISPLAY ORDER
              </p>
            </div>

            <CyberButton
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingProject({
                  title: "",
                  tagline: "",
                  summary: "",
                  problemSolved: "",
                  technologies: ["Next.js", "TypeScript"],
                  keyLearnings: [],
                  featured: true,
                  status: "published",
                });
                setIsModalOpen(true);
              }}
            >
              ADD NEW PROJECT
            </CyberButton>
          </div>

          <div className="space-y-4">
            {projects.map((p) => (
              <GlassCard key={p._id || p.slug} glowColor="cyan" className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-signal-cyan">MISSION #{p.order}</span>
                    <Badge variant={p.status === "published" ? "cyan" : "gray"}>
                      {p.status.toUpperCase()}
                    </Badge>
                    {p.featured && <Badge variant="lime">FEATURED</Badge>}
                  </div>
                  <h3 className="text-lg font-headline font-bold text-white truncate">{p.title}</h3>
                  <p className="font-mono text-xs text-gray-400 truncate">{p.tagline}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProject(p);
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded bg-space-bg border border-space-border text-signal-cyan hover:bg-signal-cyan/10"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 rounded bg-space-bg border border-space-border text-red-400 hover:bg-red-950/40"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Project Edit / Create Modal */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="PROJECT DOSSIER EDITOR">
            {editingProject && (
              <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-signal-cyan mb-1">PROJECT TITLE</label>
                  <input
                    type="text"
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-cyan mb-1">TAGLINE</label>
                  <input
                    type="text"
                    value={editingProject.tagline || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-cyan mb-1">SUMMARY</label>
                  <textarea
                    rows={3}
                    value={editingProject.summary || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-cyan mb-1">PROBLEM SOLVED & ARCHITECTURE</label>
                  <textarea
                    rows={3}
                    value={editingProject.problemSolved || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, problemSolved: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-cyan mb-1">TECHNOLOGIES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={
                      Array.isArray(editingProject.technologies)
                        ? editingProject.technologies.join(", ")
                        : editingProject.technologies || ""
                    }
                    onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value as any })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    />
                    <span>FEATURED STATUS</span>
                  </label>

                  <div>
                    <label className="mr-2">STATUS:</label>
                    <select
                      value={editingProject.status || "published"}
                      onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                      className="bg-space-bg border border-space-border p-1.5 rounded text-white"
                    >
                      <option value="published">PUBLISHED</option>
                      <option value="draft">DRAFT</option>
                      <option value="archived">ARCHIVED</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-space-border">
                  <CyberButton variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                    CANCEL
                  </CyberButton>
                  <CyberButton variant="primary" size="sm" type="submit">
                    SAVE PROJECT DOSSIER
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
