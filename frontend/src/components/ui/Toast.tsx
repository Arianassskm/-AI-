import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { CheckCircle2, XCircle, AlertCircle, BellRing } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const ToastIcon = {
  success: CheckCircle2,
  error: XCircle,
  info: AlertCircle,
  warning: BellRing,
};

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = ToastIcon[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        "fixed left-1/2 top-4 -translate-x-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl transition-all duration-300 bg-white min-w-[320px] max-w-[90vw] border",
        {
          "border-emerald-100": type === "success",
          "border-red-100": type === "error",
          "border-blue-100": type === "info",
          "border-yellow-100": type === "warning",
          "translate-x-0 opacity-100": isVisible,
          "translate-y-[-100%] opacity-0": !isVisible,
        }
      )}
    >
      <Icon
        className={cn("h-5 w-5 flex-shrink-0", {
          "text-emerald-500": type === "success",
          "text-red-500": type === "error",
          "text-blue-500": type === "info",
          "text-yellow-500": type === "warning",
        })}
      />
      <span className="text-sm font-medium text-gray-700">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
