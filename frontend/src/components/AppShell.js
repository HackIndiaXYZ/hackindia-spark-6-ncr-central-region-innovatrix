import React from "react";
import { motion } from "framer-motion";
import { Bell, Search, Sparkles } from "lucide-react";
import Sidebar from "./sidebar";

const AppShell = ({ title, subtitle, actions, children }) => {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <header className="topbar">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>AI Agents Marketplace</span>
            </div>
            <h1>{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>

          <div className="topbar-actions">
            <label className="search-shell">
              <Search size={16} />
              <input type="text" placeholder="Search agents, prompts, history" />
            </label>
            <button type="button" className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {actions && <div className="page-actions">{actions}</div>}

        <div className="content-container">
          <motion.main
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="page-body"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
