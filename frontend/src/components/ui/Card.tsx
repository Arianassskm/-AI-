import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({ 
  gradient = false,
  hover = false,
  className,
  children,
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl",
        "bg-white/80 backdrop-blur-sm",
        gradient && "bg-gradient-to-br from-white/90 to-white/70",
        hover && "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}