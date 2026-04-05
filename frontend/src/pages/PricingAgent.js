import React, { useState } from "react";
import { BadgeCheck, BadgeDollarSign, SendHorizonal, Sparkles } from "lucide-react";
import AgentLayout from "../components/AgentLayout";
import ActionButtons from "../components/ActionButtons";
import InputField from "../components/InputField";
import { suggestPricingStrategy } from "../services/api";

const initialState = {
  productName: "",
  currentPrice: "",
  competitorPrice: "",
  productPositioning: "",
  businessGoal: "",
};

const PricingAgent = () => {
  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSuggest = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await suggestPricingStrategy(formData);
      setResult(response.data.result);
      setSuccess("Pricing recommendation generated successfully.");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const sideContent = (
    <div className="panel-card">
      <div className="section-header compact">
        <div>
          <p className="section-kicker">Pricing logic</p>
          <h2>Decision support</h2>
        </div>
      </div>
      <div className="guidance-list">
        <div>
          <BadgeDollarSign size={18} />
          <p>Price context fields make the recommendation more grounded in real positioning.</p>
        </div>
        <div>
          <BadgeCheck size={18} />
          <p>Business goal framing helps the model bias for margin, growth, or conversion.</p>
        </div>
        <div>
          <Sparkles size={18} />
          <p>A structured output makes it easier to compare rationale, risks, and next steps.</p>
        </div>
      </div>
    </div>
  );

  return (
    <AgentLayout
      title="Pricing Agent"
      subtitle="Generate clearer pricing recommendations in a consistent, responsive workspace."
      heroTitle="Balance growth, margins, and positioning faster"
      heroText="The refreshed layout keeps complex pricing inputs organized and avoids the overflow issues from the old page structure."
      heroBadges={[
        { label: "Strategy-ready", icon: BadgeCheck },
        { label: "Responsive layout", icon: Sparkles },
      ]}
      personality="Pricing Agent is weighing positioning, competition, and business goals."
      loading={loading}
      loadingLabel="Pricing Agent is modeling a pricing direction..."
      error={error}
      success={success}
      result={result}
      outputTitle={`${formData.productName || "Product"} pricing strategy`}
      onRegenerate={handleSuggest}
      sideContent={sideContent}
    >
      <div className="form-grid">
        <InputField
          label="Product name"
          name="productName"
          placeholder="Smart standing desk"
          value={formData.productName}
          onChange={handleChange}
        />
        <div className="form-grid split">
          <InputField
            label="Current price"
            name="currentPrice"
            placeholder="7999"
            value={formData.currentPrice}
            onChange={handleChange}
          />
          <InputField
            label="Competitor price"
            name="competitorPrice"
            placeholder="7499"
            value={formData.competitorPrice}
            onChange={handleChange}
          />
        </div>
        <InputField
          label="Product positioning"
          name="productPositioning"
          placeholder="Premium ergonomic workspace solution"
          value={formData.productPositioning}
          onChange={handleChange}
        />
        <InputField
          label="Business goal"
          name="businessGoal"
          as="textarea"
          rows={4}
          placeholder="Increase conversions while protecting premium brand perception"
          value={formData.businessGoal}
          onChange={handleChange}
        />
      </div>

      <ActionButtons
        onGenerate={handleSuggest}
        onReset={() => {
          setFormData(initialState);
          setResult("");
          setError("");
          setSuccess("");
        }}
        loading={loading}
        generateLabel="Get pricing strategy"
        resetLabel="Reset inputs"
        generateIcon={SendHorizonal}
      />
    </AgentLayout>
  );
};

export default PricingAgent;
