const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const buildPromptText = ({ title, goal, instructions = [], input = {} }) => {
  const instructionText = instructions
    .map((instruction, index) => `${index + 1}. ${instruction}`)
    .join("\n");

  const inputText = Object.entries(input)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  return [
    `Title: ${title}`,
    `Goal: ${goal}`,
    "Instructions:",
    instructionText,
    "Input:",
    inputText,
  ].join("\n\n");
};

const generateText = async (promptConfig) => {
  try {
    const prompt = buildPromptText(promptConfig);
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw new Error("AI generation failed");
  }
};

module.exports = {
  generateText,
};
