import { Book, MessageCircle, Megaphone, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: '生成报告',
    description: '慢病情况',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50/50 to-blue-100/30'
  },
  {
    icon: MessageCircle,
    title: '咨询',
    description: '向药剂师提问',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50/50 to-purple-100/30'
  },
  {
    icon: Megaphone,
    title: '药店',
    description: '查看附近药店',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'from-orange-50/50 to-orange-100/30'
  },
  {
    icon: Sparkles,
    title: '中医',
    description: '更多传统中医知识',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'from-emerald-50/50 to-emerald-100/30'
  }
];

export function AIChatFeatures() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {features.map(({ icon: Icon, title, description, color, bgColor }) => (
        <button
          key={title}
          className="relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover:shadow-lg active:scale-[0.98] group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${bgColor}`} />
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}