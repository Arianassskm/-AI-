import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Loader2, StopCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface AIChatInputProps {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
}

export function AIChatInput({ onSend, disabled }: AIChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { 
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(prev => prev + transcript);
    }
  }, [transcript]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || disabled) return;
    
    await onSend(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="sticky bottom-0 bg-white border-t px-4 py-3"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的问题，或点击麦克风语音输入..."
            className="w-full px-4 py-3 pr-24 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            disabled={disabled}
          />
          
          {isSupported && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors",
                isListening 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              )}
            >
              {isListening ? (
                <StopCircle className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          {disabled ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              处理中
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              发送
            </>
          )}
        </button>
      </div>
    </form>
  );
}