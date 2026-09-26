import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'navy' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isExternal?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isExternal = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px] cursor-pointer';

    const variants = {
      primary:
        'bg-[#037EF3] text-white hover:bg-[#0266C8] active:bg-[#0252A0] shadow-sm hover:shadow focus-visible:ring-[#037EF3]',
      secondary:
        'bg-[#FFC857] text-[#071B2F] hover:bg-[#F0B944] active:bg-[#E0AA33] focus-visible:ring-[#FFC857]',
      navy:
        'bg-[#071B2F] text-white hover:bg-[#122A44] active:bg-[#1B385A] focus-visible:ring-[#071B2F]',
      outline:
        'border-2 border-[#037EF3] text-[#037EF3] bg-transparent hover:bg-[#037EF3]/10 active:bg-[#037EF3]/20 focus-visible:ring-[#037EF3]',
      ghost:
        'bg-transparent text-[#071B2F] hover:bg-black/5 active:bg-black/10 focus-visible:ring-[#071B2F]',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-7 py-3.5 text-lg gap-2.5 font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
