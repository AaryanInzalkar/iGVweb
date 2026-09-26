import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPublishedProjects } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isClosed = project.status === 'closed';

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#071B2F]">
      <Header />

      <main className="flex-grow py-12 md:py-20 bg-[#F7F5F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#037EF3] hover:underline focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          {/* Closed Warning Banner */}
          {isClosed && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm">Applications for this realization are currently closed</h3>
                <p className="text-xs text-amber-800 mt-0.5">
                  The registration deadline for this project has passed. You can inspect the project details below or explore active open opportunities on our homepage.
                </p>
                <Link
                  href="/#projects"
                  className="inline-block text-xs font-bold text-[#037EF3] underline mt-2"
                >
                  View Active Projects →
                </Link>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            {/* Project Hero Header */}
            <div className="relative h-64 md:h-80 w-full bg-slate-900">
              {project.image_url ? (
                <img
                  src={project.image_url}
                  alt={project.image_alt_text || project.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                  AIESEC in Bhopal
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={project.status} />
                  {project.sdg_numbers.map((sdgNum) => (
                    <SDGBadge key={sdgNum} sdgNumber={sdgNum} size="sm" />
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                  {project.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-[#FFC857]" />
                    {project.host_organization}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#FFC857]" />
                    {project.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Body */}
            <div className="p-6 md:p-10 space-y-8">
              {/* Dates & Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#F7F5F0] border border-[#E5E7EB]">
                <div className="space-y-1">
                  <div className="text-xs text-[#5B6573] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#037EF3]" />
                    Start Date
                  </div>
                  <div className="font-bold text-sm text-[#071B2F]">
                    {formatDate(project.start_date)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-[#5B6573] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#037EF3]" />
                    End Date
                  </div>
                  <div className="font-bold text-sm text-[#071B2F]">
                    {formatDate(project.end_date)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-[#5B6573] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    Registration Deadline
                  </div>
                  <div
                    className={`font-bold text-sm ${
                      isClosed ? 'text-red-600 line-through' : 'text-[#071B2F]'
                    }`}
                  >
                    {formatDate(project.registration_deadline)}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#071B2F]">Project Overview</h2>
                <p className="text-base text-[#5B6573] leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Impact Statement */}
              <div className="p-6 rounded-2xl bg-[#2E9E6F]/10 border border-[#2E9E6F]/20 space-y-2">
                <h3 className="font-bold text-base text-[#2E9E6F] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Expected Community Impact
                </h3>
                <p className="text-sm text-[#071B2F] leading-relaxed">{project.impact_text}</p>
              </div>

              {/* Committee Information */}
              <div className="space-y-2 text-sm text-[#5B6573]">
                <div className="font-bold text-[#071B2F]">Hosting Entity</div>
                <p>
                  This project is hosted by <strong className="text-[#071B2F]">{project.local_committee}</strong> in collaboration with <strong className="text-[#071B2F]">{project.host_organization}</strong>.
                </p>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/#projects"
                  className="text-sm font-bold text-[#5B6573] hover:text-[#071B2F]"
                >
                  ← Back to Open Opportunities
                </Link>

                {isClosed ? (
                  <Button variant="ghost" disabled className="bg-slate-100 text-slate-400">
                    Registration Closed
                  </Button>
                ) : (
                  <a
                    href={project.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="lg">
                      <span>Apply on Official Portal</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
