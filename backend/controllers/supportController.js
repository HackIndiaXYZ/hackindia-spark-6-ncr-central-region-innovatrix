const History = require("../models/History");
const { generateText } = require("../services/aiService");
const { buildSupportPrompt } = require("../utils/promptTemplates");

const chatWithSupportAgent = async (req, res, next) => {
  try {
    const { customerMessage, productName, brandVoice } = req.body;

    if (!customerMessage || !productName || !brandVoice) {
      res.status(400);
      throw new Error("customerMessage, productName, and brandVoice are required");
    }

    const prompt = buildSupportPrompt({
      customerMessage,
      productName,
      brandVoice,
    });

    const aiOutput = await generateText(prompt);

    const history = await History.create({
      agentType: "customer-support-agent",
      userInput: {
        customerMessage,
        productName,
        brandVoice,
      },
      aiOutput,
    });

    res.status(200).json({
      success: true,
      message: "Support response generated successfully",
      data: {
        agentType: history.agentType,
        result: aiOutput,
        historyId: history._id,
        createdAt: history.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithSupportAgent,
};
