import React from "react";
import Sidebar from "../components/Sidebar";
import AgentCard from "../components/AgentCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>🚀 AI Dashboard</h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}>
          <AgentCard title="📝 Product Agent" onClick={() => navigate("/product")} />
          <AgentCard title="💬 Support Agent" onClick={() => navigate("/support")} />
          <AgentCard title="⭐ Review Agent" onClick={() => navigate("/review")} />
          <AgentCard title="📢 Marketing Agent" onClick={() => navigate("/marketing")} />
          <AgentCard title="🏷️ Pricing Agent" onClick={() => navigate("/pricing")} />
          <AgentCard title="📦 Title Optimizer" onClick={() => navigate("/title")} />
        </div>
      </div>
    </div>
  );
};

export default Home;