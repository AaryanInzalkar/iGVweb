'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Bhopal', href: '#why-bhopal' },
    { name: 'Experience', href: '#experience' },
    { name: 'Impact & SDGs', href: '#impact' },
    { name: 'Projects', href: '#projects' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
      <div
        className={`w-full rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3 ${
          isScrolled
            ? 'bg-[#0B0C10]/90 backdrop-blur-xl border border-white/15 shadow-2xl text-white'
            : 'bg-[#0B0C10]/80 backdrop-blur-md border border-white/10 text-white shadow-xl'
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-[#037EF3] text-white flex items-center justify-center font-black text-xs shadow-md group-hover:scale-105 transition-transform">
            GV
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight text-white leading-none">
              AIESEC <span className="text-[#037EF3]">Bhopal</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#FFC857] font-bold mt-0.5">
              Global Volunteer
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors focus-visible:outline-none"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Header Action Button */}
        <div className="flex items-center gap-3">
          <a
            href={SITE_METADATA.defaultApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hero_apply_click', { source: 'header' });
              }
            }}
          >
            <Button variant="pill" size="sm" className="font-extrabold text-xs">
              <span>Apply Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Button>
          </a>

          {/* Hamburger toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 bg-[#0B0C10]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 text-white shadow-2xl space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-[#037EF3] py-2 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href={SITE_METADATA.defaultApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-block"
            >
              <Button variant="primary" size="md" className="w-full">
                <span>Apply on Official Portal</span>
                <ExternalLink className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
