```tsx
import { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MemberManagement } from '../components/inventory/MemberManagement';
import { SharingSettings } from '../components/inventory/SharingSettings';
import { SharingHistory } from '../components/inventory/SharingHistory';

// Mock data
const mockMembers = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    role: 'owner' as const,
    permissions: ['view', 'edit', 'manage']
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    role: 'admin' as const,
    permissions: ['view', 'edit']
  }
];

const mockRecords = [
  {
    id: '1',
    type: 'borrow' as const,
    userId: '2',
    userName: '李四',
    userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    medicationId: 'm1',
    medicationName: '布洛芬胶囊',
    quantity: 4,
    unit: '粒',
    timestamp: '2024-03-15T10:30:00Z',
    note: '感冒发烧，借用几粒'
  },
  {
    id: '2',
    type: 'return' as const,
    userId: '2',
    userName: '李四',
    userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    medicationId: 'm1',
    medicationName: '布洛芬胶囊',
    quantity: 2,
    unit: '粒',
    timestamp: '2024-03-16T15:20:00Z',
    note: '退还未使用的药品'
  }
];

export function SharedCabinetPage() {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(true);
  const [defaultPermissions, setDefaultPermissions] = useState(['view']);

  const handleInviteMember = (email: string) => {
    console.log('Invite member:', email);
  };

  const handleUpdatePermissions = (memberId: string, permissions: string[]) => {
    console.log('Update permissions:', memberId, permissions);
  };

  const handleRemoveMember = (memberId: string) => {
    console.log('Remove member:', memberId);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="ml-2 text-lg font-semibold text-gray-800">共享药箱</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<Settings className="w-4 h-4" />}
            >
              设置
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Sharing Settings */}
        <Card gradient>
          <h2 className="font-medium text-gray-800 mb-4">共享设置</h2>
          <SharingSettings
            isPublic={isPublic}
            onTogglePublic={() => setIsPublic(!isPublic)}
            defaultPermissions={defaultPermissions}
            onUpdateDefaultPermissions={setDefaultPermissions}
          />
        </Card>

        {/* Member Management */}
        <Card gradient>
          <h2 className="font-medium text-gray-800 mb-4">成员管理</h2>
          <MemberManagement
            members={mockMembers}
            onInviteMember={handleInviteMember}
            onUpdatePermissions={handleUpdatePermissions}
            onRemoveMember={handleRemoveMember}
          />
        </Card>

        {/* Sharing History */}
        <Card gradient>
          <SharingHistory records={mockRecords} />
        </Card>
      </div>
    </div>
  );
}
```