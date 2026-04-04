const History = require("../models/History");
const { generateText } = require("../services/aiService");
const { buildProductPrompt } = require("../utils/promptTemplates");

const generateProductDescription = async (req, res, next) => {
  try {
    const { productName, category, features, targetAudience, tone } = req.body;

    if (!productName || !category || !features || !targetAudience || !tone) {
      res.status(400);
      throw new Error(
        "productName, category, features, targetAudience, and tone are required"
      );
    }

    const prompt = buildProductPrompt({
      productName,
      category,
      features,
      targetAudience,
      tone,
    });

    const aiOutput = await generateText(prompt);

    const history = await History.create({
      agentType: "product-description-agent",
      userInput: {
        productName,
        category,
        features,
        targetAudience,
        tone,
      },
      aiOutput,
    });

    res.status(200).json({
      success: true,
      message: "Product description generated successfully",
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
  generateProductDescription,
};
