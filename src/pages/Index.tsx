import { ChevronRight, Sparkles, Flame, TrendingUp, Pencil, Star, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface IndexProps {
  onStartLearning: () => void;
  onGetCoaching: () => void;
}

const FEATURE_BADGES = [
  { icon: Sparkles, label: "AI Coach", color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
  { icon: Flame, label: "Streaks", color: "text-orange-500", bg: "bg-orange-50 border-orange-200" },
  { icon: TrendingUp, label: "Progress", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
];

const PHASE_DOTS = [
  { color: "bg-green-500", label: "Foundations" },
  { color: "bg-blue-500", label: "Proportions" },
  { color: "bg-purple-500", label: "Anatomy" },
  { color: "bg-orange-500", label: "Smarter" },
  { color: "bg-yellow-400", label: "Hero" },
];

export function Index({ onStartLearning, onGetCoaching }: IndexProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative flex-1 flex flex-col max-w-lg mx-auto w-full px-5 pb-10">
        {/* Wordmark */}
        <div className="pt-14 pb-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_0_0_hsl(145_65%_32%)]">
              <Pencil size={20} className="text-white" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">LINEAGE</h1>
          </div>
          <p className="text-muted-foreground font-medium text-base leading-snug pl-12">
            Learn to draw in 45 days.<br />
            <span className="text-foreground font-semibold">One lesson. Every day.</span>
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up delay-100">
          {FEATURE_BADGES.map(({ icon: Icon, label, color, bg }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${bg} ${color}`}
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
        </div>

        {/* Primary CTA card */}
        <div
          className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent p-6 mb-4 animate-fade-in-up delay-200 cursor-pointer group"
          onClick={onStartLearning}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onStartLearning()}
          aria-label="Start Learning"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                45-Day Zero → Hero Path
              </p>
              <h2 className="text-2xl font-extrabold text-foreground leading-tight">
                Start Learning
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-[0_5px_0_0_hsl(145_65%_32%)] group-hover:shadow-[0_3px_0_0_hsl(145_65%_32%)] group-hover:translate-y-[2px] transition-all duration-150 shrink-0">
              <ChevronRight size={22} className="text-white" />
            </div>
          </div>

          {/* Phase progress preview */}
          <div className="flex items-center gap-1.5 mb-4">
            {PHASE_DOTS.map((p) => (
              <div key={p.label} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${p.color}`} />
                <p className="text-[9px] font-semibold text-muted-foreground text-center leading-tight hidden xs:block">
                  {p.label}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Daily lessons · Guided practice · Track streaks
          </p>
        </div>

        {/* Secondary CTA card */}
        <div
          className="rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent/8 via-accent/4 to-transparent p-6 mb-6 animate-fade-in-up delay-300 cursor-pointer group"
          onClick={onGetCoaching}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onGetCoaching()}
          aria-label="Get AI Coaching"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                Upload any drawing
              </p>
              <h2 className="text-2xl font-extrabold text-foreground leading-tight">
                Get Coaching
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Upload a drawing, get AI feedback
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-[0_5px_0_0_hsl(38_92%_40%)] group-hover:shadow-[0_3px_0_0_hsl(38_92%_40%)] group-hover:translate-y-[2px] transition-all duration-150 shrink-0">
              <Sparkles size={22} className="text-white" />
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-2 animate-fade-in-up delay-400 mb-8">
          <div className="flex -space-x-2">
            {["🎨", "✏️", "🖌️", "📐"].map((emoji, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-white flex items-center justify-center text-sm"
                aria-hidden="true"
              >
                {emoji}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              Join <strong className="text-foreground">10,000+</strong> aspiring artists
            </span>
          </div>
        </div>

        {/* Philosophy */}
        <div className="rounded-2xl bg-foreground/3 border border-border p-5 text-center animate-fade-in-up delay-500">
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-base font-semibold text-foreground italic leading-snug">
            "Train your eye. Fix your mistakes. Draw better."
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            The LINEAGE philosophy
          </p>
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-5 pt-3 pb-6">
          <div className="max-w-lg mx-auto flex gap-3">
            <Button className="flex-1" size="lg" onClick={onStartLearning}>
              Start Learning <ChevronRight size={18} />
            </Button>
            <Button variant="accent" size="lg" className="flex-none px-5" onClick={onGetCoaching}>
              <Sparkles size={18} />
            </Button>
          </div>
        </div>

        {/* Spacer for fixed bottom nav */}
        <div className="h-24" />
      </div>
    </div>
  );
}
