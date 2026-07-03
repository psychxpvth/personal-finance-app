# Copilot Instructions - Personal Finance App

## Project Overview

This is a personal finance management web application built with React + TypeScript. It helps users track their income and expenses with a modern UI and visual analytics.

## Key Features

- Dashboard with financial summary
- Add transactions (income/expenses)
- Transaction history with filtering
- Visual charts (pie chart for categories, line chart for monthly trends)
- Local storage persistence
- Responsive design

## Architecture

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with modern design patterns
- **Data Visualization**: Recharts library
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Important Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:3000)
npm run build      # Build for production
npm run deploy     # Deploy to GitHub Pages
```

## Project Structure

- `src/components/` - React components (AddTransaction, TransactionList, Dashboard, Charts)
- `src/styles/` - Component CSS files
- `src/utils/storage.ts` - LocalStorage and calculation utilities
- `src/types.ts` - TypeScript interfaces
- `vite.config.ts` - Vite configuration
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow

## Development Notes

- All data is stored in browser localStorage under key `finance-transactions`
- Transaction IDs are generated using `Date.now()`
- Categories are predefined (can be expanded)
- Currencies formatted to EUR
- Fully responsive for mobile, tablet, desktop
