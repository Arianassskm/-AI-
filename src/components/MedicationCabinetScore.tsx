import { Award, ChevronRight } from 'lucide-react';

interface MedicationCabinetScoreProps {
  score: number;
  onImprove: () => void;
}

export function MedicationCabinetScore({ score, onImprove }: MedicationCabinetScoreProps) {
  return (
    <div className="relative h-48 mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600">
      {/* Background Decoration */}
      <div className="absolute -left-4 -top-4 w-32 h-32 bg-blue-400 rounded-full opacity-20" />
      <div className="absolute right-8 top-8 w-24 h-24 bg-blue-400 rounded-full opacity-20" />
      
      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        <h2 className="text-2xl font-bold">家庭药箱</h2>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-12 h-12" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">{score}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-300">
                      {star <= Math.floor(score / 20) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-blue-100">药箱评分</p>
            </div>
          </div>
          
          <button
            onClick={onImprove}
            className="flex items-center gap-1 px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            立即提升
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}