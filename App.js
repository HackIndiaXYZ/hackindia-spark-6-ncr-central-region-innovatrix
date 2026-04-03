import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Product from "./pages/Product";
import Chatbot from "./pages/Chatbot";
import Review from "./pages/Review";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={mainContainer}>
      
      {/* Header */}
      <h1 style={title}>🚀 AI E-commerce Assistant</h1>
      <p style={subtitle}>Automate your business with smart AI tools</p>

      {/* Cards */}
      <div style={cardContainer}>

        <div 
        style={card} 
        onClick={() => navigate("/product")}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
>
          <h2>🛍️</h2>
          <h3>Product Generator</h3>
          <p>Create SEO-friendly product descriptions instantly</p>
        </div>

        <div 
        style={card} 
        onClick={() => navigate("/chatbot")}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
>
          <h2>💬</h2>
          <h3>Chatbot</h3>
          <p>Handle customer queries automatically</p>
        </div>

        <div 
        style={card} 
        onClick={() => navigate("/review")}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
>
          <h2>⭐</h2>
          <h3>Review Analyzer</h3>
          <p>Analyze customer feedback smartly</p>
        </div>

      </div>

      {/* Footer */}
      <p style={footer}>Built with ❤️ using AI</p>

    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

// 🎨 STYLES

const mainContainer = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #1e293b, #020617)",
  color: "white",
  padding: "50px",
  textAlign: "center",
  fontFamily: "Segoe UI"
};

const title = {
  fontSize: "42px",
  marginBottom: "10px"
};

const subtitle = {
  fontSize: "18px",
  marginBottom: "40px",
  color: "#cbd5f5"
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap"
};

const card = {
  width: "250px",
  padding: "25px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  cursor: "pointer",
  transition: "transform 0.3s ease"
};

card[':hover'] = {
  transform: "scale(1.05)"
};

const footer = {
  marginTop: "50px",
  fontSize: "14px",
  color: "#94a3b8"
};

export default App;