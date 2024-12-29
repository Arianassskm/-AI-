import { Link, useLocation } from 'react-router-dom';
import { Home, Brain, Grid, User, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateActionSheet } from './CreateActionSheet';

export function Navigation() {
  const location = useLocation();
  const [showActionSheet, setShowActionSheet] = useState(false);

  const navItems = [
    { icon: Home, label: '主页', path: '/' },
    { icon: Brain, label: 'AI智能', path: '/ai' },
    { icon: Grid, label: '空间', path: '/space' },
    { icon: User, label: '我的', path: '/profile' }
  ];

  const handleActionSelect = (action: 'scan' | 'manual' | 'plan' | 'reminder') => {
    // 处理不同的操作
    switch (action) {
      case 'scan':
        console.log('扫描添加');
        break;
      case 'manual':
        console.log('手动录入');
        break;
      case 'plan':
        console.log('新建计划');
        break;
      case 'reminder':
        console.log('新建提醒');
        break;
    }
  };

  return (
    <>
      <nav className="nav-container">
        <div className="max-w-md mx-auto px-4 h-[var(--nav-height)] flex items-center justify-between relative">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all ${
                  isActive ? 'bg-blue-50/80' : 'hover:bg-gray-50/80'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-0.5">{label}</span>
              </Link>
            );
          })}

          {/* Center Add Button */}
          <button 
            onClick={() => setShowActionSheet(true)}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors active:scale-95"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      <CreateActionSheet
        isOpen={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        onSelect={handleActionSelect}
      />
    </>
  );
}