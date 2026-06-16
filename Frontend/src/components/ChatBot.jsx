import { useState, useRef, useEffect } from "react";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `You are an AI assistant for roy's portfolio website.
roy is a full-stack developer with 3 years of experience specializing in React, Node.js, and PostgreSQL.
Her notable projects include: a real-time chat app, an e-commerce platform, and a data dashboard.
She is currently open to full-time roles. Her email is roy@example.com.
Answer questions about her skills, experience, and projects in a friendly and concise tone.
Keep responses short and to the point — 2-3 sentences max unless more detail is truly needed.
he is in a relationship, he as a 2 siblings which the younger sibling is mica and the older one is justine, 
he likes to play video games, watch anime, and listen to music in his free time. he has a 5 dogs`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm here to help you learn more about roy. Ask me anything! 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    historyRef.current = [
      ...historyRef.current,
      { role: "user", content: userMessage },
    ];

    try {
      const result = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...historyRef.current,
        ],
        max_tokens: 300,
      });

      const response = result.choices[0].message.content;

      historyRef.current = [
        ...historyRef.current,
        { role: "assistant", content: response },
      ];

      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Oops, something went wrong. Please try again in a moment!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .chatbot-wrapper * {
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .chat-window {
          animation: slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .fab {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .fab:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(59,130,246,0.5) !important;
        }

        .send-btn:hover:not(:disabled) {
          background: var(--accent-hover) !important;
        }
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .chat-input:focus {
          border-color: var(--accent-color) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }

        .message-bubble {
          animation: popIn 0.18s ease;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }

        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 99px; }

        .typing-indicator span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-soft);
          animation: bounce 1.2s infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>

      <div className="chatbot-wrapper" style={styles.wrapper}>
        {isOpen && (
          <div className="chat-window" style={styles.chatWindow}>
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <div style={styles.avatar}>R</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>roy's Assistant</div>
                  <div style={{ fontSize: "11px", opacity: 0.8, display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
            </div>

            {/* Messages */}
            <div className="messages-area" style={styles.messages}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="message-bubble"
                  style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
                >
                  <div style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    fontSize: "13.5px",
                    lineHeight: "1.55",
                    whiteSpace: "pre-wrap",
                    backgroundColor: msg.role === "user" ? "var(--accent-color)" : "var(--surface-bg-alt)",
                    color: msg.role === "user" ? "var(--accent-text)" : "var(--text-color)",
                    boxShadow: msg.role === "user"
                      ? "0 2px 8px rgba(59,130,246,0.25)"
                      : "0 1px 4px rgba(0,0,0,0.06)",
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "18px 18px 18px 4px",
                    backgroundColor: "var(--surface-bg-alt)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}>
                    <div className="typing-indicator" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={styles.inputArea}>
              <input
                ref={inputRef}
                className="chat-input"
                style={styles.input}
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                className="send-btn"
                onClick={sendMessage}
                style={styles.sendBtn}
                disabled={loading || !input.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* FAB */}
        <button className="fab" onClick={() => setIsOpen((prev) => !prev)} style={styles.fab}>
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "12px",
  },
  chatWindow: {
    width: "320px",
    height: "400px",
    backgroundColor: "var(--surface-bg)",
    borderRadius: "20px",
    boxShadow: "var(--shadow-color)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid var(--border-color)",
  },
  header: {
    background: "linear-gradient(135deg, var(--accent-color), var(--accent-hover))",
    color: "var(--accent-text)",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "15px",
    border: "2px solid rgba(255,255,255,0.4)",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    color: "var(--accent-text)",
    cursor: "pointer",
    fontSize: "13px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  messages: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "var(--page-bg)",
  },
  inputArea: {
    display: "flex",
    padding: "12px",
    borderTop: "1px solid var(--border-color)",
    gap: "8px",
    background: "var(--surface-bg)",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1.5px solid var(--border-color)",
    fontSize: "13.5px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "var(--surface-bg-alt)",
    color: "var(--text-color)",
  },
  sendBtn: {
    padding: "0",
    width: "38px",
    height: "38px",
    backgroundColor: "var(--accent-color)",
    color: "var(--accent-text)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
    flexShrink: 0,
  },
  fab: {
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--accent-color), var(--accent-hover))",
    color: "var(--accent-text)",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(59,130,246,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};