/**
 * SkeletonCard.jsx
 *
 * Fix #18 — Reusable skeleton loading placeholder.
 * Shows animated grey boxes in the shape of a card while data is loading.
 * Use this anywhere you display hotel or package cards.
 *
 * Usage:
 *   import { HotelSkeletonGrid, PackageSkeletonGrid } from '../Common/SkeletonCard';
 *   {isLoading && <HotelSkeletonGrid count={6} />}
 */

import React from 'react';
import './SkeletonCard.css';

// ── Single skeleton card ────────────────────────────────────────────────────

export function SkeletonCard({ type = 'hotel' }) {
  return (
    <div className={`skeleton-card skeleton-card--${type}`} aria-hidden="true">
      {/* Image placeholder */}
      <div className="skeleton-image skeleton-shimmer" />

      <div className="skeleton-body">
        {/* Title line */}
        <div className="skeleton-line skeleton-line--title skeleton-shimmer" />

        {/* Subtitle / location */}
        <div className="skeleton-line skeleton-line--sub skeleton-shimmer" />

        {/* Two short detail lines (rating, amenities) */}
        <div className="skeleton-row">
          <div className="skeleton-line skeleton-line--short skeleton-shimmer" />
          <div className="skeleton-line skeleton-line--short skeleton-shimmer" />
        </div>

        {/* Price + button row */}
        <div className="skeleton-footer">
          <div className="skeleton-line skeleton-line--price skeleton-shimmer" />
          <div className="skeleton-btn skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

// ── Grid of skeleton hotel cards ────────────────────────────────────────────

export function HotelSkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} type="hotel" />
      ))}
    </div>
  );
}

// ── Grid of skeleton package cards ──────────────────────────────────────────

export function PackageSkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} type="package" />
      ))}
    </div>
  );
}

// ── Generic error state ──────────────────────────────────────────────────────

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="skeleton-error-state">
      <div className="skeleton-error-icon">⚠</div>
      <p className="skeleton-error-message">{message}</p>
      {onRetry && (
        <button className="skeleton-retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────

export function EmptyState({ message = 'No results found.', hint }) {
  return (
    <div className="skeleton-empty-state">
      <div className="skeleton-empty-icon">🔍</div>
      <p className="skeleton-empty-message">{message}</p>
      {hint && <p className="skeleton-empty-hint">{hint}</p>}
    </div>
  );
}
