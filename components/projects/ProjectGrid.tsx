import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { FolderOpen, ArrowUpRight } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 md:py-28 bg-[#F9F8F6] text-[#0B0C10]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#0B0C10]/15">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/50">
              <span className="w-8 h-px bg-[#0B0C10]/30" />
              <span>Opportunities</span>
            </div>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-[13vw] sm:text-[9vw] lg:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.88]">
              Open volunteer
              <br />
              <span className="font-serif font-normal italic tracking-normal text-[#0B0C10]/35">
                projects in Bhopal
              </span>
            </h2>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="mt-12 border border-[#0B0C10]/15 p-10 sm:p-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-lg">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40 mb-4">
                Nothing open right now
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
                New Global Volunteer opportunities are published regularly
              </h3>
              <p className="text-sm text-[#0B0C10]/55 leading-relaxed mt-3">
                Reach out to the AIESEC in Bhopal team to get notified when upcoming realizations
                open.
              </p>
            </div>

            <a
              href={`mailto:${SITE_METADATA.contactEmail}`}
              className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] bg-[#0B0C10] text-[#F9F8F6] px-7 py-4 inline-flex items-center gap-2 hover:bg-[#037EF3] transition-colors min-h-[44px] focus-visible:outline-none"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Contact the local committee</span>
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/40">
              <span>
                {String(projects.length).padStart(2, '0')} project
                {projects.length === 1 ? '' : 's'} accepting applications
              </span>
              <a
                href={SITE_METADATA.officialGVUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#0B0C10] transition-colors"
              >
                <span>All opportunities</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
