import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductAgent from "./pages/ProductAgent";
import SupportAgent from "./pages/SupportAgent";
import ReviewAgent from "./pages/ReviewAgent";
import MarketingAgent from "./pages/MarketingAgent";
import PricingAgent from "./pages/PricingAgent";
import TitleOptimizerAgent from "./pages/TitleOptimizerAgent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductAgent />} />
        <Route path="/support" element={<SupportAgent />} />
        <Route path="/review" element={<ReviewAgent />} />
        <Route path="/marketing" element={<MarketingAgent />} />
        <Route path="/pricing" element={<PricingAgent />} />
        <Route path="/title" element={<TitleOptimizerAgent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
