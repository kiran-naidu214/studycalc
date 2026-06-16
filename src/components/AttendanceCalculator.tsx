import React, { useState } from "react";
import { CalendarClock, AlertCircle, Sparkles, Check, CheckCircle, Info, TrendingUp, XCircle } from "lucide-react";
import { motion } from "motion/react";

export const AttendanceCalculator: React.FC = () => {
  const [totalClasses, setTotalClasses] = useState<number | string>(100);
  const [attendedClasses, setAttendedClasses] = useState<number | string>(70);
  const [targetPercentage, setTargetPercentage] = useState<number>(75);

  const conducted = Number(totalClasses) || 0;
  const attended = Number(attendedClasses) || 0;

  let percentage = 0;
  if (conducted > 0) {
    percentage = parseFloat(((attended / conducted) * 100).toFixed(2));
  }

  // Calculate needed/skippable classes
  const targetFraction = targetPercentage / 100;

  // Classes to attend to reach target:
  // (attended + x) / (conducted + x) >= targetFraction
  // attended + x >= targetFraction * conducted + targetFraction * x
  // x (1 - targetFraction) >= targetFraction * conducted - attended
  // x >= (targetFraction * conducted - attended) / (1 - targetFraction)
  let classesToAttend = 0;
  if (conducted > 0 && percentage < targetPercentage) {
    const numerator = targetFraction * conducted - attended;
    const denominator = 1 - targetFraction;
    if (denominator > 0) {
      classesToAttend = Math.ceil(numerator / denominator);
      if (classesToAttend < 0) classesToAttend = 0;
    }
  }

  // Classes that can be skipped:
  // attended / (conducted + y) >= targetFraction
  // attended >= targetFraction * conducted + targetFraction * y
  // targetFraction * y <= attended - targetFraction * conducted
  // y <= (attended - targetFraction * conducted) / targetFraction
  let classesToSkip = 0;
  if (conducted > 0 && percentage >= targetPercentage) {
    const numerator = attended - targetFraction * conducted;
    if (targetFraction > 0) {
      classesToSkip = Math.floor(numerator / targetFraction);
      if (classesToSkip < 0) classesToSkip = 0;
    }
  }

  // Handle inputs safely
  const handleInputCheck = (val: string, setter: (n: number | string) => void) => {
    if (val === "") {
      setter("");
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      setter(num);
    }
  };

  // Color dynamic states
  const getStatusColor = () => {
    if (percentage >= targetPercentage) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (percentage >= 65) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  const getProgressColor = () => {
    if (percentage >= targetPercentage) return "bg-emerald-500";
    if (percentage >= 65) return "bg-amber-400";
    return "bg-red-500";
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <CalendarClock id="att-calc-icon" className="w-8 h-8 text-blue-600" />
          <span>Attendance Tracker & Predictor</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Evaluate college lecture percentages instantly. Programmed specifically to calculate metrics to maintain the mandatory 75% attendance cap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="font-display font-bold text-lg text-slate-800">1. Enter Attendance Metrics</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="total-classes-input" className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                Total Classes Conducted (Lectures)
              </label>
              <input
                id="total-classes-input"
                type="number"
                value={totalClasses}
                onChange={(e) => handleInputCheck(e.target.value, setTotalClasses)}
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all font-mono font-medium text-slate-800 text-sm"
                placeholder="e.g., 120"
                min="1"
              />
            </div>

            <div>
              <label htmlFor="attended-classes-input" className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                Classes Attended (Present)
              </label>
              <input
                id="attended-classes-input"
                type="number"
                value={attendedClasses}
                onChange={(e) => handleInputCheck(e.target.value, setAttendedClasses)}
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all font-mono font-medium text-slate-800 text-sm"
                placeholder="e.g., 90"
                min="0"
              />
              {conducted > 0 && attended > conducted && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Attended classes cannot exceed total conducted classes.</span>
                </p>
              )}
            </div>

            {/* Target Criteria */}
            <div>
              <label htmlFor="target-attendance-input" className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                Target Threshold Attendance ({targetPercentage}%)
              </label>
              <div className="flex gap-2">
                {[75, 80, 85, 90].map((percent) => (
                  <button
                    key={percent}
                    id={`btn-target-${percent}`}
                    onClick={() => setTargetPercentage(percent)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      targetPercentage === percent
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {percent}% Goal
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-500">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p>
              Under JNTU and statutory Indian engineering regulations, students require a minimum of <strong>75%</strong> attendance in aggregate to qualify for final university examinations without paying medical condonation fees.
            </p>
          </div>
        </div>

        {/* Output Panel visual state */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
            <h2 className="font-display font-bold text-lg text-slate-800 mb-6">2. Attendance Diagnostics</h2>

            {/* Visual Progress Doughnut / Bar */}
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-widest mb-1.5">Current Standing</span>
                <span className={`text-5xl md:text-6xl font-black font-display tracking-tight inline-block py-1 px-4 rounded-2xl ${getStatusColor().split(' ')[0]}`}>
                  {percentage}%
                </span>
                <p className="text-xs text-slate-500 mt-2 font-mono">
                  {attended} present out of {conducted} total sessions
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>0%</span>
                  <span className="font-semibold text-blue-600">Goal: {targetPercentage}%</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-50">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Formula summary */}
              <div className="pt-6 border-t border-slate-100">
                {conducted > 0 && attended <= conducted ? (
                  percentage < targetPercentage ? (
                    // Below target alert
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-rose-800">
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        <span className="font-bold text-sm tracking-tight">Attendance Below Threshold</span>
                      </div>
                      <p className="text-xs text-rose-700 leading-relaxed">
                        You need to attend the next <strong className="text-sm font-mono text-rose-900 font-extrabold">{classesToAttend}</strong> lectures sequentially to secure a minimum of <strong>{targetPercentage}%</strong> attendance.
                      </p>
                      <div className="text-[10px] text-rose-500 italic">
                        Assume no more skips are made until target is hit. New metric will be {attended + classesToAttend}/{conducted + classesToAttend}.
                      </div>
                    </div>
                  ) : (
                    // Above target success
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span className="font-bold text-sm tracking-tight">Adequate Attendance Reached</span>
                      </div>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        Excellent! Your attendance is in the safe zone. You can safely skip up to <strong className="text-sm font-mono text-emerald-900 font-extrabold">{classesToSkip}</strong> upcoming classes while keeping your overall attendance at or above <strong>{targetPercentage}%</strong>.
                      </p>
                      <div className="text-[10px] text-emerald-500 italic">
                        Skipping more might put you at condonation risk. New metrics with skipped classes is {attended}/{conducted + classesToSkip}.
                      </div>
                    </div>
                  )
                ) : (
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-400 italic">
                    Waiting for positive conducted lectures inputs to compile reports.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO rich text content */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 mt-12 text-xs md:text-sm text-slate-600 space-y-4">
        <h2 className="font-display font-semibold text-slate-800 text-base md:text-lg">Tips to Manage and Plan Student Attendance in College</h2>
        <p className="leading-relaxed">
          Maintaining consistent attendance is vital for regular students. Most technological colleges across India, especially those affiliated with Jawaharlal Nehru Technological University (JNTUH/JNTUK), enforce rigid attendance criteria. This ensures standard course participation before taking semester finals. If your percentage dips below the <strong>75%</strong> bar, you might run into condonation fees or potential semester detentions.
        </p>
        <p className="leading-relaxed">
          Our specialized <strong>Attendance Calculator</strong> performs these planning calculations cleanly. Instead of guessing how many BTech laboratories or theory lectures you can skip, calculate the safe range instantly. 
        </p>
        <h3 className="font-display font-semibold text-slate-800 text-xs md:text-sm mt-4">Calculators Math:</h3>
        <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm pl-2">
          <li><strong>Attend Target formula:</strong> If you are running an attendance deficit, StudyCalc solves the linear equation to show classes needed to reach 75%: <code className="bg-white p-1 rounded font-mono">Classes to Attend = Math.ceil((0.75 * conducted - attended) / 0.25)</code>.</li>
          <li><strong>Skip Target formula:</strong> If you are in the safe zone and need to check how many classes you can skip: <code className="bg-white p-1 rounded font-mono">Classes to Skip = Math.floor((attended - 0.75 * conducted) / 0.75)</code>.</li>
        </ol>
        <p className="leading-relaxed mt-4">
          Always register daily present indexes correctly, pay severe attention to practical sessions (where attendance calculations are sometimes counted separately with higher weights), and keep tracking goals through our student calculator!
        </p>
      </section>
    </div>
  );
};
export default AttendanceCalculator;
