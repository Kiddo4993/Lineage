import { cn } from "../lib/utils";
import type { Phase } from "../data/curriculum";

interface PhaseHeaderProps {
  phase: Phase;
  completedInPhase: number;
}

const colorMap = {
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-500",
    text: "text-green-700",
    bar: "bg-green-500",
    barBg: "bg-green-100",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-500",
    text: "text-blue-700",
    bar: "bg-blue-500",
    barBg: "bg-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-500",
    text: "text-purple-700",
    bar: "bg-purple-500",
    barBg: "bg-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-500",
    text: "text-orange-700",
    bar: "bg-orange-500",
    barBg: "bg-orange-100",
  },
  gold: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-400",
    text: "text-yellow-700",
    bar: "bg-yellow-400",
    barBg: "bg-yellow-100",
  },
};

export function PhaseHeader({ phase, completedInPhase }: PhaseHeaderProps) {
  const c = colorMap[phase.color];
  const total = phase.lessons.length;
  const pct = Math.round((completedInPhase / total) * 100);

  return (
    <div className={cn("rounded-2xl border px-4 py-3 mb-4", c.bg, c.border)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm", c.badge)}>
            <span className="text-base">{phase.emoji}</span>
          </div>
          <div>
            <p className={cn("text-xs font-bold uppercase tracking-widest", c.text)}>
              Phase · Days {phase.days}
            </p>
            <h3 className="text-base font-extrabold text-foreground leading-tight">{phase.name}</h3>
          </div>
        </div>
        <span className={cn("text-sm font-bold", c.text)}>{completedInPhase}/{total}</span>
      </div>
      <div className={cn("h-2 rounded-full overflow-hidden", c.barBg)}>
        <div
          className={cn("h-full rounded-full transition-all duration-700", c.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
