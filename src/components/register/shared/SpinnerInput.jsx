import { Minus, Plus } from "lucide-react";

export const SpinnerInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  icon: Icon,
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
      {Icon && <Icon className="w-4 h-4 text-primary" />}
      {label}
    </label>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary/10 transition-all duration-200 flex items-center justify-center"
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || 0)))
        }
        className="w-20 text-center px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
        min={min}
        max={max}
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary/10 transition-all duration-200 flex items-center justify-center"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);
