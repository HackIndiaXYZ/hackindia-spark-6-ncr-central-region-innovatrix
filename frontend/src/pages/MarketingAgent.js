import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Loader from "../components/Loader";
import { generateMarketingContent } from "../services/api";

const MarketingAgent = () => {
  const [formData, setFormData] = useState({
    productName: "",
    targetAudience: "",
    campaignGoal: "",
    platform: "",
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

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await generateMarketingContent(formData);
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
        <h2>Marketing Agent</h2>
        <p className="page-subtitle">Generate ad angles and promotional copy from the marketing endpoint.</p>
        <input name="productName" placeholder="Product name" value={formData.productName} onChange={handleChange} />
        <input name="targetAudience" placeholder="Target audience" value={formData.targetAudience} onChange={handleChange} />
        <input name="campaignGoal" placeholder="Campaign goal" value={formData.campaignGoal} onChange={handleChange} />
        <input name="platform" placeholder="Platform" value={formData.platform} onChange={handleChange} />
        <button onClick={handleGenerate}>Generate Ad</button>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        {result && <pre className="result-card">{result}</pre>}
      </div>
    </div>
  );
};

export default MarketingAgent;
