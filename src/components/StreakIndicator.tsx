import { Flame } from "lucide-react";
import { cn } from "../lib/utils";
import { getStreakMessage } from "../data/curriculum";

interface StreakIndicatorProps {
  days: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StreakIndicator({ days, className, size = "md" }: StreakIndicatorProps) {
  const sizeMap = {
    sm: { icon: 16, text: "text-sm", counter: "text-base" },
    md: { icon: 22, text: "text-base", counter: "text-xl" },
    lg: { icon: 30, text: "text-lg", counter: "text-3xl" },
  };
  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Flame
        size={s.icon}
        className="text-streak animate-streak-flame fill-orange-400 stroke-orange-500"
        aria-hidden="true"
      />
      <span className={cn("font-extrabold text-streak", s.counter)}>{days}</span>
      <span className={cn("font-semibold text-muted-foreground", s.text)}>
        {getStreakMessage(days)}
      </span>
    </div>
  );
}
