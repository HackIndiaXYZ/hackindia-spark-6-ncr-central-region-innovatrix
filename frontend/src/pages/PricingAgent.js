import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const PricingAgent = () => {
  const [price, setPrice] = useState("");

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>🏷️ Pricing Agent</h2>
        <input onChange={(e) => setPrice(e.target.value)} />
        <button onClick={() => alert(`Suggested Price: ₹${price * 1.5}`)}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default PricingAgent;