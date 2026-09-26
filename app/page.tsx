import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
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
    <div className="min-h-screen flex flex-col bg-white text-[#071B2F]">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <WhyBhopalSection />
        <ExperiencePillarsSection />
        <SDGImpactSection />
        <TestimonialsSection testimonials={testimonials} />
        <ProjectGrid projects={projects} />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
