'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Building2, ExternalLink, ArrowRight, AlertCircle } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isClosed = project.status === 'closed';

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'project_apply_click', {
        project_id: project.id,
        source: 'project_card',
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      <div>
        {/* Project Thumbnail Header */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.image_alt_text || project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#071B2F] flex items-center justify-center text-slate-400 text-sm font-semibold">
              AIESEC in Bhopal
            </div>
          )}

          {/* Status badge positioning */}
          <div className="absolute top-3 left-3 z-10">
            <StatusBadge status={project.status} />
          </div>

          {/* SDG badges positioning */}
          <div className="absolute bottom-3 right-3 z-10 flex flex-wrap gap-1 justify-end">
            {project.sdg_numbers.map((sdgNum) => (
              <SDGBadge key={sdgNum} sdgNumber={sdgNum} showTitle={false} size="sm" />
            ))}
          </div>
        </div>

        {/* Project Card Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-[#071B2F] group-hover:text-[#037EF3] transition-colors leading-tight">
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#5B6573]">
              <Building2 className="w-3.5 h-3.5 text-[#037EF3] shrink-0" />
              <span className="font-semibold text-[#071B2F]">{project.host_organization}</span>
              <span>•</span>
              <span>{project.local_committee}</span>
            </div>
          </div>

          <p className="text-sm text-[#5B6573] line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Dates & Location Grid */}
          <div className="bg-[#F7F5F0] rounded-xl p-3 space-y-2 text-xs text-[#071B2F]">
            <div className="flex items-center justify-between">
              <span className="text-[#5B6573] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#037EF3]" />
                Realization Dates:
              </span>
              <span className="font-bold">
                {formatDate(project.start_date)} - {formatDate(project.end_date)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-2">
              <span className="text-[#5B6573] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Reg. Deadline:
              </span>
              <span className={`font-bold ${isClosed ? 'text-red-600 line-through' : 'text-[#071B2F]'}`}>
                {formatDate(project.registration_deadline)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0 border-t border-[#E5E7EB]/60 mt-4 flex items-center justify-between gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="text-xs font-bold text-[#037EF3] hover:underline inline-flex items-center gap-1 focus-visible:outline-none"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {isClosed ? (
          <Button variant="ghost" size="sm" disabled className="text-xs bg-slate-100 text-slate-400">
            Closed
          </Button>
        ) : (
          <a
            href={project.application_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyClick}
          >
            <Button variant="primary" size="sm">
              <span>Apply Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};
