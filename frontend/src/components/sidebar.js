import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    { name: "🏠 Home", path: "/" },
    { name: "📝 Product", path: "/product" },
    { name: "💬 Support", path: "/support" },
    { name: "⭐ Review", path: "/review" },
    { name: "📢 Marketing", path: "/marketing" },
    { name: "🏷 Pricing", path: "/pricing" },
    { name: "📦 Title", path: "/title" },
  ];

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#020617",
      padding: "20px"
    }}>
      <h3>🚀 AI Seller</h3>

      {menu.map((item, i) => (
        <p key={i} onClick={() => navigate(item.path)} style={{ cursor: "pointer" }}>
          {item.name}
        </p>
      ))}
    </div>
  );
};

export default Sidebar;