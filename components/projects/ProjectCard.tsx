'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Building2, ArrowUpRight, ArrowRight, AlertCircle } from 'lucide-react';

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
    <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5">
      <div>
        {/* Project Image Header */}
        <div className="relative h-52 w-full overflow-hidden bg-[#0B0C10]">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.image_alt_text || project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-bold">
              AIESEC in Bhopal
            </div>
          )}

          {/* Status badge positioning */}
          <div className="absolute top-4 left-4 z-10">
            <StatusBadge status={project.status} />
          </div>

          {/* SDG badges positioning */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-wrap gap-1 justify-end">
            {project.sdg_numbers.map((sdgNum) => (
              <SDGBadge key={sdgNum} sdgNumber={sdgNum} showTitle={false} size="sm" />
            ))}
          </div>
        </div>

        {/* Project Card Content */}
        <div className="p-7 space-y-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#0B0C10] group-hover:text-[#037EF3] transition-colors leading-tight tracking-tight">
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <Building2 className="w-3.5 h-3.5 text-[#037EF3] shrink-0" />
              <span className="font-bold text-[#0B0C10]">{project.host_organization}</span>
              <span>•</span>
              <span>{project.local_committee}</span>
            </div>
          </div>

          <p className="text-sm text-[#6B7280] line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Dates Metadata Box */}
          <div className="bg-[#F9F8F6] rounded-2xl p-4 space-y-2.5 text-xs text-[#0B0C10] border border-[#E5E7EB]/60">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7280] flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#037EF3]" />
                Realization Dates:
              </span>
              <span className="font-extrabold">
                {formatDate(project.start_date)} - {formatDate(project.end_date)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-2">
              <span className="text-[#6B7280] flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Reg. Deadline:
              </span>
              <span className={`font-extrabold ${isClosed ? 'text-red-600 line-through' : 'text-[#0B0C10]'}`}>
                {formatDate(project.registration_deadline)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-7 pt-0 flex items-center justify-between gap-3 border-t border-transparent pt-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-xs font-black uppercase tracking-wider text-[#037EF3] hover:underline inline-flex items-center gap-1 focus-visible:outline-none"
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
            <Button variant="pill" size="sm" className="text-xs bg-[#0B0C10] text-white hover:bg-[#037EF3]">
              <span>Apply Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};
