# Sheeezy Bazaar

A premium, high-end luxury e-commerce platform built with Next.js 15, TypeScript, and Tailwind CSS 4.

## Features

- **Luxury UI/UX**: Designed with a Gold/Black palette and premium typography (Inter & Playfair Display).
- **Interactive Product Experience**:
  - Dynamic product detail pages with hover-zoom galleries.
  - Multi-variant selection (Size/Color) with state management.
  - Real-time stock status and animated sales indicators.
- **Robust State Management**: Persistent cart and wishlist stores using Zustand.
- **Complete Checkout Flow**: 4-step process with coupon logic, shipping forms, and order confirmation.
- **Comprehensive Admin Suite**:
  - Dashboard with sales analytics and low stock alerts.
  - Product management with real-time preview during creation.
  - Order tracking and status management.
- **Performance Optimized**:
  - Image optimization via Next.js `sharp`.
  - Framer Motion for smooth, high-end animations and page transitions.
- **Verification Suite**: Integrated Playwright tests for core user and admin flows.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State**: Zustand (with Persist)
- **UI Components**: Radix UI (Dialog, Slider, Slot)
- **Icons**: Lucide React
- **Verification**: Playwright

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the result.

### Build

Create an optimized production build:
```bash
npm run build
```

### Verification

Run the Playwright test suite:
```bash
npx playwright test
```

## Folder Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Modular React components (UI, Layout, Home, Product, Cart, Auth, Admin).
- `lib/`: Store definitions, utility functions, and custom hooks.
- `data/`: Mock product catalog and static data.
- `types/`: Core TypeScript interfaces.
- `verification/`: Playwright verification scripts and visual assets.

## License

This project is licensed under the MIT License.
