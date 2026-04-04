const History = require("../models/History");

const getHistory = async (req, res, next) => {
  try {
    const { agentType } = req.query;

    const filter = {};

    if (agentType) {
      filter.agentType = agentType;
    }

    const history = await History.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistory,
};
