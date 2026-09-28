'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
  index?: number;
  onToggle?: (id: string, isOpen: boolean) => void;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  question,
  answer,
  defaultOpen = false,
  index,
  onToggle,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onToggle) {
      onToggle(id, nextState);
    }
  };

  const contentId = `faq-content-${id}`;
  const headerId = `faq-header-${id}`;

  return (
    <div
      className={cn(
        'border-b border-[#0B0C10]/15 transition-colors',
        isOpen ? 'bg-[#0B0C10]/[0.02]' : 'hover:bg-[#0B0C10]/[0.02]',
        className
      )}
    >
      <h3>
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={handleToggle}
          className="w-full flex items-start gap-4 sm:gap-8 py-6 sm:py-7 pl-0 sm:pl-0 pr-1 text-left group cursor-pointer focus-visible:outline-none"
        >
          {typeof index === 'number' && (
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B0C10]/30 pt-2 w-6 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}

          <span
            className={cn(
              'flex-1 text-base sm:text-xl font-black uppercase tracking-tight leading-snug transition-colors',
              isOpen ? 'text-[#037EF3]' : 'text-[#0B0C10] group-hover:text-[#0B0C10]/60'
            )}
          >
            {question}
          </span>

          <Plus
            className={cn(
              'w-5 h-5 shrink-0 text-[#0B0C10]/30 transition-all duration-300 mt-1',
              isOpen ? 'rotate-45 text-[#037EF3]' : 'group-hover:rotate-90 group-hover:text-[#0B0C10]/60'
            )}
          />
        </button>
      </h3>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-8 sm:pl-14 pr-8 text-sm sm:text-[15px] text-[#0B0C10]/60 leading-relaxed whitespace-pre-line max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
