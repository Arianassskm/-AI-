import { Stethoscope, Pill, Activity } from 'lucide-react';

const features = [
  {
    icon: Pill,
    title: "智能评估家庭药箱",
    description: "Let's try it now",
    color: "bg-purple-100",
    textColor: "text-purple-900",
    size: "large"
  },
  {
    icon: Activity,
    title: "智能评估药物相互作用",
    description: "New chat",
    color: "bg-amber-100",
    textColor: "text-amber-900",
    size: "small",
    isNew: true
  },
  {
    icon: Stethoscope,
    title: "智能健康评估",
    description: "Search by image",
    color: "bg-green-200",
    textColor: "text-green-900",
    size: "small"
  }
];

export function AIFeatureGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 mx-4">
      {features.map(({ icon: Icon, title, description, color, textColor, size, isNew }) => (
        <div
          key={title}
          className={`relative rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer
            ${color} ${textColor}
            ${size === 'large' ? 'col-span-2 row-span-2' : 'col-span-1'}
          `}
        >
          {isNew && (
            <span className="absolute top-4 right-4 px-2 py-1 bg-red-400 text-white text-xs rounded-full">
              New
            </span>
          )}
          <div className="flex flex-col h-full">
            <div className="rounded-xl bg-white/20 w-12 h-12 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}