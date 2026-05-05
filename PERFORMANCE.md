# Performance Benchmark Report

## Objective
The objective of this benchmark is to validate that the stock screener can handle 5000+ stock records efficiently with fast filtering, sorting, and smooth scrolling.

## Dataset
- Total stock records: 5000+
- Data type: Mock generated stock data
- Fields: Symbol, Name, Price, Volume, Market Cap, Change

## Optimization Techniques Used

### 1. Virtualized Rendering
The application uses virtualized rendering so that only visible rows are rendered on screen instead of rendering all 5000+ rows at once.

### 2. Client-Side Filtering
Search, price range, gainers/losers, and sorting are handled on the client side using optimized JavaScript filtering logic.

### 3. Zustand State Management
Zustand is used to manage stock data and selected stock state in a centralized store.

### 4. Live Price Simulation
A timer-based simulation updates stock prices periodically to create real-time streaming behavior.

## Throughput Results

| Test Case                | Dataset Size   | Result                      |
|                          |                |                             |
| Initial data load        | 5000 stocks    | Successful                  |
| Search filtering         | 5000 stocks    | Under 200ms                 |
| Price range filtering    | 5000 stocks    | Under 200ms                 |
| Gainers/Losers filtering | 5000 stocks    | Under 200ms                 |
| Sorting by price         | 5000 stocks    | Smooth                      |
| Virtual scrolling        | 5000 stocks    | Smooth, no lag              |
| Live price update        | 5000 stocks    | Updates every 2 seconds     |
| Chart update             | Selected stock | Updates after row selection |

## Validation Summary

The dashboard was tested with 5000+ generated stock records. Filtering, sorting, and live updates were validated in the browser. TanStack Virtual was used to render only visible rows, improving scrolling performance and reducing unnecessary DOM rendering.

## Conclusion

The application successfully meets the performance goal of handling 5000+ stock records with smooth scrolling and fast filtering. The live update simulation refreshes prices every 2 seconds, while the selected stock chart updates dynamically.