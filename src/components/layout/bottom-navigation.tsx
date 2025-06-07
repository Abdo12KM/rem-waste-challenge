"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSkipStore } from "@/store/use-skip-store";
import { useSkipData } from "@/hooks/use-skip-data";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  Calendar,
  Car,
  Weight,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

export const BottomNavigation = () => {
  const { selectedSkipId } = useSkipStore();
  const { data: skips } = useSkipData();

  const selectedSkip = skips?.find((skip) => skip.id === selectedSkipId);

  const handleBack = () => {
    // In a real app, this would navigate to the previous step
    console.log("Navigate back");
  };

  const handleContinue = () => {
    // In a real app, this would navigate to the next step
    console.log("Continue to next step");
  };

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-full -translate-x-1/2 transform p-4 pb-0 md:w-auto">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.2,
        }}
        className="bg-background/80 mx-auto rounded-2xl rounded-b-none border border-b-0 border-black/50 p-3 py-2 shadow-2xl backdrop-blur-xl dark:border-white/50"
      >
        <div className="flex items-center justify-center gap-4">
          {/* Selected Skip Info */}
          {selectedSkip ? (
            <div className="flex flex-col gap-2">
              {/* Main Skip Info */}
              <div className="bg-primary/10 flex items-center gap-2 rounded-xl px-3 py-2">
                <Package className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                <div className="text-sm">
                  <span className="font-semibold">
                    {selectedSkip.size} Yard Skip
                  </span>
                  <span className="ml-2">
                    {formatPrice(selectedSkip.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Additional Info Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-blue-200 bg-blue-50 text-xs text-blue-700"
                >
                  <Calendar className="h-4 w-4" />
                  {selectedSkip.hire_period_days} day hire
                </Badge>

                {selectedSkip.allowed_on_road ? (
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-xs text-green-700"
                  >
                    <Car className="h-4 w-4" />
                    Road Legal
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-red-200 bg-red-50 text-xs text-red-700"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    NOT Road Legal
                  </Badge>
                )}

                {selectedSkip.allows_heavy_waste && (
                  <Badge
                    variant="outline"
                    className="border-orange-200 bg-orange-50 text-xs text-orange-700"
                  >
                    <Weight className="h-4 w-4" />
                    Heavy Waste
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground px-3 py-2 text-sm">
              Select a skip to continue
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col items-stretch gap-2">
            <Button
              size={"sm"}
              disabled={!selectedSkipId}
              onClick={handleContinue}
              className="flex items-center justify-center rounded-xl"
            >
              <span>Continue</span>
              <ArrowRight className="ml-1.5 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              size={"sm"}
              variant="outline"
              onClick={handleBack}
              className="flex items-center justify-center rounded-xl border-black/20 dark:border-white/20"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
