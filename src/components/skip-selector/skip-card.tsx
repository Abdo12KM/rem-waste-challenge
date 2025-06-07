"use client";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkipCardProps } from "@/lib/types";
import { formatPrice, getSkipImageUrl, cn } from "@/lib/utils";
import { Car, Weight, Check, Calendar, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      animate={{ scale: isSelected ? 1.005 : 1 }}
      whileTap={{ scale: 0.995 }}
      className="h-full cursor-pointer"
      onClick={onSelect}
    >
      <Card
        className={cn(
          "group relative flex h-full flex-col overflow-hidden border-2 p-0 transition-all duration-300",
          "bg-white dark:bg-black",
          "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100",
          isSelected
            ? "dark:via-card transform border-yellow-500 bg-gradient-to-br from-yellow-50 via-white to-yellow-100/50 shadow-sm dark:border-yellow-600 dark:from-yellow-950/20 dark:to-yellow-900/10"
            : "border-border hover:border-yellow-400 hover:shadow-sm dark:hover:border-yellow-600"
        )}
      >
        {/* Skip Image - Clean without title overlay */}
        <div className="from-muted/50 via-accent/30 to-secondary/20 relative aspect-video overflow-hidden bg-gradient-to-br transition-transform duration-300 group-hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 dark:from-black/20 dark:to-white/5" />
          <Image
            src={getSkipImageUrl(skip.size)}
            alt={`${skip.size} yard skip`}
            fill
            priority
            className="object-cover dark:[filter:invert(1)_hue-rotate(180deg)]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Selected Checkmark Indicator */}
        {isSelected && (
          <div className="animate-in zoom-in-50 absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg duration-200 dark:from-yellow-600 dark:to-yellow-700">
            <Check className="h-5 w-5 text-white drop-shadow-sm" />
          </div>
        )}

        {/* Content Section - Title and Features */}
        <CardContent className="flex-1 px-2">
          <CardTitle className="mb-2 text-center text-3xl font-black tracking-tight">
            <span
              className={cn(
                "transition-colors duration-200",
                isSelected
                  ? "text-yellow-700 dark:text-yellow-600"
                  : "text-foreground"
              )}
            >
              {skip.size} YARD SKIP
            </span>
          </CardTitle>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-xs text-blue-700 shadow-sm sm:text-sm dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
            >
              <Calendar className="mr-1 h-4 w-4" />
              {skip.hire_period_days} day hire
            </Badge>
            {skip.allowed_on_road ? (
              <Badge
                variant="secondary"
                className="border-green-200 bg-green-50 text-xs text-green-700 shadow-sm sm:text-sm dark:border-green-800 dark:bg-green-950 dark:text-green-300"
              >
                <Car className="mr-1 h-4 w-4" />
                Road Legal
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="border-red-200 bg-red-50 text-xs text-red-700 shadow-sm sm:text-sm dark:border-red-800 dark:bg-red-950 dark:text-red-300"
              >
                <AlertTriangle className="mr-1 h-4 w-4" />
                NOT Road Legal
              </Badge>
            )}
            {skip.allows_heavy_waste && (
              <Badge
                variant="secondary"
                className="border-orange-200 bg-orange-50 text-xs text-orange-700 shadow-sm sm:text-sm dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300"
              >
                <Weight className="mr-1 h-4 w-4" />
                Heavy Waste
              </Badge>
            )}
          </div>
        </CardContent>

        {/* Footer - Pricing and Action */}
        <CardFooter className="mt-auto p-0">
          <div className="w-full">
            <Button
              className={cn(
                "flex h-16 w-full flex-col items-center justify-center gap-1 rounded-t-none py-9",
                "bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 hover:from-yellow-600 hover:via-yellow-600 hover:to-yellow-700",
                "dark:from-yellow-600 dark:via-yellow-700 dark:to-yellow-800 dark:hover:from-yellow-700 dark:hover:via-yellow-800 dark:hover:to-yellow-900",
                isSelected &&
                  "from-yellow-600 via-yellow-600 to-yellow-700 hover:from-yellow-700 hover:via-yellow-700 hover:to-yellow-800"
              )}
              variant={"default"}
              size="lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  {isSelected
                    ? `Selected - ${formatPrice(skip.totalPrice)}`
                    : `Select for ${formatPrice(skip.totalPrice)}`}
                </span>
                {isSelected && <Check className="h-4 w-4" />}
              </div>
              <span className="text-base opacity-80">
                {formatPrice(skip.pricePerDay)}/day • {skip.hire_period_days}{" "}
                days
              </span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
