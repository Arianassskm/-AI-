import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { GUIDE_TYPES, GUIDE_CATEGORIES } from '../../data/guideTypes';
import type { GuideType } from '../../types/medicationGuide';

interface GuideTypeSelectorProps {
  onSelect: (type: GuideType) => void;
}

export function GuideTypeSelector({ onSelect }: GuideTypeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTypes = GUIDE_TYPES.filter(guide => {
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Input
        icon={<Search className="w-5 h-5" />}
        placeholder="搜索用药指引..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            !selectedCategory
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          全部
        </button>
        {GUIDE_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTypes.map(({ type, icon: Icon, title, description }) => (
          <Card
            key={type}
            gradient
            hover
            className="cursor-pointer"
            onClick={() => onSelect(type)}
          >
            <div className="p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </Card>
        ))}

        {filteredTypes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            未找到相关用药指引
          </div>
        )}
      </div>
    </div>
  );
}