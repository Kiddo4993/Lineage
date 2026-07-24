import { useEffect, useState } from "react";
import { ArrowLeft, ImageIcon, CheckCircle2, Pencil, X } from "lucide-react";
import { getAllDrawings, type StoredDrawing } from "../lib/drawingStore";
import { getLesson, getPhaseForDay } from "../data/curriculum";
import { cn } from "../lib/utils";

interface SketchbookViewProps {
  onBack: () => void;
}

export function SketchbookView({ onBack }: SketchbookViewProps) {
  const [drawings, setDrawings] = useState<StoredDrawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<StoredDrawing | null>(null);

  useEffect(() => {
    getAllDrawings()
      .then(setDrawings)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-lg font-extrabold tracking-tight">My Sketchbook</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {loading && (
          <p className="text-center text-sm text-muted-foreground py-12">Loading your drawings…</p>
        )}

        {!loading && drawings.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <ImageIcon size={28} className="text-primary/60" />
            </div>
            <p className="font-semibold text-foreground">No drawings yet</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Complete a lesson or use AI Coaching to start filling your sketchbook.
            </p>
          </div>
        )}

        {!loading && drawings.length > 0 && (
          <div className="grid grid-cols-3 gap-2 animate-fade-in-up">
            {drawings.map((d) => {
              const lesson = d.day ? getLesson(d.day) : undefined;
              return (
                <button
                  key={d.key}
                  onClick={() => setSelected(d)}
                  className="relative aspect-square rounded-xl overflow-hidden border border-border group cursor-pointer"
                >
                  <img
                    src={d.dataUrl}
                    alt={lesson?.title ?? d.category ?? "Drawing"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {d.day && (
                    <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      Day {d.day}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-background rounded-2xl overflow-hidden max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selected.dataUrl} alt="Drawing" className="w-full object-contain max-h-96 bg-secondary" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {selected.day
                    ? `${getPhaseForDay(selected.day)?.name} · Day ${selected.day}`
                    : selected.category}
                </p>
                <h2 className="text-xl font-extrabold text-foreground">
                  {selected.day ? getLesson(selected.day)?.title : "Coaching drawing"}
                </h2>
              </div>

              {selected.feedback && (
                <>
                  <div className={cn("rounded-xl p-3 border border-green-200 bg-green-50/50")}>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 size={14} className="text-green-600" />
                      <h3 className="font-bold text-green-700 text-xs uppercase tracking-wide">What's working</h3>
                    </div>
                    <ul className="space-y-1">
                      {selected.feedback.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-green-800">✓ {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl p-3 border border-blue-200 bg-blue-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Pencil size={12} className="text-blue-600" />
                      <h3 className="font-bold text-blue-700 text-xs uppercase tracking-wide">To improve</h3>
                    </div>
                    <ul className="space-y-1">
                      {selected.feedback.improvements.map((s, i) => (
                        <li key={i} className="text-sm text-blue-800">→ {s}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
