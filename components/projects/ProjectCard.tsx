'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { ApplyLink } from '@/components/ui/ApplyLink';
import { formatDate } from '@/lib/utils';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isClosed = project.status === 'closed' || project.status === 'archived';

  return (
    <article className="group flex flex-col bg-white border border-[#0B0C10]/12 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
      {/* Image Panel */}
      <div className="relative h-56 w-full overflow-hidden bg-[#0B0C10]">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.image_alt_text || project.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#F9F8F6]/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            AIESEC in Bhopal
          </div>
        )}

        <div className="absolute inset-0 bg-[#0B0C10]/25" aria-hidden="true" />

        <div className="absolute top-0 left-0">
          <StatusBadge status={project.status} showIcon={false} sharp />
        </div>

        {typeof index === 'number' && (
          <div className="absolute top-0 right-0 bg-[#0B0C10]/80 text-[#F9F8F6] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-2">
            {String(index + 1).padStart(2, '0')}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/70 inline-flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {project.location}
          </span>
          <div className="flex flex-wrap gap-1 justify-end">
            {project.sdg_numbers.map((sdgNum) => (
              <SDGBadge key={sdgNum} sdgNumber={sdgNum} showTitle={false} size="sm" sharp />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-7">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40 mb-3">
          {project.host_organization}
        </div>

        <h3 className="text-2xl font-black uppercase tracking-tight leading-[1.05] mb-3">
          <Link href={`/projects/${project.slug}`} className="focus-visible:outline-none">
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out group-hover:after:scale-x-100">
              {project.name}
            </span>
          </Link>
        </h3>

        <p className="text-sm text-[#0B0C10]/55 line-clamp-3 leading-relaxed">{project.description}</p>

        {/* Meta Ledger */}
        <div className="mt-6 border-t border-[#0B0C10]/12 text-xs">
          <div className="flex items-center justify-between gap-3 py-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40">
              Realization
            </span>
            <span className="font-bold text-right">
              {formatDate(project.start_date)} — {formatDate(project.end_date)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 py-3 border-t border-[#0B0C10]/12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40">
              Deadline
            </span>
            <span
              className={`font-bold text-right ${isClosed ? 'text-[#0B0C10]/30 line-through' : 'text-[#037EF3]'}`}
            >
              {formatDate(project.registration_deadline)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-7 flex items-center justify-between gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10] inline-flex items-center gap-1.5 hover:text-[#037EF3] transition-colors focus-visible:outline-none"
          >
            <span>View details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {isClosed ? (
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/30 px-5 py-3 border border-[#0B0C10]/15">
              Closed
            </span>
          ) : (
            <ApplyLink
              href={project.application_url}
              source="project_card"
              eventName="project_apply_click"
              params={{ project_id: project.id }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#0B0C10] text-[#F9F8F6] px-5 py-3 inline-flex items-center gap-1.5 hover:bg-[#037EF3] transition-colors min-h-[44px] focus-visible:outline-none"
            >
              <span>Apply now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </ApplyLink>
          )}
        </div>
      </div>
    </article>
  );
};
