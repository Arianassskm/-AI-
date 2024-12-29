import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { UserContext } from '../../types/medicationGuide';

interface UserContextFormProps {
  onSubmit: (context: UserContext) => void;
}

export function UserContextForm({ onSubmit }: UserContextFormProps) {
  const [context, setContext] = useState<UserContext>({
    experience: 'none',
    preferences: {
      detailLevel: 'basic'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(context);
  };

  return (
    <Card gradient>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            使用经验
          </label>
          <select
            value={context.experience}
            onChange={e => setContext(prev => ({
              ...prev,
              experience: e.target.value as UserContext['experience']
            }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">首次使用</option>
            <option value="beginner">有少许经验</option>
            <option value="experienced">经验丰富</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            指引详细程度
          </label>
          <select
            value={context.preferences?.detailLevel}
            onChange={e => setContext(prev => ({
              ...prev,
              preferences: {
                ...prev.preferences,
                detailLevel: e.target.value as UserContext['preferences']['detailLevel']
              }
            }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="basic">基础指引</option>
            <option value="detailed">详细指引</option>
            <option value="expert">专业指引</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          生成个性化指引
        </Button>
      </form>
    </Card>
  );
}