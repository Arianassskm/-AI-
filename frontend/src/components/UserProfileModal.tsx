import { X, Plus } from 'lucide-react';
import { User } from '../types/user';
import { HealthInfoCard } from './profile/HealthInfoCard';
import { ActiveMedicationCard } from './profile/ActiveMedicationCard';

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ user, isOpen, onClose }: UserProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        style={{
          animation: 'modalIn 0.3s ease-out'
        }}
      >
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover mx-auto shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>

          {/* Health Information */}
          <HealthInfoCard health={user.health} />

          {/* Active Medication Plans */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-800 font-medium mb-4">用药计划</h3>
            <button className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-purple-600 hover:border-purple-300 transition-colors">
              <Plus className="w-8 h-8" />
              <span className="text-sm">添加用药计划</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}