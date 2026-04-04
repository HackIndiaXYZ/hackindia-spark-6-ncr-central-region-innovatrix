import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import AgentCard from "../components/Agentcard";
import Loader from "../components/Loader";
import { fetchAgents, fetchHistory } from "../services/api";

const routeMap = {
  "product-description-agent": "/product",
  "customer-support-agent": "/support",
  "review-analyzer-agent": "/review",
  "marketing-agent": "/marketing",
  "pricing-agent": "/pricing",
  "title-optimizer-agent": "/title",
};

const Home = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [agentsResponse, historyResponse] = await Promise.all([
          fetchAgents(),
          fetchHistory(),
        ]);

        setAgents(agentsResponse.data);
        setHistory(historyResponse.data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>AI Dashboard</h1>
        <p className="page-subtitle">
          Discover seller-focused AI agents and run real backend-powered generation workflows from one place.
        </p>

        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}

        <div className="agent-grid">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              title={agent.name}
              description={agent.description}
              onClick={() => navigate(routeMap[agent.id] || "/")}
            />
          ))}
        </div>

        <section className="history-section">
          <h2>Recent Activity</h2>
          {history.length === 0 && !loading ? (
            <p className="empty-message">No history found yet. Generate something to see it here.</p>
          ) : (
            history.map((item) => (
              <div key={item._id} className="result-card">
                <p><b>Agent:</b> {item.agentType}</p>
                <p><b>Created:</b> {new Date(item.createdAt).toLocaleString()}</p>
                <p><b>Output Preview:</b> {item.aiOutput.slice(0, 160)}...</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
