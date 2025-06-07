import { ProgressStepper } from "@/components/layout/progress-stepper";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { SkipSelector } from "@/components/skip-selector/skip-selector";

export default function SkipSelectionPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <ProgressStepper />
      <main className="flex min-h-0 flex-1 flex-col">
        <SkipSelector />
      </main>
      <BottomNavigation />
    </div>
  );
}
