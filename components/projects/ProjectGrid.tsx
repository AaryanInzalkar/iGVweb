import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Sparkles, FolderOpen } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 md:py-28 bg-white text-[#071B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#037EF3]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>Opportunities in Bhopal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#071B2F]">
            Current Open <span className="text-[#037EF3]">Volunteer Projects</span>
          </h2>

          <p className="text-base sm:text-lg text-[#5B6573]">
            Browse active volunteer opportunities hosted by AIESEC in Bhopal. Filter by start date and UN SDG alignment.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#F7F5F0] border border-[#E5E7EB] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#037EF3]/10 text-[#037EF3] mx-auto flex items-center justify-center">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#071B2F]">No open projects right now</h3>
            <p className="text-xs text-[#5B6573]">
              New Global Volunteer opportunities are published regularly. Reach out to the AIESEC in Bhopal team to get notified when upcoming realizations open!
            </p>
            <a
              href={`mailto:${SITE_METADATA.contactEmail}`}
              className="inline-block text-xs font-bold text-[#037EF3] hover:underline"
            >
              Contact AIESEC in Bhopal ({SITE_METADATA.contactEmail})
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
