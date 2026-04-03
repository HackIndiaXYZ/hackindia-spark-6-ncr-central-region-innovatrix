import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const ReviewAgent = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>⭐ Review Agent</h2>
        <textarea onChange={(e) => setText(e.target.value)} />
        <button onClick={() => setResult("Positive Review 👍")}>Analyze</button>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default ReviewAgent;