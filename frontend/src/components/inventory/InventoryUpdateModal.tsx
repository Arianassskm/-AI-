import { useState } from "react";
import { X, Plus, Minus, AlertCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { medicationService, Medication } from "@/services/medication";

interface InventoryUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  medicine: Medication;
}

export function InventoryUpdateModal({
  isOpen,
  onClose,
  onSuccess,
  medicine,
}: InventoryUpdateModalProps) {
  const [type, setType] = useState<"add" | "subtract">("add");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    medicine.currentQuantity =
      type === "add"
        ? Number(medicine?.currentQuantity) + quantity
        : Number(medicine?.currentQuantity) >= quantity
        ? Number(medicine?.currentQuantity) - quantity
        : 0;
    medicine.totalQuantity =
      type === "add"
        ? Number(medicine?.totalQuantity) + quantity
        : medicine.totalQuantity;

    const ret = await medicationService.updateMedication(medicine.id, medicine);
    console.log("Update data:", ret);
    setIsLoading(false);

    if (ret.success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-xl w-[90%] max-w-md">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">更新库存</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Current Status */}
          <Card gradient>
            <h3 className="font-medium text-gray-800 mb-2">{medicine.name}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">当前库存</span>
              <span className="font-medium text-gray-800">
                {medicine.currentQuantity}/{medicine.totalQuantity}{" "}
                {medicine.unit}
              </span>
            </div>
          </Card>

          {/* Update Type */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType("add")}
              className={`p-4 rounded-xl text-center transition-all ${
                type === "add"
                  ? "bg-blue-50 text-blue-700 ring-2 ring-blue-500"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Plus className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium">入库</span>
            </button>
            <button
              type="button"
              onClick={() => setType("subtract")}
              className={`p-4 rounded-xl text-center transition-all ${
                type === "subtract"
                  ? "bg-amber-50 text-amber-700 ring-2 ring-amber-500"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Minus className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium">出库</span>
            </button>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              数量
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={type === "subtract" ? medicine.currentQuantity : undefined}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-gray-500">{medicine.unit}</span>
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              原因说明
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={type === "add" ? "请输入入库原因" : "请输入出库原因"}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Warning */}
          {type === "subtract" && quantity > medicine.currentQuantity && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">出库数量不能大于当前库存</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={isLoading}
            disabled={
              type === "subtract" && quantity > medicine.currentQuantity
            }
          >
            确认{type === "add" ? "入库" : "出库"}
          </Button>
        </form>
      </div>
    </div>
  );
}
