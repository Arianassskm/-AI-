import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Package,
  Calendar,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { medicationService } from "../services/medication";
import { getValue } from "@/hooks/useLocalStorage";
import { compressImage } from "../utils/image.util";
import { useToast } from "@/hooks/useToast";

interface MedicineForm {
  name: string;
  manufacturer: string;
  specification: string;
  packageInfo: string;
  approvalNumber: string;
  batchNumber: string;
  expiryDate: string;
  unit: string;
  totalQuantity: number;
  currentQuantity: number;
  storageCondition: string;
  description: string;
  image?: string;
  userId?: number;
}

export function ManualEntryPage() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [form, setForm] = useState<MedicineForm>({
    name: "",
    manufacturer: "",
    specification: "",
    packageInfo: "",
    approvalNumber: "",
    batchNumber: "",
    expiryDate: "",
    unit: "片",
    totalQuantity: 1,
    currentQuantity: 1,
    storageCondition: "",
    description: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB 限制
        alert("图片大小不能超过 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          // 压缩图片
          const compressedImage = await compressImage(base64String, 1024, 0.8);
          setImagePreview(compressedImage);
          setForm((prev) => ({ ...prev, image: compressedImage }));
        } catch (error) {
          console.error("图片压缩失败:", error);
          alert("图片处理失败，请重试");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const userInfo = getValue("userInfo");
    if (userInfo === undefined || userInfo.id === undefined) {
      toast("请先登录", "error");
      setIsLoading(false);
      return;
    }

    form.userId = userInfo.id;
    const ret = await medicationService.createMedication(form);
    setIsLoading(false);
    if (ret.success) {
      toast("添加药品成功", "success");
      navigate("/medication-cabinet");
    } else {
      toast(ret.message, "error");
    }
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
            <h1 className="ml-2 text-lg font-semibold text-gray-800">
              手动录入药品
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/scan")}
            className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-all duration-300"
          >
            <Camera className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-blue-900">扫描录入</h3>
            <p className="text-sm text-blue-600 mt-1">快速扫描药品包装</p>
          </button>
          <button
            onClick={() => navigate("/scan-prescription")}
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
              <Badge variant="warning" size="sm">
                请认真填写
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="药品名称"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                label="生产厂家"
                required
                value={form.manufacturer}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, manufacturer: e.target.value }))
                }
              />
              <Input
                label="规格"
                required
                value={form.specification}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    specification: e.target.value,
                  }))
                }
              />
              <Input
                label="包装"
                required
                value={form.packageInfo}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    packageInfo: e.target.value,
                  }))
                }
              />
              <Input
                label="批准文号"
                value={form.approvalNumber}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    approvalNumber: e.target.value,
                  }))
                }
              />
              <Input
                label="批号"
                value={form.batchNumber}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, batchNumber: e.target.value }))
                }
              />
              <Input
                type="date"
                label="有效期"
                required
                value={form.expiryDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, expiryDate: e.target.value }))
                }
              />
              <Input
                label="单位"
                required
                value={form.unit}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, unit: e.target.value }))
                }
              />
              <Input
                type="number"
                label="总数量"
                required
                min={1}
                value={form.totalQuantity}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    totalQuantity: Number(e.target.value),
                  }))
                }
              />
              <Input
                type="number"
                label="当前数量"
                required
                min={1}
                value={form.currentQuantity}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    currentQuantity: Number(e.target.value),
                  }))
                }
              />
            </div>

            <Input
              label="储存条件"
              value={form.storageCondition}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  storageCondition: e.target.value,
                }))
              }
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                药品说明
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                药品图片
              </label>
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="药品预览"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">点击上传药品图片</p>
                    <p className="text-xs text-gray-400 mt-1">
                      支持 JPG, PNG 格式
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <Button
              loading={isLoading}
              type="submit"
              size="lg"
              className="w-full"
            >
              添加到药箱
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
