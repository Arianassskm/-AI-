import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SpaceHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <button 
        onClick={() => navigate(-1)}
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        用药空间
      </h1>
      <div className="w-10" /> {/* Spacer for alignment */}
    </div>
  );
}