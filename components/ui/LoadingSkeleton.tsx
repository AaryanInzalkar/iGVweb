import React from 'react';
import { cn } from '@/lib/utils';

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm animate-pulse flex flex-col justify-between h-[420px]',
        className
      )}
    >
      <div>
        <div className="w-full h-44 bg-slate-200 rounded-xl mb-4" />
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded w-full" />
          <div className="h-3 bg-slate-100 rounded w-5/6" />
        </div>
      </div>
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-10 bg-slate-200 rounded-lg w-28" />
      </div>
    </div>
  );
};

export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => {
  return (
    <div className={cn('space-y-2.5 animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-slate-200 rounded',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};
