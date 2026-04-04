const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

const postJson = async (path, payload) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

const fetchAgents = async () => {
  const response = await fetch(`${API_BASE_URL}/agents`);
  return handleResponse(response);
};

const fetchHistory = async (agentType = "") => {
  const query = agentType ? `?agentType=${encodeURIComponent(agentType)}` : "";
  const response = await fetch(`${API_BASE_URL}/history${query}`);
  return handleResponse(response);
};

const generateProductDescription = (payload) =>
  postJson("/product/generate", payload);

const chatWithSupportAgent = (payload) => postJson("/support/chat", payload);

const analyzeReviews = (payload) => postJson("/review/analyze", payload);

const generateMarketingContent = (payload) =>
  postJson("/marketing/generate", payload);

const suggestPricingStrategy = (payload) =>
  postJson("/pricing/suggest", payload);

const optimizeTitle = (payload) => postJson("/title/optimize", payload);

export {
  fetchAgents,
  fetchHistory,
  generateProductDescription,
  chatWithSupportAgent,
  analyzeReviews,
  generateMarketingContent,
  suggestPricingStrategy,
  optimizeTitle,
};
