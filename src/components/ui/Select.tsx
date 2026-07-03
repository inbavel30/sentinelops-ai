// FILE: src/components/ui/Select.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 pr-10 bg-card border border-border rounded-lg text-foreground appearance-none',
          'focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
    </div>
  );
});

Select.displayName = 'Select';