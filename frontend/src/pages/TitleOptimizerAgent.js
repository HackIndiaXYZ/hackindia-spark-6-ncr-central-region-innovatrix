import React, { useState } from "react";
import { BadgeCheck, SendHorizonal, Sparkles, Tags } from "lucide-react";
import AgentLayout from "../components/AgentLayout";
import ActionButtons from "../components/ActionButtons";
import InputField from "../components/InputField";
import { optimizeTitle } from "../services/api";

const initialState = {
  productName: "",
  category: "",
  keywords: "",
  keyFeatures: "",
  tone: "SEO-focused",
};

const TitleOptimizerAgent = () => {
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

  const handleOptimize = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
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
      setSuccess("Optimized title ideas generated successfully.");
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
          <p className="section-kicker">Title guidance</p>
          <h2>Optimization notes</h2>
        </div>
      </div>
      <div className="guidance-list">
        <div>
          <Tags size={18} />
          <p>Keyword and feature inputs keep titles stronger for search and marketplace clarity.</p>
        </div>
        <div>
          <BadgeCheck size={18} />
          <p>Dropdown tone control helps balance SEO, readability, and brand voice.</p>
        </div>
        <div>
          <Sparkles size={18} />
          <p>Copy and regenerate actions make it faster to compare title options during iteration.</p>
        </div>
      </div>
    </div>
  );

  return (
    <AgentLayout
      title="Title Optimizer"
      subtitle="Create stronger product titles with a cleaner responsive form and better output presentation."
      heroTitle="Generate sharper listing titles with stronger keyword control"
      heroText="This refreshed page aligns with the rest of the dashboard, fixes layout overflow, and keeps title iteration quick and organized."
      heroBadges={[
        { label: "SEO-aware", icon: BadgeCheck },
        { label: "Copy-ready", icon: Sparkles },
      ]}
      personality="Title Agent is refining your product headline for search and click-through."
      loading={loading}
      loadingLabel="Title Agent is optimizing headline variations..."
      error={error}
      success={success}
      result={result}
      outputTitle={`${formData.productName || "Product"} title suggestions`}
      onRegenerate={handleOptimize}
      sideContent={sideContent}
    >
      <div className="form-grid">
        <InputField
          label="Product name"
          name="productName"
          placeholder="Ultra-light laptop stand"
          value={formData.productName}
          onChange={handleChange}
        />
        <InputField
          label="Category"
          name="category"
          placeholder="Laptop accessories"
          value={formData.category}
          onChange={handleChange}
        />
        <InputField
          label="Keywords"
          name="keywords"
          placeholder="foldable, portable, aluminum, ergonomic"
          value={formData.keywords}
          onChange={handleChange}
        />
        <InputField
          label="Key features"
          name="keyFeatures"
          as="textarea"
          rows={4}
          placeholder="Adjustable height, lightweight frame, compact travel design"
          value={formData.keyFeatures}
          onChange={handleChange}
        />
        <InputField
          label="Tone"
          name="tone"
          as="select"
          value={formData.tone}
          onChange={handleChange}
          options={["SEO-focused", "Premium", "Technical", "Friendly"]}
        />
      </div>

      <ActionButtons
        onGenerate={handleOptimize}
        onReset={() => {
          setFormData(initialState);
          setResult("");
          setError("");
          setSuccess("");
        }}
        loading={loading}
        generateLabel="Optimize titles"
        resetLabel="Reset brief"
        generateIcon={SendHorizonal}
      />
    </AgentLayout>
  );
};

export default TitleOptimizerAgent;
