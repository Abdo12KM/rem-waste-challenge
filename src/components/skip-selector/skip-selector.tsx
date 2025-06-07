"use client";

import { useMemo, useState, useEffect } from "react";
import { useSkipData } from "@/hooks/use-skip-data";
import { useSkipStore } from "@/store/use-skip-store";
import { useViewMode } from "@/hooks/use-view-mode";
import { filterSkips } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { GridView } from "./grid-view";
import { CarouselView } from "./carousel-view";
import { FilterBar } from "./filter-bar";
import { ViewModeToggle } from "./view-mode-toggle";

// Loading skeleton component
const SkipSelectorSkeleton = () => {
  const { deviceType } = useViewMode();

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Filter Bar Skeleton */}
      <div className="relative flex justify-center px-4 pt-2">
        <div className="bg-background/80 w-fit max-w-full rounded-2xl border border-black/50 p-3 py-2 shadow-md backdrop-blur-xl sm:p-4 dark:border-white/50">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Skip Count Skeleton */}
            <div className="text-center">
              <Skeleton className="mx-auto h-4 w-32" />
            </div>

            {/* Compact Controls Row Skeleton */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle Skeleton - Desktop/Tablet only */}
      {deviceType !== "mobile" && (
        <div className="flex items-center justify-end px-4 pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-10" />
          </div>
        </div>
      )}

      {/* Main Content Skeleton */}
      <div className="min-h-0 flex-1 pb-20">
        {deviceType === "mobile" ? (
          // Mobile Carousel Skeleton
          <div className="relative mb-5 md:px-12">
            {/* Mobile Dropdown Skeleton */}
            <div className="mx-auto mt-2 max-w-[400px] px-2 sm:max-w-[475px]">
              <div className="mb-4 md:hidden">
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>

            {/* Carousel Container Skeleton */}
            <div className="overflow-hidden p-2">
              <div className="flex gap-4">
                <div className="h-[400px] w-full flex-none">
                  <Skeleton className="h-full w-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* Swipe Indicator Skeleton */}
            <div className="text-muted-foreground flex animate-pulse items-center justify-center gap-2 text-xs">
              <Skeleton className="h-3 w-20" />
            </div>

            {/* Dots Indicator Skeleton */}
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-2 w-2 rounded-full" />
              ))}
            </div>
          </div>
        ) : (
          // Grid View Skeleton
          <div className="grid grid-cols-1 gap-6 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 lg:px-20 xl:px-28">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Error state component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <Card className="m-4">
    <CardContent className="flex flex-col items-center justify-center py-8">
      <AlertCircle className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-semibold">Failed to load skip data</h3>
      <p className="text-muted-foreground mb-4 text-center">
        We're having trouble loading the available skips. Please try again.
      </p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </CardContent>
  </Card>
);

// Empty state component
const EmptyState = () => (
  <Card className="m-4">
    <CardContent className="flex flex-col items-center justify-center py-8">
      <div className="mb-4 text-4xl">🗑️</div>
      <h3 className="mb-2 text-lg font-semibold">No skips found</h3>
      <p className="text-muted-foreground text-center">
        No skips match your current filters. Try adjusting your search criteria.
      </p>
    </CardContent>
  </Card>
);

export const SkipSelector = () => {
  const { data: skips, isLoading, isError, refetch } = useSkipData();
  const { filters } = useSkipStore();
  const { deviceType } = useViewMode();
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  // Update view mode based on device type
  useEffect(() => {
    if (deviceType === "mobile") {
      setViewMode("carousel");
    }
  }, [deviceType]);

  const filteredSkips = useMemo(() => {
    if (!skips) return [];
    return filterSkips(skips, filters);
  }, [skips, filters]);

  if (isLoading) return <SkipSelectorSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!skips?.length) return <EmptyState />;

  const hasFilteredResults = filteredSkips.length > 0;
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Filter Bar */}
      <FilterBar skips={skips} filteredSkips={filteredSkips} />

      {/* View Controls - Desktop only */}
      {deviceType !== "mobile" && (
        <div className="flex items-center justify-end px-4 pb-2">
          <ViewModeToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
            deviceType={deviceType}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-0 flex-1 pb-20">
        {hasFilteredResults ? (
          viewMode === "grid" ? (
            <GridView skips={filteredSkips} />
          ) : (
            <CarouselView skips={filteredSkips} />
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};
