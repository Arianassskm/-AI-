import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function Checkbox({
  id,
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  label,
}: CheckboxProps) {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked && "border-emerald-400 bg-emerald-400",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
      >
        {checked && <Check className="h-3 w-3 text-white stroke-[3]" />}
      </div>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "ml-2 text-sm leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
