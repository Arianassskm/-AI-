import { Heart, AlertCircle } from 'lucide-react';
import type { User } from '../../types/user';

interface ProfileHealthInfoProps {
  user: User;
}

export function ProfileHealthInfo({ user }: ProfileHealthInfoProps) {
  const bmi = (user.health.weight / Math.pow(user.health.height / 100, 2)).toFixed(1);
  
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-primary-600" />
        <h2 className="text-base font-medium text-gray-800">健康信息</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">身高</p>
          <p className="text-base font-medium text-gray-800">{user.health.height}cm</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">体重</p>
          <p className="text-base font-medium text-gray-800">{user.health.weight}kg</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">年龄</p>
          <p className="text-base font-medium text-gray-800">{user.health.age}岁</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">BMI</p>
          <p className="text-base font-medium text-gray-800">{bmi}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">血型</p>
        <p className="text-base font-medium text-gray-800">{user.health.bloodType}</p>
      </div>

      {user.health.allergies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-gray-800 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <p className="text-sm font-medium">过敏史</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.health.allergies.map(allergy => (
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