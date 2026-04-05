import React, { useState } from "react";
import { BadgeCheck, MessageSquareText, SendHorizonal, Sparkles } from "lucide-react";
import AgentLayout from "../components/AgentLayout";
import ActionButtons from "../components/ActionButtons";
import InputField from "../components/InputField";
import { chatWithSupportAgent } from "../services/api";

const initialState = {
  customerMessage: "",
  productName: "",
  brandVoice: "Empathetic",
};

const SupportAgent = () => {
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

  const send = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const response = await chatWithSupportAgent(formData);
      setResult(
        `Customer issue:\n${formData.customerMessage}\n\nSuggested reply:\n${response.data.result}`
      );
      setSuccess("Support reply generated successfully.");
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
          <p className="section-kicker">Support flow</p>
          <h2>Response tips</h2>
        </div>
      </div>
      <div className="guidance-list">
        <div>
          <MessageSquareText size={18} />
          <p>Keeping the customer message in the brief helps generate more context-aware replies.</p>
        </div>
        <div>
          <BadgeCheck size={18} />
          <p>Brand voice selection keeps tone aligned with the way your team already speaks.</p>
        </div>
        <div>
          <Sparkles size={18} />
          <p>The output card separates issue context from the reply so agents can review fast.</p>
        </div>
      </div>
    </div>
  );

  return (
    <AgentLayout
      title="Support Agent"
      subtitle="Write empathetic customer support replies with a more structured and readable workflow."
      heroTitle="Respond faster without losing brand tone"
      heroText="The improved page keeps the form responsive, adds clearer states, and formats the AI reply into a cleaner support-ready response card."
      heroBadges={[
        { label: "Support-ready", icon: BadgeCheck },
        { label: "Tone-controlled", icon: Sparkles },
      ]}
      personality="Support Agent is drafting a calm, helpful customer reply."
      loading={loading}
      loadingLabel="Support Agent is preparing a reply..."
      error={error}
      success={success}
      result={result}
      outputTitle={`${formData.productName || "Customer"} support reply`}
      onRegenerate={send}
      sideContent={sideContent}
    >
      <div className="form-grid">
        <InputField
          label="Product name"
          name="productName"
          placeholder="Smart air fryer"
          value={formData.productName}
          onChange={handleChange}
        />
        <InputField
          label="Brand voice"
          name="brandVoice"
          as="select"
          value={formData.brandVoice}
          onChange={handleChange}
          options={["Empathetic", "Professional", "Friendly", "Premium"]}
        />
        <InputField
          label="Customer message"
          name="customerMessage"
          as="textarea"
          rows={6}
          placeholder="The order arrived late and the outer box was damaged..."
          value={formData.customerMessage}
          onChange={handleChange}
        />
      </div>

      <ActionButtons
        onGenerate={send}
        onReset={() => {
          setFormData(initialState);
          setResult("");
          setError("");
          setSuccess("");
        }}
        loading={loading}
        generateLabel="Generate reply"
        resetLabel="Reset message"
        generateIcon={SendHorizonal}
      />
    </AgentLayout>
  );
};

export default SupportAgent;
