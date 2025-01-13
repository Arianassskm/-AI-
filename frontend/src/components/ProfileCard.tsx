import { Mail, Phone, MapPin, Settings } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
}

export function ProfileCard({ name, avatar, email, phone, location }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400" />
      
      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <img
            src={avatar}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover mx-auto"
          />
          <button 
            className="absolute bottom-0 right-1/3 bg-white p-2 rounded-full shadow-md"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
          <p className="text-sm text-gray-500">用户ID: 123456</p>
        </div>

        {/* Contact Details */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-3" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-3" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}