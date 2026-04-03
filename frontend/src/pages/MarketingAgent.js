import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const MarketingAgent = () => {
  const [product, setProduct] = useState("");
  const [ads, setAds] = useState("");

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>📢 Marketing Agent</h2>
        <input onChange={(e) => setProduct(e.target.value)} />
        <button onClick={() => setAds(`🔥 Buy ${product} now! Limited offer!`)}>
          Generate Ad
        </button>
        <p>{ads}</p>
      </div>
    </div>
  );
};

export default MarketingAgent;