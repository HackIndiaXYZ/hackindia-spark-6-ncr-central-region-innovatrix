import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import ProductAgent from "./pages/ProductAgent";
import SupportAgent from "./pages/SupportAgent";
import ReviewAgent from "./pages/ReviewAgent";
import MarketingAgent from "./pages/MarketingAgent";
import PricingAgent from "./pages/PricingAgent";
import TitleOptimizerAgent from "./pages/TitleOptimizerAgent";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductAgent />} />
        <Route path="/support" element={<SupportAgent />} />
        <Route path="/review" element={<ReviewAgent />} />
        <Route path="/marketing" element={<MarketingAgent />} />
        <Route path="/pricing" element={<PricingAgent />} />
        <Route path="/title" element={<TitleOptimizerAgent />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
