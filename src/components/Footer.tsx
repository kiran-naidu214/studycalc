import React from "react";
import { ActiveTab } from "../types";
import { Calculator, Github, Twitter, Linkedin, Heart, ExternalLink } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 py-12 px-6 select-none no-print">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-sm">
        {/* Brand Meta Block */}
        <div className="space-y-4">
          <button
            id="logo-brand-footer"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-slate-900 font-display font-extrabold text-xl tracking-tight focus:outline-none cursor-pointer"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
              <div className="w-3.5 h-3.5 border border-white rounded-sm"></div>
            </div>
            <span>Study<span className="text-blue-600">Calc</span></span>
          </button>
          <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
            High-performance browser academic calculations platform. Mapped to Indian universities regulations and B.Tech credit metrics.
          </p>

          {/* Social placeholder icons */}
          <div className="flex gap-3 text-slate-400 pt-2">
            <span className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer" title="Twitter Link">
              <Twitter className="w-4 h-4" />
            </span>
            <span className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer" title="LinkedIn Link">
              <Linkedin className="w-4 h-4" />
            </span>
            <span className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer" title="GitHub Source">
              <Github className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Calculation Tools Links */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-900">Active Tools</h4>
          <div className="grid grid-cols-1 gap-2 text-xs text-slate-500 font-medium">
            <button id="foot-nav-cgpa" onClick={() => onNavigate("cgpa")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">CGPA Calculator</button>
            <button id="foot-nav-attendance" onClick={() => onNavigate("attendance")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Attendance Predictor</button>
            <button id="foot-nav-scientific" onClick={() => onNavigate("scientific")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Scientific Calculator</button>
            <button id="foot-nav-marks" onClick={() => onNavigate("marks")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Marks Percentage Calculator</button>
          </div>
        </div>

        {/* Secondary utilities links */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-900">More Utils</h4>
          <div className="grid grid-cols-1 gap-2 text-xs text-slate-500 font-medium">
            <button id="foot-nav-sgpa" onClick={() => onNavigate("sgpa")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">SGPA Calculator</button>
            <button id="foot-nav-gpa" onClick={() => onNavigate("gpa")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">GPA Converter</button>
            <button id="foot-nav-unit" onClick={() => onNavigate("unit")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Unit Converter</button>
            <button id="foot-nav-percentage" onClick={() => onNavigate("percentage")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Percentage Calculator</button>
          </div>
        </div>

        {/* Legal links */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-900">Legal Policy</h4>
          <div className="grid grid-cols-1 gap-2 text-xs text-slate-500 font-medium">
            <button id="foot-nav-privacy" onClick={() => onNavigate("privacy")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Privacy Policy</button>
            <button id="foot-nav-terms" onClick={() => onNavigate("terms")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Terms &amp; Conditions</button>
            <button id="foot-nav-disclaimer" onClick={() => onNavigate("disclaimer")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Disclaimer</button>
            <button id="foot-nav-cookie" onClick={() => onNavigate("cookie")} className="text-left hover:text-blue-600 transition-colors cursor-pointer w-full">Cookie Policy</button>
          </div>
        </div>
      </div>

      {/* Copy info */}
      <div className="w-full max-w-7xl mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans select-none">
        <div>
          <span>© {new Date().getFullYear()} StudyCalc. Indian Academic Student Calculators.</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>securely for technical studies.</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
