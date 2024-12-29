import { ArrowLeft, MoreHorizontal, Edit2 } from 'lucide-react';

interface AIHeaderProps {
  userName: string;
  userRole: string;
  avatar: string;
}

export function AIHeader({ userName, userRole, avatar }: AIHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <ArrowLeft className="w-6 h-6 text-gray-600" />
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium text-gray-800">{userName}</h2>
            <span className="text-xs text-gray-500">{userRole}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Edit2 className="w-5 h-5 text-gray-600" />
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </div>
    </header>
  );
}