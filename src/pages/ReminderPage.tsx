import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ReminderCreationModal } from '../components/reminders/ReminderCreationModal';
import { ReminderTrackingCard } from '../components/reminders/ReminderTrackingCard';

// 模拟用药计划数据
const mockPlans = [
  {
    id: '1',
    name: '感冒治疗',
    medicines: [
      {
        id: 'm1',
        name: '布洛芬胶囊',
        dosage: '0.3g',
        frequency: '每日3次',
        duration: '3天',
        totalQuantity: 9,
        currentQuantity: 6,
        dosageUnit: '粒',
        imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop',
        tracking: {
          currentDay: 2,
          totalDays: 3,
          todayDose: 1,
          totalDosePerDay: 3,
          currentPack: 1,
          totalPacks: 1,
          currentPill: 4,
          pillsPerPack: 9,
          nextDoseTime: '12:00',
          specialInstruction: 'after_meals'
        }
      },
      {
        id: 'm2',
        name: '感冒灵颗粒',
        dosage: '1袋',
        frequency: '每日3次',
        duration: '3天',
        totalQuantity: 9,
        currentQuantity: 7,
        dosageUnit: '袋',
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop',
        tracking: {
          currentDay: 2,
          totalDays: 3,
          todayDose: 1,
          totalDosePerDay: 3,
          currentPack: 1,
          totalPacks: 1,
          currentPill: 3,
          pillsPerPack: 9,
          nextDoseTime: '12:00',
          specialInstruction: 'with_water'
        }
      }
    ]
  }
];

export function ReminderPage() {
  const navigate = useNavigate();
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [showCreationModal, setShowCreationModal] = useState(false);

  const handleConfirmReminder = (data: any) => {
    console.log('Reminder data:', data);
    setShowCreationModal(false);
  };

  const handleCompleteReminder = (medicineId: string) => {
    console.log('Completed medicine:', medicineId);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="ml-2 text-lg font-semibold text-gray-800">用药提醒</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Plans List */}
        {mockPlans.map(plan => (
          <Card key={plan.id} gradient hover className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-800">{plan.name}</h2>
              <Button
                variant="outline"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  setSelectedMedicine(plan.medicines[0]);
                  setShowCreationModal(true);
                }}
              >
                添加提醒
              </Button>
            </div>

            <div className="space-y-4">
              {plan.medicines.map(medicine => (
                <ReminderTrackingCard
                  key={medicine.id}
                  medication={medicine}
                  tracking={medicine.tracking}
                  onComplete={() => handleCompleteReminder(medicine.id)}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Creation Modal */}
      {selectedMedicine && (
        <ReminderCreationModal
          isOpen={showCreationModal}
          onClose={() => {
            setShowCreationModal(false);
            setSelectedMedicine(null);
          }}
          onConfirm={handleConfirmReminder}
          medication={selectedMedicine}
        />
      )}
    </div>
  );
}