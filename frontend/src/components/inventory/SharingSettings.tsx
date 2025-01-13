```tsx
import { useState } from 'react';
import { Share2, Lock, Users, Eye, Edit, Shield } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface SharingSettingsProps {
  isPublic: boolean;
  onTogglePublic: () => void;
  defaultPermissions: string[];
  onUpdateDefaultPermissions: (permissions: string[]) => void;
}

export function SharingSettings({
  isPublic,
  onTogglePublic,
  defaultPermissions,
  onUpdateDefaultPermissions
}: SharingSettingsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const permissions = [
    { id: 'view', label: '查看', icon: Eye },
    { id: 'edit', label: '编辑', icon: Edit },
    { id: 'manage', label: '管理', icon: Shield }
  ];

  const togglePermission = (permission: string) => {
    if (defaultPermissions.includes(permission)) {
      onUpdateDefaultPermissions(defaultPermissions.filter(p => p !== permission));
    } else {
      onUpdateDefaultPermissions([...defaultPermissions, permission]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Public/Private Toggle */}
      <Card gradient hover>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isPublic ? (
              <Users className="w-5 h-5 text-blue-500" />
            ) : (
              <Lock className="w-5 h-5 text-gray-500" />
            )}
            <div>
              <h3 className="font-medium text-gray-800">
                {isPublic ? '公开药箱' : '私密药箱'}
              </h3>
              <p className="text-sm text-gray-500">
                {isPublic 
                  ? '所有家庭成员都可以访问' 
                  : '仅创建者可以访问'
                }
              </p>
            </div>
          </div>
          <Button
            variant={isPublic ? 'primary' : 'outline'}
            size="sm"
            icon={<Share2 className="w-4 h-4" />}
            onClick={onTogglePublic}
          >
            {isPublic ? '已公开' : '设为公开'}
          </Button>
        </div>
      </Card>

      {/* Advanced Settings */}
      {isPublic && (
        <Card gradient>
          <h3 className="font-medium text-gray-800 mb-4">默认权限设置</h3>
          <div className="space-y-3">
            {permissions.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => togglePermission(id)}
                className={`w-full p-3 rounded-lg flex items-center justify-between transition-all ${
                  defaultPermissions.includes(id)
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </div>
                {defaultPermissions.includes(id) && (
                  <Badge variant="success" size="sm">已启用</Badge>
                )}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
```