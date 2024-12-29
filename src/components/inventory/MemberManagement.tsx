```tsx
import { useState } from 'react';
import { UserPlus, Settings, Mail } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member';
  permissions: ('view' | 'edit' | 'manage')[];
}

interface MemberManagementProps {
  members: Member[];
  onInviteMember: (email: string) => void;
  onUpdatePermissions: (memberId: string, permissions: string[]) => void;
  onRemoveMember: (memberId: string) => void;
}

export function MemberManagement({
  members,
  onInviteMember,
  onUpdatePermissions,
  onRemoveMember
}: MemberManagementProps) {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    onInviteMember(inviteEmail);
    setInviteEmail('');
    setShowInvite(false);
  };

  const getRoleBadge = (role: Member['role']) => {
    switch (role) {
      case 'owner':
        return <Badge variant="success">创建者</Badge>;
      case 'admin':
        return <Badge variant="warning">管理员</Badge>;
      default:
        return <Badge>成员</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Invite Form */}
      {showInvite ? (
        <Card gradient>
          <form onSubmit={handleInvite} className="space-y-4">
            <h3 className="font-medium text-gray-800">邀请新成员</h3>
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="请输入邮箱地址"
              icon={<Mail className="w-5 h-5" />}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm">发送邀请</Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setShowInvite(false)}
              >
                取消
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button
          variant="outline"
          icon={<UserPlus className="w-5 h-5" />}
          onClick={() => setShowInvite(true)}
        >
          邀请成员
        </Button>
      )}

      {/* Members List */}
      <div className="space-y-3">
        {members.map(member => (
          <Card key={member.id} gradient hover>
            <div className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-800">{member.name}</h3>
                  {getRoleBadge(member.role)}
                </div>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              {member.role !== 'owner' && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Settings className="w-4 h-4" />}
                  onClick={() => {/* Show permissions modal */}}
                >
                  权限
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```