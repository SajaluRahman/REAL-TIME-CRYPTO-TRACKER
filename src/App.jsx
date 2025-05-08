import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AssetDetails from "./pages/AssetDetails";
import { startMockUpdates } from "./mocks/mockWebSocket";
import Navbar from "./components/Navbar";

// Start mock WebSocket updates when app runs
startMockUpdates();

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/asset/:symbol" element={<AssetDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
