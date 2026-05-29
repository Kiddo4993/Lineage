import { Pencil, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

interface NotFoundProps {
  onBack: () => void;
}

export function NotFound({ onBack }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-wiggle">
        <Pencil size={36} className="text-primary" />
      </div>
      <h1 className="text-5xl font-extrabold text-foreground mb-2">404</h1>
      <p className="text-xl font-bold text-muted-foreground mb-1">Page not found</p>
      <p className="text-sm text-muted-foreground mb-8 max-w-xs">
        Looks like this page went off the path. Let's get you back to drawing.
      </p>
      <Button onClick={onBack} size="lg">
        <ArrowLeft size={18} />
        Back to LINEAGE
      </Button>
    </div>
  );
}
