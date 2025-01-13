import { Mic, MicOff } from 'lucide-react';
import { useState } from 'react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  onToggleListening: () => void;
}

export function VoiceInput({ onTranscript, isListening, onToggleListening }: VoiceInputProps) {
  return (
    <button
      onClick={onToggleListening}
      className={`absolute right-3 top-3 p-2 rounded-full transition-colors ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {isListening ? (
        <Mic className="w-5 h-5" />
      ) : (
        <MicOff className="w-5 h-5" />
      )}
    </button>
  );
}