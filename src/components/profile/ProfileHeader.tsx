import { useState } from 'react';
import { Settings } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';
import { useAuth } from '../../hooks/useAuth';
import type { User } from '../../types/user';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-32 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600" />
      
      {/* Profile Info */}
      <div className="relative -mt-16 text-center">
        <div className="inline-block relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
          <button 
            className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
            onClick={() => setShowAuthModal(true)}
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            {user.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}