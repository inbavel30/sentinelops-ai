// FILE: src/components/ui/Input.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-xl border border-border/80 bg-slate-950/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
        'transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';