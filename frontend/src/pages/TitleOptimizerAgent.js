import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const TitleOptimizer = () => {
  const [title, setTitle] = useState("");
  const [opt, setOpt] = useState("");

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>📦 Title Optimizer</h2>
        <input onChange={(e) => setTitle(e.target.value)} />
        <button onClick={() => setOpt(`🔥 Best ${title} for 2025 | Buy Now`)}>
          Optimize
        </button>
        <p>{opt}</p>
      </div>
    </div>
  );
};

export default TitleOptimizer;