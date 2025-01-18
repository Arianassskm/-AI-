import { ArrowLeft } from "lucide-react";

interface PlanManagementHeaderProps {
  onBack: () => void;
}

export function PlanManagementHeader({ onBack }: PlanManagementHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center h-16">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="ml-2 text-lg font-semibold text-gray-800 text-center">
            用药计划管理
          </h1>
        </div>
      </div>
    </div>
  );
}
