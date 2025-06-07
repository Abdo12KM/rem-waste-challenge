"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Grid3X3, LayoutList } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "grid" | "carousel";
  setViewMode: (mode: "grid" | "carousel") => void;
  deviceType: "mobile" | "tablet" | "desktop";
}

export const ViewModeToggle = ({
  viewMode,
  setViewMode,
  deviceType,
}: ViewModeToggleProps) => {
  // Hide on mobile (always carousel)
  if (deviceType === "mobile") return null;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              className="border-black/50 dark:border-white/50"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Grid View</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={viewMode === "carousel" ? "default" : "outline"}
              size="sm"
              className="border-black/50 dark:border-white/50"
              onClick={() => setViewMode("carousel")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Carousel View</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
