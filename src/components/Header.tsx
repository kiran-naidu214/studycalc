import React, { useState } from "react";
import { ActiveTab } from "../types";
import { Calculator, Menu, X, ChevronDown, GraduationCap, CalendarClock, Cpu, Settings, PhoneCall, HelpCircle } from "lucide-react";

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);

  // Link click handler
  const handleNav = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileOpen(false);
    setToolsDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm no-print">
      <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="logo-brand-header"
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 text-slate-900 font-display font-extrabold text-xl tracking-tight cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <span>Study<span className="text-blue-600">Calc</span></span>
        </button>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <button
            id="nav-link-home"
            onClick={() => handleNav("home")}
            className={`cursor-pointer transition-colors ${activeTab === "home" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
          >
            Home
          </button>
          <button
            id="nav-link-cgpa"
            onClick={() => handleNav("cgpa")}
            className={`cursor-pointer transition-colors ${activeTab === "cgpa" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
          >
            CGPA Calculator
          </button>
          <button
            id="nav-link-attendance"
            onClick={() => handleNav("attendance")}
            className={`cursor-pointer transition-colors ${activeTab === "attendance" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
          >
            Attendance
          </button>

          {/* Tools Expanded dropdown */}
          <div className="relative">
            <button
              id="nav-link-dropdown-trigger"
              onClick={() => setToolsDropdown(!toolsDropdown)}
              onMouseEnter={() => setToolsDropdown(true)}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600 focus:outline-none"
            >
              <span>More Tools</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {toolsDropdown && (
              <div
                onMouseLeave={() => setToolsDropdown(false)}
                className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xl space-y-1 block animate-slide-up"
              >
                <button
                  id="nav-drop-percentage"
                  onClick={() => handleNav("percentage")}
                  className="w-full text-left p-2 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 font-semibold text-xs text-slate-650"
                >
                  <Cpu className="w-4 h-4 text-slate-400" />
                  <span>Percentage Calculator</span>
                </button>
                <button
                  id="nav-drop-gpa"
                  onClick={() => handleNav("gpa")}
                  className="w-full text-left p-2 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 font-semibold text-xs text-slate-650"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>GPA Converter</span>
                </button>
                <button
                  id="nav-drop-sgpa"
                  onClick={() => handleNav("sgpa")}
                  className="w-full text-left p-2 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 font-semibold text-xs text-slate-650"
                >
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>SGPA Calculator</span>
                </button>
                <button
                  id="nav-drop-unit"
                  onClick={() => handleNav("unit")}
                  className="w-full text-left p-2 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 font-semibold text-xs text-slate-650"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Unit Converter</span>
                </button>
                <button
                  id="nav-drop-scientific"
                  onClick={() => handleNav("scientific")}
                  className="w-full text-left p-2 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 font-semibold text-xs text-slate-650"
                >
                  <Calculator className="w-4 h-4 text-slate-400" />
                  <span>Scientific Calculator</span>
                </button>
                <button
                  id="nav-drop-marks"
                  onClick={() => handleNav("marks")}
                  className="w-full text-left p-2 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 font-semibold text-xs text-slate-650"
                >
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>Marks Percentage</span>
                </button>
              </div>
            )}
          </div>

          <button
            id="nav-link-about"
            onClick={() => handleNav("about")}
            className={`cursor-pointer transition-colors ${activeTab === "about" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
          >
            About
          </button>
          <button
            id="nav-link-contact"
            onClick={() => handleNav("contact")}
            className={`cursor-pointer transition-colors ${activeTab === "contact" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
          >
            Contact
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            id="header-cta-calc"
            onClick={() => handleNav("cgpa")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full hover:shadow-lg hover:shadow-blue-600/15 transition-all cursor-pointer"
          >
            Calculate Now
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="btn-mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-650 hover:text-blue-500 cursor-pointer focus:outline-none"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer view */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-50 bg-white shadow-xl py-4 px-4 space-y-4 font-semibold text-slate-700 text-xs text-left animate-fade-in block absolute left-0 right-0 z-50">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <button
              id="mob-link-home"
              onClick={() => handleNav("home")}
              className={`p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors ${activeTab === "home" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              Home Hub
            </button>
            <button
              id="mob-link-cgpa"
              onClick={() => handleNav("cgpa")}
              className={`p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors ${activeTab === "cgpa" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              CGPA Scale
            </button>
            <button
              id="mob-link-attendance"
              onClick={() => handleNav("attendance")}
              className={`p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors ${activeTab === "attendance" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              Attendance
            </button>
            <button
              id="mob-link-scientific"
              onClick={() => handleNav("scientific")}
              className={`p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors ${activeTab === "scientific" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              Scientific
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-2">More Tools:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
              <button id="mob-drop-percentage" onClick={() => handleNav("percentage")} className="text-left py-2 hover:text-blue-600 hover:scale-101 transition-all">Percentage Calculator</button>
              <button id="mob-drop-gpa" onClick={() => handleNav("gpa")} className="text-left py-2 hover:text-blue-600 hover:scale-101 transition-all">GPA Converter</button>
              <button id="mob-drop-sgpa" onClick={() => handleNav("sgpa")} className="text-left py-2 hover:text-blue-600 hover:scale-101 transition-all">SGPA Calculator</button>
              <button id="mob-drop-unit" onClick={() => handleNav("unit")} className="text-left py-2 hover:text-blue-600 hover:scale-101 transition-all">Unit Converter</button>
              <button id="mob-drop-marks" onClick={() => handleNav("marks")} className="text-left py-2 hover:text-blue-600 hover:scale-101 transition-all">Marks Percentage</button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
            <button
              id="mob-link-about"
              onClick={() => handleNav("about")}
              className={`py-2 rounded bg-slate-50 hover:bg-slate-100 transition-colors ${activeTab === "about" ? "text-blue-600" : ""}`}
            >
              About
            </button>
            <button
              id="mob-link-contact"
              onClick={() => handleNav("contact")}
              className={`py-2 rounded bg-slate-50 hover:bg-slate-100 transition-colors ${activeTab === "contact" ? "text-blue-600" : ""}`}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
