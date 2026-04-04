import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Loader from "../components/Loader";
import { generateProductDescription } from "../services/api";

const ProductAgent = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    features: "",
    targetAudience: "",
    tone: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generate = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await generateProductDescription(formData);
      setOutput(response.data.result);
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
        <h2>Product Agent</h2>
        <p className="page-subtitle">Generate marketplace-ready product descriptions using your live backend.</p>
        <input name="productName" placeholder="Product name" value={formData.productName} onChange={handleChange} />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <textarea name="features" placeholder="Key features" value={formData.features} onChange={handleChange} rows="4" />
        <input name="targetAudience" placeholder="Target audience" value={formData.targetAudience} onChange={handleChange} />
        <input name="tone" placeholder="Tone" value={formData.tone} onChange={handleChange} />
        <button onClick={generate}>Generate</button>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        {output && <pre className="result-card">{output}</pre>}
      </div>
    </div>
  );
};

export default ProductAgent;
