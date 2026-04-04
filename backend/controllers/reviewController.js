const History = require("../models/History");
const { generateText } = require("../services/aiService");
const { buildReviewAnalysisPrompt } = require("../utils/promptTemplates");

const analyzeReviews = async (req, res, next) => {
  try {
    const { productName, reviews } = req.body;

    if (!productName || !reviews) {
      res.status(400);
      throw new Error("productName and reviews are required");
    }

    const formattedReviews = Array.isArray(reviews) ? reviews.join(" | ") : reviews;

    const prompt = buildReviewAnalysisPrompt({
      productName,
      reviews: formattedReviews,
    });

    const aiOutput = await generateText(prompt);

    const history = await History.create({
      agentType: "review-analyzer-agent",
      userInput: {
        productName,
        reviews,
      },
      aiOutput,
    });

    res.status(200).json({
      success: true,
      message: "Review analysis generated successfully",
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
  analyzeReviews,
};
