import React from 'react';
import { cn } from '@/lib/utils';

export interface SDGBadgeProps {
  sdgNumber: number;
  showTitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  sharp?: boolean;
  className?: string;
}

export const SDG_DETAILS: Record<number, { name: string; color: string }> = {
  1: { name: 'No Poverty', color: '#E5243B' },
  2: { name: 'Zero Hunger', color: '#DDA63A' },
  3: { name: 'Good Health & Well-Being', color: '#4C9F38' },
  4: { name: 'Quality Education', color: '#C5192D' },
  5: { name: 'Gender Equality', color: '#FF3A21' },
  6: { name: 'Clean Water & Sanitation', color: '#26BDE2' },
  7: { name: 'Affordable & Clean Energy', color: '#FCC30B' },
  8: { name: 'Decent Work & Economic Growth', color: '#A21942' },
  9: { name: 'Industry, Innovation & Infrastructure', color: '#FD6925' },
  10: { name: 'Reduced Inequalities', color: '#DD1367' },
  11: { name: 'Sustainable Cities & Communities', color: '#FD9D24' },
  12: { name: 'Responsible Consumption & Production', color: '#BF8B2E' },
  13: { name: 'Climate Action', color: '#3F7E44' },
  14: { name: 'Life Below Water', color: '#0A97D9' },
  15: { name: 'Life on Land', color: '#56C02B' },
  16: { name: 'Peace, Justice & Strong Institutions', color: '#00689D' },
  17: { name: 'Partnerships for the Goals', color: '#19486A' },
};

export const SDGBadge: React.FC<SDGBadgeProps> = ({
  sdgNumber,
  showTitle = true,
  size = 'md',
  sharp = false,
  className,
}) => {
  const sdg = SDG_DETAILS[sdgNumber] || {
    name: `SDG ${sdgNumber}`,
    color: '#037EF3',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 gap-2 font-bold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-white select-none transition-transform hover:scale-105',
        sharp
          ? 'rounded-none font-bold uppercase tracking-[0.15em]'
          : 'rounded-md shadow-2xs',
        sizes[size],
        className
      )}
      style={{ backgroundColor: sdg.color }}
      title={`UN Sustainable Development Goal ${sdgNumber}: ${sdg.name}`}
    >
      <span
        className={cn(
          'font-extrabold',
          sharp ? 'bg-black/25 px-1.5 py-0.5 rounded-none text-[10px] tracking-[0.15em]' : 'bg-black/20 px-1.5 py-0.5 rounded text-[10px] tracking-wider'
        )}
      >
        SDG {sdgNumber}
      </span>
      {showTitle && <span className={cn('truncate', sharp && 'hidden sm:inline')}>{sdg.name}</span>}
    </span>
  );
};
