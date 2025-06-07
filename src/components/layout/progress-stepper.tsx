"use client";

import { useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/constants";
import {
  MapPin,
  Trash2,
  Package,
  ShieldCheck,
  Calendar,
  CreditCard,
  Check,
} from "lucide-react";

const IconMap = {
  MapPin,
  Trash2,
  Package,
  ShieldCheck,
  Calendar,
  CreditCard,
};

const StepCarousel = ({
  steps,
  currentIndex,
}: {
  steps: typeof STEPS;
  currentIndex: number;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentStepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      scrollContainerRef.current &&
      currentStepRef.current &&
      currentIndex >= 0
    ) {
      const container = scrollContainerRef.current;
      const currentStepElement = currentStepRef.current;

      // Calculate the scroll position to center the current step
      const containerWidth = container.clientWidth;
      const stepOffsetLeft = currentStepElement.offsetLeft;
      const stepWidth = currentStepElement.clientWidth;

      const scrollPosition =
        stepOffsetLeft - containerWidth / 2 + stepWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full max-w-full">
      {/* Scrollable step carousel - Unified for all screen sizes */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide w-full overflow-x-auto overflow-y-hidden"
      >
        <div className="mx-auto flex w-max items-center justify-center gap-2 pb-1 md:gap-4">
          {steps.map((step, index) => {
            const IconComponent = IconMap[step.icon as keyof typeof IconMap];
            const isCurrentStep = index === currentIndex;

            return (
              <div
                key={step.id}
                ref={isCurrentStep ? currentStepRef : null}
                className={cn(
                  "flex flex-shrink-0 items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 md:gap-3 md:px-3",
                  isCurrentStep && "bg-primary/10 border-primary/20 border",
                  !isCurrentStep &&
                    step.status === "completed" &&
                    "bg-muted/50",
                  !isCurrentStep && step.status === "upcoming" && "bg-muted/30"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border transition-colors",
                    "h-6 w-6 md:h-8 md:w-8",
                    step.status === "completed" &&
                      "bg-primary border-primary text-primary-foreground",
                    step.status === "current" &&
                      "border-primary text-primary bg-background",
                    step.status === "upcoming" &&
                      "border-muted-foreground text-muted-foreground bg-background"
                  )}
                >
                  {step.status === "completed" ? (
                    <Check className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <IconComponent className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </div>
                <div>
                  <p
                    className={cn(
                      "font-medium whitespace-nowrap",
                      "text-xs md:text-sm",
                      step.status === "current" && "text-primary",
                      step.status === "completed" && "text-foreground",
                      step.status === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-muted-foreground text-xs whitespace-nowrap capitalize md:hidden">
                    {step.status === "completed"
                      ? "Done"
                      : step.status === "current"
                        ? "Current"
                        : "Upcoming"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ProgressStepper = () => {
  const currentStepIndex = STEPS.findIndex((step) => step.status === "current");

  return (
    <div className="bg-background w-full border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <StepCarousel steps={STEPS} currentIndex={currentStepIndex} />
          </div>
          <div className="ml-4 flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
