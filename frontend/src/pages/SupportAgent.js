import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const SupportAgent = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = () => {
    setChat([...chat, { user: msg, bot: "" }]);

    setTimeout(() => {
      setChat(prev =>
        prev.map((c, i) =>
          i === prev.length - 1
            ? { ...c, bot: "AI: Issue is being resolved!" }
            : c
        )
      );
    }, 1000);

    setMsg("");
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>💬 Support Agent</h2>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={send}>Send</button>

        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p>{c.bot}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportAgent;