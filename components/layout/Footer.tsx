import React from 'react';
import Link from 'next/link';
import { SITE_METADATA } from '@/lib/constants';
import { Mail, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071B2F] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-black tracking-tight text-white">
              <div className="w-8 h-8 rounded-lg bg-[#037EF3] flex items-center justify-center font-extrabold text-white text-sm">
                GV
              </div>
              <span className="font-extrabold text-lg">
                AIESEC <span className="text-[#037EF3]">in Bhopal</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              AIESEC is the world&apos;s largest youth-led organization developing leadership potential through international cross-cultural exchanges and volunteer projects.
            </p>
            <div className="inline-block px-3 py-1 bg-slate-800 rounded-md text-[11px] text-amber-400 font-mono">
              [TEMP_PLACEHOLDER] Local Chapter Site
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFC857]">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#why-bhopal" className="hover:text-white transition-colors">
                  Why Bhopal
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Volunteer Experience
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">
                  SDGs & Community Impact
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Open Projects
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Handoff Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFC857]">
              Official Portals
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href={SITE_METADATA.officialGVUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#037EF3] transition-colors"
                >
                  <span>Global Volunteer Overview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_METADATA.defaultApplyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#037EF3] transition-colors"
                >
                  <span>AIESEC Opportunity Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors">
                  Admin CMS Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFC857]">
              Connect With Us
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Mail className="w-4 h-4 text-[#037EF3] shrink-0" />
              <a
                href={`mailto:${SITE_METADATA.contactEmail}`}
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                {SITE_METADATA.contactEmail}
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_METADATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#037EF3] flex items-center justify-center text-slate-300 hover:text-white transition-all min-h-[44px] min-w-[44px]"
                aria-label="AIESEC in Bhopal Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={SITE_METADATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#037EF3] flex items-center justify-center text-slate-300 hover:text-white transition-all min-h-[44px] min-w-[44px]"
                aria-label="AIESEC in Bhopal LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={SITE_METADATA.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#037EF3] flex items-center justify-center text-slate-300 hover:text-white transition-all min-h-[44px] min-w-[44px]"
                aria-label="AIESEC Global YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {currentYear} AIESEC in Bhopal. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl text-slate-400">
            AIESEC is an independent, non-political, non-profit organization run by students and recent graduates. Official volunteer application registration is conducted exclusively via the official AIESEC Opportunity Portal.
          </p>
        </div>
      </div>
    </footer>
  );
};
