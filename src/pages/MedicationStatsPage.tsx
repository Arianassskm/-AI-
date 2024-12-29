import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import { cn } from '../utils/cn';
import { StatsHeader } from '../components/stats/StatsHeader';
import { StatsOverview } from '../components/stats/StatsOverview';
import { TimeRangeTabs } from '../components/TimeRangeTabs';

interface MedicationTask {
  id: string;
  name: string;
  totalDoses: number;
  completedDoses: number[];
  user: {
    name: string;
    avatar: string;
    color: string;
  };
}

const userColors = {
  [users[0].id]: 'bg-blue-400',
  [users[1].id]: 'bg-purple-400',
  [users[2].id]: 'bg-emerald-400'
};

export function MedicationStatsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [tasks, setTasks] = useState<MedicationTask[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 模拟根据时间范围获取不同的数据
    const mockData = {
      week: [
        {
          id: '1',
          name: '阿莫西林',
          totalDoses: 3,
          completedDoses: [3, 2, 3, 1, 2, 0, 0],
          user: { ...users[0], color: userColors[users[0].id] }
        },
        {
          id: '2',
          name: '布洛芬',
          totalDoses: 2,
          completedDoses: [0, 2, 2, 1, 0, 0, 0],
          user: { ...users[0], color: userColors[users[0].id] }
        }
      ],
      month: [
        {
          id: '1',
          name: '阿莫西林',
          totalDoses: 3,
          completedDoses: Array(30).fill(2),
          user: { ...users[0], color: userColors[users[0].id] }
        }
      ],
      year: [
        {
          id: '1',
          name: '阿莫西林',
          totalDoses: 3,
          completedDoses: Array(12).fill(60),
          user: { ...users[0], color: userColors[users[0].id] }
        }
      ]
    };

    setTasks(mockData[timeRange]);
  }, [timeRange]);

  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  // 计算统计数据
  const calculateStats = () => {
    const totalDoses = tasks.reduce((sum, task) => 
      sum + task.totalDoses * task.completedDoses.length, 0
    );
    
    const completedDoses = tasks.reduce((sum, task) => 
      sum + task.completedDoses.reduce((a, b) => a + b, 0), 0
    );

    const completionRate = ((completedDoses / totalDoses) * 100).toFixed(1);

    // 计算最佳连续天数
    let bestStreak = 0;
    let currentStreak = 0;
    
    for (let day = 0; day < tasks[0]?.completedDoses.length || 0; day++) {
      const dayComplete = tasks.every(task => 
        task.completedDoses[day] === task.totalDoses
      );
      
      if (dayComplete) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return {
      bestStreak,
      completedDoses,
      totalDoses,
      completionRate
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100">
      <StatsHeader onBack={() => navigate(-1)} />
      
      <div className="px-4 space-y-6">
        {/* Overview Cards */}
        <StatsOverview stats={stats} />

        {/* Time Range Selector */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <TimeRangeTabs
            activeTab={timeRange}
            onTabChange={setTimeRange}
          />
        </div>

        {/* Tasks Grid */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex mb-3">
            <div className="w-20" />
            <div className="flex-1 grid grid-cols-7 gap-1 text-center">
              {weekDays.map(day => (
                <div key={day} className="text-xs text-gray-500">周{day}</div>
              ))}
            </div>
            <div className="w-8" />
          </div>

          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center">
                <div className="w-20">
                  <div className="text-sm text-gray-800 truncate" title={task.name}>
                    {task.name}
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {task.completedDoses.map((completed, index) => {
                    const percentage = (completed / task.totalDoses) * 100;
                    return (
                      <div
                        key={index}
                        className="h-8 rounded-md bg-gray-50 overflow-hidden"
                      >
                        <div
                          className={cn(
                            "h-full transition-all duration-300",
                            task.user.color,
                            completed === 0 && "h-0"
                          )}
                          style={{ height: `${percentage}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="w-8 flex justify-center">
                  <img
                    src={task.user.avatar}
                    alt={task.user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}