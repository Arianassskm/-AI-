import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        // Variants
        variant === 'default' && "bg-blue-50 text-blue-700",
        variant === 'success' && "bg-green-50 text-green-700", 
        variant === 'warning' && "bg-amber-50 text-amber-700",
        variant === 'error' && "bg-red-50 text-red-700",
        // Sizes
        size === 'sm' && "px-2 py-0.5 text-xs",
        size === 'md' && "px-3 py-1 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}