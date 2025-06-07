import { useState, useEffect, useMemo } from "react";
import { ViewMode, DeviceType } from "@/lib/types";

export const useViewMode = () => {
  const [manualMode, setManualMode] = useState<ViewMode | null>(null);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType("mobile");
      else if (width < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  const viewMode = useMemo(() => {
    if (manualMode) return manualMode;
    return deviceType === "mobile" ? "carousel" : "grid";
  }, [manualMode, deviceType]);

  return { viewMode, setViewMode: setManualMode, deviceType };
};
