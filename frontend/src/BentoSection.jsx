import { useState } from "react";
import "./BentoSection.css";

export default function BentoSection() {
  const [authorized, setAuthorized] = useState(false);

  return (
    <section className="bento-section">
      <div className="bento-container">
        {/* ── Section Header ── */}
        <div className="bento-header">
          <div className="bento-kicker">
            <span className="bento-kicker__dot" />
            <span>OPERATIONAL TRUST & GUARDRAILS</span>
          </div>

          <h2 className="bento-title">
            Built for work where<br />
            <span className="headline-serif-italic">accuracy is non-negotiable.</span>
          </h2>

          <p className="bento-subtitle">
            Most AI tools hallucinate and guess. Travis enforces hard organizational guardrails,
            source attribution, and human authorization before touching mission-critical systems.
          </p>
        </div>

        {/* ── 4-Card Bento Grid ── */}
        <div className="bento-grid">
          {/* 1. TALL LEFT CARD (Vibrant Lime Card with Phone Mockup) */}
          <div className="bento-card bento-card--tall-accent">
            <div className="bento-card__text">
              <h3 className="bento-card__heading bento-card__heading--dark">
                Zero Fabrication.<br />Guaranteed Grounding.
              </h3>
              <p className="bento-card__desc bento-card__desc--dark">
                Travis will not fabricate an identifier, a clause, a reference, or a record it doesn't
                have access to. Names its sources on every artifact — no unattributed claims.
              </p>
            </div>

            {/* Phone Mockup with Relevant Travis Theme Content */}
            <div className="bento-phone-frame">
              <div className="bento-phone-screen">
                {/* Dynamic Island Notch */}
                <div className="bento-phone-notch">
                  <span className="notch-camera" />
                  <span className="notch-sensor" />
                </div>

                {/* Phone Content */}
                <div className="bento-phone-content">
                  <div className="phone-verified-header">
                    <span className="phone-badge-mark">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="phone-verified-label">Travis Grounding Engine</span>
                    <span className="phone-time-stamp">Live</span>
                  </div>

                  <div className="phone-artifact-box">
                    <div className="phone-artifact-title">ERP & Shift Match #TRV-9042</div>
                    <p className="phone-artifact-text">
                      "Extracted 12 operator slots from ShiftPlanner. Matched against SAP PO #9402 line item $42,850. Zero unverified claims."
                    </p>
                    <div className="phone-source-pills">
                      <span className="source-pill">[SAP S/4HANA]</span>
                      <span className="source-pill">[ShiftPlanner v2]</span>
                      <span className="source-pill">[Audit Trail #891]</span>
                    </div>
                  </div>

                  <div className="phone-provenance-status">
                    <span className="provenance-dot" />
                    <span>100% Grounded · Zero Hallucination</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. TOP RIGHT WIDE CARD (Human Authorization Gate) */}
          <div className="bento-card bento-card--top-right">
            <div className="bento-radar-glow" aria-hidden="true" />

            <div className="bento-card__text">
              <span className="bento-micro-badge">IRREVERSIBLE ACTION GATE</span>
              <h3 className="bento-card__heading">
                Human-in-the-Loop Safeguards
              </h3>
              <p className="bento-card__desc">
                Travis asks before touching anything irreversible — sending contracts, submitting filings,
                or executing payments.
              </p>
            </div>

            {/* Interactive Action Authorization Gate */}
            <div className="bento-gate-widget">
              <div className="gate-header">
                {/* Modern Crisp Lock SVG Icon */}
                <span className="gate-svg-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <div>
                  <div className="gate-action-title">Wire Transfer & Invoice Release</div>
                  <div className="gate-action-meta">$42,850.00 · Acme Logistics Inc</div>
                </div>
                <span className={`gate-status-pill ${authorized ? "gate-status-pill--approved" : ""}`}>
                  {authorized ? "Authorized ✓" : "Pending Sign-off"}
                </span>
              </div>

              <div className="gate-action-row">
                <div className="gate-rules">
                  <span>• General Ledger: Code 6021</span>
                  <span>• Threshold Rule: Passed</span>
                </div>
                <button
                  className={`gate-auth-btn ${authorized ? "gate-auth-btn--done" : ""}`}
                  onClick={() => setAuthorized(!authorized)}
                >
                  {authorized ? "Payment Dispatched ⚡" : "Authorize Action →"}
                </button>
              </div>
            </div>
          </div>

          {/* 3. BOTTOM MIDDLE CARD (Privacy & Zero Training) */}
          <div className="bento-card bento-card--bottom-mid">
            <div className="bento-card__text">
              <span className="bento-micro-badge">DATA PRIVACY</span>
              <h3 className="bento-card__heading">Zero Data Training</h3>
              <p className="bento-card__desc">
                Your org's data is never used to train models. Not ours. Not the underlying providers'.
              </p>
            </div>

            <div className="bento-privacy-pill-list">
              <div className="privacy-pill-item">
                {/* Shield SVG Icon */}
                <span className="privacy-svg-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <span>Zero Model Retention</span>
              </div>

              <div className="privacy-pill-item">
                {/* Keyhole / Permission SVG Icon */}
                <span className="privacy-svg-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                  </svg>
                </span>
                <span>Revocable User RBAC</span>
              </div>
            </div>
          </div>

          {/* 4. BOTTOM RIGHT CARD (Pack-Level Compliance & Audits) */}
          <div className="bento-card bento-card--bottom-right">
            <div className="bento-card__text">
              <span className="bento-micro-badge">HARD ENFORCEMENT</span>
              <h3 className="bento-card__heading">
                Pack-Level Compliance & Audits
              </h3>
              <p className="bento-card__desc">
                FERPA, HIPAA, and DCAA compliance settings are enforced at the pack level,
                producing an immutable audit trail on every run.
              </p>
            </div>

            {/* Compliance Badges Matrix */}
            <div className="bento-compliance-matrix">
              <div className="comp-badge-item">
                <span className="comp-dot" />
                <span className="comp-name">HIPAA Baseline</span>
                <span className="comp-state">Enforced</span>
              </div>
              <div className="comp-badge-item">
                <span className="comp-dot" />
                <span className="comp-name">FERPA Protocol</span>
                <span className="comp-state">Enforced</span>
              </div>
              <div className="comp-badge-item">
                <span className="comp-dot" />
                <span className="comp-name">Full Audit Trail</span>
                <span className="comp-state">Exportable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
