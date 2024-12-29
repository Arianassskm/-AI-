import { User } from '../data/users';
import { useState } from 'react';
import { UserProfileModal } from './UserProfileModal';

interface UserProfileGridProps {
  users: User[];
}

export function UserProfileGrid({ users }: UserProfileGridProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const colors = ['bg-orange-100', 'bg-purple-100', 'bg-blue-100', 'bg-green-100'];
  
  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">家庭成员</h3>
        <div className="grid grid-cols-2 gap-4">
          {users.map((user, index) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`relative flex items-center p-3 rounded-xl transition-all duration-300 ${
                colors[index % colors.length]
              } hover:shadow-md active:scale-[0.98]`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="ml-3 text-left">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <UserProfileModal
        user={selectedUser!}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}