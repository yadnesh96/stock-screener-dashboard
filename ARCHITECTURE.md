# Architecture Design

## Project Architecture

This application follows a modular frontend architecture using Next.js App Router.

## Main Modules

### 1. Data Module
Generates mock stock data (5000+ records).

File:
src/data/generateStocks.ts

---

### 2. Type Module
Defines structure of stock data.

File:
src/types/stock.ts

---

### 3. Component Module
Reusable UI components (table, chart, filters).

Folder:
src/components/

---

### 4. State Management
Will use Zustand for managing stock data and filters.

Folder:
src/store/

---

### 5. Utility Module
Filtering logic and WebSocket simulation.

Folder:
src/lib/

---

## Data Flow

Mock Data → Page → Table → UI

---

## Folder Structure

src/
 ├─ app/
 ├─ components/
 ├─ data/
 ├─ lib/
 ├─ store/
 └─ types/