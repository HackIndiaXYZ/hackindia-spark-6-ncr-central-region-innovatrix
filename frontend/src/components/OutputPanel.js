import React, { useMemo, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import Button from "./Button";
import OutputCard from "./OutputCard";

const normalizeLine = (line) => line.replace(/^[-*]\s*/, "").trim();

const formatContent = (content) => {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = [];
  let activeSection = {
    title: "Overview",
    variant: "default",
    items: [],
  };

  lines.forEach((line) => {
    const isBullet = line.startsWith("-") || line.startsWith("*");
    const isHeading = line.endsWith(":") && line.length < 80;

    if (isHeading) {
      if (activeSection.items.length > 0) {
        sections.push(activeSection);
      }

      activeSection = {
        title: line.replace(/:$/, ""),
        variant: "default",
        items: [],
      };
      return;
    }

    if (isBullet) {
      if (activeSection.variant !== "bullets" && activeSection.items.length > 0) {
        sections.push(activeSection);
        activeSection = {
          title: activeSection.title === "Overview" ? "Key Points" : activeSection.title,
          variant: "bullets",
          items: [],
        };
      }

      activeSection.variant = "bullets";
      activeSection.items.push(normalizeLine(line));
      return;
    }

    activeSection.items.push(line);
  });

  if (activeSection.items.length > 0) {
    sections.push(activeSection);
  }

  return sections.map((section, index) => ({
    ...section,
    variant:
      section.variant === "default" &&
      /(insight|takeaway|recommendation|next step)/i.test(section.title)
        ? "insight"
        : section.variant,
    id: `${section.title}-${index}`,
  }));
};

const OutputPanel = ({ title, content, onRegenerate }) => {
  const [copied, setCopied] = useState(false);
  const sections = useMemo(() => formatContent(content), [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <section className="output-panel">
      <div className="output-panel-header">
        <div>
          <p className="section-kicker">Generated output</p>
          <h3>{title}</h3>
        </div>

        <div className="output-actions">
          <Button
            variant="secondary"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
            title="Copy generated output"
          >
            {copied ? "Copied" : "Copy"}
          </Button>
          {onRegenerate && (
            <Button
              icon={RotateCcw}
              onClick={onRegenerate}
              title="Generate a fresh version"
            >
              Regenerate
            </Button>
          )}
        </div>
      </div>

      <div className="output-summary">
        <Sparkles size={16} />
        <span>
          Structured for quick scanning so sellers can act on the response faster.
          {copied ? " Copied to clipboard." : ""}
        </span>
      </div>

      <div className="output-content">
        {sections.map((section) => (
          <OutputCard
            key={section.id}
            title={section.title}
            items={section.items}
            variant={section.variant}
          />
        ))}
      </div>
    </section>
  );
};

export default OutputPanel;
