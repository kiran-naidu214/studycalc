import React, { useState } from "react";
import { Sliders, Sparkles, HelpCircle, ArrowRightLeft, ArrowRight } from "lucide-react";

export const GPACalculator: React.FC = () => {
  const [cgpaVal, setCgpaVal] = useState<number | string>(8.5);
  const [gpa4Val, setGpa4Val] = useState<number | string>(3.4);

  // Convert CGPA 10.0 Point Scale to other metrics
  const cgpaNum = Number(cgpaVal) || 0;
  const jntuPercent = cgpaNum >= 0.75 ? parseFloat(((cgpaNum - 0.75) * 10).toFixed(2)) : 0;
  const aictePercent = parseFloat((cgpaNum * 9.5).toFixed(2));
  const directPercent = parseFloat((cgpaNum * 10).toFixed(2));
  const cgpaToGpa4 = parseFloat(((cgpaNum / 10) * 4).toFixed(2));

  // Convert GPA 4.0 Point Scale to other metrics
  const gpa4Num = Number(gpa4Val) || 0;
  const gpa4ToPercent = parseFloat(((gpa4Num / 4) * 100).toFixed(2));
  const gpa4ToCgpa10 = parseFloat(((gpa4Num / 4) * 10).toFixed(2));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <Sliders id="gpa-converter-icon" className="w-8 h-8 text-blue-600" />
          <span>GPA & CGPA converter</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Convert academic grades from 10.0 scale, 4.0 scale, and percentage parameters back and forth instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CGPA Convert Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="font-display font-bold text-slate-800 text-sm md:text-base">1. CGPA 10-Point Scale Conversion</h2>
          </div>

          <div>
            <label htmlFor="cgpa-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 font-sans">Input CGPA Value (10.0 max)</label>
            <input
              id="cgpa-input"
              type="number"
              value={cgpaVal}
              onChange={(e) => {
                const numVal = parseFloat(e.target.value);
                if (numVal >= 0 && numVal <= 10) {
                  setCgpaVal(e.target.value);
                } else if (e.target.value === "") {
                  setCgpaVal("");
                }
              }}
              step="0.01"
              max="10"
              min="0"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold text-slate-800"
              placeholder="e.g., 8.5"
            />
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
              <span className="font-sans text-slate-500 font-semibold">JNTU Percentage Standard</span>
              <span className="font-bold text-slate-800 text-sm">{jntuPercent}%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
              <span className="font-sans text-slate-500 font-semibold">AICTE Standard Grade</span>
              <span className="font-bold text-slate-800 text-sm">{aictePercent}%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
              <span className="font-sans text-slate-500 font-semibold">Standard 4.0 Scale equivalent</span>
              <span className="font-bold text-blue-600 text-sm">{cgpaToGpa4} / 4.0</span>
            </div>
          </div>
        </div>

        {/* GPA Convert Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <ArrowRightLeft className="w-4 h-4" />
            </span>
            <h2 className="font-display font-bold text-slate-800 text-sm md:text-base">2. GPA 4-Point Scale Conversion</h2>
          </div>

          <div>
            <label htmlFor="gpa4-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 font-sans">Input GPA Value (4.0 max)</label>
            <input
              id="gpa4-input"
              type="number"
              value={gpa4Val}
              onChange={(e) => {
                const numVal = parseFloat(e.target.value);
                if (numVal >= 0 && numVal <= 4) {
                  setGpa4Val(e.target.value);
                } else if (e.target.value === "") {
                  setGpa4Val("");
                }
              }}
              step="0.01"
              max="4"
              min="0"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold text-slate-800"
              placeholder="e.g., 3.4"
            />
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
              <span className="font-sans text-slate-500 font-semibold">Equivalent Percentage (%)</span>
              <span className="font-bold text-slate-800 text-sm">{gpa4ToPercent}%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
              <span className="font-sans text-slate-500 font-semibold">10-Point Scale Equivalent</span>
              <span className="font-bold text-blue-600 text-sm">{gpa4ToCgpa10} / 10.0</span>
            </div>
            <div className="p-3 bg-blue-50/20 text-slate-450 rounded-lg leading-normal font-sans text-[11px]">
              *Note: Standard conversion assumes direct proportion linear mapping equations. University guidelines can differ for admissions.
            </div>
          </div>
        </div>
      </div>

      {/* SEO content */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 mt-12 text-xs md:text-sm text-slate-600 space-y-4">
        <h2 className="font-display font-semibold text-slate-800 text-base">Grading scale conversions guidance</h2>
        <p className="leading-relaxed">
          Universities worldwide represent grades using discrete point structures. Colleges in the United States and Canada rely on a <strong>4.0 GPA scale</strong>, while standard universities across India use a 10-point cumulative CGPA scale. When applying for foreign admissions or employment roles, students often have to translate scales using specific formula guidelines.
        </p>
      </section>
    </div>
  );
};
export default GPACalculator;
