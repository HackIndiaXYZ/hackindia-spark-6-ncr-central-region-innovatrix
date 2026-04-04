import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Loader from "../components/Loader";
import { analyzeReviews } from "../services/api";

const ReviewAgent = () => {
  const [productName, setProductName] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await analyzeReviews({
        productName,
        reviews: text
          .split("\n")
          .map((review) => review.trim())
          .filter(Boolean),
      });
      setResult(response.data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>Review Agent</h2>
        <p className="page-subtitle">Paste customer reviews and get real backend-driven analysis and seller actions.</p>
        <input
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <textarea
          placeholder="Paste one review per line"
          onChange={(e) => setText(e.target.value)}
          value={text}
          rows="8"
        />
        <button onClick={handleAnalyze}>Analyze</button>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        {result && <pre className="result-card">{result}</pre>}
      </div>
    </div>
  );
};

export default ReviewAgent;
