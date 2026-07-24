import { useState, useRef } from "react";
import {
  ArrowLeft, Upload, Sparkles, X, ImageIcon, CheckCircle2,
  Pencil, ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";
import { saveCoachingDrawing } from "../lib/drawingStore";
import { analyzeDrawing } from "../lib/aiClient";
import type { DrawingFeedback } from "../types/feedback";

interface CoachingViewProps {
  onBack: () => void;
}

const CATEGORIES = [
  { id: "portrait", label: "Portrait", emoji: "👤", description: "Faces and heads" },
  { id: "figure", label: "Figure", emoji: "🧍", description: "Full body, poses" },
  { id: "hands", label: "Hands", emoji: "✋", description: "Hand gestures" },
  { id: "perspective", label: "Perspective", emoji: "🏙️", description: "Architecture, space" },
  { id: "still-life", label: "Still Life", emoji: "🍎", description: "Objects and forms" },
  { id: "creature", label: "Creature", emoji: "🐉", description: "Animals and creatures" },
  { id: "landscape", label: "Landscape", emoji: "🌄", description: "Environments" },
  { id: "other", label: "Other", emoji: "✏️", description: "Anything else" },
];

type CategoryId = (typeof CATEGORIES)[number]["id"];

const FEEDBACK_BY_CATEGORY: Record<
  CategoryId,
  { strengths: string[]; improvements: string[]; tip: string }
> = {
  portrait: {
    strengths: [
      "Good awareness of the overall head shape and jaw structure",
      "Feature placement shows solid understanding of facial proportions",
    ],
    improvements: [
      "The eye line may be sitting slightly high — remember it's at the vertical midpoint of the whole head, not just the face",
      "Push the value contrast further under the brow ridge and around the nose",
    ],
    tip: "Study the planes of the face as flat geometric surfaces — the forehead, cheek, and jaw are distinct angled planes that catch light differently.",
  },
  figure: {
    strengths: [
      "Strong line of action — the pose has clear energy and direction",
      "Good awareness of the major body masses (torso and pelvis)",
    ],
    improvements: [
      "The limb tapering could be more pronounced — arms and legs are widest near the joint, narrowest at extremities",
      "Try exaggerating the contrapposto (opposite tilt of ribcage and hips) for more dynamism",
    ],
    tip: "Before adding detail, check your figure's silhouette. Fill it in black — if the pose still reads, you're on the right track.",
  },
  hands: {
    strengths: [
      "The palm box structure is coming through clearly",
      "Good relative finger length — you're getting the hierarchy right",
    ],
    improvements: [
      "The knuckle line curves across the hand (not straight) — this gives the hand its natural arch",
      "Give more volume to the thumb's base muscle (the thenar eminence) — it's meatier than most beginners draw",
    ],
    tip: "Think of the hand in three chunks: the palm box, the four-finger unit, and the thumb. They can each rotate and bend independently.",
  },
  perspective: {
    strengths: [
      "Strong sense of depth and recession in the composition",
      "Good horizon line awareness — the eye level is consistent",
    ],
    improvements: [
      "Check that parallel edges of each object converge to the same vanishing point — inconsistencies flatten the space",
      "Add atmospheric perspective: make distant elements lighter and lower-contrast",
    ],
    tip: "After roughing in your perspective lines, 'test' them by tracing them to where they'd meet on the horizon — they should all converge at the same point.",
  },
  "still-life": {
    strengths: [
      "Good sense of light source direction — the shadow side is consistent",
      "The object proportions relate well to each other",
    ],
    improvements: [
      "The contact shadow (where objects meet the surface) should be the darkest mark in the drawing — push it darker",
      "Try to vary the edge quality: soft edges on shadow transitions, harder edges on lit planes",
    ],
    tip: "Squint at your still life — squinting compresses your vision and reveals the big value shapes. Your drawing should read the same way.",
  },
  creature: {
    strengths: [
      "Strong sense of volume and form — the creature feels like it has mass",
      "Interesting silhouette that reads clearly from a distance",
    ],
    improvements: [
      "Push the anatomy logic further — what does this creature eat? How does it move? Let those answers shape the design",
      "The texture could vary more across different body regions — belly vs. back vs. limbs often have very different surfaces",
    ],
    tip: "Start every creature design with a real animal skeleton as your 'skeleton' — then modify proportions, add features, and exaggerate traits.",
  },
  landscape: {
    strengths: [
      "Good depth layers — foreground, midground, and background are distinct",
      "Strong horizon placement creates a clear sense of scale",
    ],
    improvements: [
      "The sky value could be lighter and the ground value darker — this natural value gradient creates a sense of atmosphere",
      "Add more variation in the edges: sharp edges for near objects, extremely soft edges for distance",
    ],
    tip: "In landscape drawing, aerial perspective is your friend: distant elements are lighter, cooler, lower-contrast, and less detailed.",
  },
  other: {
    strengths: [
      "Confident mark-making — your lines have commitment and energy",
      "Good compositional instinct — the subject is well-placed in the frame",
    ],
    improvements: [
      "Look for opportunities to simplify — strong drawings eliminate rather than accumulate",
      "Push the lightest lights and darkest darks — most drawings benefit from a fuller value range",
    ],
    tip: "The best improvement you can make right now: slow down and observe for twice as long before each stroke.",
  },
};

export function CoachingView({ onBack }: CoachingViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<DrawingFeedback | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleAnalyze() {
    if (!uploadedImage || !selectedCategory) return;
    setIsAnalyzing(true);
    const category = CATEGORIES.find((c) => c.id === selectedCategory);
    const prompt = `Category: ${category?.label} — ${category?.description}. Give feedback tailored to this subject matter.`;
    const aiResult = await analyzeDrawing(uploadedImage, prompt);
    const fallback = FEEDBACK_BY_CATEGORY[selectedCategory];
    const result: DrawingFeedback =
      aiResult ?? { strengths: fallback.strengths, improvements: fallback.improvements, next: fallback.tip };
    setFeedback(result);
    saveCoachingDrawing(selectedCategory, uploadedImage, result);
    setIsAnalyzing(false);
    setShowFeedback(true);
  }

  function handleReset() {
    setUploadedImage(null);
    setShowFeedback(false);
    setSelectedCategory(null);
    setFeedback(null);
  }

  const canAnalyze = !!uploadedImage && !!selectedCategory;

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
          <h1 className="text-lg font-extrabold tracking-tight">AI Coach</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {!showFeedback ? (
          <>
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">Get Feedback</h2>
                  <p className="text-sm text-muted-foreground">Upload any drawing for instant AI analysis</p>
                </div>
              </div>
            </div>

            {/* Category picker */}
            <div className="animate-fade-in-up delay-100">
              <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                1. What are you drawing?
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as CategoryId)}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all duration-150 cursor-pointer text-center",
                      selectedCategory === cat.id
                        ? "border-primary bg-primary/8 scale-[1.03]"
                        : "border-border bg-card hover:border-primary/40"
                    )}
                    aria-pressed={selectedCategory === cat.id}
                    aria-label={cat.label}
                  >
                    <span className="text-xl" role="img" aria-hidden="true">{cat.emoji}</span>
                    <span className="text-[10px] font-semibold text-foreground leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
              {selectedCategory && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ✓ {CATEGORIES.find((c) => c.id === selectedCategory)?.description}
                </p>
              )}
            </div>

            {/* Upload */}
            <div className="animate-fade-in-up delay-200">
              <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                2. Upload your drawing
              </h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleUpload}
                className="hidden"
                id="coaching-upload"
              />

              {uploadedImage ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
                  <img
                    src={uploadedImage}
                    alt="Your uploaded drawing"
                    className="w-full object-contain max-h-64"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={11} /> Ready
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="coaching-upload"
                  className="flex flex-col items-center justify-center gap-3 h-48 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/4 transition-all cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <ImageIcon size={28} className="text-primary/60" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Tap to upload</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Any drawing, any medium</p>
                  </div>
                </label>
              )}

              {!uploadedImage && (
                <div className="flex gap-3 mt-3">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={15} /> Gallery
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon size={15} /> Camera
                  </Button>
                </div>
              )}
            </div>

            {/* Analyze button */}
            <Button
              className="w-full"
              size="lg"
              disabled={!canAnalyze || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Analyze My Drawing
                </>
              )}
            </Button>

            {isAnalyzing && (
              <div className="text-center space-y-2 animate-fade-in">
                <p className="text-sm text-muted-foreground">Reading structure, values, and form…</p>
                <div className="flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Feedback view */
          <div className="space-y-5 animate-fade-in-up">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                AI Coach · {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
              </p>
              <h2 className="text-3xl font-extrabold text-foreground">Your feedback</h2>
            </div>

            {uploadedImage && (
              <div className="rounded-2xl overflow-hidden border border-border">
                <img src={uploadedImage} alt="Your drawing" className="w-full object-contain max-h-52" />
              </div>
            )}

            {feedback && (
              <>
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
                          <span className="text-green-500 shrink-0 mt-0.5">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

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
                          <span className="text-blue-400 shrink-0 mt-0.5">→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50/50">
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">🎯</span>
                      <h3 className="font-bold text-purple-700 text-sm uppercase tracking-wide">Pro tip</h3>
                    </div>
                    <p className="text-sm text-purple-800">{feedback.next}</p>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleReset}>
                Analyze Another
              </Button>
              <Button className="flex-1" onClick={onBack}>
                Back to Learning
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
