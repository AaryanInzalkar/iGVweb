'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
  onToggle?: (id: string, isOpen: boolean) => void;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  question,
  answer,
  defaultOpen = false,
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
        'border border-[#E5E7EB] rounded-xl bg-white overflow-hidden transition-all duration-200 shadow-xs hover:border-[#037EF3]/40',
        isOpen ? 'ring-1 ring-[#037EF3]/30 shadow-sm' : '',
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
          className="w-full flex items-center justify-between p-5 text-left font-bold text-[#071B2F] hover:text-[#037EF3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#037EF3] focus-visible:ring-offset-1 rounded-xl cursor-pointer min-h-[44px]"
        >
          <span className="text-base md:text-lg pr-4">{question}</span>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-[#5B6573] shrink-0 transition-transform duration-200',
              isOpen ? 'rotate-180 text-[#037EF3]' : ''
            )}
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={cn(
          'grid transition-all duration-200 ease-in-out text-[#5B6573]',
          isOpen ? 'grid-rows-[1fr] opacity-100 p-5 pt-0 border-t border-[#E5E7EB]/60 mt-1' : 'grid-rows-[0fr] opacity-0 p-0 overflow-hidden'
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-line text-[#071B2F]/80">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
