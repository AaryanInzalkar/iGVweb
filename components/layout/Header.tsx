'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PROJECTS', href: '#projects', hasDropdown: true },
    { name: 'EXPERIENCE', href: '#experience', hasDropdown: true },
    { name: 'WHY BHOPAL', href: '#why-bhopal', hasDropdown: true },
    { name: 'IMPACT & SDGS', href: '#impact', hasDropdown: false },
    { name: 'FAQ', href: '#faq', hasDropdown: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo - Squarespace Minimalist Style */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
        >
          {/* Geometric Monogram Icon */}
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white transition-transform group-hover:scale-110" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#037EF3] transition-transform group-hover:scale-110" />
          </div>
          <span className="font-extrabold text-base tracking-widest text-white uppercase select-none">
            AIESEC <span className="font-light text-neutral-300">IN BHOPAL</span>
          </span>
        </Link>

        {/* Desktop Navigation - Squarespace Editorial Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-200 hover:text-white transition-colors focus-visible:outline-none"
            >
              <span>{link.name}</span>
              {link.hasDropdown && (
                <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-white transition-transform" />
              )}
            </a>
          ))}
        </nav>

        {/* Right Action Group */}
        <div className="flex items-center gap-6">
          <Link
            href="/admin/login"
            className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-200 hover:text-white transition-colors"
          >
            LOG IN
          </Link>

          <a
            href={SITE_METADATA.defaultApplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hero_apply_click', { source: 'header' });
              }
            }}
          >
            {/* Crisp white solid rectangular button exactly like Squarespace GET STARTED */}
            <button className="bg-white hover:bg-neutral-200 text-black text-[11px] font-bold uppercase tracking-[0.16em] px-6 py-2.5 rounded-none transition-all duration-200 shadow-md">
              GET STARTED
            </button>
          </a>

          {/* Hamburger toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-neutral-300 cursor-pointer focus-visible:outline-none"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-white/10 px-6 py-6 text-white space-y-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-300 hover:text-white py-2 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-300 hover:text-white py-2"
            >
              LOG IN
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
