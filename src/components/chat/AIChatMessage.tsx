import { User, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ChatMessage } from '../../hooks/useAIChat';

interface AIChatMessageProps {
  message: ChatMessage;
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex gap-3 px-4 py-2 group transition-colors",
      isUser && "flex-row-reverse"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
      )}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      
      {/* Message Content */}
      <div className={cn(
        "relative max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm",
        isUser 
          ? "bg-blue-500 text-white rounded-tr-none" 
          : "bg-white text-gray-800 rounded-tl-none"
      )}>
        {/* Message Text */}
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
          {message.content}
        </p>

        {/* Timestamp */}
        <div className={cn(
          "absolute bottom-1 text-[10px] whitespace-nowrap",
          isUser ? "-left-12" : "-right-12",
          "text-gray-400"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>

        {/* Triangle */}
        <div className={cn(
          "absolute top-0 w-2 h-2 transform",
          isUser 
            ? "right-0 translate-x-1/2 bg-blue-500" 
            : "left-0 -translate-x-1/2 bg-white",
          "clip-path-triangle"
        )} />
      </div>
    </div>
  );
}