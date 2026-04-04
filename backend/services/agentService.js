const agents = [
  {
    id: "product-description-agent",
    name: "Product Description Agent",
    category: "Content",
    description: "Generates clear and persuasive product descriptions for listings.",
  },
  {
    id: "customer-support-agent",
    name: "Customer Support Agent",
    category: "Support",
    description: "Creates helpful support replies for customer questions and complaints.",
  },
  {
    id: "review-analyzer-agent",
    name: "Review Analyzer Agent",
    category: "Insights",
    description: "Analyzes customer reviews and extracts common positives, negatives, and actions.",
  },
  {
    id: "marketing-agent",
    name: "Marketing Agent",
    category: "Growth",
    description: "Generates campaign ideas, ad copy, and marketing suggestions for sellers.",
  },
  {
    id: "pricing-agent",
    name: "Pricing Agent",
    category: "Optimization",
    description: "Suggests pricing ideas based on product value, competition, and goals.",
  },
  {
    id: "title-optimizer-agent",
    name: "Title Optimizer Agent",
    category: "SEO",
    description: "Improves product titles for search visibility and click-through rate.",
  },
];

const getAllAgents = () => {
  return agents;
};

module.exports = {
  getAllAgents,
};
