import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MedicationCabinetHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 pb-32">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">您的家庭小药箱</h1>
      </div>
      <p className="text-blue-100">目前已收录25种药品</p>
    </div>
  );
}