import React from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import Button from "./Button";

const ActionButtons = ({
  onGenerate,
  onReset,
  loading,
  generateLabel = "Generate",
  resetLabel = "Reset",
  generateIcon = Sparkles,
}) => {
  return (
    <div className="form-actions">
      <Button icon={generateIcon} onClick={onGenerate} disabled={loading}>
        {loading ? "Generating..." : generateLabel}
      </Button>
      {onReset && (
        <Button variant="secondary" icon={RotateCcw} onClick={onReset}>
          {resetLabel}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
