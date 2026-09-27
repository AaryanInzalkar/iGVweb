'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Project, ProjectStatus, ProjectFormData } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/Button';
import { formatDate, slugify, isValidHttpsUrl } from '@/lib/utils';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  LogOut,
  ExternalLink,
  Save,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    slug: '',
    description: '',
    sdg_numbers: [4],
    impact_text: '',
    local_committee: 'AIESEC in Bhopal',
    host_organization: '',
    location: 'Bhopal, MP, India',
    start_date: '',
    end_date: '',
    registration_deadline: '',
    application_url: 'https://aiesec.org/opportunity/',
    image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
    image_alt_text: '',
    status: 'draft',
  });

  // Fetch real project data from the database on mount
  async function refreshProjects() {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/admin/projects');
      if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
      const data: Project[] = await res.json();
      setProjects(data);
    } catch (e: any) {
      setLoadError(e.message || 'Failed to load projects.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshProjects();
  }, []);

  const handleOpenNew = () => {
    setCurrentProject(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      sdg_numbers: [4],
      impact_text: '',
      local_committee: 'AIESEC in Bhopal',
      host_organization: '',
      location: 'Bhopal, MP, India',
      start_date: '2026-11-01',
      end_date: '2026-12-15',
      registration_deadline: '2026-10-25',
      application_url: 'https://aiesec.org/opportunity/1345678',
      image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
      image_alt_text: 'Project activity in Bhopal',
      status: 'draft',
    });
    setFormError(null);
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      name: project.name,
      slug: project.slug,
      description: project.description,
      sdg_numbers: project.sdg_numbers,
      impact_text: project.impact_text,
      local_committee: project.local_committee,
      host_organization: project.host_organization,
      location: project.location,
      start_date: project.start_date,
      end_date: project.end_date,
      registration_deadline: project.registration_deadline,
      application_url: project.application_url,
      image_url: project.image_url || '',
      image_alt_text: project.image_alt_text || '',
      status: project.status,
    });
    setFormError(null);
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: nameVal,
      slug: currentProject ? prev.slug : slugify(nameVal),
    }));
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation Rules (per TRD & Backend Schema)
    if (!formData.name.trim()) {
      setFormError('Project title is required.');
      return;
    }
    if (!formData.slug.trim()) {
      setFormError('Slug is required.');
      return;
    }
    if (!formData.host_organization.trim()) {
      setFormError('Host Organization is required.');
      return;
    }
    if (!formData.start_date || !formData.end_date) {
      setFormError('Start date and End date are required.');
      return;
    }
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      setFormError('End date cannot precede Start date.');
      return;
    }
    if (!isValidHttpsUrl(formData.application_url)) {
      setFormError('Application URL must be a valid HTTPS URL starting with https://');
      return;
    }

    setIsSaving(true);
    try {
      const url = currentProject
        ? `/api/admin/projects/${currentProject.id}`
        : '/api/admin/projects';
      const method = currentProject ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Save failed. Please try again.');
      }

      setFormSuccess(
        currentProject
          ? `Updated "${formData.name}" successfully.`
          : `Created project "${formData.name}" successfully.`
      );
      setIsEditing(false);
      await refreshProjects();
      setTimeout(() => setFormSuccess(null), 4000);
    } catch (e: any) {
      setFormError(e.message || 'Something went wrong saving this project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_publish', currentStatus: project.status }),
      });
      if (!res.ok) throw new Error('Failed to update publish status.');
      await refreshProjects();
    } catch (e: any) {
      setLoadError(e.message);
    }
  };

  const handleArchive = async (projectId: string) => {
    if (!confirm('Are you sure you want to archive this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'archive' }),
      });
      if (!res.ok) throw new Error('Failed to archive project.');
      await refreshProjects();
    } catch (e: any) {
      setLoadError(e.message);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.host_organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Overview Stats
  const totalCount = projects.length;
  const publishedCount = projects.filter((p) => p.status === 'published' || p.status === 'closing_soon').length;
  const draftCount = projects.filter((p) => p.status === 'draft').length;
  const closedCount = projects.filter((p) => p.status === 'closed' || p.status === 'archived').length;

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#071B2F] flex flex-col">
      {/* Top Header */}
      <header className="bg-[#071B2F] text-white py-4 px-6 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#037EF3] text-white flex items-center justify-center font-bold text-sm">
            GV
          </div>
          <div>
            <h1 className="font-bold text-base">AIESEC Bhopal Admin CMS</h1>
            <p className="text-[10px] text-slate-400">Incoming Global Volunteer Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1"
          >
            <span>Preview Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="text-xs text-red-400 hover:text-red-300 inline-flex items-center gap-1 font-bold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-grow">
        {/* Toast Feedback */}
        {formSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center justify-between">
            <span>{formSuccess}</span>
            <button onClick={() => setFormSuccess(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {loadError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-bold flex items-center justify-between">
            <span>{loadError}</span>
            <button onClick={() => setLoadError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-1">
            <span className="text-xs text-[#5B6573] font-semibold">Total Projects</span>
            <div className="text-2xl font-black text-[#071B2F]">{totalCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-1">
            <span className="text-xs text-emerald-700 font-semibold">Published Active</span>
            <div className="text-2xl font-black text-emerald-700">{publishedCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-1">
            <span className="text-xs text-blue-700 font-semibold">Drafts</span>
            <div className="text-2xl font-black text-blue-700">{draftCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-1">
            <span className="text-xs text-slate-500 font-semibold">Closed / Archived</span>
            <div className="text-2xl font-black text-slate-500">{closedCount}</div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-[#071B2F]">Project Catalog Management</h2>

            <Button variant="primary" size="md" onClick={handleOpenNew}>
              <Plus className="w-4 h-4 mr-1" />
              <span>Create New Project</span>
            </Button>
          </div>

          {/* Search & Filter bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by project name or host organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#037EF3]"
              />
            </div>

            <div className="sm:col-span-4 relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#037EF3] bg-white cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="closing_soon">Closing Soon</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Table */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F5F0] border-b border-[#E5E7EB] text-xs font-bold text-[#5B6573] uppercase tracking-wider">
                  <th className="py-3.5 px-6">Project Title</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">SDGs</th>
                  <th className="py-3.5 px-4">Host Org</th>
                  <th className="py-3.5 px-4">Reg. Deadline</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#5B6573]">
                      <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                      Loading projects...
                    </td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#5B6573]">
                      No projects found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#071B2F]">
                        <Link href={`/projects/${p.slug}`} target="_blank" className="hover:text-[#037EF3]">
                          {p.name}
                        </Link>
                        <div className="text-xs font-normal text-slate-400 font-mono mt-0.5">
                          /{p.slug}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <StatusBadge status={p.status} showIcon={false} />
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.sdg_numbers.map((sdg) => (
                            <SDGBadge key={sdg} sdgNumber={sdg} showTitle={false} size="sm" />
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-medium text-[#071B2F]">
                        {p.host_organization}
                      </td>

                      <td className="py-4 px-4 text-xs font-mono text-[#5B6573]">
                        {formatDate(p.registration_deadline)}
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`p-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                            p.status === 'published'
                              ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                              : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                          }`}
                          title={p.status === 'published' ? 'Unpublish to draft' : 'Publish project'}
                        >
                          {p.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          onClick={() => handleEdit(p)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleArchive(p.id)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Archive Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Project Modal Slide-Over */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <h3 className="text-xl font-black text-[#071B2F]">
                  {currentProject ? 'Edit Project' : 'Create New Project'}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form id="project-form" onSubmit={handleSaveForm} className="space-y-4 pt-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#071B2F]">Project Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleNameChange}
                      placeholder="e.g., Global Classroom 2026"
                      className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#071B2F]">URL Slug *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="global-classroom-2026"
                      className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm font-mono focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#071B2F]">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a thorough overview of the volunteer project..."
                    className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#071B2F]">Community Impact Statement *</label>
                  <input
                    type="text"
                    required
                    value={formData.impact_text}
                    onChange={(e) => setFormData({ ...formData, impact_text: e.target.value })}
                    placeholder="e.g., Impacted 450+ students across 6 primary schools."
                    className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#071B2F]">Host Organization *</label>
                    <input
                      type="text"
                      required
                      value={formData.host_organization}
                      onChange={(e) => setFormData({ ...formData, host_organization: e.target.value })}
                      placeholder="Bhopal Community Trust"
                      className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#071B2F]">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                      className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none bg-white"
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="published">Published (Public)</option>
                      <option value="closing_soon">Closing Soon</option>
                      <option value="closed">Closed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#071B2F]">Start Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#071B2F]">End Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#071B2F]">Registration Deadline *</label>
                    <input
                      type="date"
                      required
                      value={formData.registration_deadline}
                      onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#071B2F]">Official Application URL (HTTPS) *</label>
                  <input
                    type="url"
                    required
                    value={formData.application_url}
                    onChange={(e) => setFormData({ ...formData, application_url: e.target.value })}
                    placeholder="https://aiesec.org/opportunity/123456"
                    className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm font-mono focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-xs text-[#071B2F]">Image Asset URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#037EF3] focus:outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
              <Button variant="ghost" size="md" onClick={() => setIsEditing(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button variant="primary" size="md" type="submit" form="project-form" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-1.5" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}     