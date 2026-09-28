import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjectsStrip } from '@/components/sections/FeaturedProjectsStrip';
import { WhyBhopalSection } from '@/components/sections/WhyBhopalSection';
import { ExperiencePillarsSection } from '@/components/sections/ExperiencePillarsSection';
import { SDGImpactSection } from '@/components/sections/SDGImpactSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { FAQSection } from '@/components/sections/FAQSection';
import { getPublishedProjects, getPublishedTestimonials } from '@/lib/data';

export const revalidate = 60; // Revalidate public content every minute

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getPublishedProjects(),
    getPublishedTestimonials(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F8F6] text-[#0B0C10]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:px-5 focus:py-3 focus:text-[10px] focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-black"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-grow">
        <HeroSection />
        <FeaturedProjectsStrip projects={projects} />
        <WhyBhopalSection />
        <ExperiencePillarsSection />
        <SDGImpactSection />
        <ProjectGrid projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
