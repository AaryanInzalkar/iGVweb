import React from 'react';
import { ProjectStatus } from '@/types/project';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle2, AlertCircle, Archive, FileText } from 'lucide-react';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
}) => {
  const config = {
    published: {
      label: 'Open for Applications',
      styles: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: CheckCircle2,
    },
    closing_soon: {
      label: 'Closing Soon',
      styles: 'bg-amber-100 text-amber-900 border-amber-300 font-bold animate-pulse',
      icon: Clock,
    },
    closed: {
      label: 'Applications Closed',
      styles: 'bg-gray-100 text-gray-700 border-gray-300',
      icon: AlertCircle,
    },
    draft: {
      label: 'Draft',
      styles: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: FileText,
    },
    archived: {
      label: 'Archived',
      styles: 'bg-slate-100 text-slate-600 border-slate-300',
      icon: Archive,
    },
  };

  const { label, styles, icon: Icon } = config[status] || config.published;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-xs select-none',
        styles,
        className
      )}
      aria-label={`Project status: ${label}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{label}</span>
    </span>
  );
};
