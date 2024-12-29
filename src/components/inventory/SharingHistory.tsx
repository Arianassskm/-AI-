```tsx
import { History, User, Package } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface SharingRecord {
  id: string;
  type: 'borrow' | 'return' | 'share';
  userId: string;
  userName: string;
  userAvatar: string;
  medicationId: string;
  medicationName: string;
  quantity: number;
  unit: string;
  timestamp: string;
  note?: string;
}

interface SharingHistoryProps {
  records: SharingRecord[];
}

export function SharingHistory({ records }: SharingHistoryProps) {
  const getActionBadge = (type: SharingRecord['type']) => {
    switch (type) {
      case 'borrow':
        return <Badge variant="warning">借用</Badge>;
      case 'return':
        return <Badge variant="success">归还</Badge>;
      case 'share':
        return <Badge variant="default">共享</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-800">
        <History className="w-5 h-5" />
        <h2 className="font-medium">共享记录</h2>
      </div>

      <div className="space-y-3">
        {records.map(record => (
          <Card key={record.id} gradient hover>
            <div className="flex items-start gap-4">
              <img
                src={record.userAvatar}
                alt={record.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {record.userName}
                    </span>
                    {getActionBadge(record.type)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(record.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Package className="w-4 h-4" />
                  <span>{record.medicationName}</span>
                  <span>·</span>
                  <span>{record.quantity} {record.unit}</span>
                </div>

                {record.note && (
                  <p className="mt-2 text-sm text-gray-500">{record.note}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```