import { Flame, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

interface StreakBannerProps {
  streakDays: number;
  todayCompleted: boolean;
  completedCount: number;
  totalDays?: number;
}

export function StreakBanner({
  streakDays,
  todayCompleted,
  completedCount,
  totalDays = 45,
}: StreakBannerProps) {
  const progressPct = Math.round((completedCount / totalDays) * 100);

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-[0_2px_16px_0_hsl(210_20%_85%/0.5)] animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Flame
              size={22}
              className="fill-orange-400 stroke-orange-500 animate-streak-flame"
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-streak">{streakDays}</span>
              <span className="text-sm font-semibold text-muted-foreground">day streak</span>
            </div>
          </div>
        </div>

        {/* Today status */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold",
            todayCompleted
              ? "bg-primary/10 text-primary"
              : "bg-orange-50 text-orange-600"
          )}
        >
          {todayCompleted ? (
            <>
              <CheckCircle2 size={15} />
              Streak saved!
            </>
          ) : (
            <>
              <Flame size={15} className="fill-orange-400 stroke-orange-400" />
              Draw today!
            </>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          <span>{completedCount} / {totalDays} lessons</span>
          <span>{progressPct}% complete</span>
        </div>
        <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
