import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        // Variants
        variant === 'primary' && [
          "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
          "hover:from-blue-600 hover:to-blue-700",
          "focus:ring-blue-500"
        ],
        variant === 'secondary' && [
          "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
          "hover:from-purple-600 hover:to-purple-700",
          "focus:ring-purple-500"
        ],
        variant === 'outline' && [
          "border border-gray-200 text-gray-700",
          "hover:bg-gray-50",
          "focus:ring-gray-500"
        ],
        // Sizes
        size === 'sm' && "px-3 py-1.5 text-sm",
        size === 'md' && "px-4 py-2",
        size === 'lg' && "px-6 py-3 text-lg",
        // States
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {!loading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
}