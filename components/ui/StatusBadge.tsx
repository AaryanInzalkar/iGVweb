import React from 'react';
import { ProjectStatus } from '@/types/project';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle2, AlertCircle, Archive, FileText } from 'lucide-react';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
  showIcon?: boolean;
  sharp?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
  sharp = false,
}) => {
  const config = {
    published: {
      label: 'Open for Applications',
      styles: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      sharpStyles: 'bg-emerald-400 text-black',
      icon: CheckCircle2,
    },
    closing_soon: {
      label: 'Closing Soon',
      styles: 'bg-amber-100 text-amber-900 border-amber-300 font-bold animate-pulse',
      sharpStyles: 'bg-amber-400 text-black animate-pulse',
      icon: Clock,
    },
    closed: {
      label: 'Applications Closed',
      styles: 'bg-gray-100 text-gray-700 border-gray-300',
      sharpStyles: 'bg-white text-black/50',
      icon: AlertCircle,
    },
    draft: {
      label: 'Draft',
      styles: 'bg-blue-100 text-blue-800 border-blue-300',
      sharpStyles: 'bg-blue-400 text-black',
      icon: FileText,
    },
    archived: {
      label: 'Archived',
      styles: 'bg-slate-100 text-slate-600 border-slate-300',
      sharpStyles: 'bg-black text-white/70',
      icon: Archive,
    },
  };

  const entry = config[status] || config.published;
  const { label, icon: Icon } = entry;

  const baseStyles = sharp
    ? 'rounded-none border-0 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-2'
    : 'rounded-full text-xs font-semibold border shadow-xs';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 select-none',
        baseStyles,
        sharp ? entry.sharpStyles : entry.styles,
        className
      )}
      aria-label={`Project status: ${label}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{label}</span>
    </span>
  );
};
