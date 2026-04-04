const buildProductPrompt = ({ productName, category, features, targetAudience, tone }) => {
  return {
    title: "Product Description Generation",
    goal: "Write an e-commerce product description that is clear, persuasive, and easy to read.",
    instructions: [
      "Start with a short product summary.",
      "Add 3 to 5 bullet points that highlight the main benefits.",
      "Write in a tone suitable for the target audience.",
      "Keep the response practical and ready to use on an online marketplace.",
    ],
    input: {
      productName,
      category,
      features,
      targetAudience,
      tone,
    },
  };
};

const buildSupportPrompt = ({ customerMessage, productName, brandVoice }) => {
  return {
    title: "Customer Support Reply",
    goal: "Generate a professional, empathetic, and solution-focused customer support response.",
    instructions: [
      "Acknowledge the customer's concern clearly.",
      "Respond in a calm and helpful tone.",
      "Give a direct answer or next step.",
      "End with a polite closing sentence.",
    ],
    input: {
      customerMessage,
      productName,
      brandVoice,
    },
  };
};

const buildReviewAnalysisPrompt = ({ productName, reviews }) => {
  return {
    title: "Review Analysis",
    goal: "Analyze customer reviews and summarize key insights for an e-commerce seller.",
    instructions: [
      "Create a short overall summary.",
      "List the most common positive themes in bullet points.",
      "List the most common negative themes in bullet points.",
      "Suggest 3 practical actions the seller should take next.",
    ],
    input: {
      productName,
      reviews,
    },
  };
};

const buildMarketingPrompt = ({
  productName,
  targetAudience,
  campaignGoal,
  platform,
}) => {
  return {
    title: "Marketing Content Generation",
    goal: "Create practical e-commerce marketing content that helps a seller promote a product effectively.",
    instructions: [
      "Write a short campaign idea summary.",
      "Add 3 marketing angles in bullet points.",
      "Provide a sample promotional caption or ad copy.",
      "Keep the suggestions relevant to the selected platform and campaign goal.",
    ],
    input: {
      productName,
      targetAudience,
      campaignGoal,
      platform,
    },
  };
};

const buildPricingPrompt = ({
  productName,
  currentPrice,
  competitorPrice,
  productPositioning,
  businessGoal,
}) => {
  return {
    title: "Pricing Strategy Suggestion",
    goal: "Suggest a smart product pricing approach for an e-commerce seller.",
    instructions: [
      "Give a short pricing recommendation summary.",
      "Explain the reasoning in 3 bullet points.",
      "Mention one possible pricing risk.",
      "Suggest one next action the seller should take before changing the price.",
    ],
    input: {
      productName,
      currentPrice,
      competitorPrice,
      productPositioning,
      businessGoal,
    },
  };
};

const buildTitlePrompt = ({ productName, category, keywords, keyFeatures, tone }) => {
  return {
    title: "Product Title Optimization",
    goal: "Generate an optimized e-commerce product title that is clear, searchable, and attractive to buyers.",
    instructions: [
      "Create 3 optimized title options.",
      "Keep each title concise and marketplace-friendly.",
      "Use important keywords naturally.",
      "Highlight the strongest product feature where possible.",
    ],
    input: {
      productName,
      category,
      keywords,
      keyFeatures,
      tone,
    },
  };
};

module.exports = {
  buildProductPrompt,
  buildSupportPrompt,
  buildReviewAnalysisPrompt,
  buildMarketingPrompt,
  buildPricingPrompt,
  buildTitlePrompt,
};
