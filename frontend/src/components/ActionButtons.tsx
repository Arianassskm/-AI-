import { Plus, Bell, Star } from 'lucide-react';
import { useState } from 'react';
import { CreatePlanModal } from './plans/CreatePlanModal';
import { AddMedicineModal } from './AddMedicineModal';
import { ReminderConfirmModal } from './ReminderConfirmModal';

interface ActionButton {
  icon: typeof Plus | typeof Bell;
  label: string;
  badge?: typeof Star;
  special?: boolean;
  onClick: () => void;
}

export function ActionButtons() {
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const handleCreatePlan = async (planData: any) => {
    try {
      // TODO: 实现创建计划的逻辑
      console.log('Creating plan:', planData);
      // 创建成功后关闭弹窗
      setShowCreatePlan(false);
    } catch (error) {
      console.error('Failed to create plan:', error);
    }
  };

  const buttons: ActionButton[] = [
    { 
      icon: Plus, 
      label: '添加药品',
      onClick: () => setShowAddMedicine(true)
    },
    { 
      icon: Plus, 
      label: '添加计划',
      onClick: () => setShowCreatePlan(true)
    },
    { 
      icon: Bell, 
      label: '生成提醒',
      badge: Star,
      special: true,
      onClick: () => setShowReminder(true)
    }
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {buttons.map(({ icon: Icon, label, badge: Badge, special, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={`relative flex flex-col items-center justify-center p-3 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 ${
              special ? 'from-green-100 to-blue-100' : ''
            }`}
          >
            {Badge && (
              <Badge className="absolute top-1 left-1 w-4 h-4 text-yellow-500" />
            )}
            <Icon className={`w-6 h-6 mb-1 ${special ? 'text-blue-600' : 'text-purple-600'}`} />
            <span className={`text-sm ${special ? 'text-blue-700' : 'text-purple-700'}`}>{label}</span>
          </button>
        ))}
      </div>

      {/* Modals */}
      <AddMedicineModal 
        isOpen={showAddMedicine} 
        onClose={() => setShowAddMedicine(false)} 
      />
      
      <CreatePlanModal
        isOpen={showCreatePlan}
        onClose={() => setShowCreatePlan(false)}
        onSubmit={handleCreatePlan}
      />
      
      <ReminderConfirmModal
        isOpen={showReminder}
        onClose={() => setShowReminder(false)}
      />
    </>
  );
}