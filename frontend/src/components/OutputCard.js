import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, ListTree, Sparkles } from "lucide-react";

const getSectionIcon = (variant) => {
  if (variant === "bullets") {
    return ListTree;
  }

  if (variant === "insight") {
    return Lightbulb;
  }

  return Sparkles;
};

const OutputCard = ({ title, items = [], variant = "default" }) => {
  const Icon = getSectionIcon(variant);

  return (
    <motion.section
      className={`output-card output-card-${variant}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="output-card-header">
        <div className="output-card-icon">
          <Icon size={16} />
        </div>
        <div>
          <p className="output-card-label">OUTPUT</p>
          <h4>{title}</h4>
        </div>
      </div>

      <div className="output-card-body">
        {items.map((item, index) =>
          variant === "bullets" ? (
            <div key={`${item}-${index}`} className="output-card-bullet">
              <span />
              <p>{item}</p>
            </div>
          ) : (
            <p key={`${item}-${index}`} className="output-card-text">
              {item}
            </p>
          )
        )}
      </div>
    </motion.section>
  );
};

export default OutputCard;
