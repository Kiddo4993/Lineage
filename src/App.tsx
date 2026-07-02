import { useState, useCallback } from "react";
import { Index } from "./pages/Index";
import { RoadmapView } from "./components/RoadmapView";
import { LessonView } from "./components/LessonView";
import { CoachingView } from "./components/CoachingView";
import { NotFound } from "./pages/NotFound";

type View = "home" | "roadmap" | "lesson" | "coaching" | "notfound";

interface AppState {
  currentDay: number;
  completedLessons: number[];
  streakDays: number;
  todayCompleted: boolean;
  xp: number;
  lastCompletedDate: string | null;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(dateISO: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateISO === yesterday.toISOString().slice(0, 10);
}

function loadState(): AppState {
  try {
    const saved = localStorage.getItem("lineage_state");
    if (saved) {
      const parsed: AppState = JSON.parse(saved);
      // Reset today's completion flag if the last completion wasn't today
      if (parsed.lastCompletedDate !== todayISO()) {
        parsed.todayCompleted = false;
      }
      return parsed;
    }
  } catch {}
  return {
    currentDay: 1,
    completedLessons: [],
    streakDays: 0,
    todayCompleted: false,
    xp: 0,
    lastCompletedDate: null,
  };
}

function saveState(state: AppState) {
  try {
    localStorage.setItem("lineage_state", JSON.stringify(state));
  } catch {}
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [appState, setAppState] = useState<AppState>(loadState);

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setAppState((prev) => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  function handleSelectLesson(day: number) {
    setActiveLesson(day);
    setView("lesson");
  }

  function handleCompleteLesson(day: number) {
    updateState((prev) => {
      const alreadyDone = prev.completedLessons.includes(day);
      const newCompleted = alreadyDone ? prev.completedLessons : [...prev.completedLessons, day];
      const newCurrentDay = Math.min(
        Math.max(prev.currentDay, day + 1),
        45
      );

      const today = todayISO();
      let newStreak = prev.streakDays;
      if (prev.lastCompletedDate === today) {
        // Already completed a lesson today — streak doesn't change
      } else if (prev.lastCompletedDate && isYesterday(prev.lastCompletedDate)) {
        newStreak = prev.streakDays + 1;
      } else {
        // First-ever completion, or a missed day broke the streak
        newStreak = 1;
      }

      return {
        ...prev,
        completedLessons: newCompleted,
        currentDay: newCurrentDay,
        streakDays: newStreak,
        todayCompleted: true,
        lastCompletedDate: today,
        xp: prev.xp + 15,
      };
    });
    // Return to roadmap after celebration delay
    setTimeout(() => {
      setView("roadmap");
      setActiveLesson(null);
    }, 2000);
  }

  function handleBack() {
    if (view === "lesson") {
      setView("roadmap");
      setActiveLesson(null);
    } else {
      setView("home");
    }
  }

  return (
    <div className="font-outfit">
      {view === "home" && (
        <Index
          onStartLearning={() => setView("roadmap")}
          onGetCoaching={() => setView("coaching")}
        />
      )}

      {view === "roadmap" && (
        <RoadmapView
          currentDay={appState.currentDay}
          completedLessons={appState.completedLessons}
          streakDays={appState.streakDays}
          todayCompleted={appState.todayCompleted}
          onSelectLesson={handleSelectLesson}
          onBack={() => setView("home")}
        />
      )}

      {view === "lesson" && activeLesson !== null && (
        <LessonView
          day={activeLesson}
          onComplete={handleCompleteLesson}
          onBack={handleBack}
        />
      )}

      {view === "coaching" && (
        <CoachingView onBack={() => setView("home")} />
      )}

      {view === "notfound" && (
        <NotFound onBack={() => setView("home")} />
      )}
    </div>
  );
}
