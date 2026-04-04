import React from "react";

const AgentCard = ({ title, description, onClick }) => {
  return (
    <div onClick={onClick} className="agent-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default AgentCard;
