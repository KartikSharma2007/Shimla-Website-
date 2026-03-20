// src/Components/ContactChatButton.jsx
//
// A permanent fixed chat button shown ONLY on the Contact Us page.
// Has a pulse ring and a "Chat with us" label so it's very visible.
// Clicking it opens the SupportChatbot window.

import { useState } from 'react';
import SupportChatbot from './Supportchatbot';
import './ContactChatButton.css';

export default function ContactChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed button */}
      {!isOpen && (
        <div className="ccb-wrap">
          {/* Pulse rings */}
          <span className="ccb-ring ccb-ring-1" />
          <span className="ccb-ring ccb-ring-2" />

          <button
            className="ccb-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open support chat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>

            <span className="ccb-label">Chat with us</span>

            {/* Notification dot */}
            <span className="ccb-dot">1</span>
          </button>
        </div>
      )}

      {/* Chat window */}
      <SupportChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
