import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FaqScrollSection.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_IMAGES = [
  { id: "01", src: "/Featured1.png", title: "How is Travis different from ChatGPT?" },
  { id: "02", src: "/Featured2.png", title: "Who is Travis for?" },
  { id: "03", src: "/Featured3.png", title: "What's a pack & how does data privacy work?" },
];

export default function FaqScrollSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300vh",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          if (p >= 0.66) {
            setActiveIndex(2);
          } else if (p >= 0.33) {
            setActiveIndex(1);
          } else {
            setActiveIndex(0);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq-scroll-section" ref={sectionRef}>
      {/* Background Mesh Grid */}
      <div className="faq-bg-mesh" aria-hidden="true" />

      <div className="faq-scroll-container">
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-kicker">
            <span className="faq-kicker__dot" />
            <span>FEATURED QUESTIONS</span>
          </div>

          <h2 className="faq-section-title">
            The Things People <span className="headline-serif-italic">actually ask</span> first.
          </h2>
          <p className="faq-section-subtitle">
            Scroll down to step through the questions.
          </p>
        </div>

        {/* ── Featured Poster Stage ── */}
        <div className="featured-stage">
          <div className="featured-image-wrapper">
            {FEATURED_IMAGES.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={item.id}
                  className={`featured-slide ${isActive ? "featured-slide--active" : ""}`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="featured-img"
                    draggable="false"
                  />
                </div>
              );
            })}
          </div>

          {/* Controls Pill Bar */}
          <div className="featured-controls">
            <div className="featured-pills">
              {FEATURED_IMAGES.map((item, idx) => (
                <button
                  key={item.id}
                  className={`featured-pill-btn ${
                    activeIndex === idx ? "featured-pill-btn--active" : ""
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span>0{idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="featured-scroll-hint">
              <span className="hint-arrow">↓</span>
              <span>
                {activeIndex < 2
                  ? `Scroll to reveal Q0${activeIndex + 2}`
                  : "Scroll down to continue"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
