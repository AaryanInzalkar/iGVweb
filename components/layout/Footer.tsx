import React from 'react';
import Link from 'next/link';
import { SITE_METADATA, GOVERNANCE_CONFIG } from '@/lib/constants';
import { Mail, ExternalLink } from 'lucide-react';

const exploreLinks = [
  { name: 'Why Bhopal', href: '#why-bhopal' },
  { name: 'Volunteer Experience', href: '#experience' },
  { name: 'SDGs & Community Impact', href: '#impact' },
  { name: 'Open Projects', href: '#projects' },
  { name: 'Frequently Asked Questions', href: '#faq' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] text-[#F9F8F6]">
      {/* Oversized wordmark */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/40 mb-8">
          <span className="w-8 h-px bg-white/25" />
          <span>AIESEC in Bhopal</span>
        </div>

        <h2 className="text-[15vw] sm:text-[11vw] lg:text-[8.5vw] font-black uppercase tracking-tighter leading-[0.85]">
          Global
          <br />
          <span className="font-serif font-normal italic tracking-normal text-[#F9F8F6]/25">
            Volunteer
          </span>
        </h2>
      </div>

      {/* Link ledger */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 md:mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#F9F8F6]/12">
          <div className="space-y-4 col-span-2 lg:col-span-1">
            <p className="text-xs text-[#F9F8F6]/50 leading-relaxed">
              Developing leadership potential through international cross-cultural volunteer
              exchanges and community projects.
            </p>
            <div className="inline-block px-3 py-1.5 bg-white/5 border border-[#F9F8F6]/12 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC857]">
              {GOVERNANCE_CONFIG.STATUS_WARNING}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/35 mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-[#F9F8F6]/60 hover:text-[#F9F8F6] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/35 mb-5">
              Official portals
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE_METADATA.officialGVUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F9F8F6]/60 hover:text-[#F9F8F6] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Global Volunteer Overview</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_METADATA.defaultApplyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F9F8F6]/60 hover:text-[#F9F8F6] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>AIESEC Opportunity Portal</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-xs text-[#F9F8F6]/60 hover:text-[#F9F8F6] transition-colors"
                >
                  Admin CMS Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/35 mb-5">
              Connect
            </h3>
            <a
              href={`mailto:${SITE_METADATA.contactEmail}`}
              className="text-xs text-[#F9F8F6]/60 hover:text-[#F9F8F6] transition-colors inline-flex items-center gap-2 break-all"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>{SITE_METADATA.contactEmail}</span>
            </a>

            <div className="flex items-center gap-2 pt-5">
              {[
                { href: SITE_METADATA.socials.instagram, label: 'Instagram' },
                { href: SITE_METADATA.socials.linkedin, label: 'LinkedIn' },
                { href: SITE_METADATA.socials.youtube, label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 border border-[#F9F8F6]/15 hover:bg-[#F9F8F6] hover:text-[#0B0C10] flex items-center justify-center text-[#F9F8F6]/60 hover:text-[#0B0C10] transition-colors"
                  aria-label={`AIESEC in Bhopal ${social.label}`}
                >
                  <SocialIcon name={social.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F8F6]/35">
            &copy; {currentYear} AIESEC in Bhopal
          </p>
          <p className="text-[11px] text-[#F9F8F6]/35 leading-relaxed max-w-xl md:text-right">
            AIESEC is an independent, non-political, non-profit organization run by students and
            recent graduates. Official volunteer application registration is conducted exclusively
            via the official AIESEC Opportunity Portal.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
  if (name === 'Instagram') {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }

  if (name === 'LinkedIn') {
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  );
};
