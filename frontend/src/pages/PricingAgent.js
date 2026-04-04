import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Loader from "../components/Loader";
import { suggestPricingStrategy } from "../services/api";

const PricingAgent = () => {
  const [formData, setFormData] = useState({
    productName: "",
    currentPrice: "",
    competitorPrice: "",
    productPositioning: "",
    businessGoal: "",
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

  const handleSuggest = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await suggestPricingStrategy(formData);
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
        <h2>Pricing Agent</h2>
        <p className="page-subtitle">Get pricing guidance from the backend based on your market inputs.</p>
        <input name="productName" placeholder="Product name" value={formData.productName} onChange={handleChange} />
        <input name="currentPrice" placeholder="Current price" value={formData.currentPrice} onChange={handleChange} />
        <input name="competitorPrice" placeholder="Competitor price" value={formData.competitorPrice} onChange={handleChange} />
        <input
          name="productPositioning"
          placeholder="Product positioning"
          value={formData.productPositioning}
          onChange={handleChange}
        />
        <input name="businessGoal" placeholder="Business goal" value={formData.businessGoal} onChange={handleChange} />
        <button onClick={handleSuggest}>Get Pricing Suggestion</button>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        {result && <pre className="result-card">{result}</pre>}
      </div>
    </div>
  );
};

export default PricingAgent;
