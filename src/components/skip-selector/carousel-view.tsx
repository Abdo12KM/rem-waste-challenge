"use client";

import { EnhancedSkip } from "@/lib/types";
import { useSkipStore } from "@/store/use-skip-store";
import { useViewMode } from "@/hooks/use-view-mode";
import { SkipCard } from "./skip-card";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileDropdown } from "./mobile-dropdown";

interface CarouselViewProps {
  skips: EnhancedSkip[];
}

export const CarouselView = ({ skips }: CarouselViewProps) => {
  const { selectedSkipId, setSelectedSkip } = useSkipStore();
  const { deviceType } = useViewMode();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollToSkip = useCallback(
    (skipId: number) => {
      if (!emblaApi) return;
      const skipIndex = skips.findIndex((skip) => skip.id === skipId);
      if (skipIndex !== -1) {
        emblaApi.scrollTo(skipIndex);
      }
    },
    [emblaApi, skips]
  );

  return (
    <div className="relative mb-10 sm:mb-5 md:px-12">
      {/* Mobile Dropdown */}
      <div className="mx-auto mt-2 max-w-[400px] px-2 sm:max-w-[475px] md:hidden">
        <MobileDropdown
          skips={skips}
          onSkipSelect={scrollToSkip}
          selectedIndex={selectedIndex}
        />
      </div>

      {/* Navigation Buttons - Tablet and Desktop */}
      {deviceType !== "mobile" && (
        <>
          <Button
            size="icon"
            className={cn(
              "absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-yellow-500 shadow-lg transition-colors hover:bg-yellow-600",
              !canScrollPrev && "cursor-not-allowed opacity-50"
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            className={cn(
              "absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-yellow-500 shadow-lg transition-colors hover:bg-yellow-600",
              !canScrollNext && "cursor-not-allowed opacity-50"
            )}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden p-2" ref={emblaRef}>
        <div className="flex gap-4">
          {skips.map((skip) => (
            <div
              key={skip.id}
              className={cn(
                "h-[400px] flex-none",
                deviceType === "mobile" && "w-full",
                deviceType === "tablet" && "w-[calc(50%-8px)]",
                deviceType === "desktop" && "w-[calc(33.333%-11px)]"
              )}
            >
              <SkipCard
                skip={skip}
                isSelected={selectedSkipId === skip.id}
                onSelect={() => setSelectedSkip(skip.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only indicators */}
      {deviceType === "mobile" && skips.length > 1 && (
        <>
          <div className="text-muted-foreground flex animate-pulse items-center justify-center gap-2 text-xs">
            <span>←</span>
            <span>Swipe to browse</span>
            <span>→</span>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {skips.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index === selectedIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
