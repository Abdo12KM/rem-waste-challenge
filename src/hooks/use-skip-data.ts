import { useQuery } from "@tanstack/react-query";
import { RawSkip } from "@/lib/types";
import { enhanceSkipData } from "@/lib/utils";

export const useSkipData = () => {
  return useQuery({
    queryKey: ["skips"],
    queryFn: async () => {
      const response = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );

      if (!response.ok) throw new Error("Failed to fetch skip data");

      const data: RawSkip[] = await response.json();

      return enhanceSkipData(data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => (attemptIndex + 1) * 5000, // 1st attempt after 5 seconds, 2nd after 10 seconds, etc.
  });
};
