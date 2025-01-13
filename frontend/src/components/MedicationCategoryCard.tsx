interface MedicationCategoryProps {
  icon: string;
  title: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

export function MedicationCategoryCard({ 
  icon, 
  title, 
  count, 
  isSelected,
  onClick 
}: MedicationCategoryProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all ${
        isSelected 
          ? 'bg-blue-500 text-white shadow-md' 
          : 'bg-white text-gray-800 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <div className="whitespace-nowrap">
          <h3 className="font-medium">{title}</h3>
          <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
            {count}种
          </p>
        </div>
      </div>
    </button>
  );
}