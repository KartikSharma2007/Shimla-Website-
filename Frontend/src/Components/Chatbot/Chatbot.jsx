import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────
   Shimla Travels — Smart Chatbot
   • Desktop design preserved
   • Mobile fully redesigned: modern, touch-friendly
   ───────────────────────────────────────────────────── */

const API_BASE = "/api/support";

// Markdown-lite renderer (bold, line-breaks, emojis)
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <span key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <span /><span /><span />
    </div>
  );
}

function BotMessage({ msg, onOptionClick }) {
  return (
    <div className="message-row bot-row">
      <div className="bot-avatar">✈️</div>
      <div className="message-group">
        <div className="bubble bot-bubble">
          <p className="bubble-text">{msg.text}</p>
        </div>

        {msg.details && (
          <div className="details-card">
            <p className="details-text">{renderMarkdown(msg.details)}</p>
          </div>
        )}

        {msg.options && (
          <div className="options-list">
            {msg.options.map((opt) => (
              <button
                key={opt.id}
                className="option-btn"
                onClick={() => onOptionClick(opt.id, opt.label)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {msg.quickReplies && (
          <div className="quick-replies">
            {msg.quickReplies.map((qr) => (
              <button
                key={qr.id}
                className="quick-reply-chip"
                onClick={() => onOptionClick(qr.id, qr.label)}
              >
                {qr.icon && <span className="chip-icon">{qr.icon}</span>}
                {qr.label}
              </button>
            ))}
          </div>
        )}

        {msg.action?.type === "link" && (
          <a className="action-btn" href={msg.action.url}>
            {msg.action.buttonText}
          </a>
        )}

        {msg.action?.type === "contact" && (
          <div className="contact-actions">
            <a className="action-btn" href={`tel:${msg.action.phone}`}>📞 Call Now</a>
            <a className="action-btn secondary" href={`mailto:${msg.action.email}`}>📧 Email Us</a>
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ msg }) {
  return (
    <div className="message-row user-row">
      <div className="bubble user-bubble">
        <p className="bubble-text">{msg.text}</p>
      </div>
      <div className="user-avatar">👤</div>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
      if (!sessionId) initSession();
    }
  }, [isOpen]);

  async function initSession() {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/chat/init`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSessionId(data.data.sessionId);
        addBotMessage({
          text: data.data.message,
          quickReplies: data.data.quickReplies,
        });
      }
    } catch {
      addBotMessage({ text: "👋 Welcome! How can I help you today?", quickReplies: [] });
    } finally {
      setIsLoading(false);
    }
  }

  function addBotMessage(msg) {
    setMessages((prev) => [...prev, { id: Date.now(), type: "bot", ...msg }]);
    if (!isOpen) setUnreadCount((c) => c + 1);
  }

  async function sendMessage(text, quickReplyId = null) {
    if (!text.trim() && !quickReplyId) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text: text || quickReplyId },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text || null, quickReplyId }),
      });
      const data = await res.json();

      // Simulate thinking delay
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      setIsTyping(false);

      if (data.success) {
        addBotMessage({
          text: data.data.message,
          details: data.data.details,
          options: data.data.options,
          quickReplies: data.data.quickReplies,
          action: data.data.action,
        });
      }
    } catch {
      setIsTyping(false);
      addBotMessage({ text: "Sorry, something went wrong. Please try again." });
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      <style>{`
        /* ════════════════════════════════════════
           CHATBOT FAB BUTTON
        ════════════════════════════════════════ */
        .chat-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a6b4a 0%, #2d9d6e 100%);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(26,107,74,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 9999;
        }
        .chat-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(26,107,74,0.55); }
        .chat-fab:active { transform: scale(0.96); }

        .chat-fab-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #e74c3c;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          animation: pulse 1.5s ease infinite;
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        /* ════════════════════════════════════════
           CHAT WINDOW — SHARED
        ════════════════════════════════════════ */
        .chat-window {
          position: fixed;
          bottom: 96px;
          right: 24px;
          width: 380px;
          height: 580px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.18);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9998;
          animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, #1a6b4a 0%, #2d9d6e 100%);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .header-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .header-info { flex: 1; }
        .header-name { color: #fff; font-weight: 700; font-size: 15px; line-height: 1.2; }
        .header-status {
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,0.85);
          font-size: 12px;
          margin-top: 2px;
        }
        .status-dot {
          width: 7px;
          height: 7px;
          background: #a8f0c6;
          border-radius: 50%;
          animation: blink 2s ease infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .header-close {
          background: rgba(255,255,255,0.2);
          border: none;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .header-close:hover { background: rgba(255,255,255,0.35); }

        /* Messages area */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f4f6f9;
          scrollbar-width: thin;
          scrollbar-color: #c1c9d4 transparent;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: #c1c9d4; border-radius: 4px; }

        /* Message rows */
        .message-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
          max-width: 100%;
        }
        .bot-row { justify-content: flex-start; }
        .user-row { justify-content: flex-end; }

        .bot-avatar, .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          background: #e8f5ee;
        }
        .user-avatar { background: #e8eef8; }

        .message-group { display: flex; flex-direction: column; gap: 6px; max-width: calc(100% - 48px); }

        /* Bubbles */
        .bubble { padding: 10px 14px; border-radius: 16px; }
        .bot-bubble {
          background: #ffffff;
          border-radius: 4px 16px 16px 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .user-bubble {
          background: linear-gradient(135deg, #1a6b4a 0%, #2d9d6e 100%);
          border-radius: 16px 4px 16px 16px;
          align-self: flex-end;
        }
        .bubble-text { margin: 0; font-size: 14px; line-height: 1.5; color: #2c3e50; }
        .user-bubble .bubble-text { color: #fff; }

        /* Details card */
        .details-card {
          background: #fff;
          border-left: 3px solid #2d9d6e;
          border-radius: 4px 10px 10px 4px;
          padding: 10px 12px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
        }
        .details-text { margin: 0; font-size: 13px; line-height: 1.65; color: #3d4f60; }

        /* Options */
        .options-list { display: flex; flex-direction: column; gap: 6px; }
        .option-btn {
          background: #fff;
          border: 1.5px solid #c8dfd5;
          color: #1a6b4a;
          padding: 9px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          transition: all 0.18s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .option-btn:hover { background: #eef8f2; border-color: #2d9d6e; transform: translateX(2px); }
        .option-btn:active { transform: translateX(0) scale(0.99); }

        /* Quick reply chips */
        .quick-replies { display: flex; flex-wrap: wrap; gap: 6px; }
        .quick-reply-chip {
          background: #fff;
          border: 1.5px solid #c8dfd5;
          color: #1a6b4a;
          padding: 7px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.18s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .quick-reply-chip:hover { background: #eef8f2; border-color: #2d9d6e; }
        .chip-icon { font-size: 14px; }

        /* Action buttons */
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #1a6b4a, #2d9d6e);
          color: #fff;
          padding: 10px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: opacity 0.18s;
          box-shadow: 0 3px 10px rgba(26,107,74,0.3);
        }
        .action-btn:hover { opacity: 0.9; }
        .action-btn.secondary {
          background: #fff;
          color: #1a6b4a;
          border: 1.5px solid #1a6b4a;
          box-shadow: none;
        }
        .contact-actions { display: flex; gap: 8px; flex-wrap: wrap; }

        /* Typing indicator */
        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 12px 14px;
          background: #fff;
          border-radius: 4px 16px 16px 16px;
          width: fit-content;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .typing-indicator span {
          width: 7px;
          height: 7px;
          background: #2d9d6e;
          border-radius: 50%;
          animation: typing 1.2s ease infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing { 0%,80%,100%{transform:scale(1);opacity:0.5} 40%{transform:scale(1.3);opacity:1} }

        /* Input area */
        .chat-input-area {
          padding: 12px 14px;
          background: #fff;
          border-top: 1px solid #e8eef5;
          display: flex;
          gap: 8px;
          align-items: flex-end;
          flex-shrink: 0;
        }
        .chat-input {
          flex: 1;
          border: 1.5px solid #dde5ee;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 14px;
          resize: none;
          max-height: 100px;
          min-height: 42px;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
          line-height: 1.4;
          color: #2c3e50;
          background: #f8fafc;
        }
        .chat-input:focus { border-color: #2d9d6e; background: #fff; }
        .chat-input::placeholder { color: #9aabb8; }

        .send-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #1a6b4a, #2d9d6e);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 17px;
          transition: transform 0.15s, opacity 0.15s;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(26,107,74,0.3);
        }
        .send-btn:hover { transform: scale(1.06); }
        .send-btn:active { transform: scale(0.96); }
        .send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

        /* Loading state */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 12px;
          color: #7a9aaa;
        }
        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #e0ece8;
          border-top-color: #2d9d6e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ════════════════════════════════════════
           MOBILE OVERRIDES  (≤ 600px)
        ════════════════════════════════════════ */
        @media (max-width: 600px) {
          .chat-window {
            /* Full screen takeover on mobile */
            bottom: 0;
            right: 0;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
            box-shadow: none;
          }

          .chat-fab {
            bottom: 18px;
            right: 18px;
            width: 56px;
            height: 56px;
            font-size: 24px;
          }

          /* Larger, more touch-friendly header */
          .chat-header {
            padding: 14px 16px;
            padding-top: max(14px, env(safe-area-inset-top));
          }
          .header-avatar { width: 46px; height: 46px; font-size: 24px; }
          .header-name { font-size: 16px; }
          .header-status { font-size: 13px; }

          /* Messages: slightly bigger text & spacing */
          .chat-messages {
            padding: 14px 12px;
            padding-bottom: 10px;
          }
          .bubble-text { font-size: 15px; }
          .details-text { font-size: 14px; }

          /* Bigger touch targets for options/chips */
          .option-btn {
            padding: 12px 16px;
            font-size: 14px;
            border-radius: 12px;
          }
          .quick-reply-chip {
            padding: 9px 14px;
            font-size: 13px;
          }
          .action-btn { padding: 12px 18px; font-size: 14px; }

          /* Input area — bump up for safe area */
          .chat-input-area {
            padding: 10px 12px;
            padding-bottom: max(12px, env(safe-area-inset-bottom));
          }
          .chat-input {
            font-size: 16px; /* prevents iOS zoom */
            padding: 12px 14px;
          }
          .send-btn { width: 46px; height: 46px; font-size: 19px; border-radius: 13px; }
        }
      `}</style>

      {/* FAB Toggle Button */}
      <button
        className="chat-fab"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open support chat"
      >
        {isOpen ? "✕" : "💬"}
        {!isOpen && unreadCount > 0 && (
          <span className="chat-fab-badge">{unreadCount}</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window" role="dialog" aria-label="Shimla Travels Support Chat">
          {/* Header */}
          <div className="chat-header">
            <div className="header-avatar">✈️</div>
            <div className="header-info">
              <div className="header-name">Shimla Travels Support</div>
              <div className="header-status">
                <span className="status-dot" />
                Online · Usually replies instantly
              </div>
            </div>
            <button className="header-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages" role="log" aria-live="polite">
            {isLoading && (
              <div className="loading-state">
                <div className="loading-spinner" />
                <span>Connecting…</span>
              </div>
            )}

            {messages.map((msg) =>
              msg.type === "bot" ? (
                <BotMessage
                  key={msg.id}
                  msg={msg}
                  onOptionClick={(id, label) => sendMessage(label, id)}
                />
              ) : (
                <UserMessage key={msg.id} msg={msg} />
              )
            )}

            {isTyping && (
              <div className="message-row bot-row">
                <div className="bot-avatar">✈️</div>
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <textarea
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              rows={1}
              aria-label="Message input"
            />
            <button
              className="send-btn"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
