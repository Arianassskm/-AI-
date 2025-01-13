import { Activity, AlertTriangle } from 'lucide-react';

interface HealthAnalysisProps {
  medicationData: {
    yearlyUsage: number;
    averageSteps: number;
    age: number;
    riskScore: number;
  };
}

export function HealthAnalysis({ medicationData }: HealthAnalysisProps) {
  const { yearlyUsage, averageSteps, age, riskScore } = medicationData;
  
  // 计算有氧水平评级
  const getAerobicLevel = (steps: number) => {
    if (steps >= 10000) return { level: '优秀', color: 'text-green-600' };
    if (steps >= 7500) return { level: '良好', color: 'text-blue-600' };
    if (steps >= 5000) return { level: '一般', color: 'text-yellow-600' };
    return { level: '需要提升', color: 'text-red-600' };
  };

  // 根据年龄段和风险分数评估疾病风险
  const getRiskLevel = (age: number, score: number) => {
    const baseRisk = score / 100;
    const ageFactor = age > 60 ? 1.5 : age > 40 ? 1.2 : 1;
    return Math.min(baseRisk * ageFactor * 100, 100).toFixed(1);
  };

  const aerobicStatus = getAerobicLevel(averageSteps);
  const riskPercentage = getRiskLevel(age, riskScore);

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {/* 健康趋势分析 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-800">健康趋势分析</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">处方用药时间占比</span>
              <span className="font-medium text-gray-800">{yearlyUsage}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${yearlyUsage}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">日均步数</span>
              <span className="font-medium text-gray-800">{averageSteps}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(averageSteps / 10000) * 100}%` }}
                />
              </div>
              <span className={`text-xs ${aerobicStatus.color}`}>
                {aerobicStatus.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 健康风险评估 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="font-medium text-gray-800">健康风险评估</h3>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-amber-50">
            <h4 className="font-medium text-gray-800 mb-1">重大疾病风险评估</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${riskPercentage}%` }}
                />
              </div>
              <span className="text-sm text-amber-700">{riskPercentage}%</span>
            </div>
            <p className="text-xs text-amber-600 mt-2">
              基于您的年龄段({age}岁)和用药计划评估
            </p>
          </div>
          
          {Number(riskPercentage) > 50 && (
            <div className="text-sm text-gray-600">
              建议定期进行体检，保持健康的生活方式
            </div>
          )}
        </div>
      </div>
    </div>
  );
}