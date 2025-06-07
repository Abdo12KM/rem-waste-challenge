import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RawSkip, EnhancedSkip, FilterState } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data Enhancement Utilities
export const enhanceSkipData = (skips: RawSkip[]): EnhancedSkip[] => {
  return skips.map((skip) => ({
    ...skip,
    totalPrice: skip.price_before_vat * (1 + skip.vat / 100),
    pricePerDay:
      (skip.price_before_vat * (1 + skip.vat / 100)) / skip.hire_period_days,
  }));
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(price);
};

// Skip image URL generator
export const getSkipImageUrl = (size: number): string => {
  // REM Waste Images
  if (size >= 20) {
    return `https://www.renewableenergymarketing.net/wp-content/uploads/2015/12/${size}-Yard-skip-ro-ro.png`;
  } else if (size == 14 || size == 16) {
    // Use same image of 12 because 14 and 16 yard skips are not available
    return `https://www.renewableenergymarketing.net/wp-content/uploads/2015/12/12-Yard-skip.jpg`;
  } else {
    return `https://www.renewableenergymarketing.net/wp-content/uploads/2015/12/${size}-Yard-skip.jpg`;
  }

  // We Want Waste Images
  //return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;
};

// Filtering Logic
export const filterSkips = (
  skips: EnhancedSkip[],
  filters: FilterState
): EnhancedSkip[] => {
  return skips.filter((skip) => {
    if (
      filters.roadLegal !== null &&
      skip.allowed_on_road !== filters.roadLegal
    )
      return false;
    if (
      filters.heavyWaste !== null &&
      skip.allows_heavy_waste !== filters.heavyWaste
    )
      return false;
    if (
      skip.totalPrice < filters.priceRange[0] ||
      skip.totalPrice > filters.priceRange[1]
    )
      return false;
    if (skip.size < filters.sizeRange[0] || skip.size > filters.sizeRange[1])
      return false;
    return true;
  });
};
