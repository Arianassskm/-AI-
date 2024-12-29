import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HotTopic {
  id: string;
  title: string;
  highlight: string;
  description: string;
  imageUrl: string;
  tags: string[];
  readCount: number;
  aiGenerated: boolean;
}

export function EmergencyGuide() {
  const [hotTopics, setHotTopics] = useState<HotTopic[]>([
    {
      id: '1',
      title: '流感季节',
      highlight: '预防感冒',
      description: '最新AI辅助分析：近期流感高发，这些预防措施要知道',
      imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=400&fit=crop',
      tags: ['流感', '预防', '用药建议'],
      readCount: 2890,
      aiGenerated: true
    },
    {
      id: '2',
      title: '春季过敏',
      highlight: '花粉过敏',
      description: 'AI智能提醒：花粉过敏高发期，提前做好这些准备',
      imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=400&fit=crop',
      tags: ['过敏', '花粉', '防护'],
      readCount: 1560,
      aiGenerated: true
    },
    {
      id: '3',
      title: '季节交替',
      highlight: '呼吸道疾病',
      description: 'AI分析：气温波动大，当心这些呼吸道疾病',
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=400&fit=crop',
      tags: ['呼吸道', '预防', '保健'],
      readCount: 3420,
      aiGenerated: true
    }
  ]);

  useEffect(() => {
    // 这里可以添加实时获取热点话题的逻辑
    const interval = setInterval(() => {
      // 模拟更新阅读量
      setHotTopics(prev => prev.map(topic => ({
        ...topic,
        readCount: topic.readCount + Math.floor(Math.random() * 10)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h2 className="text-base font-medium text-gray-800">智能热点</h2>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          更多
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {hotTopics.map((topic) => (
          <div 
            key={topic.id}
            className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-medium text-gray-800">
                      {topic.title}
                      <span className="text-blue-600 ml-1">{topic.highlight}</span>
                    </h3>
                    {topic.aiGenerated && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                        <Sparkles className="w-3 h-3" />
                        AI 分析
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{topic.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {topic.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-400">
                      {topic.readCount.toLocaleString()} 阅读
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={topic.imageUrl}
                    alt={topic.title}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}