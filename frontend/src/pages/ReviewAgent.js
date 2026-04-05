import React, { useState } from "react";
import { BadgeCheck, ScanSearch, SendHorizonal, Sparkles } from "lucide-react";
import AgentLayout from "../components/AgentLayout";
import ActionButtons from "../components/ActionButtons";
import InputField from "../components/InputField";
import { analyzeReviews } from "../services/api";

const initialState = {
  productName: "",
  reviews: "",
};

const ReviewAgent = () => {
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

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await analyzeReviews({
        productName: formData.productName,
        reviews: formData.reviews
          .split("\n")
          .map((review) => review.trim())
          .filter(Boolean),
      });
      setResult(response.data.result);
      setSuccess("Review analysis generated successfully.");
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
          <p className="section-kicker">Analysis guide</p>
          <h2>How this helps</h2>
        </div>
      </div>
      <div className="guidance-list">
        <div>
          <ScanSearch size={18} />
          <p>One review per line keeps the backend payload clean and easier to interpret.</p>
        </div>
        <div>
          <BadgeCheck size={18} />
          <p>Structured results make common complaints and improvement themes easier to spot.</p>
        </div>
        <div>
          <Sparkles size={18} />
          <p>The card layout is much easier to skim than raw preformatted text blocks.</p>
        </div>
      </div>
    </div>
  );

  return (
    <AgentLayout
      title="Review Agent"
      subtitle="Paste customer feedback and get a cleaner, more usable review analysis workflow."
      heroTitle="Turn raw review text into clearer seller insights"
      heroText="This page now uses the same responsive workspace as the Marketing page, with better form spacing, loading states, and output formatting."
      heroBadges={[
        { label: "Insight-ready", icon: BadgeCheck },
        { label: "Readable output", icon: Sparkles },
      ]}
      personality="Review Agent is clustering customer sentiment and extracting insights."
      loading={loading}
      loadingLabel="Review Agent is analyzing customer feedback..."
      error={error}
      success={success}
      result={result}
      outputTitle={`${formData.productName || "Product"} review analysis`}
      onRegenerate={handleAnalyze}
      sideContent={sideContent}
    >
      <div className="form-grid">
        <InputField
          label="Product name"
          name="productName"
          placeholder="Portable blender"
          value={formData.productName}
          onChange={handleChange}
        />
        <InputField
          label="Customer reviews"
          name="reviews"
          as="textarea"
          rows={10}
          placeholder={"Battery life is excellent\nThe lid feels a bit flimsy\nEasy to clean and use"}
          value={formData.reviews}
          onChange={handleChange}
        />
      </div>

      <ActionButtons
        onGenerate={handleAnalyze}
        onReset={() => {
          setFormData(initialState);
          setResult("");
          setError("");
          setSuccess("");
        }}
        loading={loading}
        generateLabel="Analyze reviews"
        resetLabel="Clear reviews"
        generateIcon={SendHorizonal}
      />
    </AgentLayout>
  );
};

export default ReviewAgent;
