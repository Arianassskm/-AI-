import { useState } from 'react';
import { AIHeader } from '../components/ai/AIHeader';
import { AISearchInput } from '../components/ai/AISearchInput';
import { AIFeatureGrid } from '../components/ai/AIFeatureGrid';
import { EmergencyGuide } from '../components/EmergencyGuide';
import { AIChatExpanded } from '../components/AIChatExpanded';

export function AIPage() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="px-4 pt-safe-top space-y-6">
        <AIHeader onSearch={() => setShowChat(true)} />
        <AISearchInput onClick={() => setShowChat(true)} />
        <AIFeatureGrid />
        <EmergencyGuide />
      </div>

      {showChat && <AIChatExpanded onClose={() => setShowChat(false)} />}
    </div>
  );
}