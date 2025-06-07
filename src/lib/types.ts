// Navigation & Progress Types
export interface Step {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
  icon: string;
}

// Skip Data Types
export interface RawSkip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export interface EnhancedSkip extends RawSkip {
  totalPrice: number;
  pricePerDay: number;
}

// UI State Types
export type ViewMode = "grid" | "carousel";
export type DeviceType = "mobile" | "tablet" | "desktop";

export interface FilterState {
  roadLegal: boolean | null;
  heavyWaste: boolean | null;
  priceRange: [number, number];
  sizeRange: [number, number];
}

// Component Props Types
export interface SkipCardProps {
  skip: EnhancedSkip;
  isSelected: boolean;
  onSelect: () => void;
}
