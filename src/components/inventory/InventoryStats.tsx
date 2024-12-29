import { Package, AlertCircle, Archive } from 'lucide-react';
import { Card } from '../ui/Card';

interface InventoryStatsProps {
  totalMedications: number;
  lowStockCount: number;
  expiringCount: number;
}

export function InventoryStats({ 
  totalMedications,
  lowStockCount, 
  expiringCount 
}: InventoryStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card gradient hover className="flex flex-col items-center justify-center p-4">
        <Archive className="w-6 h-6 text-blue-500 mb-2" />
        <span className="text-2xl font-bold text-gray-800">{totalMedications}</span>
        <span className="text-sm text-gray-500">药品总数</span>
      </Card>

      <Card gradient hover className="flex flex-col items-center justify-center p-4">
        <Package className="w-6 h-6 text-amber-500 mb-2" />
        <span className="text-2xl font-bold text-gray-800">{lowStockCount}</span>
        <span className="text-sm text-gray-500">库存不足</span>
      </Card>

      <Card gradient hover className="flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-6 h-6 text-red-500 mb-2" />
        <span className="text-2xl font-bold text-gray-800">{expiringCount}</span>
        <span className="text-sm text-gray-500">即将过期</span>
      </Card>
    </div>
  );
}