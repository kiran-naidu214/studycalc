import React, { useState, useEffect } from "react";
import { ActiveTab, ToolMetadata } from "./types";
import { TOOLS_METADATA } from "./data/tools";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Homepage } from "./components/Homepage";
import { CGPACalculator } from "./components/CGPACalculator";
import { AttendanceCalculator } from "./components/AttendanceCalculator";
import { PercentageCalculator } from "./components/PercentageCalculator";
import { SGPACalculator } from "./components/SGPACalculator";
import { GPACalculator } from "./components/GPACalculator";
import { UnitConverter } from "./components/UnitConverter";
import { ScientificCalculator } from "./components/ScientificCalculator";
import { MarksPercentageCalculator } from "./components/MarksPercentageCalculator";
import { LegalPages } from "./components/LegalPages";

// AdSense Placeholders
import { AdBannerTop, AdBannerMiddle, AdBannerBottom } from "./components/AdPlaceholder";

export default function App() {
  // Read hash from Window path for smart deep links sharing support!
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const hash = window.location.hash.replace("#", "") as ActiveTab;
    const allTabs: ActiveTab[] = [
      "home", "cgpa", "attendance", "engineering", "percentage",
      "gpa", "sgpa", "unit", "scientific", "marks",
      "about", "contact", "privacy", "terms", "disclaimer", "cookie"
    ];
    return allTabs.includes(hash) ? hash : "home";
  });

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sync hash back when popState occurs (for browser back buttons support!)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "") as ActiveTab;
      const allTabs: ActiveTab[] = [
        "home", "cgpa", "attendance", "engineering", "percentage",
        "gpa", "sgpa", "unit", "scientific", "marks",
        "about", "contact", "privacy", "terms", "disclaimer", "cookie"
      ];
      if (allTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // SEO Dynamically Injected Metadata and Structured JSON-LD Scheme
  useEffect(() => {
    const meta = TOOLS_METADATA[activeTab] || TOOLS_METADATA.home;
    document.title = meta.seoTitle;

    // 1. Update standard meta tags (description, keywords)
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", meta.seoDescription);

    let keyTag = document.querySelector('meta[name="keywords"]');
    if (!keyTag) {
      keyTag = document.createElement("meta");
      keyTag.setAttribute("name", "keywords");
      document.head.appendChild(keyTag);
    }
    keyTag.setAttribute("content", meta.keywords.join(", "));

    // OpenGraph support
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", meta.seoTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", meta.seoDescription);

    // 2. Clear previous schemas and inject dynamic structured JSON-LD data
    const oldSchema = document.getElementById("studycalc-jsonld-schema");
    if (oldSchema) oldSchema.remove();

    const schemaScript = document.createElement("script");
    schemaScript.id = "studycalc-jsonld-schema";
    schemaScript.type = "application/ld+json";

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "StudyCalc",
      "alternateName": meta.name,
      "url": window.location.href,
      "description": meta.seoDescription,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires HTML5, ES6 support",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "creator": {
        "@type": "Organization",
        "name": "StudyCalc Team",
        "url": "https://studycalc.in"
      }
    };

    schemaScript.text = JSON.stringify(baseSchema);
    document.head.appendChild(schemaScript);
  }, [activeTab]);

  // Render Component router mapping
  const renderTabContent = () => {
    switch (activeTab) {
      case "cgpa":
        return <CGPACalculator />;
      case "attendance":
        return <AttendanceCalculator />;
      case "percentage":
        return <PercentageCalculator />;
      case "sgpa":
        return <SGPACalculator />;
      case "gpa":
        return <GPACalculator />;
      case "unit":
        return <UnitConverter />;
      case "scientific":
        return <ScientificCalculator />;
      case "marks":
        return <MarksPercentageCalculator />;
      case "engineering":
        // Engineering calculator page binds Unit Converter directly
        return <UnitConverter />;
      case "about":
      case "contact":
      case "privacy":
      case "terms":
      case "disclaimer":
      case "cookie":
        return <LegalPages type={activeTab as any} />;
      case "home":
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sticky Top Header Layout */}
      <Header activeTab={activeTab} onNavigate={handleNavigate} />

      {/* CLS-proof AdSense Top slot placeholder - Below Hero / Header */}
      {activeTab !== "home" && <AdBannerTop />}

      {/* Main calculation sheet viewport */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      {/* CLS-proof AdSense Middle slot placeholder - Between tools elements */}
      {activeTab !== "home" && <AdBannerMiddle />}

      {/* CLS-proof AdSense Bottom slot placeholder - Above the footer */}
      <AdBannerBottom />

      {/* Dynamic footer index links */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
