import { LucideIcon } from 'lucide-react';

interface AIFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  gradient: string;
  onClick: () => void;
}

export function AIFeatureCard({
  icon: Icon,
  title,
  description,
  color,
  bgColor,
  gradient,
  onClick
}: AIFeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover:shadow-lg active:scale-[0.98] w-full group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} backdrop-blur-sm`} />
      <div className="relative">
        <div className={`w-10 h-10 rounded-xl ${bgColor} backdrop-blur-sm flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}