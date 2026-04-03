import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const ProductAgent = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(`🔥 ${input} is a premium product. High quality, affordable, and trending.`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>📝 Product Agent</h2>
        <input onChange={(e) => setInput(e.target.value)} />
        <button onClick={generate}>Generate</button>
        {loading && <Loader />}
        <p>{output}</p>
      </div>
    </div>
  );
};

export default ProductAgent;