const History = require("../models/History");
const { generateText } = require("../services/aiService");
const { buildTitlePrompt } = require("../utils/promptTemplates");

const optimizeTitle = async (req, res, next) => {
  try {
    const { productName, category, keywords, keyFeatures, tone } = req.body;

    if (!productName || !category || !keywords || !keyFeatures || !tone) {
      res.status(400);
      throw new Error(
        "productName, category, keywords, keyFeatures, and tone are required"
      );
    }

    const formattedKeywords = Array.isArray(keywords) ? keywords.join(", ") : keywords;
    const formattedKeyFeatures = Array.isArray(keyFeatures)
      ? keyFeatures.join(", ")
      : keyFeatures;

    const prompt = buildTitlePrompt({
      productName,
      category,
      keywords: formattedKeywords,
      keyFeatures: formattedKeyFeatures,
      tone,
    });

    const aiOutput = await generateText(prompt);

    const history = await History.create({
      agentType: "title-optimizer-agent",
      userInput: {
        productName,
        category,
        keywords,
        keyFeatures,
        tone,
      },
      aiOutput,
    });

    res.status(200).json({
      success: true,
      message: "Product titles generated successfully",
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
  optimizeTitle,
};
