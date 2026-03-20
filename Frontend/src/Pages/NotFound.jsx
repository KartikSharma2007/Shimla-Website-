/**
 * NotFound.jsx
 *
 * Fix #5 — 404 Page Not Found.
 * Shown whenever a user visits a URL that doesn't match any route in App.jsx.
 * The catch-all <Route path="*"> in App.jsx points here.
 *
 * Without this, users visiting a bad URL would see a completely blank white
 * screen with no explanation — making the website look broken.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf-page">
      <div className="nf-container">

        {/* Mountain illustration using CSS */}
        <div className="nf-illustration" aria-hidden="true">
          <div className="nf-mountain nf-mountain--back" />
          <div className="nf-mountain nf-mountain--front" />
          <div className="nf-cloud nf-cloud--1" />
          <div className="nf-cloud nf-cloud--2" />
        </div>

        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Looks Like You're Lost in the Mountains</h2>
        <p className="nf-message">
          The page you're looking for doesn't exist or may have been moved.
          Don't worry — Shimla has plenty of other beautiful paths to explore!
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary">
            🏠 Back to Home
          </Link>
          <button onClick={() => navigate(-1)} className="nf-btn nf-btn--secondary">
            ← Go Back
          </button>
          <Link to="/Hotel" className="nf-btn nf-btn--outline">
            🏨 Browse Hotels
          </Link>
          <Link to="/packages" className="nf-btn nf-btn--outline">
            🎒 View Packages
          </Link>
        </div>

      </div>
    </div>
  );
}
