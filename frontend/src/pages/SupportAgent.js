import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Loader from "../components/Loader";
import { chatWithSupportAgent } from "../services/api";

const SupportAgent = () => {
  const [formData, setFormData] = useState({
    customerMessage: "",
    productName: "",
    brandVoice: "",
  });
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const send = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await chatWithSupportAgent(formData);

      setChat((prev) => [
        ...prev,
        {
          user: formData.customerMessage,
          bot: response.data.result,
        },
      ]);

      setFormData((prev) => ({
        ...prev,
        customerMessage: "",
      }));
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
        <h2>Support Agent</h2>
        <p className="page-subtitle">Write empathetic support replies using the connected Node and Gemini backend.</p>
        <input name="productName" placeholder="Product name" value={formData.productName} onChange={handleChange} />
        <input name="brandVoice" placeholder="Brand voice" value={formData.brandVoice} onChange={handleChange} />
        <textarea
          name="customerMessage"
          placeholder="Customer message"
          value={formData.customerMessage}
          onChange={handleChange}
          rows="4"
        />
        <button onClick={send}>Send</button>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}

        {chat.map((item, index) => (
          <div key={`${item.user}-${index}`} className="result-card">
            <p><b>You:</b> {item.user}</p>
            <p><b>AI:</b> {item.bot}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportAgent;
