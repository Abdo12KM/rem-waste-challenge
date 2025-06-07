"use client";

import { useMemo } from "react";
import { EnhancedSkip, FilterState } from "@/lib/types";
import { filterSkips } from "@/lib/utils";

export const useFilter = (skips: EnhancedSkip[], filters: FilterState) => {
  const filteredSkips = useMemo(() => {
    if (!skips?.length) return [];
    return filterSkips(skips, filters);
  }, [skips, filters]);

  const stats = useMemo(() => {
    const total = skips?.length || 0;
    const filtered = filteredSkips.length;
    const percentage = total > 0 ? Math.round((filtered / total) * 100) : 0;

    return {
      total,
      filtered,
      percentage,
      hasResults: filtered > 0,
      isFiltered: filtered !== total,
    };
  }, [skips, filteredSkips]);

  return {
    filteredSkips,
    stats,
  };
};
