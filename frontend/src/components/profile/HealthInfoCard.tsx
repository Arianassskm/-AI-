import { Heart, AlertCircle } from 'lucide-react';
import { UserHealth } from '../../types/user';

interface HealthInfoCardProps {
  health: UserHealth;
}

export function HealthInfoCard({ health }: HealthInfoCardProps) {
  const bmi = (health.weight / Math.pow(health.height / 100, 2)).toFixed(1);
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h3 className="flex items-center gap-2 text-gray-800 font-medium mb-3">
        <Heart className="w-5 h-5 text-red-500" />
        健康信息
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">身高</p>
          <p className="text-base font-medium text-gray-800">{health.height}cm</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">体重</p>
          <p className="text-base font-medium text-gray-800">{health.weight}kg</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">年龄</p>
          <p className="text-base font-medium text-gray-800">{health.age}岁</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">BMI</p>
          <p className="text-base font-medium text-gray-800">{bmi}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">血型</p>
        <p className="text-base font-medium text-gray-800">{health.bloodType}</p>
      </div>

      {health.allergies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-gray-800 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <p className="text-sm font-medium">过敏史</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {health.allergies.map(allergy => (
              <span
                key={allergy}
                className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}