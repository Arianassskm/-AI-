import { Sun, Moon, Cloud } from 'lucide-react';
import { useState, useEffect } from 'react';

const greetings = [
  '愿您今天身体健康，心情愉悦！',
  '记得按时服药，保重身体哦！',
  '健康是最好的礼物，让我们一起守护它！',
  '每一天都是新的开始，愿您充满活力！'
];

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 6) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

export function WelcomeSection() {
  const [greeting, setGreeting] = useState(greetings[0]);
  const timeOfDay = getTimeOfDay();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
  }, []);

  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'morning':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'afternoon':
        return <Cloud className="w-6 h-6 text-blue-500" />;
      case 'evening':
      case 'night':
        return <Moon className="w-6 h-6 text-indigo-500" />;
    }
  };

  const getGreetingText = () => {
    switch (timeOfDay) {
      case 'morning':
        return '早上好';
      case 'afternoon':
        return '下午好';
      case 'evening':
        return '晚上好';
      case 'night':
        return '夜深了';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3 mb-2">
        {getTimeIcon()}
        <h2 className="text-xl font-bold text-gray-800">{getGreetingText()}</h2>
      </div>
      <p className="text-gray-600">{greeting}</p>
    </div>
  );
}