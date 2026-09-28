import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/project';
import { SDGBadge } from '@/components/ui/SDGBadge';
import { formatDate } from '@/lib/utils';

interface FeaturedProjectsStripProps {
  projects: Project[];
}

const MAX_FEATURED = 3;

const gridLayouts: Record<number, string> = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
};

export const FeaturedProjectsStrip: React.FC<FeaturedProjectsStripProps> = ({ projects }) => {
  const featured = projects
    .filter((project) => project.status === 'published' || project.status === 'closing_soon')
    .slice(0, MAX_FEATURED);

  if (featured.length === 0) {
    return null;
  }

  const spotlightIndex = featured.length > 1 ? 1 : 0;

  return (
    <section
      aria-label="Open for applications"
      className="relative z-20 bg-[#F9F8F6] pt-px pb-16 sm:pb-20 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* The grid is pulled up so the panels rise out of the dark hero above */}
        <div
          className={`relative -mt-20 grid grid-cols-1 gap-5 sm:-mt-24 sm:gap-6 md:-mt-28 lg:gap-8 ${gridLayouts[featured.length]}`}
        >
          {featured.map((project, index) => {
            const isSpotlight = index === spotlightIndex;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`group flex flex-col overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_-28px_rgba(11,12,16,0.45)] ${
                  isSpotlight
                    ? 'border-[#0B0C10] bg-[#0B0C10] text-[#F9F8F6]'
                    : 'border-[#0B0C10]/10 bg-white text-[#0B0C10]'
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1C1E26]">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.image_alt_text || project.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale-[45%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/40">
                      AIESEC in Bhopal
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[#0B0C10]/20" aria-hidden="true" />

                  <span className="absolute top-0 left-0 bg-[#F9F8F6] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute top-0 right-0 flex gap-1">
                    {project.sdg_numbers.slice(0, 3).map((sdgNumber) => (
                      <SDGBadge
                        key={sdgNumber}
                        sdgNumber={sdgNumber}
                        size="sm"
                        sharp
                        showTitle={false}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                      isSpotlight ? 'text-[#F9F8F6]/50' : 'text-[#0B0C10]/40'
                    }`}
                  >
                    {project.host_organization}
                  </div>

                  <h3
                    className={`mt-3 text-xl font-black uppercase leading-[1.1] tracking-tighter sm:text-2xl ${
                      isSpotlight ? 'text-[#F9F8F6]' : 'text-[#0B0C10]'
                    }`}
                  >
                    {project.name}
                  </h3>

                  <p
                    className={`mt-3 line-clamp-3 text-[13px] leading-relaxed ${
                      isSpotlight ? 'text-[#F9F8F6]/60' : 'text-[#0B0C10]/55'
                    }`}
                  >
                    {project.description}
                  </p>

                  <div
                    className={`mt-auto flex items-center justify-between gap-3 border-t pt-5 text-[10px] font-bold uppercase tracking-[0.2em] ${
                      isSpotlight
                        ? 'mt-6 border-[#F9F8F6]/15 text-[#F9F8F6]/55'
                        : 'mt-6 border-[#0B0C10]/10 text-[#0B0C10]/45'
                    }`}
                  >
                    <span>Apply by {formatDate(project.registration_deadline)}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 transition-colors ${
                        isSpotlight
                          ? 'text-[#F9F8F6] group-hover:text-[#FFC857]'
                          : 'text-[#0B0C10] group-hover:text-[#037EF3]'
                      }`}
                    >
                      View
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
