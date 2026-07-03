// FILE: src/components/ui/Card.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean;
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, hover = true, glass = true, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      whileHover={hover ? { y: -3, scale: 1.005 } : undefined}
      transition={{ duration: 0.18 }}
      className={cn(
        'rounded-2xl border border-border/80 p-6 shadow-[0_16px_48px_rgba(2,6,23,0.3)]',
        glass && 'glass',
        !glass && 'bg-card',
        hover && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';