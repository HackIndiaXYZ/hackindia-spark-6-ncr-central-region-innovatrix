import { useState } from "react";

export default function Review() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState("");

  const analyze = () => {
    setResult("⭐ AI Analysis: Review is positive for -> " + review);
  };

  return (
    <div style={container}>
      <h1>⭐ Review Analyzer</h1>

      <textarea
        placeholder="Enter customer review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={textarea}
      />

      <br />

      <button onClick={analyze} style={btn}>
        Analyze
      </button>

      <div style={outputBox}>
        {result || "Analysis result will appear here..."}
      </div>
    </div>
  );
}

const container = {
  background: "#0f172a",
  color: "white",
  minHeight: "100vh",
  padding: "40px",
  textAlign: "center"
};

const textarea = {
  width: "300px",
  height: "100px",
  borderRadius: "10px",
  padding: "10px"
};

const btn = {
  padding: "10px 20px",
  marginTop: "10px",
  background: "#06b6d4",
  border: "none",
  borderRadius: "10px",
  color: "white"
};

const outputBox = {
  marginTop: "20px",
  padding: "20px",
  background: "#1e293b",
  borderRadius: "10px"
};