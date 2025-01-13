import { useState } from 'react';
import { ArrowLeft, Camera, Package, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface MedicineForm {
  name: string;
  nameEn: string;
  manufacturer: string;
  specification: string;
  approvalNumber: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  storageCondition: string;
  description: string;
}

export function ManualEntryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<MedicineForm>({
    name: '',
    nameEn: '',
    manufacturer: '',
    specification: '',
    approvalNumber: '',
    batchNumber: '',
    expiryDate: '',
    quantity: 1,
    storageCondition: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 提交表单数据
    console.log('Form submitted:', form);
    navigate('/medication-cabinet');
  };

  return (
    <div className="min-h-screen bg-gradient-mesh pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="ml-2 text-lg font-semibold text-gray-800">手动录入药品</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/scan')}
            className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-all duration-300"
          >
            <Camera className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900">扫描录入</h3>
            <p className="text-sm text-blue-600 mt-1">快速扫描药品包装</p>
          </button>
          <button
            onClick={() => navigate('/scan-prescription')}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-all duration-300"
          >
            <Package className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-medium text-purple-900">扫描处方</h3>
            <p className="text-sm text-purple-600 mt-1">快速录入处方信息</p>
          </button>
        </div>

        {/* Entry Form */}
        <Card gradient hover>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <h2 className="font-medium text-gray-800">药品信息</h2>
              <Badge variant="warning" size="sm">请认真填写</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="药品名称"
                required
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                label="英文名称"
                value={form.nameEn}
                onChange={e => setForm(prev => ({ ...prev, nameEn: e.target.value }))}
              />
              <Input
                label="生产厂家"
                required
                value={form.manufacturer}
                onChange={e => setForm(prev => ({ ...prev, manufacturer: e.target.value }))}
              />
              <Input
                label="规格"
                required
                value={form.specification}
                onChange={e => setForm(prev => ({ ...prev, specification: e.target.value }))}
              />
              <Input
                label="批准文号"
                value={form.approvalNumber}
                onChange={e => setForm(prev => ({ ...prev, approvalNumber: e.target.value }))}
              />
              <Input
                label="批号"
                value={form.batchNumber}
                onChange={e => setForm(prev => ({ ...prev, batchNumber: e.target.value }))}
              />
              <Input
                type="date"
                label="有效期"
                required
                value={form.expiryDate}
                onChange={e => setForm(prev => ({ ...prev, expiryDate: e.target.value }))}
              />
              <Input
                type="number"
                label="数量"
                required
                min={1}
                value={form.quantity}
                onChange={e => setForm(prev => ({ ...prev, quantity: Number(e.target.value) }))}
              />
            </div>

            <Input
              label="储存条件"
              value={form.storageCondition}
              onChange={e => setForm(prev => ({ ...prev, storageCondition: e.target.value }))}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                药品说明
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              添加到药箱
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}