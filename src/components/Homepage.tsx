import React from "react";
import { GraduationCap, CalendarClock, Cpu, Percent, Sliders, FileSpreadsheet, ArrowRight, Shield, Award, Zap, ChevronRight, Clock, MapPin, Milestone, LayoutGrid, AlertCircle } from "lucide-react";
import { ActiveTab } from "../types";
import { motion } from "motion/react";

interface HomepageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  // Config list for featured student tools
  const featureTools = [
    {
      id: "cgpa" as ActiveTab,
      name: "CGPA Calculator (JNTU-focused)",
      shortDescription: "Calculate cumulative academic GPA on a 10.0 scale with real-time credit-weighted JNTU regulation mappings.",
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      cta: "Calculate CGPA",
      badge: "Must Popular",
    },
    {
      id: "attendance" as ActiveTab,
      name: "Attendance Predictor",
      shortDescription: "Solve exactly how many classes you must attend or can safely skip to keep above the mandatory 75% boundary.",
      icon: <CalendarClock className="w-5 h-5 text-emerald-600" />,
      cta: "Forecast Lectures",
      badge: "Strategic",
    },
    {
      id: "engineering" as ActiveTab,
      name: "Engineering Calculator Suite",
      shortDescription: "Access scientific terminal mathematics solvers and dimensional unit converters for labs and engineering courses.",
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      cta: "Open BTech Suite",
    },
    {
      id: "percentage" as ActiveTab,
      name: "Percentage Calculator",
      shortDescription: "Evaluate dynamic parts, aggregate mark sheets, proportion shares, and direct percentage changes instantly.",
      icon: <Percent className="w-5 h-5 text-amber-600" />,
      cta: "Solve Percents",
    },
    {
      id: "gpa" as ActiveTab,
      name: "GPA & CGPA Converter",
      shortDescription: "Translate cumulative scores from 10.0 scale, 4.0 scale, and percentage variables back and forth for admissions.",
      icon: <Sliders className="w-5 h-5 text-purple-600" />,
      cta: "Convert Scores",
    },
    {
      id: "sgpa" as ActiveTab,
      name: "SGPA Calculator",
      shortDescription: "Track standalone semester ratings inside printable course-level worksheets mapped to university grades.",
      icon: <FileSpreadsheet className="w-5 h-5 text-rose-600" />,
      cta: "Verify SGPA",
    },
  ];

  const futureConcepts = [
    { name: "Placement Predictor", icon: <Milestone className="w-4 h-4 text-slate-400" /> },
    { name: "Study Planner", icon: <Clock className="w-4 h-4 text-slate-400" /> },
    { name: "GPA Path Planner", icon: <Sliders className="w-4 h-4 text-slate-400" /> },
    { name: "Exam Final Countdown", icon: <CalendarClock className="w-4 h-4 text-slate-400" /> },
    { name: "Notes Section Sync", icon: <FileSpreadsheet className="w-4 h-4 text-slate-400" /> },
  ];

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero Section Container */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 md:py-24 shadow-sm">
        {/* Ambient subtle background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/20 rounded-full blur-3xl pointer-events-none select-none"></div>

        <div className="w-full max-w-7xl mx-auto px-4 text-center relative z-10 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full mb-1"
          >
            <span>#1 For JNTU Students</span>
          </motion.div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Calculate Your CGPA &amp; Attendance <span className="text-blue-600">Instantly.</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Fast, accurate, and free academic tools tailored for Indian engineering students. Built for the latest JNTU R18 &amp; R22 10-point grading system.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              id="cta-start-calculator"
              onClick={() => onNavigate("cgpa")}
              className="px-6 py-3 bg-slate-900 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer shadow-md shadow-slate-950/10"
            >
              Start Calculating
            </button>
            <button
              id="cta-explore-tools"
              onClick={() => {
                const doc = document.getElementById("featured-grid-anchor");
                if (doc) doc.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-600 text-xs md:text-sm font-bold rounded-xl hover:border-blue-300 transition-all cursor-pointer"
            >
              Explore Tools
            </button>
          </div>

          {/* Quick JNTU Reference Grid */}
          <div className="max-w-xl mx-auto pt-8">
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 text-left">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quick JNTU Scale Reference</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">R18 / R22 Scale</span>
              </div>
              <div className="grid grid-cols-6 gap-2 text-center">
                <div className="p-1.5 bg-white border border-slate-105 rounded-xl">
                  <div className="text-xs font-bold text-slate-900">O</div>
                  <div className="text-[9px] text-slate-400">10 Pts</div>
                </div>
                <div className="p-1.5 bg-white border border-slate-105 rounded-xl">
                  <div className="text-xs font-bold text-slate-900">A+</div>
                  <div className="text-[9px] text-slate-400">9 Pts</div>
                </div>
                <div className="p-1.5 bg-white border border-slate-105 rounded-xl">
                  <div className="text-xs font-bold text-slate-900">A</div>
                  <div className="text-[9px] text-slate-400">8 Pts</div>
                </div>
                <div className="p-1.5 bg-white border border-slate-105 rounded-xl">
                  <div className="text-xs font-bold text-slate-900">B+</div>
                  <div className="text-[9px] text-slate-400">7 Pts</div>
                </div>
                <div className="p-1.5 bg-white border border-slate-105 rounded-xl">
                  <div className="text-xs font-bold text-slate-900">B</div>
                  <div className="text-[9px] text-slate-400">6 Pts</div>
                </div>
                <div className="p-1.5 bg-white border border-slate-105 rounded-xl">
                  <div className="text-xs font-bold text-slate-900">C</div>
                  <div className="text-[9px] text-slate-400">5 Pts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section id="featured-grid-anchor" className="py-16 md:py-20 w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-2.5 py-0.5 bg-slate-200/50 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">Calculator Suite</div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Academic Performance Utility Kits
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-1 max-w-lg mx-auto">
            Avoid spreadsheet bottlenecks and manual conversion mistakes. Access optimized web tools crafted for Indian university students.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureTools.map((tool) => {
            const isBlue = tool.id === "cgpa";
            const isGreen = tool.id === "attendance";
            const isIndigo = tool.id === "engineering";
            const isAmber = tool.id === "percentage";
            const isPurple = tool.id === "gpa";
            const isRose = tool.id === "sgpa";
            
            let badgeColor = "bg-blue-50 text-blue-700";
            let iconBgColor = "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white";
            let ctaTextColor = "text-blue-600";
            
            if (isGreen) {
              badgeColor = "bg-emerald-50 text-emerald-700";
              iconBgColor = "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white";
              ctaTextColor = "text-emerald-600";
            } else if (isIndigo) {
              badgeColor = "bg-indigo-50 text-indigo-700";
              iconBgColor = "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white";
              ctaTextColor = "text-indigo-600";
            } else if (isAmber) {
              badgeColor = "bg-amber-50 text-amber-700";
              iconBgColor = "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white";
              ctaTextColor = "text-amber-600";
            } else if (isPurple) {
              badgeColor = "bg-purple-50 text-purple-700";
              iconBgColor = "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white";
              ctaTextColor = "text-purple-600";
            } else if (isRose) {
              badgeColor = "bg-rose-50 text-rose-700";
              iconBgColor = "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white";
              ctaTextColor = "text-rose-600";
            }

            return (
              <div
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-600/5 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors text-xl ${iconBgColor}`}>
                      {tool.icon}
                    </div>
                    {tool.badge && (
                      <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeColor}`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-display font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors text-base leading-tight">
                      {tool.name}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-5 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                  <span className={ctaTextColor}>Open Tool &rarr;</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & compliance factors */}
      <section className="bg-white border-y border-slate-200 py-16 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4.5 h-4.5 text-blue-600" />
              <span>JNTU Standard Compliance</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mapped strictly to Jawaharlal Nehru Technological University (JNTUH, JNTUK, JNTUA) and AICTE conversion rules. We keep percentage equations verified in accordance with regional notifications.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="w-4.5 h-4.5 text-blue-600" />
              <span>Secure Client Calculations</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We compile your BTech credit scorecards completely inside the browser using standard client storage APIs. No private course marks are logged onto external clouds.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-4.5 h-4.5 text-blue-600" />
              <span>Pristine Web Performance</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Engineered using modern modular components with optimal DOM footprint size. Pristine light-speed rendering ensures immediate load times on poor campus networks.
            </p>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="py-16 w-full max-w-7xl mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
          {/* subtle decoration */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-50/30 rounded-full blur-2xl pointer-events-none select-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="space-y-3 lg:col-span-1">
              <span className="text-[10px] bg-slate-150 text-slate-600 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                StudyCalc Modules
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight leading-tight">
                An extensible architecture ready for future modules
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                StudyCalc's core layout framework supports dynamic expansion, allowing quick student utilities to be deployed with robust consistency.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
              {futureConcepts.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl p-4 flex flex-col justify-between h-[100px] transition-colors"
                >
                  <div className="p-1.5 bg-white border border-slate-200 rounded-lg w-fit text-slate-400">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-bold text-slate-800">{item.name}</span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Coming Soon</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Homepage;
