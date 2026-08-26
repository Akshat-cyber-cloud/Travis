import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./DifferentShapeSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function DifferentShapeSection() {
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline linking scroll from Hero bottom into Section 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top 25%",
          scrub: 1.2,
        },
      });

      // Left card glides in from bottom-left hero corner into docked position
      tl.fromTo(
        leftCardRef.current,
        {
          x: -160,
          y: -180,
          rotation: -12,
          scale: 0.88,
          opacity: 0.85,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        },
        0
      );

      // Right card glides in from bottom-right hero corner into docked position
      tl.fromTo(
        rightCardRef.current,
        {
          x: 160,
          y: -180,
          rotation: 12,
          scale: 0.88,
          opacity: 0.85,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        },
        0
      );

      // Header fades in and settles smoothly as cards join
      tl.fromTo(
        headerRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        0.1
      );

      // Bullet points unveil smoothly as cards dock
      gsap.from(".shape-bullet", {
        opacity: 0,
        y: 12,
        stagger: 0.06,
        duration: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 45%",
        },
      });

      // Pipeline progress bars fill on dock
      gsap.from(".travis-pipeline-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="different-shape-section" ref={containerRef}>
      {/* Background subtle light ambient glow */}
      <div className="shape-bg-ambient" aria-hidden="true" />

      <div className="different-shape-container">
        {/* ── Section Header ── */}
        <div className="different-shape-header" ref={headerRef}>
          <div className="shape-kicker">
            <span className="shape-kicker__dot" />
            <span>EVERY AI APP LOOKS THE SAME BECAUSE THEY'RE ALL CHAT BOXES.</span>
          </div>

          <h2 className="shape-title">
            Travis is a <span className="headline-serif-italic">different shape.</span>
          </h2>

          <p className="shape-subtitle">
            A chat box is built for one person writing an email. Ops-heavy teams need
            something org-shaped and workflow-first.
          </p>
        </div>

        {/* ── Two Joining Cards on Scroll ── */}
        <div className="shape-cards-container">
          {/* 1. LEFT CARD: The Chat Box */}
          <div className="shape-card shape-card--chat" ref={leftCardRef}>
            <div className="shape-card__top">
              <span className="shape-card__tag">THE CHAT BOX</span>
              <h3 className="shape-card__heading">ChatGPT · Copilot · Gemini · Claude</h3>
            </div>

            {/* Chat Box Illustration */}
            <div className="shape-illustration shape-illustration--chat">
              <div className="chat-bubble-mock">
                <div className="chat-bubble-user">
                  <span className="chat-user-avatar">👤</span>
                  <span className="chat-user-text">Please rewrite this invoice summary email...</span>
                </div>
                <div className="chat-bubble-ai">
                  <div className="chat-ai-line chat-ai-line--1" />
                  <div className="chat-ai-line chat-ai-line--2" />
                </div>
              </div>
              <div className="chat-input-mock">
                <span className="chat-input-placeholder">Type your prompt...</span>
                <span className="chat-send-btn">↑</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="shape-list">
              <li className="shape-bullet shape-bullet--muted">
                <span className="shape-bullet__icon shape-bullet__icon--minus">−</span>
                <span>Built for one person writing an email</span>
              </li>
              <li className="shape-bullet shape-bullet--muted">
                <span className="shape-bullet__icon shape-bullet__icon--minus">−</span>
                <span>You break your workflow into prompts</span>
              </li>
              <li className="shape-bullet shape-bullet--muted">
                <span className="shape-bullet__icon shape-bullet__icon--minus">−</span>
                <span>Copy-paste between tools yourself</span>
              </li>
              <li className="shape-bullet shape-bullet--muted">
                <span className="shape-bullet__icon shape-bullet__icon--minus">−</span>
                <span>Retype context every session</span>
              </li>
              <li className="shape-bullet shape-bullet--muted">
                <span className="shape-bullet__icon shape-bullet__icon--minus">−</span>
                <span>Teams are a bolted-on feature</span>
              </li>
            </ul>
          </div>

          {/* 2. RIGHT CARD: The Operating System (Travis) */}
          <div className="shape-card shape-card--travis" ref={rightCardRef}>
            <div className="travis-card-ambient-glow" />
            <div className="shape-card__top">
              <div className="shape-card__tag-wrapper">
                <span className="shape-card__tag shape-card__tag--highlight">
                  THE OPERATING SYSTEM
                </span>
                <span className="travis-live-badge">
                  <span className="travis-live-dot" /> Org-Native
                </span>
              </div>
              <h3 className="shape-card__heading shape-card__heading--travis">
                Travis
              </h3>
            </div>

            {/* Travis Workflow Pipeline Illustration */}
            <div className="shape-illustration shape-illustration--travis">
              <div className="travis-pipeline-frame">
                {/* Pipeline Step 1 */}
                <div className="travis-pipe-row">
                  <div className="travis-pipe-dot travis-pipe-dot--done">✓</div>
                  <div className="travis-pipe-info">
                    <div className="travis-pipe-title">ERP Context & PO Match</div>
                    <div className="travis-pipeline-bar travis-pipeline-bar--1" />
                  </div>
                  <span className="travis-pipe-status">100% Synced</span>
                </div>

                {/* Pipeline Step 2 */}
                <div className="travis-pipe-row">
                  <div className="travis-pipe-dot travis-pipe-dot--active">
                    <span className="pipe-spinner" />
                  </div>
                  <div className="travis-pipe-info">
                    <div className="travis-pipe-title">Cross-Team Ops Execution</div>
                    <div className="travis-pipeline-bar travis-pipeline-bar--2" />
                  </div>
                  <span className="travis-pipe-status travis-pipe-status--live">Running</span>
                </div>

                {/* Pipeline Step 3 */}
                <div className="travis-pipe-row">
                  <div className="travis-pipe-dot travis-pipe-dot--auto">⚡</div>
                  <div className="travis-pipe-info">
                    <div className="travis-pipe-title">End-to-End Delivery & Audit</div>
                    <div className="travis-pipeline-bar travis-pipeline-bar--3" />
                  </div>
                  <span className="travis-pipe-status">Auto-Logged</span>
                </div>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="shape-list">
              <li className="shape-bullet shape-bullet--active">
                <span className="shape-bullet__icon shape-bullet__icon--check">✓</span>
                <span><strong>Built for your whole team</strong> running the actual work</span>
              </li>
              <li className="shape-bullet shape-bullet--active">
                <span className="shape-bullet__icon shape-bullet__icon--check">✓</span>
                <span>You describe a workflow, <strong>Travis runs it end to end</strong></span>
              </li>
              <li className="shape-bullet shape-bullet--active">
                <span className="shape-bullet__icon shape-bullet__icon--check">✓</span>
                <span>Reads context from the tools you already use</span>
              </li>
              <li className="shape-bullet shape-bullet--active">
                <span className="shape-bullet__icon shape-bullet__icon--check">✓</span>
                <span>Same workflows, memory, and permissions across your org</span>
              </li>
              <li className="shape-bullet shape-bullet--active">
                <span className="shape-bullet__icon shape-bullet__icon--check">✓</span>
                <span><strong>Org-native</strong> from the ground up</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
