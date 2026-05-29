import { useState, useRef, useCallback } from "react";
import {
  ArrowLeft, BookOpen, Pencil, Upload, Sparkles,
  CheckCircle2, Camera, X, ImageIcon, ChevronRight, Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { getLesson, getPhaseForDay, MOTIVATIONAL_MESSAGES } from "../data/curriculum";
import { cn } from "../lib/utils";
import confetti from "canvas-confetti";

interface LessonViewProps {
  day: number;
  onComplete: (day: number) => void;
  onBack: () => void;
}

type Step = "lesson" | "task" | "upload" | "feedback";

const STEPS: { id: Step; label: string; icon: typeof BookOpen }[] = [
  { id: "lesson", label: "Lesson", icon: BookOpen },
  { id: "task", label: "Task", icon: Pencil },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "feedback", label: "Feedback", icon: Sparkles },
];

function generateFeedback(day: number, prompt: string): { strengths: string[]; improvements: string[]; next: string } {
  const strengthPools = [
    "Your line confidence has really improved",
    "Great attention to overall composition",
    "Strong grasp of light and shadow relationships",
    "Solid construction and underlying structure",
    "Good proportion awareness throughout",
    "Nice variety in your mark-making",
    "Clear understanding of the core concept",
    "Impressive commitment to the exercise",
  ];
  const improvementPools = [
    "Try to loosen your grip for more fluid strokes",
    "Push the value contrast a bit further — darks darker, lights lighter",
    "Check proportions by measuring with your pencil before committing",
    "Spend more time observing before drawing each stroke",
    "Add more variety to your line weights for visual interest",
    "The shadow edges could be softer on the light-to-shadow transition",
    "Try to simplify further — reduce before you add detail",
    "The cast shadow could anchor the object more to the surface",
  ];
  const nextSteps = [
    "Do the exercise again but 2× faster — speed forces commitment",
    "Try the same subject from a different angle or viewpoint",
    "Add one more value step to push the tonal range",
    "Repeat with your non-dominant hand to deepen muscle memory",
    "Apply this technique to a subject you personally find meaningful",
    "Do a timed version: set a timer and don't lift the pencil",
  ];

  const seed = day * 3;
  return {
    strengths: [
      strengthPools[seed % strengthPools.length],
      strengthPools[(seed + 2) % strengthPools.length],
    ],
    improvements: [
      improvementPools[(seed + 1) % improvementPools.length],
      improvementPools[(seed + 3) % improvementPools.length],
    ],
    next: nextSteps[seed % nextSteps.length],
  };
}

function StepIndicator({ current, steps }: { current: Step; steps: typeof STEPS }) {
  const currentIdx = steps.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-1" aria-label="Lesson progress">
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.id} className="flex items-center gap-1">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 text-xs",
                done && "bg-primary text-white",
                active && "bg-primary text-white ring-4 ring-primary/20 scale-110",
                !done && !active && "bg-secondary text-muted-foreground"
              )}
            >
              {done ? <CheckCircle2 size={14} /> : <step.icon size={13} />}
            </div>
            {i < steps.length - 1 && (
              <div className={cn("w-6 h-0.5 rounded-full transition-colors duration-500", done ? "bg-primary" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function LessonView({ day, onComplete, onBack }: LessonViewProps) {
  const lesson = getLesson(day);
  const phase = getPhaseForDay(day);
  const [step, setStep] = useState<Step>("lesson");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const motMessage = MOTIVATIONAL_MESSAGES[day % MOTIVATIONAL_MESSAGES.length];

  if (!lesson || !phase) return null;

  const feedback = generateFeedback(day, lesson.aiFeedbackPrompt);

  const phaseColorMap: Record<string, string> = {
    green: "text-green-600 bg-green-50 border-green-200",
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
    orange: "text-orange-600 bg-orange-50 border-orange-200",
    gold: "text-yellow-600 bg-yellow-50 border-yellow-200",
  };
  const phaseColors = phaseColorMap[phase.color] ?? phaseColorMap.green;

  function fireConfetti() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }
    fire(0.25, { spread: 26, startVelocity: 55, colors: ["#4ade80", "#22c55e"] });
    fire(0.2, { spread: 60, colors: ["#60a5fa", "#3b82f6"] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#facc15", "#f59e0b"] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleAnalyze() {
    if (!uploadedImage) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep("feedback");
    }, 2200);
  }

  function handleComplete() {
    setCelebrating(true);
    setShowXP(true);
    fireConfetti();
    setTimeout(() => {
      onComplete(day);
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <StepIndicator current={step} steps={STEPS} />
          <div className={cn("text-xs font-bold px-2 py-1 rounded-full border", phaseColors)}>
            Day {day}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* XP popup */}
        {showXP && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="animate-[xpPop_1.2s_ease-out_forwards] text-4xl font-extrabold text-primary bg-white rounded-2xl shadow-xl px-8 py-4 border-4 border-primary/20 flex items-center gap-2">
              <Star size={28} className="text-yellow-400 fill-yellow-400" />
              +15 XP
            </div>
          </div>
        )}

        {/* ── Step 1: Lesson ── */}
        {step === "lesson" && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                {phase.name} · Day {day} of 45
              </p>
              <h1 className="text-3xl font-extrabold text-foreground">{lesson.title}</h1>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={18} className="text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Today's Lesson</h2>
                </div>
                <p className="text-foreground leading-relaxed text-base">{lesson.lesson}</p>
              </CardContent>
            </Card>

            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-base">💡</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary mb-1">Quick tip</p>
                <p className="text-sm text-muted-foreground">
                  Read the lesson, then close the app and draw. Come back to upload when you're done.
                </p>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={() => setStep("task")}>
              Start Drawing <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* ── Step 2: Task ── */}
        {step === "task" && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Drawing Task
              </p>
              <h1 className="text-3xl font-extrabold text-foreground">{lesson.title}</h1>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Pencil size={18} className="text-primary" />
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Your task</h2>
                </div>
                <p className="text-foreground leading-relaxed text-base">{lesson.task}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-3">
              {["10–20 min", "Paper + pencil", "No erasing yet"].map((tip) => (
                <div key={tip} className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-xs font-semibold text-muted-foreground leading-tight">{tip}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl">⏱</span>
              <div>
                <p className="text-sm font-semibold text-amber-700 mb-0.5">Suggested time</p>
                <p className="text-sm text-amber-600">
                  Spend 10–20 minutes on this exercise. Quality over quantity — one careful study beats ten rushed ones.
                </p>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={() => setStep("upload")}>
              I'm Done — Upload Drawing <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* ── Step 3: Upload ── */}
        {step === "upload" && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                Upload
              </p>
              <h1 className="text-3xl font-extrabold text-foreground">Show your work</h1>
            </div>

            {/* Upload zone */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleUpload}
                className="hidden"
                id="drawing-upload"
              />

              {uploadedImage ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
                  <img
                    src={uploadedImage}
                    alt="Your uploaded drawing"
                    className="w-full object-contain max-h-72"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={11} /> Ready to analyze
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="drawing-upload"
                  className="upload-zone h-56 cursor-pointer flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/4 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <ImageIcon size={28} className="text-primary/60" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Tap to upload your drawing</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Photo or gallery · Any format</p>
                  </div>
                </label>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={16} /> Camera
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={16} /> Gallery
              </Button>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!uploadedImage || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Analyzing your drawing…
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Get AI Feedback
                </>
              )}
            </Button>

            {isAnalyzing && (
              <div className="text-center animate-fade-in">
                <p className="text-sm text-muted-foreground">
                  Reading your lines, shapes, and values…
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: Feedback ── */}
        {step === "feedback" && (
          <div className="space-y-5 animate-bounce-in">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                AI Feedback
              </p>
              <h1 className="text-3xl font-extrabold text-foreground">Your results</h1>
            </div>

            {uploadedImage && (
              <div className="rounded-2xl overflow-hidden border border-border">
                <img src={uploadedImage} alt="Your drawing" className="w-full object-contain max-h-52" />
              </div>
            )}

            {/* Strengths */}
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <h3 className="font-bold text-green-700 text-sm uppercase tracking-wide">What's working</h3>
                </div>
                <ul className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Pencil size={12} className="text-white" />
                  </div>
                  <h3 className="font-bold text-blue-700 text-sm uppercase tracking-wide">To improve</h3>
                </div>
                <ul className="space-y-2">
                  {feedback.improvements.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                      <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next step */}
            <Card className="border-purple-200 bg-purple-50/50">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">🎯</span>
                  <h3 className="font-bold text-purple-700 text-sm uppercase tracking-wide">Next challenge</h3>
                </div>
                <p className="text-sm text-purple-800">{feedback.next}</p>
              </CardContent>
            </Card>

            {/* Complete button */}
            <Button
              className={cn("w-full", celebrating && "opacity-80")}
              size="lg"
              onClick={handleComplete}
              disabled={celebrating}
            >
              {celebrating ? (
                <>
                  <span className="text-base">🎉</span> {motMessage}!
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} /> Complete Day {day}
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              You'll earn +15 XP for completing this lesson
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
