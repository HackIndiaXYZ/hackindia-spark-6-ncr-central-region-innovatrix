import React, { useMemo, useState } from "react";
import {
  BadgeCheck,
  Megaphone,
  Rocket,
  SendHorizonal,
  Sparkles,
} from "lucide-react";
import ActionButtons from "../components/ActionButtons";
import AgentLayout from "../components/AgentLayout";
import InputField from "../components/InputField";
import { generateMarketingContent } from "../services/api";

const initialState = {
  productName: "",
  targetAudience: "",
  campaignGoal: "",
  platform: "Instagram",
  tone: "Bold",
};

const recentPrompts = [
  "Retargeting campaign for abandoned carts",
  "Launch ads for a premium home gadget",
  "Festival season promo for skincare bundle",
];

const MarketingAgent = () => {
  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const completionScore = useMemo(() => {
    const requiredFields = [
      formData.productName,
      formData.targetAudience,
      formData.campaignGoal,
      formData.platform,
      formData.tone,
    ];

    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [formData]);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await generateMarketingContent(formData);
      setResult(response.data.result);
      setSuccess("Campaign draft generated successfully.");
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
          <p className="section-kicker">Live guidance</p>
          <h2>What makes this better</h2>
        </div>
      </div>
      <div className="guidance-list">
        <div>
          <Rocket size={18} />
          <p>Platform dropdowns reduce vague inputs and speed up prompt setup.</p>
        </div>
        <div>
          <Megaphone size={18} />
          <p>Quick prompt chips help sellers test ideas without rewriting the entire brief.</p>
        </div>
        <div>
          <Sparkles size={18} />
          <p>Clear success, error, and loading states make the workflow feel productized and reliable.</p>
        </div>
      </div>
    </div>
  );

  return (
    <AgentLayout
      title="Marketing Agent"
      subtitle="Generate campaign-ready copy, hooks, and launch ideas with a more guided creation flow."
      heroTitle="Build sharper ad copy with clearer inputs"
      heroText="This shared workspace keeps the page structure intact while giving Marketing the same polished output cards, skeletons, and action feedback as the rest of the product."
      heroBadges={[
        { label: `${completionScore}% complete`, icon: BadgeCheck },
        { label: "Platform-aware", icon: Sparkles },
      ]}
      personality="Marketing Agent is generating high-converting campaign content."
      loading={loading}
      loadingLabel="Marketing Agent is generating high-converting content..."
      error={error}
      success={success}
      result={result}
      outputTitle={`${formData.platform} campaign draft`}
      onRegenerate={handleGenerate}
      sideContent={sideContent}
    >
      <div className="form-grid">
        <InputField
          label="Product name"
          name="productName"
          placeholder="Wireless neck fan"
          value={formData.productName}
          onChange={handleChange}
        />

        <InputField
          label="Target audience"
          name="targetAudience"
          placeholder="Commuters, students, office workers"
          value={formData.targetAudience}
          onChange={handleChange}
        />

        <InputField
          label="Campaign goal"
          name="campaignGoal"
          as="textarea"
          rows={5}
          placeholder="Drive launch-day conversions with a premium but energetic tone"
          value={formData.campaignGoal}
          onChange={handleChange}
        />

        <div className="form-grid split">
          <InputField
            label="Platform"
            name="platform"
            as="select"
            value={formData.platform}
            onChange={handleChange}
            options={[
              "Instagram",
              "Facebook",
              "Google Ads",
              "Amazon Sponsored",
              "Email",
            ]}
          />

          <InputField
            label="Tone"
            name="tone"
            as="select"
            value={formData.tone}
            onChange={handleChange}
            options={["Bold", "Playful", "Luxury", "Trustworthy", "Urgent"]}
          />
        </div>
      </div>

      <div className="quick-prompts">
        <p>Quick goals</p>
        <div className="chip-row">
          {recentPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="prompt-chip"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  campaignGoal: prompt,
                }))
              }
              title="Use this campaign goal"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <ActionButtons
        onGenerate={handleGenerate}
        onReset={() => {
          setFormData(initialState);
          setResult("");
          setError("");
          setSuccess("");
        }}
        loading={loading}
        generateLabel="Generate campaign"
        resetLabel="Reset brief"
        generateIcon={SendHorizonal}
      />
    </AgentLayout>
  );
};

export default MarketingAgent;
