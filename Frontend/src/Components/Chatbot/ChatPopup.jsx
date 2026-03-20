// src/Components/ChatPopup.jsx
//
// Occasional welcome pop-up for Home and Shimla pages.
// Rules:
//   • Appears after 7 seconds on page load
//   • Only shows ONCE per browser session (sessionStorage flag)
//   • 30% random chance to skip even within the same session reset
//     (so it feels "occasional" not robotic)
//   • Auto-dismisses after 12 seconds with a visible countdown bar
//   • Clicking the card → opens the chat window
//   • ✕ button → dismisses without opening
//
// Props:
//   message   (string)  — the bubble text to show
//   emoji     (string)  — emoji shown in the avatar circle
//   onOpen    (fn)      — called when user clicks to open chat
//   storageKey (string) — unique sessionStorage key per page

import { useState, useEffect, useRef } from 'react';
import './ChatPopup.css';

const DELAY_MS       = 1000;   // wait 7s before showing
const AUTODISMISS_MS = 12000;  // auto-dismiss after 12s
const SHOW_CHANCE    = 1.0;   // 65% chance to show on any given session visit

export default function ChatPopup({ message, emoji = '🏔️', onOpen, storageKey = 'chatPopupShown' }) {
  const [phase, setPhase]   = useState('hidden'); // hidden | entering | visible | exiting
  const autoDismissRef      = useRef(null);
  const progressRef         = useRef(null);

  useEffect(() => {
    // Already shown this session?
    if (sessionStorage.getItem(storageKey)) return;

    // Random chance — keeps it feeling "occasional"
    if (Math.random() > SHOW_CHANCE) {
      sessionStorage.setItem(storageKey, 'skipped');
      return;
    }

    const showTimer = setTimeout(() => {
      setPhase('entering');
      sessionStorage.setItem(storageKey, 'shown');

      // Start the auto-dismiss countdown bar animation
      if (progressRef.current) {
        progressRef.current.style.transition = `transform ${AUTODISMISS_MS}ms linear`;
        progressRef.current.style.transform  = 'scaleX(0)';
      }

      // Auto-dismiss
      autoDismissRef.current = setTimeout(() => dismiss(), AUTODISMISS_MS);
    }, DELAY_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoDismissRef.current);
    };
  }, [storageKey]);

  const dismiss = () => {
    clearTimeout(autoDismissRef.current);
    setPhase('exiting');
    setTimeout(() => setPhase('hidden'), 300); // match cp-pop-out duration
  };

  const handleOpen = () => {
    dismiss();
    setTimeout(() => onOpen(), 150); // slight delay so exit animates first
  };

  const handleClose = (e) => {
    e.stopPropagation();
    dismiss();
  };

  if (phase === 'hidden') return null;

  const cardClass = [
    'cp-card',
    phase === 'entering' ? 'cp-shake' : '',
    phase === 'exiting'  ? 'cp-exit'  : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="cp-wrap">
      <div className={cardClass} onClick={handleOpen} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleOpen()}
        aria-label="Open support chat"
      >
        {/* ✕ close */}
        <button className="cp-close" onClick={handleClose} aria-label="Dismiss">✕</button>

        <div className="cp-inner">
          {/* Avatar */}
          <div className="cp-avatar">{emoji}</div>

          {/* Text */}
          <div className="cp-text">
            <p className="cp-label">Shimla Travels Support</p>
            <p className="cp-message">{message}</p>
            <p className="cp-cta">
              Chat with us
              <span className="cp-cta-arrow">→</span>
            </p>
          </div>
        </div>

        {/* Countdown progress bar */}
        <div className="cp-progress">
          <div
            className="cp-progress-bar"
            ref={progressRef}
            style={{ transform: 'scaleX(1)' }}
          />
        </div>

        {/* Pointer tail */}
        <div className="cp-tail" />
      </div>
    </div>
  );
}
