import { useState } from "react";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = () => {
    setChat([...chat, { user: msg, bot: "AI reply to: " + msg }]);
    setMsg("");
  };

  return (
    <div style={container}>
      <h1>💬 Chatbot</h1>

      <div style={chatBox}>
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p><b>AI:</b> {c.bot}</p>
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message..."
        style={inputStyle}
      />

      <button onClick={send} style={btn}>Send</button>
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

const chatBox = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  height: "300px",
  overflowY: "auto",
  marginBottom: "20px"
};

const inputStyle = {
  padding: "10px",
  width: "250px",
  borderRadius: "10px",
  border: "none"
};

const btn = {
  padding: "10px 20px",
  marginLeft: "10px",
  background: "#6366f1",
  border: "none",
  borderRadius: "10px",
  color: "white"
};