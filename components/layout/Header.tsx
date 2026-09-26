'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X, Globe, ExternalLink } from 'lucide-react';
import { SITE_METADATA } from '@/lib/constants';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071B2F]/95 backdrop-blur-md shadow-md py-3 text-white'
          : 'bg-[#071B2F] py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight text-white group focus-visible:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#037EF3] flex items-center justify-center font-extrabold text-white text-sm shadow-xs group-hover:scale-105 transition-transform">
            GV
          </div>
          <div className="flex flex-col">
            <span className="leading-tight font-extrabold text-base md:text-lg">
              AIESEC <span className="text-[#037EF3]">in Bhopal</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#FFC857] font-semibold -mt-1">
              Incoming Global Volunteer
            </span>
          </div>
        </Link>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-200 hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-none"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Hamburger Toggle */}
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
            <Button variant="primary" size="sm">
              <span>Apply Now</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </Button>
          </a>

          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus-visible:outline-none cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#071B2F] border-t border-slate-800 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200 z-50">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="text-base font-semibold text-slate-200 hover:text-[#037EF3] py-2 border-b border-slate-800 transition-colors"
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
              onClick={handleNavClick}
              className="w-full inline-block"
            >
              <Button variant="primary" size="md" className="w-full">
                <span>Apply Now (Official Portal)</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
