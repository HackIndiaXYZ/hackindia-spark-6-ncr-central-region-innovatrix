import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeDollarSign,
  Clock3,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  ScanSearch,
  Sparkles,
  Tags,
  TrendingUp,
} from "lucide-react";
import AppShell from "../components/AppShell";
import AgentCard from "../components/Agentcard";
import Button from "../components/Button";
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

const iconMap = {
  "product-description-agent": LayoutDashboard,
  "customer-support-agent": MessageSquareText,
  "review-analyzer-agent": ScanSearch,
  "marketing-agent": Megaphone,
  "pricing-agent": BadgeDollarSign,
  "title-optimizer-agent": Tags,
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
        setHistory(historyResponse.data.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Live agents",
        value: agents.length || "06",
        detail: "Seller workflows ready to use",
        icon: Sparkles,
      },
      {
        label: "Tasks generated",
        value: history.length || "00",
        detail: "Recent outputs captured from backend history",
        icon: TrendingUp,
      },
      {
        label: "Avg response flow",
        value: "Fast",
        detail: "Designed for quick creation and iteration",
        icon: Clock3,
      },
    ],
    [agents.length, history.length]
  );

  const recommended = useMemo(() => agents.slice(0, 3), [agents]);

  return (
    <AppShell
      title="Seller Growth Dashboard"
      subtitle="A polished control center for running AI agents across catalog, support, pricing, and campaign workflows."
      actions={
        <div className="hero-banner">
          <div>
            <p className="section-kicker">Recommended workflow</p>
            <h2>Launch faster with connected AI specialists</h2>
            <p>
              Discover your top agents, review recent generations, and jump back
              into the work that matters without hunting through screens.
            </p>
          </div>
          <Button icon={Megaphone} onClick={() => navigate("/marketing")}>
            Open Marketing Agent
          </Button>
        </div>
      }
    >
      <section className="stats-grid">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="stat-card">
              <div className="stat-icon">
                <Icon size={20} />
              </div>
              <div>
                <p>{item.label}</p>
                <h3>{item.value}</h3>
                <span>{item.detail}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-main">
          <div className="section-header">
            <div>
              <p className="section-kicker">Popular agents</p>
              <h2>Choose an AI teammate</h2>
            </div>
            <span className="section-caption">Interactive cards with quick context</span>
          </div>

          {loading ? (
            <div className="skeleton-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-card" />
              ))}
            </div>
          ) : (
            <div className="agent-grid">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  title={agent.name}
                  description={agent.description}
                  icon={iconMap[agent.id] || Sparkles}
                  badge={agent.id === "marketing-agent" ? "Trending" : "Ready"}
                  meta="Open workspace"
                  onClick={() => navigate(routeMap[agent.id] || "/")}
                />
              ))}
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </div>

        <aside className="dashboard-side">
          <div className="panel-card">
            <div className="section-header compact">
              <div>
                <p className="section-kicker">Recent activity</p>
                <h2>Latest runs</h2>
              </div>
            </div>

            {loading ? (
              <Loader compact label="Loading recent activity..." />
            ) : history.length === 0 ? (
              <p className="empty-message">
                No history found yet. Generate your first output to start building momentum.
              </p>
            ) : (
              <div className="activity-list">
                {history.map((item) => (
                  <div key={item._id} className="activity-item">
                    <div className="activity-dot" />
                    <div>
                      <h3>{item.agentType}</h3>
                      <p>{item.aiOutput.slice(0, 120)}...</p>
                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel-card">
            <div className="section-header compact">
              <div>
                <p className="section-kicker">Recommended</p>
                <h2>Start here</h2>
              </div>
            </div>

            <div className="recommended-list">
              {recommended.map((agent) => {
                const Icon = iconMap[agent.id] || Sparkles;

                return (
                  <button
                    key={agent.id}
                    type="button"
                    className="recommended-item"
                    onClick={() => navigate(routeMap[agent.id] || "/")}
                  >
                    <div className="recommended-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3>{agent.name}</h3>
                      <p>{agent.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
};

export default Home;
