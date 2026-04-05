import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AgentCard = ({
  title,
  description,
  icon: Icon,
  badge,
  meta,
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      className="agent-card"
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="agent-card-top">
        <div className="agent-icon">{Icon && <Icon size={20} />}</div>
        {badge && <span className="agent-badge">{badge}</span>}
      </div>

      <div className="agent-card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="agent-card-footer">
        <span>{meta}</span>
        <ArrowRight size={18} />
      </div>
    </motion.button>
  );
};

export default AgentCard;
