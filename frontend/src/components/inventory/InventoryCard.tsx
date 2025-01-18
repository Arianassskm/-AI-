import { AlertCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

interface InventoryCardProps {
  medication: {
    id: string;
    name: string;
    image: string;
    currentQuantity: number;
    totalQuantity: number;
    expiryDate: string;
    unit: string;
  };
  onUpdate: () => void;
}

export function InventoryCard({ medication, onUpdate }: InventoryCardProps) {
  const stockPercentage =
    (medication.currentQuantity / medication.totalQuantity) * 100;
  const isLowStock = stockPercentage < 20;

  const daysUntilExpiry = Math.ceil(
    (new Date(medication.expiryDate).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry < 0;

  return (
    <Card gradient hover>
      <div className="flex gap-4">
        <img
          src={medication.image}
          alt={medication.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-gray-800">{medication.name}</h3>
              <div className="flex gap-2 mt-1">
                {isLowStock && (
                  <Badge variant="warning" size="sm">
                    库存不足
                  </Badge>
                )}
                {isExpiringSoon && (
                  <Badge variant="error" size="sm">
                    即将过期
                  </Badge>
                )}
                {isExpired && (
                  <Badge variant="error" size="sm">
                    已过期
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onUpdate}>
              更新库存
            </Button>
          </div>

          <div className="space-y-3">
            {/* Stock Progress */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">库存</span>
                <span className="text-gray-800 font-medium">
                  {medication.currentQuantity}/{medication.totalQuantity}{" "}
                  {medication.unit}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    isLowStock ? "bg-amber-500" : "bg-blue-500"
                  )}
                  style={{ width: `${stockPercentage}%` }}
                />
              </div>
            </div>

            {/* Expiry Warning */}
            {isExpiringSoon ||
              (isExpired && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 rounded-lg px-3 py-2 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {daysUntilExpiry > 0
                      ? `将在 ${daysUntilExpiry} 天后过期`
                      : "已过期"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
