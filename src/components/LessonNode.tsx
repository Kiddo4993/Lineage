import { Lock, CheckCircle, Pencil, BookOpen, Sparkles, Target, Star } from "lucide-react";
import { cn } from "../lib/utils";
import type { Phase } from "../data/curriculum";

type NodeStatus = "completed" | "current" | "locked";

interface LessonNodeProps {
  day: number;
  title: string;
  status: NodeStatus;
  phaseColor: Phase["color"];
  onClick: () => void;
  animDelay?: number;
}

const colorConfig = {
  green: {
    bg: "bg-green-500",
    shadow: "node-shadow-green",
    ring: "ring-green-300",
    completedBg: "bg-green-400",
    label: "text-green-700",
  },
  blue: {
    bg: "bg-blue-500",
    shadow: "node-shadow-blue",
    ring: "ring-blue-300",
    completedBg: "bg-blue-400",
    label: "text-blue-700",
  },
  purple: {
    bg: "bg-purple-500",
    shadow: "node-shadow-purple",
    ring: "ring-purple-300",
    completedBg: "bg-purple-400",
    label: "text-purple-700",
  },
  orange: {
    bg: "bg-orange-500",
    shadow: "node-shadow-orange",
    ring: "ring-orange-300",
    completedBg: "bg-orange-400",
    label: "text-orange-700",
  },
  gold: {
    bg: "bg-yellow-400",
    shadow: "node-shadow-gold",
    ring: "ring-yellow-300",
    completedBg: "bg-yellow-300",
    label: "text-yellow-700",
  },
};

function getDayIcon(day: number, status: NodeStatus) {
  if (status === "locked") return <Lock size={22} className="text-white/80" />;
  if (status === "completed") return <CheckCircle size={22} className="text-white" />;
  const icons = [Pencil, BookOpen, Sparkles, Target, Star];
  const Icon = icons[day % icons.length];
  return <Icon size={22} className="text-white" />;
}

export function LessonNode({ day, title, status, phaseColor, onClick, animDelay = 0 }: LessonNodeProps) {
  const c = colorConfig[phaseColor];
  const isLocked = status === "locked";
  const isCurrent = status === "current";

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      aria-label={`Day ${day}: ${title}${isLocked ? " (locked)" : ""}`}
      className={cn(
        "flex flex-col items-center gap-2 group animate-fade-in-up opacity-0",
        isLocked ? "cursor-not-allowed" : "cursor-pointer"
      )}
      style={{ animationDelay: `${animDelay}ms`, animationFillMode: "forwards" }}
    >
      {/* Circle node */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-150 select-none",
          isLocked ? "bg-muted phase-locked node-shadow-locked" : cn(c.bg, c.shadow),
          isCurrent && cn("animate-pulse-glow ring-4", c.ring),
          !isLocked && "active:translate-y-[5px] active:shadow-none"
        )}
      >
        {getDayIcon(day, status)}
      </div>

      {/* Day label */}
      <div className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Day {day}
        </p>
        <p
          className={cn(
            "text-xs font-semibold max-w-[72px] leading-tight text-center",
            isLocked ? "text-muted-foreground/60" : "text-foreground"
          )}
        >
          {title}
        </p>
      </div>
    </button>
  );
}
