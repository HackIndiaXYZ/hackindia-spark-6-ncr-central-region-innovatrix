import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/product" },
    { name: "Support", path: "/support" },
    { name: "Review", path: "/review" },
    { name: "Marketing", path: "/marketing" },
    { name: "Pricing", path: "/pricing" },
    { name: "Title", path: "/title" },
  ];

  return (
    <div className="sidebar">
      <h3>AI Seller</h3>

      {menu.map((item) => (
        <p key={item.path} onClick={() => navigate(item.path)} className="sidebar-link">
          {item.name}
        </p>
      ))}
    </div>
  );
};

export default Sidebar;
