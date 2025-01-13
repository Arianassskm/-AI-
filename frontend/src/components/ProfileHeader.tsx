import { ArrowLeft } from 'lucide-react';

export function ProfileHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-gray-800 text-white">
      <ArrowLeft className="w-6 h-6" />
      <h1 className="text-lg font-medium">成员管理</h1>
      <div className="w-6" />
    </header>
  );
}