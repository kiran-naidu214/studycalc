import React, { useState } from "react";
import { DollarSign, Percent, Sparkles, Hash, ArrowRight, HelpCircle, RefreshCw } from "lucide-react";

export const PercentageCalculator: React.FC = () => {
  // Simple Percentage: What is X% of Y?
  const [valX1, setValX1] = useState<number | string>(15);
  const [valY1, setValY1] = useState<number | string>(200);
  const [ans1, setAns1] = useState<number | null>(30);

  // Percentage shares: X is what percent of Y?
  const [valX2, setValX2] = useState<number | string>(45);
  const [valY2, setValY2] = useState<number | string>(150);
  const [ans2, setAns2] = useState<number | null>(30);

  // Percentage Increase/Decrease: From X to Y is what % change?
  const [valX3, setValX3] = useState<number | string>(80);
  const [valY3, setValY3] = useState<number | string>(120);
  const [ans3, setAns3] = useState<number | null>(50);

  const calculatePart1 = (x: number | string, y: number | string) => {
    const nx = Number(x);
    const ny = Number(y);
    if (!isNaN(nx) && !isNaN(ny) && ny !== 0) {
      setAns1(parseFloat(((nx / 100) * ny).toFixed(4)));
    } else {
      setAns1(null);
    }
  };

  const calculatePart2 = (x: number | string, y: number | string) => {
    const nx = Number(x);
    const ny = Number(y);
    if (!isNaN(nx) && !isNaN(ny) && ny !== 0) {
      setAns2(parseFloat(((nx / ny) * 100).toFixed(4)));
    } else {
      setAns2(null);
    }
  };

  const calculatePart3 = (x: number | string, y: number | string) => {
    const nx = Number(x);
    const ny = Number(y);
    if (!isNaN(nx) && !isNaN(ny) && nx !== 0) {
      const change = ny - nx;
      setAns3(parseFloat(((change / nx) * 100).toFixed(4)));
    } else {
      setAns3(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <Percent id="percent-calc-icon" className="w-8 h-8 text-blue-600" />
          <span>Advanced Percentage Calculator</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Solve dynamic marks ratios, percentage increases, and baseline fractional variables with mathematical precision.
        </p>
      </div>

      <div className="space-y-6">
        {/* Module 1 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="font-display font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold leading-none">1</span>
            <span>Calculate Simple Percentage Value (X% of Y)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label htmlFor="p1-x-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">What is (%)</label>
              <input
                id="p1-x-label"
                type="number"
                value={valX1}
                onChange={(e) => {
                  setValX1(e.target.value);
                  calculatePart1(e.target.value, valY1);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                placeholder="X"
              />
            </div>
            <div className="text-center font-semibold text-slate-400 text-sm hidden md:block">Of</div>
            <div>
              <label htmlFor="p1-y-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Total value</label>
              <input
                id="p1-y-label"
                type="number"
                value={valY1}
                onChange={(e) => {
                  setValY1(e.target.value);
                  calculatePart1(valX1, e.target.value);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                placeholder="Y"
              />
            </div>
            <div className="bg-blue-50/50 rounded-xl p-3 text-center border border-blue-100/50 self-end">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Calculated Value</span>
              <span className="font-mono text-base font-bold text-blue-600">
                {ans1 !== null ? ans1 : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="font-display font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold leading-none">2</span>
            <span>Calculate Share Ratio (X is what % of Y?)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label htmlFor="p2-x-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Value X</label>
              <input
                id="p2-x-label"
                type="number"
                value={valX2}
                onChange={(e) => {
                  setValX2(e.target.value);
                  calculatePart2(e.target.value, valY2);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                placeholder="X"
              />
            </div>
            <div className="text-center font-semibold text-slate-400 text-sm hidden md:block">Is what % of</div>
            <div>
              <label htmlFor="p2-y-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Value Y</label>
              <input
                id="p2-y-label"
                type="number"
                value={valY2}
                onChange={(e) => {
                  setValY2(e.target.value);
                  calculatePart2(valX2, e.target.value);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                placeholder="Y"
              />
            </div>
            <div className="bg-emerald-50/50 rounded-xl p-3 text-center border border-emerald-100/50 self-end">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Calculated Share</span>
              <span className="font-mono text-base font-bold text-emerald-600">
                {ans2 !== null ? `${ans2}%` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="font-display font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold leading-none">3</span>
            <span>Percentage Change Scenarios (From X to Y is what % change?)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label htmlFor="p3-x-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Initial Value (X)</label>
              <input
                id="p3-x-label"
                type="number"
                value={valX3}
                onChange={(e) => {
                  setValX3(e.target.value);
                  calculatePart3(e.target.value, valY3);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                placeholder="X"
              />
            </div>
            <div className="text-center font-semibold text-slate-400 text-sm hidden md:block">To</div>
            <div>
              <label htmlFor="p3-y-label" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Target Value (Y)</label>
              <input
                id="p3-y-label"
                type="number"
                value={valY3}
                onChange={(e) => {
                  setValY3(e.target.value);
                  calculatePart3(valX3, e.target.value);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                placeholder="Y"
              />
            </div>
            <div className="bg-slate-900 rounded-xl p-3 text-center self-end">
              <span className="text-[10px] text-slate-350 font-bold block uppercase tracking-wider">Calculated Change</span>
              <span className={`font-mono text-base font-bold ${ans3 !== null ? (ans3 >= 0 ? "text-emerald-400" : "text-rose-450") : "text-slate-300"}`}>
                {ans3 !== null ? (ans3 >= 0 ? `+${ans3}%` : `${ans3}%`) : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO copy text for Search engines */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 mt-12 text-xs md:text-sm text-slate-600 space-y-4">
        <h2 className="font-display font-semibold text-slate-800 text-base">How to Solve Percentage Ratio Calculations</h2>
        <p className="leading-relaxed">
          Percentage computations evaluate scaling parameters across academic, fiscal, and engineering datasets. In university exam tracking, determining relative percentage shifts lets you accurately monitor standard grade progress over multiple successive semester periods.
        </p>
        <p className="leading-relaxed">
          Our online percentage tool supports three versatile mathematical frameworks:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm pl-2">
          <li><strong>Simple Proportion (X% of Y):</strong> Ideal for isolating specific credit distribution weights. Formula: <code className="bg-white p-1 rounded font-mono">Value = (X / 100) * Y</code>.</li>
          <li><strong>Relative Ratio (X is what % of Y):</strong> Helpful in checking marks efficiency compared against absolute semester benchmarks. Formula: <code className="bg-white p-1 rounded font-mono">Percentage = (X / Y) * 100</code>.</li>
          <li><strong>Percentage Change:</strong> Determines marks progression velocity between ancient and modern scorecard updates. Formula: <code className="bg-white p-1 rounded font-mono">Change % = ((Y - X) / X) * 100</code>.</li>
        </ul>
      </section>
    </div>
  );
};
export default PercentageCalculator;
