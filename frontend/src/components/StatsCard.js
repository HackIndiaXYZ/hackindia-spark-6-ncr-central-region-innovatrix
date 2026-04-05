import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ label, value, detail, icon: Icon }) => {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-icon">
        <Icon size={20} />
      </div>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
        <span>{detail}</span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
