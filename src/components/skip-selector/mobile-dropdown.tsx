"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EnhancedSkip } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useState, useEffect } from "react";

interface MobileDropdownProps {
  skips: EnhancedSkip[];
  onSkipSelect?: (skipId: number) => void;
  selectedIndex?: number;
}

export const MobileDropdown = ({
  skips,
  onSkipSelect,
  selectedIndex = 0,
}: MobileDropdownProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Update dropdown value when carousel position changes
  useEffect(() => {
    if (skips[selectedIndex]) {
      setSelectedSize(skips[selectedIndex].id.toString());
    }
  }, [selectedIndex, skips]);

  const handleValueChange = (value: string) => {
    setSelectedSize(value);
    const skipId = parseInt(value);
    if (onSkipSelect) {
      onSkipSelect(skipId);
    }
  };

  if (skips.length === 0) return null;

  return (
    <div className="mb-4 md:hidden">
      <Select value={selectedSize} onValueChange={handleValueChange}>
        <SelectTrigger className="bg-background/80 w-full rounded-lg border border-black/50 shadow-md backdrop-blur-xl dark:border-white/50">
          <SelectValue placeholder="Jump to skip size..." />
        </SelectTrigger>
        <SelectContent className="bg-background/80 rounded-xl border border-black/50 shadow-md backdrop-blur-xl dark:border-white/50">
          <div className="grid grid-cols-2 gap-1 p-1">
            {skips.map((skip) => (
              <SelectItem
                key={skip.id}
                value={skip.id.toString()}
                className="border-border bg-muted/50 col-span-1 cursor-pointer rounded-md border"
              >
                <div className="flex w-full items-center justify-between gap-1">
                  <span className="text-sm font-medium">{skip.size} Yard</span>
                  <span className="text-muted-foreground text-xs">
                    {formatPrice(skip.totalPrice)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};
