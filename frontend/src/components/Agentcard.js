import React from "react";

const AgentCard = ({ title, onClick }) => {
  return (
    <div onClick={onClick} style={{
      background: "rgba(255,255,255,0.05)",
      padding: "25px",
      borderRadius: "15px",
      cursor: "pointer",
      transition: "0.3s"
    }}>
      <h3>{title}</h3>
    </div>
  );
};

export default AgentCard;