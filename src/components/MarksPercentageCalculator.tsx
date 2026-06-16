import React, { useState } from "react";
import { CheckSquare, Sparkles, RefreshCw, Printer } from "lucide-react";

export const MarksPercentageCalculator: React.FC = () => {
  const [maxMarks, setMaxMarks] = useState<number | string>(600);
  const [scoredMarks, setScoredMarks] = useState<number | string>(485);

  const maxNum = Number(maxMarks) || 0;
  const scoredNum = Number(scoredMarks) || 0;

  let percentage = 0;
  if (maxNum > 0) {
    percentage = parseFloat(((scoredNum / maxNum) * 100).toFixed(2));
  }

  // Determine Class / Division standard
  const getDivisionFeedback = () => {
    if (percentage >= 75) return { text: "First Class with Distinction", color: "text-emerald-700 bg-emerald-50 border-emerald-100" };
    if (percentage >= 60) return { text: "First Class / First Division", color: "text-blue-700 bg-blue-50 border-blue-100" };
    if (percentage >= 45) return { text: "Second Class / Second Division", color: "text-amber-700 bg-amber-50 border-amber-100" };
    if (percentage >= 35) return { text: "Third Class / Pass Class", color: "text-slate-700 bg-slate-50 border-slate-100" };
    return { text: "Fail", color: "text-red-700 bg-red-50 border-red-100" };
  };

  const advice = getDivisionFeedback();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <CheckSquare id="marks-calc-icon" className="w-8 h-8 text-blue-600" />
          <span>Marks Percentage Calculator</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Determine overall aggregate test percentages and general academic division ratings instantly.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="scored-marks-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Marks Scored (Earned)</label>
            <input
              id="scored-marks-input"
              type="number"
              value={scoredMarks}
              onChange={(e) => setScoredMarks(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold text-slate-800"
              placeholder="e.g., 485"
            />
          </div>

          <div>
            <label htmlFor="max-marks-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Total Maximum Marks</label>
            <input
              id="max-marks-input"
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold text-slate-800"
              placeholder="e.g., 600"
            />
          </div>
        </div>

        {maxNum > 0 && scoredNum > maxNum && (
          <p className="text-xs text-rose-500 italic">
            * Scored marks should normally represent numbers smaller than or equal to maximum marks.
          </p>
        )}

        {/* Diagnostic Output Board */}
        <div className="pt-6 border-t border-slate-100 space-y-6 text-center">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-widest mb-1">AGGREGATE PERCENTAGE</span>
            <span className="text-4xl md:text-5xl font-black font-display text-blue-600 font-mono inline-block">
              {percentage}%
            </span>
          </div>

          {maxNum > 0 && (
            <div className={`p-4 rounded-2xl border ${advice.color} inline-block font-semibold text-sm max-w-xs mx-auto`}>
              Academic Standing: {advice.text}
            </div>
          )}

          <div className="flex gap-2.5 justify-center max-w-xs mx-auto">
            <button
              id="btn-print-marks"
              onClick={() => window.print()}
              className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-semibold text-xs cursor-pointer"
            >
              Print metrics
            </button>
          </div>
        </div>
      </div>

      {/* SEO copy text */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 mt-12 text-xs md:text-sm text-slate-600 space-y-4">
        <h2 className="font-display font-semibold text-slate-800 text-base">Indian University Standard Divisions Criteria</h2>
        <p className="leading-relaxed">
          Most universities, including JNTU, classifications scores into standard divisions representing distinct merit standards:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs text-slate-500 pl-2">
          <li><strong>Distinction status:</strong> Conferred to candidates receiving aggregate scores equal or larger than 75%.</li>
          <li><strong>First Division status:</strong> Earned for overall percentages between 60% and 74%.</li>
          <li><strong>Second Division status:</strong> Assigned to students securing between 45% and 59% aggregations.</li>
          <li><strong>Third Division / Pass status:</strong> Placed in the range of 35% to 44%.</li>
        </ul>
      </section>
    </div>
  );
};
export default MarksPercentageCalculator;
