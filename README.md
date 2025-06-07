# REM Waste - Skip Selection Page Redesign

This project is a redesign of the "Choose Your Skip Size" page for REM Waste, completed as a front-end coding challenge. The aim was to build a new interface based on provided requirements and data.

## Challenge Goals

- ✅ Redesign the target page with a new visual appearance.
- ✅ Maintain all original skip selection functionalities.
- ✅ Write clean, maintainable React code.
- ✅ Ensure the page is responsive for mobile and desktop browsers.
- ✅ Improve UI/UX.
- ✅ Use the provided API for skip data: `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`

## Solution Overview

### Technology Choices

- **Next.js 15 & React 19:** Framework for the application.
- **TypeScript:** For type-checked JavaScript.
- **Tailwind CSS 4:** For utility-based styling.
- **shadcn/ui:** For UI components.
- **Zustand:** For managing global state (filters, selected skip).
- **TanStack Query (React Query):** For fetching and caching API data.
- **Framer Motion:** For UI animations.
- **Embla Carousel:** For the mobile skip carousel.

### Design and UI Features

- **Layout:** Includes a `ProgressStepper` showing booking stages, the main `SkipSelector` area, and a `BottomNavigation` bar with selection summary and actions.
- **Visuals:** A clean interface with distinct light and dark themes (`ThemeToggle`).
- **Responsiveness:**
  - Mobile: Displays skips in a `CarouselView` with a `MobileDropdown` for quick navigation.
  - Desktop/Tablet: Offers a `GridView` and allows switching to `CarouselView` via `ViewModeToggle`.
- **Skip Display (`SkipCard`):** Cards show skip size, image, price, hire period, road legality, and heavy waste allowance. Selected skips are visually highlighted.
- **Filtering (`FilterBar`):**
  - Toggles for "Road Legal" and "Heavy Waste".
  - Sliders for price and size ranges.
  - Displays active filter count and allows resetting filters.
  - Filter ranges (price, size) are initialized based on the actual min/max values from the fetched skip data.
- **User Feedback:** Includes loading states (`SkipSelectorSkeleton`), error handling for data fetching (`ErrorState`), and an empty state if no skips match filters (`EmptyState`).

### Core Functionality

- **Data Fetching (`useSkipData`):** Retrieves skip data from the API using TanStack Query, including caching and retry logic.
- **Data Processing (`utils.ts/enhanceSkipData`):** Calculates total price (VAT inclusive) and price per day for each skip.
- **State Management (`useSkipStore`):** Zustand handles the currently selected skip ID and active filter values.
- **Filtering Logic (`utils.ts/filterSkips`):** Applies active filters to the skip list.
- **Dynamic Images (`utils.ts/getSkipImageUrl`):** Assigns images to skips based on their size.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme providers
│   ├── page.tsx           # Main skip selection page
│   └── globals.css        # Global styles and theme variables
├── components/
│   ├── layout/            # Layout components
│   │   ├── progress-stepper.tsx    # Multi-step booking progress
│   │   └── bottom-navigation.tsx   # Fixed bottom action bar
│   ├── skip-selector/     # Core selection interface
│   │   ├── skip-selector.tsx       # Main container component
│   │   ├── skip-card.tsx          # Individual skip display cards
│   │   ├── grid-view.tsx          # Desktop grid layout
│   │   ├── carousel-view.tsx      # Mobile carousel interface
│   │   ├── filter-bar.tsx         # Advanced filtering controls
│   │   ├── view-mode-toggle.tsx   # Layout switcher
│   │   └── mobile-dropdown.tsx    # Mobile navigation aid
│   └── ui/                # Reusable UI components (shadcn/ui)
├── hooks/                 # Custom React hooks
│   ├── use-skip-data.ts   # API data fetching with caching
│   ├── use-view-mode.ts   # Responsive layout logic
│   └── use-filter.ts      # Skip filtering logic
├── lib/                   # Core utilities
│   ├── types.ts           # TypeScript definitions
│   ├── constants.ts       # Application constants
│   └── utils.ts           # Helper functions and data processing
└── store/                 # State management
    └── use-skip-store.ts  # Zustand store for global state
```

## Running the Project Locally

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Abdo12KM/rem-waste-challenge.git
    ```

    ```bash
    cd rem-waste-challenge
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    Open `http://localhost:3000` in your browser.
