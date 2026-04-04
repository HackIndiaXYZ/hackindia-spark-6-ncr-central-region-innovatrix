const History = require("../models/History");
const { generateText } = require("../services/aiService");
const { buildPricingPrompt } = require("../utils/promptTemplates");

const suggestPricingStrategy = async (req, res, next) => {
  try {
    const {
      productName,
      currentPrice,
      competitorPrice,
      productPositioning,
      businessGoal,
    } = req.body;

    if (
      !productName ||
      !currentPrice ||
      !competitorPrice ||
      !productPositioning ||
      !businessGoal
    ) {
      res.status(400);
      throw new Error(
        "productName, currentPrice, competitorPrice, productPositioning, and businessGoal are required"
      );
    }

    const prompt = buildPricingPrompt({
      productName,
      currentPrice,
      competitorPrice,
      productPositioning,
      businessGoal,
    });

    const aiOutput = await generateText(prompt);

    const history = await History.create({
      agentType: "pricing-agent",
      userInput: {
        productName,
        currentPrice,
        competitorPrice,
        productPositioning,
        businessGoal,
      },
      aiOutput,
    });

    res.status(200).json({
      success: true,
      message: "Pricing strategy generated successfully",
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
  suggestPricingStrategy,
};
