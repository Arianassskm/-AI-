interface Medication {
  name: string;
  dosage: string;
  time: string;
}

interface MedicationReminderProps {
  medications: Medication[];
}

export function MedicationReminder({ medications }: MedicationReminderProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white/30 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-md"></div>
      <div className="relative z-10 p-4">
        <h3 className="text-sm font-medium text-gray-800 mb-3">用药提醒</h3>

        <div className="space-y-2">
          {medications.map((med, index) => (
            <div 
              key={index}
              className="flex items-center gap-3"
            >
              <div className="w-12 text-gray-500 text-xs font-medium">
                {med.time}
              </div>
              <div className="flex-1 bg-blue-50/80 backdrop-blur-sm rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-800 mb-0.5">{med.name}</h4>
                <p className="text-xs text-gray-500">{med.dosage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}