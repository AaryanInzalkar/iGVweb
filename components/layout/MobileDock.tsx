'use client';

import React, { useMemo } from 'react';
import { ArrowUpRight, CircleHelp, FolderKanban, Briefcase, Leaf, MapPin } from 'lucide-react';
import Dock, { type DockItemData } from '@/components/ui/Dock';
import { SITE_METADATA } from '@/lib/constants';

const sections = [
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Why Bhopal', href: '#why-bhopal', icon: MapPin },
  { label: 'Impact & SDGs', href: '#impact', icon: Leaf },
  { label: 'FAQ', href: '#faq', icon: CircleHelp },
];

const ICON_SIZE = 20;

type MobileDockProps = {
  activeHref?: string;
};

/**
 * Small-screen navigation. The pill bar owns the top of the page (brand + apply),
 * this dock owns the sections, mirroring the desktop pill nav.
 */
export const MobileDock: React.FC<MobileDockProps> = ({ activeHref }) => {
  const items = useMemo<DockItemData[]>(
    () => [
      ...sections.map(({ label, href, icon: Icon }) => ({
        icon: <Icon size={ICON_SIZE} strokeWidth={1.75} aria-hidden="true" />,
        label,
        active: activeHref === href,
        onClick: () => {
          window.location.hash = href;
        },
      })),
      {
        icon: <ArrowUpRight size={ICON_SIZE} strokeWidth={2} aria-hidden="true" />,
        label: 'Get started',
        className: 'dock-item-apply',
        onClick: () => {
          window.gtag?.('event', 'dock_apply_click', { source: 'dock' });
          window.location.href = SITE_METADATA.defaultApplyUrl;
        },
      },
    ],
    [activeHref]
  );

  return (
    <Dock
      items={items}
      panelHeight={60}
      baseItemSize={42}
      magnification={60}
      distance={130}
      dockHeight={140}
    />
  );
};
