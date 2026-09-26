import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost' | 'danger' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px] cursor-pointer rounded-full';

    const variants = {
      primary:
        'bg-[#037EF3] text-white hover:bg-[#0266C8] active:scale-98 shadow-md hover:shadow-lg hover:shadow-[#037EF3]/25 focus-visible:ring-[#037EF3]',
      dark:
        'bg-[#0B0C10] text-white hover:bg-[#1C1E26] active:scale-98 shadow-md border border-white/10 hover:border-white/20 focus-visible:ring-white',
      secondary:
        'bg-[#FFC857] text-[#0B0C10] hover:bg-[#F0B944] active:scale-98 shadow-sm focus-visible:ring-[#FFC857]',
      pill:
        'bg-white text-[#0B0C10] hover:bg-slate-100 active:scale-98 shadow-md hover:shadow-xl focus-visible:ring-white',
      outline:
        'border-2 border-[#0B0C10] text-[#0B0C10] bg-transparent hover:bg-[#0B0C10] hover:text-white active:scale-98 focus-visible:ring-[#0B0C10]',
      ghost:
        'bg-transparent text-[#0B0C10] hover:bg-black/5 active:scale-98 focus-visible:ring-[#0B0C10]',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:scale-98 focus-visible:ring-red-600',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs gap-1.5',
      md: 'px-6 py-3 text-sm gap-2 font-bold',
      lg: 'px-8 py-4 text-base gap-2.5 font-black tracking-wide',
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
