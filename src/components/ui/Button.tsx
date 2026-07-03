// FILE: src/components/ui/Button.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed border',
  {
    variants: {
      variant: {
        default: 'bg-primary text-slate-950 border-transparent hover:bg-[#0D8B87] shadow-[0_10px_24px_rgba(14,165,164,0.16)]',
        secondary: 'bg-card/90 border-border text-foreground hover:bg-card-hover',
        ghost: 'border-transparent text-foreground-muted hover:bg-card hover:text-foreground',
        danger: 'bg-danger/10 text-danger border-danger/30 hover:bg-danger/20',
        outline: 'border-primary/40 text-primary hover:bg-primary/10',
      },
      size: {
        sm: 'min-h-9 px-3 py-1.5 text-sm',
        md: 'min-h-10 px-4 py-2',
        lg: 'min-h-11 px-6 py-3',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

Button.displayName = 'Button';