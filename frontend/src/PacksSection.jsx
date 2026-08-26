import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PacksSection.css";

gsap.registerPlugin(ScrollTrigger);

const PACKS = [
  {
    num: "01",
    title: "Education Services",
    badge: "LIVE",
    badgeType: "live",
    pinColor: "coral",
    desc: "Coaching, tutoring, and contracted-service companies serving school districts.",
    items: [
      "Multi-contract lifecycle",
      "District-specific billing cycles",
      "Coach and provider hour tracking",
      "IEP timeline awareness",
      "FERPA baseline & district portals",
    ],
    cta: "Explore Education Pack →",
  },
  {
    num: "02",
    title: "Legal Ops",
    badge: "ACTIVE",
    badgeType: "active",
    pinColor: "blue",
    desc: "Small law firms and boutique practices needing automated matter flow.",
    items: [
      "Client intake & conflict checks",
      "Matter and case tracking",
      "Billable-hour reconciliation",
      "Document generation from templates",
      "Automated compliance filings",
    ],
    cta: "Explore Legal Pack →",
  },
  {
    num: "03",
    title: "Healthcare Admin",
    badge: "HIPAA READY",
    badgeType: "ready",
    pinColor: "purple",
    desc: "Independent medical practices, therapy centers, and clinical facilities.",
    items: [
      "Insurance verification & claims",
      "Patient scheduling & reminders",
      "Referral pipeline management",
      "Medical records requests",
      "HIPAA compliant baseline",
    ],
    cta: "Explore Healthcare Pack →",
  },
  {
    num: "04",
    title: "Government Contracting",
    badge: "SECURE",
    badgeType: "secure",
    pinColor: "emerald",
    desc: "Boutique & mid-sized firms executing federal and state contracts.",
    items: [
      "Contract lifecycle management",
      "DCAA compliance filings",
      "Automated reporting cycles",
      "Audit-trail preservation",
      "Strict deadline & milestone monitor",
    ],
    cta: "Explore GovContract Pack →",
  },
];

export default function PacksSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const pathLength = path.getTotalLength();

      // Initialize path to be hidden
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate path drawing smoothly along scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 85%",
          scrub: 1.2,
        },
      });

      // Staggered reveal for cards as scroll passes them
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0.4,
            scale: 0.94,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 45%",
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="packs-section" ref={sectionRef}>
      {/* Background notebook faint lines */}
      <div className="packs-bg-ruled" aria-hidden="true" />

      <div className="packs-container">
        {/* ── Header ── */}
        <div className="packs-header">
          <div className="packs-kicker">
            <span className="packs-kicker__dot" />
            <span>VERTICAL OPS PACKS</span>
          </div>

          <h2 className="packs-title">
            One Travis. Many packs.<br />
            <span className="headline-serif-italic">Yours as deep as your work goes.</span>
          </h2>

          <p className="packs-subtitle">
            Every ops-heavy vertical has its own workflows, integrations, and compliance rules.
            Packs encode that depth so your team doesn't have to explain your domain to a chat box.
          </p>
        </div>

        {/* ── Flow Container with SVG Connecting Path & 4 Pinned Cards ── */}
        <div className="packs-flow-wrapper">
          {/* Connecting Curved Dotted Path SVG */}
          <svg
            className="packs-path-svg"
            viewBox="0 0 1000 1300"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Background static faint guide path */}
            <path
              d="M 280 140 C 600 200, 720 280, 720 440 C 720 600, 260 640, 260 800 C 260 960, 720 980, 720 1140"
              className="packs-path-track-faint"
            />
            {/* Active animated connecting line */}
            <path
              ref={pathRef}
              d="M 280 140 C 600 200, 720 280, 720 440 C 720 600, 260 640, 260 800 C 260 960, 720 980, 720 1140"
              className="packs-path-track-active"
            />
          </svg>

          {/* ── 4 Pinned Cards Layout (Zig-Zag) ── */}
          <div className="packs-cards-grid">
            {PACKS.map((pack, idx) => (
              <div
                key={pack.num}
                className={`pack-card-wrapper pack-card-wrapper--${idx + 1}`}
                ref={(el) => (cardRefs.current[idx] = el)}
              >
                {/* 3D Pushpin on top */}
                <div className={`pack-pushpin pack-pushpin--${pack.pinColor}`}>
                  <div className="pushpin-cap" />
                  <div className="pushpin-shaft" />
                  <div className="pushpin-shadow" />
                </div>

                {/* Tactile Paper Card */}
                <div className="pack-card">
                  {/* Card Header */}
                  <div className="pack-card__top">
                    <span className="pack-card__number">{pack.num}</span>
                    <span className={`pack-card__badge pack-card__badge--${pack.badgeType}`}>
                      {pack.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="pack-card__title">{pack.title}</h3>
                  <p className="pack-card__desc">{pack.desc}</p>

                  {/* Workflow items */}
                  <ul className="pack-card__list">
                    {pack.items.map((item, i) => (
                      <li key={i} className="pack-card__item">
                        <span className="pack-card__dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <a href="#contact" className="pack-card__cta">
                    {pack.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
