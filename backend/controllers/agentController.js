const { getAllAgents } = require("../services/agentService");

const getAgents = (req, res) => {
  const agents = getAllAgents();

  res.status(200).json({
    success: true,
    count: agents.length,
    data: agents,
  });
};

module.exports = {
  getAgents,
};
