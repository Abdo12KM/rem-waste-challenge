import { Step } from "./types";

export const STEPS: Step[] = [
  { id: "postcode", label: "Postcode", status: "completed", icon: "MapPin" },
  {
    id: "waste-type",
    label: "Waste Type",
    status: "completed",
    icon: "Trash2",
  },
  {
    id: "select-skip",
    label: "Select Skip",
    status: "current",
    icon: "Package",
  },
  {
    id: "permit-check",
    label: "Permit Check",
    status: "upcoming",
    icon: "ShieldCheck",
  },
  {
    id: "choose-date",
    label: "Choose Date",
    status: "upcoming",
    icon: "Calendar",
  },
  { id: "payment", label: "Payment", status: "upcoming", icon: "CreditCard" },
];
