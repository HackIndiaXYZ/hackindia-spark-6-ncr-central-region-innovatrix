import React from "react";
import { motion } from "framer-motion";

const Loader = ({ label = "AI is generating your result...", compact = false }) => {
  if (compact) {
    return (
      <div className="inline-loader" aria-live="polite">
        <motion.span
          className="inline-loader-dot"
          animate={{ scale: [1, 1.35, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        <p>{label}</p>
      </div>
    );
  }

  return (
    <div className="loader-card" aria-live="polite">
      <div className="loader-spinner" />
      <div>
        <p className="loader-title">Crafting a polished response</p>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default Loader;
