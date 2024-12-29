import { Mail, Phone, MapPin } from 'lucide-react';
import { User } from '../../types/user';

interface ContactInfoCardProps {
  user: User;
}

export function ContactInfoCard({ user }: ContactInfoCardProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
        <Mail className="w-5 h-5 mr-3" />
        <span className="text-sm">{user.email}</span>
      </div>
      <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
        <Phone className="w-5 h-5 mr-3" />
        <span className="text-sm">{user.phone}</span>
      </div>
      <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
        <MapPin className="w-5 h-5 mr-3" />
        <span className="text-sm">{user.location}</span>
      </div>
    </div>
  );
}