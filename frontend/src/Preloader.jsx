import { useEffect, useState } from "react";
import "./Preloader.css";

const WORDS = ["WELCOME", "TO", "TRAVIS."];

export default function Preloader({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Step through the 3 words sequentially
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < WORDS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(wordInterval);
          // Trigger curtain opening after last word
          setTimeout(() => {
            setIsOpening(true);
            // Complete callback to trigger hero entrance animation
            setTimeout(() => {
              setIsHidden(true);
              if (onComplete) onComplete();
            }, 700);
          }, 500);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(wordInterval);
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className={`preloader-overlay ${isOpening ? "preloader-overlay--opening" : ""}`}>
      {/* Background Dotted Texture */}
      <div className="preloader-bg-mesh" aria-hidden="true" />

      {/* 3-Word Sequential Typography Stage */}
      <div className="preloader-stage">
        <div key={wordIndex} className="preloader-word">
          {wordIndex === 2 ? (
            <span>
              TRAVIS<span className="preloader-dot">.</span>
            </span>
          ) : (
            WORDS[wordIndex]
          )}
        </div>
      </div>
    </div>
  );
}
