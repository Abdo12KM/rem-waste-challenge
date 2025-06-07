"use client";

import { EnhancedSkip } from "@/lib/types";
import { useSkipStore } from "@/store/use-skip-store";
import { SkipCard } from "./skip-card";

interface GridViewProps {
  skips: EnhancedSkip[];
}

export const GridView = ({ skips }: GridViewProps) => {
  const { selectedSkipId, setSelectedSkip } = useSkipStore();

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-20 xl:px-28">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          isSelected={selectedSkipId === skip.id}
          onSelect={() => setSelectedSkip(skip.id)}
        />
      ))}
    </div>
  );
};
