# Tax Loss Harvesting App

A React + TypeScript + Vite dashboard for visualizing tax-loss harvesting opportunities across a crypto portfolio.

## Intro

This application helps users identify potential savings from tax-loss harvesting by comparing current capital gains before and after selected asset adjustments. It combines portfolio holdings data with capital gain summaries to show how choosing positions can impact taxable gains.

## Summary

Key functionality:

- Display portfolio holdings in a sortable, searchable table
- Allow selecting individual assets or selecting all assets
- Recalculate "after harvesting" capital gains based on selected holdings
- Show estimated savings if harvesting improves the tax position
- Present short-term and long-term capital gain summaries in card format

Main project structure:

- `src/App.tsx` — core application state, data fetching, and selection logic
- `src/components/HoldingsTable.tsx` — table with asset rows, checkboxes, and sorting
- `src/components/CapitalCard.tsx` — after-harvest summary card
- `src/components/PreCard.tsx` — pre-harvest summary card
- `src/services/api.ts` — mock data fetch functions for holdings and capital gains
- `src/utils/calculations.ts` — utility functions for calculating realised gains

## Running the Application

### Requirements

- Node.js (16+ recommended)
- npm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Usage

1. Open the app in the browser
2. Use the search box to filter assets by symbol
3. Click column headers to sort by asset, holdings, price, or gains
4. Check asset rows or the top checkbox to select all
5. Observe the capital gain summary cards and the savings estimate when selected assets improve the post-harvest position

## Notes

- Savings appear only when after-harvesting realised gains are lower than pre-harvest realised gains
- For example, click on the checkbox of TITAN coin to view the savings text.
- Sample data is currently mocked in `src/services/api.ts`

## License

This repository is provided as-is for demo and learning purposes.