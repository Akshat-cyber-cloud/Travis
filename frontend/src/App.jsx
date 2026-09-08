import React, { useState } from "react";
import LandingPage from "./LandingPage";
import { TravisPlannerPage } from "./components/planner/TravisPlannerPage";

export default function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [initialPrompt, setInitialPrompt] = useState("");

  const handleOpenPlanner = (prompt) => {
    if (prompt) {
      setInitialPrompt(prompt);
    } else {
      setInitialPrompt("");
    }
    setCurrentView("planner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentView === "planner") {
    return (
      <TravisPlannerPage
        onBackToHome={handleBackToHome}
        initialPrompt={initialPrompt}
      />
    );
  }

  return <LandingPage onOpenPlanner={handleOpenPlanner} />;
}
