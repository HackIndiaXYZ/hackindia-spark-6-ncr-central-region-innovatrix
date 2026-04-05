import React, { useMemo, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles } from "lucide-react";
import Button from "./Button";

const formatContent = (content) => {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const OutputPanel = ({ title, content, onRegenerate }) => {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => formatContent(content), [content]);

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
        <span>Structured for quick scanning so sellers can act on the response faster.</span>
      </div>

      <div className="output-content">
        {lines.map((line, index) => {
          const isBullet = line.startsWith("-") || line.startsWith("*");
          const isHeading = line.endsWith(":") && line.length < 80;

          if (isHeading) {
            return (
              <h4 key={`${line}-${index}`} className="output-heading">
                {line.replace(/:$/, "")}
              </h4>
            );
          }

          if (isBullet) {
            return (
              <div key={`${line}-${index}`} className="output-bullet">
                <span />
                <p>{line.replace(/^[-*]\s*/, "")}</p>
              </div>
            );
          }

          return (
            <p key={`${line}-${index}`} className="output-paragraph">
              {line}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default OutputPanel;
