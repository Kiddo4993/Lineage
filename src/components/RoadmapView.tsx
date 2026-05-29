import { Crown, ArrowLeft } from "lucide-react";
import { StreakBanner } from "./StreakBanner";
import { PhaseHeader } from "./PhaseHeader";
import { LessonNode } from "./LessonNode";
import { Button } from "./ui/button";
import { curriculum } from "../data/curriculum";
import type { Phase } from "../data/curriculum";

interface RoadmapViewProps {
  currentDay: number;
  completedLessons: number[];
  streakDays: number;
  todayCompleted: boolean;
  onSelectLesson: (day: number) => void;
  onBack: () => void;
}

type NodeStatus = "completed" | "current" | "locked";

function getNodeStatus(day: number, currentDay: number, completedLessons: number[]): NodeStatus {
  if (completedLessons.includes(day)) return "completed";
  if (day === currentDay) return "current";
  return "locked";
}

/* Zigzag positions: center, right, center, left cycling per node */
const zigzagPositions = ["justify-center", "justify-end pr-8", "justify-center", "justify-start pl-8"];

export function RoadmapView({
  currentDay,
  completedLessons,
  streakDays,
  todayCompleted,
  onSelectLesson,
  onBack,
}: RoadmapViewProps) {
  const totalCompleted = completedLessons.length;

  function getCompletedInPhase(phase: Phase): number {
    return phase.lessons.filter((l) => completedLessons.includes(l.day)).length;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeft size={18} />
            Home
          </button>
          <h1 className="text-lg font-extrabold tracking-tight">45-Day Path</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Streak banner */}
        <StreakBanner
          streakDays={streakDays}
          todayCompleted={todayCompleted}
          completedCount={totalCompleted}
        />

        {/* Phases */}
        {curriculum.map((phase, phaseIdx) => (
          <div key={phase.name} className="space-y-0">
            {/* Phase header */}
            <PhaseHeader
              phase={phase}
              completedInPhase={getCompletedInPhase(phase)}
            />

            {/* Zigzag node path */}
            <div className="flex flex-col gap-1 pb-4">
              {phase.lessons.map((lesson, lessonIdx) => {
                const globalIdx = phaseIdx * 9 + lessonIdx;
                const zigPos = zigzagPositions[globalIdx % 4];
                const status = getNodeStatus(lesson.day, currentDay, completedLessons);
                const delay = lessonIdx * 60;

                return (
                  <div key={lesson.day} className="relative">
                    {/* Connector line */}
                    {lessonIdx > 0 && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 -top-3 w-0.5 h-4 bg-border"
                        aria-hidden="true"
                      />
                    )}

                    <div className={`flex ${zigPos}`}>
                      <LessonNode
                        day={lesson.day}
                        title={lesson.title}
                        status={status}
                        phaseColor={phase.color}
                        onClick={() => onSelectLesson(lesson.day)}
                        animDelay={delay}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Premium CTA */}
        <div className="rounded-2xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-6 text-center space-y-3 animate-fade-in">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_4px_0_0_hsl(45_90%_35%)]">
              <Crown size={24} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-foreground">Unlock Premium</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Streak protection · Unlimited AI coaching · Exclusive content
            </p>
          </div>
          <Button variant="premium" size="sm">
            Upgrade — $4.99/mo
          </Button>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
