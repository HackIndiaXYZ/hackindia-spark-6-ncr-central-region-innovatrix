import React, { useMemo, useState } from "react";
import { BadgeCheck, LayoutDashboard, SendHorizonal, Sparkles } from "lucide-react";
import AgentLayout from "../components/AgentLayout";
import ActionButtons from "../components/ActionButtons";
import InputField from "../components/InputField";
import { generateProductDescription } from "../services/api";

const initialState = {
  productName: "",
  category: "",
  features: "",
  targetAudience: "",
  tone: "Persuasive",
};

const ProductAgent = () => {
  const [formData, setFormData] = useState(initialState);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const completionScore = useMemo(() => {
    const fields = Object.values(formData);
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [formData]);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const generate = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await generateProductDescription(formData);
      setOutput(response.data.result);
      setSuccess("Product description drafted successfully.");
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
          <p className="section-kicker">Description quality</p>
          <h2>Why this layout works</h2>
        </div>
      </div>
      <div className="guidance-list">
        <div>
          <LayoutDashboard size={18} />
          <p>Structured fields help the model write richer and more specific selling copy.</p>
        </div>
        <div>
          <BadgeCheck size={18} />
          <p>Completion feedback encourages better prompts before generation starts.</p>
        </div>
        <div>
          <Sparkles size={18} />
          <p>Formatted output is easier to scan, copy, and reuse in catalogs or listing tools.</p>
        </div>
      </div>
    </div>
  );

  return (
    <AgentLayout
      title="Product Agent"
      subtitle="Generate marketplace-ready product descriptions using the live backend in a cleaner, more guided workspace."
      heroTitle="Craft stronger listings with less manual rewriting"
      heroText="This version fixes layout overflow, keeps the form readable on smaller screens, and presents the generated copy in a reusable output card."
      heroBadges={[
        { label: `${completionScore}% complete`, icon: BadgeCheck },
        { label: "Catalog-ready", icon: Sparkles },
      ]}
      personality="Product Agent is crafting clearer product storytelling for your catalog."
      loading={loading}
      loadingLabel="Product Agent is crafting description variants..."
      error={error}
      success={success}
      result={output}
      outputTitle={`${formData.productName || "Product"} description draft`}
      onRegenerate={generate}
      sideContent={sideContent}
    >
      <div className="form-grid">
        <InputField
          label="Product name"
          name="productName"
          placeholder="Magnetic travel bottle"
          value={formData.productName}
          onChange={handleChange}
        />
        <InputField
          label="Category"
          name="category"
          placeholder="Travel accessories"
          value={formData.category}
          onChange={handleChange}
        />
        <InputField
          label="Key features"
          name="features"
          as="textarea"
          rows={5}
          placeholder="Magnetic lid, leakproof seal, insulated body, compact carry loop"
          value={formData.features}
          onChange={handleChange}
        />
        <InputField
          label="Target audience"
          name="targetAudience"
          placeholder="Commuters and frequent travelers"
          value={formData.targetAudience}
          onChange={handleChange}
        />
        <InputField
          label="Tone"
          name="tone"
          as="select"
          value={formData.tone}
          onChange={handleChange}
          options={["Persuasive", "Premium", "Friendly", "Technical"]}
        />
      </div>

      <ActionButtons
        onGenerate={generate}
        onReset={() => {
          setFormData(initialState);
          setOutput("");
          setError("");
          setSuccess("");
        }}
        loading={loading}
        generateLabel="Generate description"
        resetLabel="Reset brief"
        generateIcon={SendHorizonal}
      />
    </AgentLayout>
  );
};

export default ProductAgent;
