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

module.exports = {
  buildProductPrompt,
  buildSupportPrompt,
  buildReviewAnalysisPrompt,
};
