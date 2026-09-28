'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PillNav, { type PillNavItem } from '@/components/layout/PillNav';
import { MobileDock } from '@/components/layout/MobileDock';
import { ApplyLink } from '@/components/ui/ApplyLink';
import { SITE_METADATA } from '@/lib/constants';

const navItems: PillNavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Why Bhopal', href: '#why-bhopal' },
  { label: 'Impact & SDGs', href: '#impact' },
  { label: 'FAQ', href: '#faq' },
];

const ctaClasses =
  'pointer-events-auto group items-center justify-center gap-1.5 rounded-full bg-[#F9F8F6] text-[#0B0C10] transition-colors duration-200 hover:bg-white';

export const Header: React.FC = () => {
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined);

  /* Scroll-spy so the pill tracks the section in view */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(`#${entry.target.id}`);
          } else {
            visible.delete(`#${entry.target.id}`);
          }
        }

        if (visible.size === 0) {
          if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 8) {
            setActiveHref(`#${sections[sections.length - 1].id}`);
          }
          return;
        }

        const current = navItems.find((item) => visible.has(item.href));
        if (current) setActiveHref(current.href);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <PillNav
        logo="/images/aiesec-bhopal-mark.svg"
        logoAlt="AIESEC in Bhopal"
        logoHref="/"
        items={navItems}
        activeHref={activeHref}
        ease="power2.easeOut"
        baseColor="#0B0C10"
        pillColor="#F9F8F6"
        hoveredPillTextColor="#F9F8F6"
        pillTextColor="#0B0C10"
        initialLoadAnimation={false}
        wordmark={
          <span className="hidden items-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F9F8F6] sm:inline-flex">
            AIESEC<span className="font-light text-[#F9F8F6]/70">in Bhopal</span>
          </span>
        }
      />

      {/* Sits beside the pill bar; icon-only below lg where the dock handles sections */}
      <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-4 lg:right-5 lg:top-5">
        <Link
          href="/admin/login"
          className="pointer-events-auto hidden pr-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F9F8F6]/70 transition-colors hover:text-[#F9F8F6] xl:inline-block"
        >
          Log in
        </Link>

        <ApplyLink
          href={SITE_METADATA.defaultApplyUrl}
          source="header"
          eventName="hero_apply_click"
          className={`${ctaClasses} hidden min-h-[44px] px-5 text-[10px] font-bold uppercase tracking-[0.16em] lg:inline-flex`}
          aria-label="Get started — apply on the AIESEC Opportunity Portal"
        >
          <span>Get started</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </ApplyLink>

        <ApplyLink
          href={SITE_METADATA.defaultApplyUrl}
          source="header"
          eventName="hero_apply_click"
          className={`${ctaClasses} inline-flex size-11 lg:hidden`}
          aria-label="Get started — apply on the AIESEC Opportunity Portal"
        >
          <ArrowUpRight className="h-4 w-4" />
        </ApplyLink>
      </div>

      {/* Sections live in the dock below lg; the pill bar above owns the brand + apply */}
      <MobileDock activeHref={activeHref} />
    </header>
  );
};
