import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import DifferentShapeSection from "./DifferentShapeSection";
import PacksSection from "./PacksSection";
import BentoSection from "./BentoSection";
import FaqScrollSection from "./FaqScrollSection";
import CtaFooterSection from "./CtaFooterSection";
import "./LandingPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ onOpenPlanner }) {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLaunchPlanner = (prompt) => {
    if (onOpenPlanner) {
      onOpenPlanner(prompt);
    }
  };

  /* ── 1. Lenis Luxury Smooth Scroll & GSAP Synchronization ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  /* ── 2. Trigger Smooth Entrance when Preloader Curtain Opens ── */
  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  /* ── 3. Mouse Parallax for Hero Floating UI ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = currentTarget.getBoundingClientRect();
      const xPct = (clientX / width - 0.5) * 14;
      const yPct = (clientY / height - 0.5) * 10;
      hero.style.setProperty("--mx", `${xPct}px`);
      hero.style.setProperty("--my", `${yPct}px`);
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  /* Smooth scroll helper */
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`lp-root ${isLoaded ? "lp-root--loaded" : ""}`}>
      {/* ── 3-Word Preloader (WELCOME -> TO -> TRAVIS.) ── */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* ── Top Notch Island Navbar ── */}
      <header className="lp-header-wrap">
        <nav className="lp-island-nav">
          <a href="#" className="lp-island-brand" onClick={(e) => scrollToSection(e, "hero")}>
            <span className="lp-island-dot" />
            <span className="lp-island-brand-name">Travis</span>
          </a>

          <ul className="lp-island-menu">
            <li>
              <a href="#product" className="lp-island-link" onClick={(e) => scrollToSection(e, "product")}>
                Products
                <svg width="8" height="5" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#industries" className="lp-island-link" onClick={(e) => scrollToSection(e, "industries")}>
                Resources
                <svg width="8" height="5" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#pricing" className="lp-island-link" onClick={(e) => scrollToSection(e, "pricing")}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#docs" className="lp-island-link" onClick={(e) => scrollToSection(e, "docs")}>
                FAQ
              </a>
            </li>
          </ul>

          <div className="lp-island-actions">
            <a href="#planner" className="lp-island-signin" onClick={(e) => { e.preventDefault(); handleLaunchPlanner(); }}>Sign in</a>
            <button className="lp-island-cta" onClick={() => handleLaunchPlanner()}>
              <span className="lp-island-cta-text">Try for free</span>
              <span className="lp-island-cta-arrow">↗</span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Hero Section ── */}
      <section className="lp-hero" id="hero" ref={heroRef}>
        <div
          className="lp-hero__bg-img"
          style={{ backgroundImage: `url('/hero_bg.png')` }}
          aria-hidden="true"
        />

        {/* BOTTOM LEFT FLOATING UI GRAPHICS */}
        <div className="lp-bottom-group lp-bottom-group--left">
          <div className="lp-ui-frame lp-ui-frame--bg-left">
            <img
              src="/hero_left_dashboard.jpg"
              alt="Automated Invoice Processing Dashboard"
              draggable="false"
            />
          </div>
          <div className="lp-ui-frame lp-ui-frame--fg-left">
            <img
              src="/hero_left_card.jpg"
              alt="Invoice Auto-Approval Micro Card"
              draggable="false"
            />
          </div>
        </div>

        {/* BOTTOM RIGHT FLOATING UI GRAPHICS */}
        <div className="lp-bottom-group lp-bottom-group--right">
          <div className="lp-ui-frame lp-ui-frame--bg-right">
            <img
              src="/hero_right_dashboard.jpg"
              alt="Ops Shift Scheduling Dashboard"
              draggable="false"
            />
          </div>
          <div className="lp-ui-frame lp-ui-frame--fg-right">
            <img
              src="/hero_right_card.jpg"
              alt="Auto Shift Dispatch Micro Card"
              draggable="false"
            />
          </div>
        </div>

        {/* HERO CENTER CONTENT */}
        <div className="lp-hero__content">
          <div className="lp-pill" onClick={() => handleLaunchPlanner()} style={{ cursor: "pointer" }}>
            <span>Now in Early Access — Try AI Planner</span>
            <span className="lp-pill__plus">✦</span>
          </div>

          <h1 className="lp-hero__headline">
            <span className="headline-line-1">The AI that</span>
            <span className="headline-line-2">
              runs the <span className="headline-serif-italic">work.</span>
            </span>
          </h1>

          <p className="lp-hero__subheading">
            Travis is the operating system for ops-heavy businesses and industries.
            It runs your workflows end to end — the ones your team actually depends on.
            Not a chat box for one person. <strong>One agent for your whole team.</strong>
          </p>

          <div className="lp-hero__cta-group">
            <button className="lp-btn-split" onClick={() => handleLaunchPlanner()}>
              <span className="lp-btn-split__text">Get Started</span>
              <span className="lp-btn-split__icon">↗</span>
            </button>
            <button className="lp-btn-hero-secondary" onClick={() => handleLaunchPlanner()}>
              See AI Planner
            </button>
          </div>

          <p className="lp-hero__trust-note">No credit card required · Free to try</p>
        </div>
      </section>

      {/* ── Section 1: "Travis is a different shape" ── */}
      <div id="product">
        <DifferentShapeSection />
      </div>

      {/* ── Section 2: "One Travis. Many packs." ── */}
      <div id="industries">
        <PacksSection />
      </div>

      {/* ── Section 3: Operational Trust & Guardrails (Bento Grid) ── */}
      <div id="pricing">
        <BentoSection />
      </div>

      {/* ── Section 4: Featured Questions Scroll ── */}
      <div id="docs">
        <FaqScrollSection />
      </div>

      {/* ── Section 5: CTA Waitlist Card & Footer ── */}
      <div id="contact">
        <CtaFooterSection onOpenPlanner={() => handleLaunchPlanner()} />
      </div>
    </div>
  );
}

