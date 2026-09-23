// Import React hooks (state, lifecycle, DOM reference)
import { useState, useEffect, useRef } from "react";

// Import Axios (used for frontend ↔ backend communication)
import axios from "axios";

// Import styles
import "./App.css";

function App() {

  // 🧠 STATE: stores full conversation (chat history)
  const [messages, setMessages] = useState([]);

  // 🧠 STATE: current user input
  const [text, setText] = useState("");

  // 🧠 STATE: loading indicator (AI thinking)
  const [loading, setLoading] = useState(false);

  // 🧠 STATE: typing animation (latest AI response)
  const [typingText, setTypingText] = useState("");

  // 📌 Reference for auto-scroll
  const chatRef = useRef(null);


  // 🌙 FUNCTION: SEND MESSAGE
  const handleSubmit = async () => {

    // Prevent sending empty message
    if (!text.trim()) return;

    // Create user message object
    const userMessage = {
      type: "user",
      content: text
    };

    // Add user message to chat history
    setMessages((prev) => [...prev, userMessage]);

    // Reset input and set loading
    setText("");
    setLoading(true);
    setTypingText("");

    try {
      // Send message to backend API
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/ai`, {
        text,
      });

      // Full AI response
      const fullReply = res.data.reply;

      // Add empty AI message (for typing effect)
      setMessages((prev) => [...prev, { type: "ai", content: "" }]);

      let i = 0;

      // ✨ TYPEWRITER EFFECT
      const interval = setInterval(() => {
        i++;

        // Update typing text
        setTypingText(fullReply.substring(0, i));

        // Update last message dynamically
        setMessages((prev) => {
          const updated = [...prev];

          // Modify last message (AI message)
          updated[updated.length - 1].content =
            fullReply.substring(0, i);

          return updated;
        });

        // Stop when complete
        if (i >= fullReply.length) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 20);

    } catch (err) {

      // Error fallback response
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: "The moon is quiet tonight... 🌙" }
      ]);

      setLoading(false);
    }
  };


  // 🔽 AUTO-SCROLL (always show latest message)
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages]);


  // 🎨 UI
  return (
    <div className="app">

      {/* 🌈 Background */}
      <div className="gradient-bg"></div>

      {/* 🌙 Header */}
      <div className="header">
        <h2>Luna</h2>

        {/* Animated orb (reacts when loading) */}
        <div className={`orb ${loading ? "thinking" : ""}`}></div>
      </div>

      {/* 💬 Chat Area */}
      <div className="chat-container" ref={chatRef}>

        {/* Loop through all messages */}
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.type}`}>
            {msg.content}
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="chat-bubble ai">...</div>
        )}

      </div>

      {/* ✍️ Input Section */}
      <div className="input-container">

        {/* Input field */}
        <input
          type="text"
          placeholder="Whisper to the moon..."
          value={text}

          // Update state while typing
          onChange={(e) => setText(e.target.value)}

          // Send on Enter key
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />

        {/* Send button */}
        <button onClick={handleSubmit}>🌙</button>

      </div>

    </div>
  );
}

// Export component
export default App;