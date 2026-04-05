import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeDollarSign,
  Bot,
  ChevronLeft,
  Home,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  ScanSearch,
  Sparkles,
  Tags,
} from "lucide-react";

const menu = [
  { name: "Home", path: "/", icon: Home, exact: true },
  { name: "Product", path: "/product", icon: LayoutDashboard },
  { name: "Support", path: "/support", icon: MessageSquareText },
  { name: "Review", path: "/review", icon: ScanSearch },
  { name: "Marketing", path: "/marketing", icon: Megaphone },
  { name: "Pricing", path: "/pricing", icon: BadgeDollarSign },
  { name: "Title", path: "/title", icon: Tags },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      className={`sidebar-shell ${collapsed ? "collapsed" : ""}`}
      animate={{ width: collapsed ? 92 : 280 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
    >
      <div className="sidebar-header">
        <div className="brand-mark">
          <Bot size={20} />
        </div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="brand-copy"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="brand-copy"
            >
              <p>Innovatrix AI</p>
              <span>Seller growth OS</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          className="icon-button sidebar-toggle"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }}>
            <ChevronLeft size={18} />
          </motion.span>
        </button>
      </div>

      <div className="sidebar-section">
        {!collapsed && <p className="sidebar-label">Workspace</p>}

        <nav className="sidebar-nav">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                title={collapsed ? item.name : ""}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-promo">
        <Sparkles size={18} />
        {!collapsed && (
          <div>
            <p>Daily boost</p>
            <span>Use Marketing Agent to launch your next campaign faster.</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
