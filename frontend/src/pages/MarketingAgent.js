import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Megaphone,
  Rocket,
  SendHorizonal,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import AppShell from "../components/AppShell";
import Button from "../components/Button";
import Loader from "../components/Loader";
import OutputPanel from "../components/OutputPanel";
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

  const applyPrompt = (prompt) => {
    setFormData((prev) => ({
      ...prev,
      campaignGoal: prompt,
    }));
  };

  return (
    <AppShell
      title="Marketing Agent"
      subtitle="Generate campaign-ready copy, hooks, and launch ideas with a more guided creation flow."
      actions={
        <div className="hero-banner compact-hero">
          <div>
            <p className="section-kicker">Campaign mode</p>
            <h2>Build sharper ad copy with clearer inputs</h2>
            <p>
              This form adds stronger defaults, platform selection, visible
              progress, and a much cleaner output surface so the AI response is
              easier to act on.
            </p>
          </div>
          <div className="hero-badges">
            <span><BadgeCheck size={14} /> Platform-aware</span>
            <span><Sparkles size={14} /> Animated states</span>
          </div>
        </div>
      }
    >
      <section className="marketing-layout">
        <motion.div
          className="form-panel"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Campaign brief</p>
              <h2>Create a new request</h2>
            </div>
            <span className="progress-chip">{completionScore}% complete</span>
          </div>

          <div className="form-grid">
            <label className="input-group">
              <span>Product name</span>
              <input
                name="productName"
                placeholder="Wireless neck fan"
                value={formData.productName}
                onChange={handleChange}
              />
            </label>

            <label className="input-group">
              <span>Target audience</span>
              <input
                name="targetAudience"
                placeholder="Commuters, students, office workers"
                value={formData.targetAudience}
                onChange={handleChange}
              />
            </label>

            <label className="input-group">
              <span>Campaign goal</span>
              <textarea
                name="campaignGoal"
                placeholder="Drive launch-day conversions with a premium but energetic tone"
                value={formData.campaignGoal}
                onChange={handleChange}
                rows="5"
              />
            </label>

            <div className="form-grid split">
              <label className="input-group">
                <span>Platform</span>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                >
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>Google Ads</option>
                  <option>Amazon Sponsored</option>
                  <option>Email</option>
                </select>
              </label>

              <label className="input-group">
                <span>Tone</span>
                <select name="tone" value={formData.tone} onChange={handleChange}>
                  <option>Bold</option>
                  <option>Playful</option>
                  <option>Luxury</option>
                  <option>Trustworthy</option>
                  <option>Urgent</option>
                </select>
              </label>
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
                  onClick={() => applyPrompt(prompt)}
                  title="Use this campaign goal"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <Button
              icon={SendHorizonal}
              onClick={handleGenerate}
              disabled={loading}
              title="Generate campaign draft"
            >
              {loading ? "Generating..." : "Generate campaign"}
            </Button>
            <Button
              variant="secondary"
              icon={WandSparkles}
              onClick={() => {
                setFormData(initialState);
                setResult("");
                setError("");
                setSuccess("");
              }}
              title="Reset form fields"
            >
              Reset brief
            </Button>
          </div>

          {loading && (
            <div className="state-stack">
              <Loader label="Analyzing your brief and composing ad-ready copy..." />
              <div className="skeleton-output">
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line medium" />
              </div>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </motion.div>

        <motion.div
          className="insights-column"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
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

          {result ? (
            <OutputPanel
              title={`${formData.platform} campaign draft`}
              content={result}
              onRegenerate={handleGenerate}
            />
          ) : (
            <div className="empty-output">
              <Sparkles size={22} />
              <h3>Your generated campaign will appear here</h3>
              <p>
                Results are formatted into headings, readable paragraphs, and
                bullet sections so the team can scan and reuse them quickly.
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </AppShell>
  );
};

export default MarketingAgent;
