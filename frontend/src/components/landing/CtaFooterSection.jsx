import { useState } from "react";
import "./CtaFooterSection.css";

export default function CtaFooterSection({ onOpenPlanner }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      if (onOpenPlanner) {
        onOpenPlanner();
      }
    }
  };

  return (
    <footer className="cta-footer-wrap">
      {/* ── CTA WAITLIST CARD SECTION ── */}
      <section className="cta-section">
        <div className="cta-split-bg-top" />
        <div className="cta-split-bg-bottom" />

        <div className="cta-card-container">
          <div className="cta-card">
            {/* Ambient Blurred Background Glow */}
            <div className="cta-ambient-blur" aria-hidden="true" />

            <div className="cta-card-content">
              <h2 className="cta-title">
                Start running your work<br />with <span className="headline-serif-italic">Travis today</span>
              </h2>

              <form className="cta-form" onSubmit={handleSubmit}>
                <div className="cta-input-pill">
                  <span className="cta-mail-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitted}
                    className="cta-input"
                  />
                  <button type="submit" className="cta-submit-btn">
                    {submitted ? "You're on the list ✓" : "Join Waitlist →"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIANT WATERMARK FOOTER (Circular SaaS Style) ── */}
      <section className="footer-bar-section">
        <div className="footer-container">
          {/* Top Row: Copyright & Nav Links */}
          <div className="footer-top-row">
            <div className="footer-copyright">
              © 2026 Travis, Inc. All rights reserved.
            </div>

            <div className="footer-links">
              <a href="#terms" className="footer-link">Terms</a>
              <a href="#privacy" className="footer-link">Privacy</a>
              <a href="#cookies" className="footer-link">Cookies</a>
              <a href="#docs" className="footer-link">Docs</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
