import { MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { AIChatExpanded } from './AIChatExpanded';

export function AIChatbot() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 mx-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-800">AI 管家</h3>
          </div>
          <span className="text-sm text-purple-600">智能对话</span>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-4 min-h-[100px] mb-3">
          <p className="text-gray-500 text-sm">您好！我是您的AI健康助手，请问有什么可以帮您？</p>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="输入您的问题..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={() => setIsExpanded(true)}
            readOnly
          />
          <button className="p-2 bg-purple-600 text-white rounded-xl">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isExpanded && <AIChatExpanded onClose={() => setIsExpanded(false)} />}
    </>
  );
}