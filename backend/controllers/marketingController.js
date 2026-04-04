const History = require("../models/History");
const { generateText } = require("../services/aiService");
const { buildMarketingPrompt } = require("../utils/promptTemplates");

const generateMarketingContent = async (req, res, next) => {
  try {
    const { productName, targetAudience, campaignGoal, platform } = req.body;

    if (!productName || !targetAudience || !campaignGoal || !platform) {
      res.status(400);
      throw new Error(
        "productName, targetAudience, campaignGoal, and platform are required"
      );
    }

    const prompt = buildMarketingPrompt({
      productName,
      targetAudience,
      campaignGoal,
      platform,
    });

    const aiOutput = await generateText(prompt);

    const history = await History.create({
      agentType: "marketing-agent",
      userInput: {
        productName,
        targetAudience,
        campaignGoal,
        platform,
      },
      aiOutput,
    });

    res.status(200).json({
      success: true,
      message: "Marketing content generated successfully",
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
  generateMarketingContent,
};
