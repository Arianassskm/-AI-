import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PlanManagementHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center h-16">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="ml-2 text-lg font-semibold text-gray-800">用药计划管理</h1>
        </div>
      </div>
    </div>
  );
}