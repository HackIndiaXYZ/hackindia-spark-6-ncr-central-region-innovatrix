import React from "react";
import { motion } from "framer-motion";
import { Clock3, Sparkles, Workflow } from "lucide-react";
import AppShell from "./AppShell";
import Loader from "./Loader";
import LoaderSkeleton from "./LoaderSkeleton";
import OutputPanel from "./OutputPanel";
import StatsCard from "./StatsCard";

const AgentLayout = ({
  title,
  subtitle,
  heroTitle,
  heroText,
  heroBadges = [],
  metrics = [],
  personality,
  children,
  loading,
  loadingLabel,
  error,
  success,
  result,
  outputTitle,
  onRegenerate,
  sideContent,
}) => {
  const defaultMetrics = [
    {
      label: "Tasks generated",
      value: "24+",
      detail: "Reusable prompts and outputs",
      icon: Sparkles,
    },
    {
      label: "Agents used",
      value: "6",
      detail: "Connected seller workflows",
      icon: Workflow,
    },
    {
      label: "Time saved",
      value: "3.2h",
      detail: "Average weekly drafting reduction",
      icon: Clock3,
    },
  ];

  const metricItems = metrics.length ? metrics : defaultMetrics;

  return (
    <AppShell
      title={title}
      subtitle={subtitle}
      actions={
        <div className="hero-banner compact-hero">
          <div>
            <p className="section-kicker">Agent workspace</p>
            <h2>{heroTitle}</h2>
            <p>{heroText}</p>
          </div>
          {heroBadges.length > 0 && (
            <div className="hero-badges">
              {heroBadges.map((badge) => (
                <span key={badge.label}>
                  <badge.icon size={14} />
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      }
    >
      <section className="stats-grid">
        {metricItems.map((item) => {
          return (
            <StatsCard
              key={item.label}
              label={item.label}
              value={item.value}
              detail={item.detail}
              icon={item.icon}
            />
          );
        })}
      </section>

      <section className="marketing-layout">
        <motion.div
          className="form-panel"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="section-header compact">
            <div>
              <p className="section-kicker">Brief builder</p>
              <h2>{title}</h2>
            </div>
          </div>

          {personality && (
            <div className="agent-personality">
              <Sparkles size={16} />
              <span>{personality}</span>
            </div>
          )}

          {children}

          {loading && (
            <div className="state-stack">
              <Loader label={loadingLabel} />
              <LoaderSkeleton />
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </motion.div>

        <motion.div
          className="insights-column"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          {sideContent}
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OutputPanel
                title={outputTitle}
                content={result}
                onRegenerate={onRegenerate}
              />
            </motion.div>
          ) : (
            <div className="empty-output">
              <Sparkles size={22} />
              <h3>Your generated result will appear here</h3>
              <p>
                Outputs are formatted into cleaner sections so the team can scan,
                edit, and reuse them quickly.
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </AppShell>
  );
};

export default AgentLayout;
