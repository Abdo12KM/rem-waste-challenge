"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useSkipStore } from "@/store/use-skip-store";
import {
  X,
  Car,
  Weight,
  Filter,
  PoundSterling,
  Ruler,
  ChevronDown,
} from "lucide-react";
import { EnhancedSkip } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useMemo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FilterToggle = ({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <Button
    variant={value === true ? "default" : "outline"}
    size="sm"
    onClick={() => onChange(value === true ? null : true)}
    className="h-8 border border-black/50 dark:border-white/50"
  >
    <Icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
    {label}
    {value === true && (
      <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
        ✓
      </Badge>
    )}
  </Button>
);

const RangeSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue,
  icon: Icon,
}: {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step?: number;
  formatValue: (value: number) => string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="flex w-full flex-col gap-3">
    <div className="flex items-center gap-2">
      <Icon className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="px-2">
      <Slider
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      <div className="text-muted-foreground mt-2 flex justify-between text-xs">
        <span>{formatValue(value[0])}</span>
        <span>{formatValue(value[1])}</span>
      </div>
    </div>
  </div>
);

export const FilterBar = ({
  skips,
  filteredSkips,
}: {
  skips: EnhancedSkip[];
  filteredSkips: EnhancedSkip[];
}) => {
  const { filters, updateFilters, initializeFilters } = useSkipStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate dynamic min/max values from available skips
  const { minPrice, maxPrice, minSize, maxSize } = useMemo(() => {
    if (!skips.length)
      return { minPrice: 0, maxPrice: 2000, minSize: 4, maxSize: 40 };

    return {
      minPrice: Math.min(...skips.map((s) => s.totalPrice)),
      maxPrice: Math.max(...skips.map((s) => s.totalPrice)),
      minSize: Math.min(...skips.map((s) => s.size)),
      maxSize: Math.max(...skips.map((s) => s.size)),
    };
  }, [skips]);

  // Initialize filters when skips are loaded
  useEffect(() => {
    if (skips.length > 0) {
      // Only initialize if the current ranges are the default values
      if (
        filters.priceRange[0] === 0 &&
        filters.priceRange[1] === 2000 &&
        filters.sizeRange[0] === 4 &&
        filters.sizeRange[1] === 40
      ) {
        initializeFilters(minPrice, maxPrice, minSize, maxSize);
      }
    }
  }, [
    skips.length,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    initializeFilters,
    filters.priceRange,
    filters.sizeRange,
  ]);

  // Check if any filters are active
  const hasActiveFilters =
    filters.roadLegal !== null ||
    filters.heavyWaste !== null ||
    filters.priceRange[0] !== minPrice ||
    filters.priceRange[1] !== maxPrice ||
    filters.sizeRange[0] !== minSize ||
    filters.sizeRange[1] !== maxSize;

  const handleResetFilters = () => {
    updateFilters({
      roadLegal: null,
      heavyWaste: null,
      priceRange: [minPrice, maxPrice],
      sizeRange: [minSize, maxSize],
    });
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      {/* Click-outside overlay to close expanded panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative flex justify-center p-2">
        {/* COMPACT FILTER BAR */}
        <motion.div
          layout
          className="bg-background/80 w-fit max-w-full rounded-2xl border border-black/50 p-3 py-2 shadow-md backdrop-blur-xl sm:p-4 dark:border-white/50"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Skip Count */}
            <div className="text-center">
              <span className="text-primary text-sm">
                {filteredSkips.length === skips.length
                  ? `Showing all ${skips.length} skip${skips.length !== 1 ? "s" : ""}`
                  : `Showing ${filteredSkips.length} out of ${skips.length} skip${skips.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            {/* Compact Controls Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {/* Quick Toggle Filters */}
              {filters.roadLegal !== null && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => updateFilters({ roadLegal: null })}
                  className="h-8"
                >
                  <Car className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Road Legal
                  <X className="ml-2 h-3 w-3" />
                </Button>
              )}
              {filters.heavyWaste !== null && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => updateFilters({ heavyWaste: null })}
                  className="h-8"
                >
                  <Weight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Heavy Waste
                  <X className="ml-2 h-3 w-3" />
                </Button>
              )}

              {/* Range Indicators */}
              <div className="bg-muted flex items-center gap-1 rounded-lg px-2 py-1 text-xs sm:gap-2 sm:px-3 sm:text-sm">
                <PoundSterling className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
                <span className="truncate">
                  {formatPrice(filters.priceRange[0])} -{" "}
                  {formatPrice(filters.priceRange[1])}
                </span>
              </div>
              <div className="bg-muted flex items-center gap-1 rounded-lg px-2 py-1 text-xs sm:gap-2 sm:px-3 sm:text-sm">
                <Ruler className="text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
                <span className="truncate">
                  {filters.sizeRange[0]}yd - {filters.sizeRange[1]}yd
                </span>
              </div>

              {/* Filters Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="h-8 border border-black/50 dark:border-white/50"
              >
                <Filter className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Filters
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>

              {/* Clear All Button */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleResetFilters}
                      className="h-8 border border-black/50 dark:border-white/50"
                    >
                      <X className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Clear
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* EXPANDED FILTER PANEL */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-background/80 absolute top-full left-1/2 z-50 mx-auto mt-2 w-[calc(100vw-1rem)] max-w-[500px] -translate-x-1/2 transform rounded-2xl border border-black/50 shadow-md backdrop-blur-xl sm:w-auto dark:border-white/50"
            >
              <div className="bg-background border-border w-full rounded-2xl border p-4 shadow-2xl sm:p-6">
                <div className="flex flex-col gap-4 sm:gap-6">
                  {/* Header with Close Button */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Toggle Filters Section */}
                  <div className="space-y-3">
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Quick Filters
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <FilterToggle
                        label="Road Legal"
                        value={filters.roadLegal}
                        onChange={(value) =>
                          updateFilters({ roadLegal: value })
                        }
                        icon={Car}
                      />
                      <FilterToggle
                        label="Heavy Waste"
                        value={filters.heavyWaste}
                        onChange={(value) =>
                          updateFilters({ heavyWaste: value })
                        }
                        icon={Weight}
                      />
                    </div>
                  </div>

                  {/* Range Sliders Section */}
                  <div className="space-y-4">
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Range Filters
                    </h4>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <RangeSlider
                        label="Price Range"
                        value={filters.priceRange}
                        onChange={(value) =>
                          updateFilters({ priceRange: value })
                        }
                        min={minPrice}
                        max={maxPrice}
                        step={10}
                        formatValue={(value) => formatPrice(value)}
                        icon={PoundSterling}
                      />
                      <RangeSlider
                        label="Size Range"
                        value={filters.sizeRange}
                        onChange={(value) =>
                          updateFilters({ sizeRange: value })
                        }
                        min={minSize}
                        max={maxSize}
                        step={1}
                        formatValue={(value) => `${value}yd`}
                        icon={Ruler}
                      />
                    </div>
                  </div>
                  {/* Actions */}
                  <AnimatePresence>
                    {hasActiveFilters && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-center border-t pt-2"
                      >
                        <Button
                          variant="outline"
                          onClick={handleResetFilters}
                          className="border border-black/50 dark:border-white/50"
                        >
                          <X className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Clear All Filters
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
