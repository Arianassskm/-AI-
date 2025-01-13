import { useState } from "react";
import { AlertCircle, Clock, Check, Package } from "lucide-react";
import { cn } from "../../utils/cn";
import { Badge } from "../ui/Badge";

import { CancelDialog } from "./CancelDialog";
import type { MedicationReminder } from "../../types/medication";

interface TimelineItemProps {
  reminder: MedicationReminder;
  isFirst: boolean;
  isLast: boolean;
  onComplete: (reminderId: string) => void;
  onCancel: (reminderId: string) => Promise<void>;
}

export function TimelineItem({
  reminder,
  isFirst,
  isLast,
  onComplete,
  onCancel,
}: TimelineItemProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleClick = () => {
    if (reminder.type === "expiration" || reminder.type === "low_stock") return;

    if (reminder.isCompleted) {
      setShowCancelDialog(true);
    } else {
      onComplete(reminder.id);
    }
  };

  const getIndicatorStyles = () => {
    if (reminder.type === "expiration") {
      return "bg-amber-50 border-amber-400 animate-pulse cursor-default shadow-[0_0_0_4px_rgba(251,191,36,0.1)]";
    }
    if (reminder.type === "low_stock") {
      return "bg-rose-50 border-rose-400 animate-pulse cursor-default shadow-[0_0_0_4px_rgba(244,63,94,0.1)]";
    }
    return reminder.isCompleted
      ? "bg-emerald-50 border-emerald-500 scale-110 shadow-lg hover:bg-emerald-100 cursor-pointer"
      : "bg-white border-gray-300 hover:border-emerald-400 hover:scale-110 hover:shadow-md cursor-pointer";
  };

  const getCardStyles = () => {
    if (reminder.isCompleted) {
      return "bg-emerald-50/80 backdrop-blur-sm shadow-sm hover:shadow-md";
    }
    if (reminder.type === "expiration") {
      return "bg-gradient-to-r from-amber-50/90 to-orange-50/90 backdrop-blur-sm shadow-sm hover:shadow-md border border-amber-200/50";
    }
    if (reminder.type === "low_stock") {
      return "bg-gradient-to-r from-rose-50/90 to-pink-50/90 backdrop-blur-sm shadow-sm hover:shadow-md border border-rose-200/50";
    }
    return "bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md";
  };

  const getBarStyles = () => {
    if (reminder.type === "reminder") {
      return reminder.isCompleted
        ? "bg-gradient-to-b from-emerald-400 to-emerald-600"
        : "bg-gradient-to-b from-blue-400 to-blue-600";
    }
    if (reminder.type === "expiration") {
      return "bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500 animate-pulse";
    }
    return "bg-gradient-to-b from-rose-400 via-rose-500 to-pink-500 animate-pulse";
  };

  return (
    <div className="flex gap-2">
      <div className="w-10 text-gray-400 pt-4 text-xs">{reminder.time}</div>

      <div className="relative flex-1">
        {!isFirst && (
          <div className="absolute top-0 left-[9px] h-4 w-[2px] bg-gray-200/50" />
        )}

        <div className="relative">
          <div className="absolute top-4 left-2.5 h-full w-[2px] bg-gray-200/50" />

          <div className="relative z-10 mt-4">
            {/* Completion Indicator */}
            <div
              onClick={handleClick}
              className={cn(
                "absolute left-0 top-2 h-5 w-5 rounded-full border-[3px] transition-all duration-300",
                getIndicatorStyles()
              )}
            >
              {reminder.isCompleted && (
                <Check className="w-3 h-3 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
              {reminder.type === "expiration" && (
                <AlertCircle className="w-3 h-3 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
              {reminder.type === "low_stock" && (
                <Package className="w-3 h-3 text-rose-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>

            {/* Content Card */}
            <div
              className={cn(
                "ml-8 rounded-xl p-3 transition-all duration-300",
                getCardStyles()
              )}
              onClick={handleClick}
            >
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-1 rounded-full", getBarStyles())} />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3
                        className={cn(
                          "font-medium transition-colors duration-300",
                          reminder.isCompleted
                            ? "text-emerald-800"
                            : reminder.type === "expiration"
                            ? "text-amber-800"
                            : reminder.type === "low_stock"
                            ? "text-rose-800"
                            : "text-gray-800"
                        )}
                      >
                        {reminder.medication}
                      </h3>
                      {reminder.type === "expiration" && (
                        <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          即将过期
                        </span>
                      )}
                      {reminder.type === "low_stock" && (
                        <span className="flex items-center gap-1 text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                          <Package className="h-3.5 w-3.5" />
                          库存不足
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    className={cn(
                      "text-sm mt-0.5 transition-colors duration-300",
                      reminder.isCompleted
                        ? "text-emerald-600"
                        : reminder.type === "expiration"
                        ? "text-amber-600"
                        : reminder.type === "low_stock"
                        ? "text-rose-600"
                        : "text-gray-500"
                    )}
                  >
                    {reminder.dosage}
                    {reminder.dosageUnit}
                  </p>

                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="default" size="sm">
                          第 {reminder.currentDay}/{reminder.totalDays} 天
                        </Badge>
                        <Badge variant="success" size="sm">
                          今日 {reminder.todayDose}/{reminder.totalDosePerDay}{" "}
                          次
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="default" size="sm">
                          第 {reminder.currentPack}
                          {reminder.packUnit},第{reminder.currentPill}
                          {reminder.dosageUnit}
                        </Badge>
                        <Badge variant="success" size="sm">
                          共 {reminder.totalPacks}
                          {reminder.packUnit},每
                          {reminder.packUnit}
                          {reminder.pillsPerPack}
                          {reminder.dosageUnit}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {reminder.type === "expiration" &&
                    reminder.expirationDate && (
                      <p className="mt-2 text-xs text-amber-600/90 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md w-fit">
                        <Clock className="h-3 w-3" />
                        过期时间: {reminder.expirationDate}
                      </p>
                    )}

                  {reminder.type === "low_stock" &&
                    reminder.remainingQuantity !== undefined && (
                      <p className="mt-2 text-xs text-rose-600/90 flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md w-fit">
                        <Package className="h-3 w-3" />
                        剩余: {reminder.remainingQuantity}/
                        {reminder.totalQuantity} {reminder.dosage}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLast && (
          <div className="absolute bottom-0 left-[9px] h-4 w-[2px] bg-gray-200/50" />
        )}
      </div>

      <CancelDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={async () => {
          await onCancel(reminder.id);
          setShowCancelDialog(false);
        }}
        reminderName={reminder.medication}
      />
    </div>
  );
}
