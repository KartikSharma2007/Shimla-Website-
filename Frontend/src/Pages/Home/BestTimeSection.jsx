import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import summer from "../../assets/ridge.webp";
import monsoon from "../../assets/monsoon.jpg";
import winter from "../../assets/winter.webp";
import "./BestTimeSection.css";

const seasons = [
  {
    id: "spring",
    emoji: "🌸",
    name: "Spring",
    months: "March – April",
    tagline: "Bloom & Bliss",
    temp: "10°C – 20°C",
    crowd: "Moderate",
    crowdLevel: "medium",
    budget: "₹₹",
    rainfall: "Light",
    rainfallPct: 20,
    image: summer,
    accent: "#e67e22",
    accentLight: "#fef3e2",
    accentBorder: "#f5cba7",
    description:
      "Shimla awakens in a riot of colour as rhododendrons and apple blossoms carpet the hillsides. The air is crisp and gentle, perfect for long walks through colonial lanes and forest trails.",
    tip: "Ideal for couples and nature lovers — fewer crowds than summer but all the beauty.",
    activities: [
      "Apple Orchard Walks",
      "Wildflower Photography",
      "Colonial Heritage Tour",
      "Sunset at Jakhu Hill",
      "Nature Trails",
    ],
  },
  {
    id: "summer",
    emoji: "☀️",
    name: "Summer",
    months: "May – June",
    tagline: "Peak & Play",
    temp: "15°C – 30°C",
    crowd: "High",
    crowdLevel: "high",
    budget: "₹₹₹",
    rainfall: "Low",
    rainfallPct: 15,
    image: summer,
    accent: "#2e7d32",
    accentLight: "#e8f5e9",
    accentBorder: "#c8e6c9",
    description:
      "The most beloved season draws families and honeymooners to Shimla's pleasant climate. The Mall Road buzzes with energy, adventure activities peak, and the toy train winds through emerald valleys.",
    tip: "Book accommodations 3–4 weeks ahead — this is Shimla's busiest season.",
    activities: [
      "Toy Train Ride",
      "Mall Road Strolls",
      "Kufri Adventure",
      "Himalayan Trekking",
      "Paragliding",
    ],
  },
  {
    id: "autumn",
    emoji: "🍁",
    name: "Autumn",
    months: "Sep – November",
    tagline: "Golden Calm",
    temp: "8°C – 22°C",
    crowd: "Low",
    crowdLevel: "low",
    budget: "₹",
    rainfall: "Minimal",
    rainfallPct: 10,
    image: monsoon,
    accent: "#b7410e",
    accentLight: "#fdf0ea",
    accentBorder: "#f5cba7",
    description:
      "One of Shimla's best-kept secrets — crisp golden air, discounted stays, and serene hillsides draped in amber and crimson. The skies are impossibly clear for Himalayan panoramas.",
    tip: "Best value season. Great panoramic views and very few tourists.",
    activities: [
      "Himalayan Panoramas",
      "Apple Picking",
      "Long Distance Treks",
      "Café Hopping",
      "Stargazing",
    ],
  },
  {
    id: "winter",
    emoji: "❄️",
    name: "Winter",
    months: "Dec – February",
    tagline: "Snow & Soul",
    temp: "-2°C – 10°C",
    crowd: "High",
    crowdLevel: "high",
    budget: "₹₹₹",
    rainfall: "Snow",
    rainfallPct: 70,
    image: winter,
    accent: "#5e35b1",
    accentLight: "#ede7f6",
    accentBorder: "#d1c4e9",
    description:
      "A winter fairy tale unfolds as snow blankets the deodar forests and Victorian rooftops. Christmas markets, ice skating on frozen lakes, and cozy fireplace retreats make this season utterly magical.",
    tip: "Pack heavy woolens and thermals. Snowfall transforms the entire town overnight.",
    activities: [
      "Skiing at Kufri",
      "Ice Skating",
      "Snowball Fights",
      "Christmas Markets",
      "Cozy Fireplace Retreats",
    ],
  },
];

const monthMap = [
  { m: "Jan", s: "winter" },
  { m: "Feb", s: "winter" },
  { m: "Mar", s: "spring" },
  { m: "Apr", s: "spring" },
  { m: "May", s: "summer" },
  { m: "Jun", s: "summer" },
  { m: "Jul", s: "autumn" },
  { m: "Aug", s: "autumn" },
  { m: "Sep", s: "autumn" },
  { m: "Oct", s: "winter" },
  { m: "Nov", s: "winter" },
  { m: "Dec", s: "winter" },
];

export default function BestTimeSection() {
  const [active, setActive] = useState(1); // default to Summer
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const season = seasons[active];

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset image loaded state on season change
  useEffect(() => {
    setImgLoaded(false);
  }, [active]);

  return (
    <section
      className={`bts-section ${visible ? "bts-visible" : ""}`}
      id="best-time"
      ref={sectionRef}
    >
      {/* ── Decorative background blobs ── */}
      <div className="bts-blob bts-blob-1" style={{ background: season.accent }} />
      <div className="bts-blob bts-blob-2" style={{ background: season.accent }} />

      <div className="bts-container">

        {/* ── Section Header ── */}
        <div className="bts-header">
          <span className="bts-eyebrow">Travel Planner</span>
          <h2 className="bts-title">
            Best Time to Visit<br />
            <span className="bts-title-shimla" style={{ color: season.accent }}>Shimla</span>
          </h2>
          <p className="bts-intro">
            Every season paints Shimla in a different mood — from snowy fairy tales to sun-drenched
            alpine meadows. Find your perfect window.
          </p>
        </div>

        {/* ── Season Tab Selector ── */}
        <div className="bts-tabs" role="tablist">
          {seasons.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === i}
              className={`bts-tab ${active === i ? "bts-tab-active" : ""}`}
              style={active === i ? {
                "--tab-accent": s.accent,
                "--tab-light": s.accentLight,
                "--tab-border": s.accentBorder,
              } : {}}
              onClick={() => setActive(i)}
            >
              <span className="bts-tab-emoji">{s.emoji}</span>
              <span className="bts-tab-name">{s.name}</span>
              <span className="bts-tab-months">{s.months}</span>
            </button>
          ))}
        </div>

        {/* ── Main Content Panel ── */}
        <div
          className="bts-panel"
          key={season.id}
          style={{ "--accent": season.accent, "--accent-light": season.accentLight, "--accent-border": season.accentBorder }}
        >
          {/* Left: Image */}
          <div className="bts-panel-image">
            <div className="bts-img-frame">
              <img
                src={season.image}
                alt={`Shimla in ${season.name}`}
                className={`bts-img ${imgLoaded ? "bts-img-loaded" : ""}`}
                onLoad={() => setImgLoaded(true)}
              />
              <div className="bts-img-overlay" />

              {/* Floating badge on image */}
              <div className="bts-img-badge">
                <span className="bts-badge-emoji">{season.emoji}</span>
                <div>
                  <div className="bts-badge-name">{season.name}</div>
                  <div className="bts-badge-months">{season.months}</div>
                </div>
              </div>

              {/* Stats strip on image */}
              <div className="bts-img-stats">
                <div className="bts-img-stat">
                  <span className="bts-stat-label">Temp</span>
                  <span className="bts-stat-val">{season.temp}</span>
                </div>
                <div className="bts-stat-divider" />
                <div className="bts-img-stat">
                  <span className="bts-stat-label">Crowd</span>
                  <span className={`bts-stat-val bts-crowd-${season.crowdLevel}`}>{season.crowd}</span>
                </div>
                <div className="bts-stat-divider" />
                <div className="bts-img-stat">
                  <span className="bts-stat-label">Budget</span>
                  <span className="bts-stat-val">{season.budget}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="bts-panel-content">
            <div className="bts-content-top">
              <div className="bts-season-icon" style={{ background: season.accentLight, color: season.accent }}>
                {season.emoji}
              </div>
              <div>
                <h3 className="bts-season-name" style={{ color: season.accent }}>{season.name}</h3>
                <span className="bts-tagline">{season.tagline}</span>
              </div>
            </div>

            <p className="bts-description">{season.description}</p>

            {/* Tip box */}
            <div className="bts-tip" style={{ background: season.accentLight, borderColor: season.accentBorder }}>
              <span className="bts-tip-label" style={{ color: season.accent }}>✦ Curator's Tip</span>
              <p className="bts-tip-text">{season.tip}</p>
            </div>

            {/* Activities */}
            <div className="bts-activities">
              <h4 className="bts-activities-title">Signature Experiences</h4>
              <div className="bts-activities-grid">
                {season.activities.map((act, i) => (
                  <div key={i} className="bts-activity-item">
                    <span className="bts-activity-dot" style={{ background: season.accent }} />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rainfall bar */}
            <div className="bts-climate">
              <div className="bts-climate-row">
                <span className="bts-climate-label">Precipitation</span>
                <div className="bts-climate-track">
                  <div
                    className="bts-climate-fill"
                    style={{ width: `${season.rainfallPct}%`, background: season.accent }}
                  />
                </div>
                <span className="bts-climate-val">{season.rainfall}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              className="bts-cta"
              style={{ background: season.accent }}
              onClick={() => navigate("/packagess")}
            >
              Plan Your {season.name} Journey →
            </button>
          </div>
        </div>

        {/* ── Month Timeline Bar ── */}
        <div className="bts-timeline">
          <span className="bts-timeline-label">Year at a Glance</span>
          <div className="bts-months">
            {monthMap.map((item, i) => {
              const si = seasons.findIndex((s) => s.id === item.s);
              const isActive = active === si;
              return (
                <button
                  key={i}
                  className={`bts-month ${isActive ? "bts-month-active" : ""}`}
                  style={isActive ? { "--m-accent": seasons[si].accent } : {}}
                  onClick={() => setActive(si)}
                  title={seasons[si].name}
                >
                  <span className="bts-month-name">{item.m}</span>
                  <span
                    className="bts-month-dot"
                    style={{ background: isActive ? seasons[si].accent : "#d1d5db" }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4-Card Quick Summary ── */}
        <div className="bts-cards">
          {seasons.map((s, i) => (
            <button
              key={s.id}
              className={`bts-card ${active === i ? "bts-card-active" : ""}`}
              style={{ "--c-accent": s.accent, "--c-light": s.accentLight, "--c-border": s.accentBorder }}
              onClick={() => setActive(i)}
            >
              <div className="bts-card-top">
                <span className="bts-card-emoji">{s.emoji}</span>
                <span className={`bts-card-crowd bts-crowd-${s.crowdLevel}`}>{s.crowd}</span>
              </div>
              <div className="bts-card-name">{s.name}</div>
              <div className="bts-card-months">{s.months}</div>
              <div className="bts-card-temp">{s.temp}</div>
              <div
                className="bts-card-bar"
                style={{ background: `${s.accent}22` }}
              >
                <div
                  className="bts-card-bar-fill"
                  style={{
                    width: active === i ? "100%" : "0%",
                    background: s.accent,
                  }}
                />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
