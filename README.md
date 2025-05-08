CryptoHub
CryptoHub is a single-page application for tracking cryptocurrency prices, market trends, and asset details in real-time. It features a responsive UI, interactive charts, filtering/sorting capabilities, and a loading spinner for data updates.
Setup Instructions
Prerequisites

Node.js: Version 18.x or higher
npm: Version 9.x or higher
Git: For cloning the repository

Installation

Clone the Repository
git clone ....
cd {file name}


Install Dependencies
npm install


Run the Development Server
npm run dev

The app will be available at http://localhost:5173 (or another port if specified by Vite).

Build for Production (optional)
npm run build

The production-ready files will be in the dist folder.

Preview Production Build (optional)
npm run preview



Tech Stack

Frontend Framework: React 18.x
State Management: Redux Toolkit 2.x
Routing: React Router 6.x
Styling: Tailwind CSS 3.x
Charts: Recharts 2.x
Build Tool: Vite 5.x
Data Simulation: Mock WebSocket (custom implementation)
Package Manager: npm

Architecture
Overview
CryptoHub is a React-based SPA with a modular architecture, leveraging Redux for state management, React Router for navigation, and Tailwind CSS for styling. It uses a mock WebSocket to simulate real-time price updates and Recharts for visualizing 7-day price trends. A loading spinner (Loader.jsx) indicates data fetching/updates.
Components

Navbar.jsx: Responsive navigation bar with links to Home and About pages.
Home.jsx: Landing page displaying the CryptoTable component.
AssetDetails.jsx: Detailed view for a specific cryptocurrency, including price, market cap, and a 7-day chart, with a loader during data fetching.
CryptoTable.jsx: Table and card view of all cryptocurrencies with sorting, filtering, and search capabilities, showing a loader when data is updating.
About.jsx: Informational page about the app.
PercentageChange.jsx: Reusable component for displaying percentage changes with color-coded indicators.
Loader.jsx: Reusable spinner component for indicating data loading states.

State Management

Redux Toolkit:
Slice: cryptoSlice.js manages the assets array and loading boolean for cryptocurrency data and update status.
Selectors: cryptoSelectors.js provides selectCryptoAssets and selectCryptoLoading to access assets and loading state.
Actions: updateCryptoAssets updates asset data, setLoading toggles the loading state.


Store: Configured in store.js with a single crypto reducer.

Data Flow

Initialization: cryptoSlice.js initializes the state with mock data (e.g., Bitcoin, Ethereum) including logos and chart data.
Updates: mockWebSocket.js simulates real-time updates every 5 seconds, dispatching setLoading and updateCryptoAssets to refresh prices and chart data.
Rendering: Components (CryptoTable, AssetDetails) use useSelector with selectCryptoAssets and selectCryptoLoading to display data or a loader.
Formatting: formatters.js provides utility functions (formatCurrency, formatLargeNumber, formatNumber) for consistent number display.

Routing

React Router:
/: Home.jsx (displays CryptoTable).
/about: About.jsx.
/asset/:symbol: AssetDetails.jsx (dynamic route for asset details).



Styling

Tailwind CSS: Utility-first CSS for responsive, maintainable styles.
Theme: Bright theme with gray-100 backgrounds, gray-900/gray-600 text, and blue-500/blue-400 accents.
Charts: Recharts with customized styles (#3b82f6 lines, gray-300 grid, gray-600 axes).
Loader: Tailwind-based spinner with blue-500 border.

Troubleshooting
Loader Not Displaying
If the loading spinner does not appear in CryptoTable or AssetDetails:

Check Console Logs:
Open the browser console (F12) and look for:
CryptoTable: loading= and assets= from CryptoTable.jsx.
"Starting mock WebSocket update" and "Dispatching updated assets" from mockWebSocket.js.
Any Redux or import errors.




Verify Redux State:
The loader should appear on initial load (loading: true in cryptoSlice.js).
Add a temporary component to log the loading state:const Debug = () => {
  const loading = useSelector(selectCryptoLoading);
  console.log('Loading state:', loading);
  return null;
};

Add <Debug /> in CryptoTable.jsx or AssetDetails.jsx.


Test Initial Load:
The loader should appear on page load. If not, check if Loader.jsx is imported correctly (src/components/Loader.jsx).




Clear Cache:
Run npm run dev after clearing the browser cache or use an incognito window.


Dependencies:
Ensure all dependencies are installed (npm install).
Check package.json for required packages (React, Redux, Recharts, Tailwind).


File Paths:
Confirm Loader.jsx is in src/components/ and imported as ../components/Loader.
Verify logo images are in src/assets/logos/.



