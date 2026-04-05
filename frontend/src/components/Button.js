import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  icon: Icon,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`button ${variant === "secondary" ? "button-secondary" : ""} ${className}`.trim()}
      {...props}
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
