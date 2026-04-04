import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Loader from "../components/Loader";
import { optimizeTitle } from "../services/api";

const TitleOptimizerAgent = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    keywords: "",
    keyFeatures: "",
    tone: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOptimize = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await optimizeTitle({
        ...formData,
        keywords: formData.keywords
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        keyFeatures: formData.keyFeatures
          .split(",")
          .map((item) => item.trim())
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
        <h2>Title Optimizer</h2>
        <p className="page-subtitle">Create optimized titles from the live title endpoint and reuse strong keywords.</p>
        <input name="productName" placeholder="Product name" value={formData.productName} onChange={handleChange} />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="keywords" placeholder="Keywords separated by commas" value={formData.keywords} onChange={handleChange} />
        <textarea
          name="keyFeatures"
          placeholder="Key features separated by commas"
          value={formData.keyFeatures}
          onChange={handleChange}
          rows="4"
        />
        <input name="tone" placeholder="Tone" value={formData.tone} onChange={handleChange} />
        <button onClick={handleOptimize}>Optimize</button>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        {result && <pre className="result-card">{result}</pre>}
      </div>
    </div>
  );
};

export default TitleOptimizerAgent;
