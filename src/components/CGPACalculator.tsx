import React, { useState, useEffect, useRef } from "react";
import { Semester, Subject } from "../types";
import { Plus, Trash2, Download, Printer, RotateCcw, AlertCircle, Save, CheckCircle, Info, Calculator, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Grade constant lists matching JNTU grading standards
export const JNTU_GRADES: Record<string, number> = {
  "O (Outstanding)": 10,
  "A+ (Excellent)": 9,
  "A (Very Good)": 8,
  "B+ (Good)": 7,
  "B (Above Average)": 6,
  "C (Average)": 5,
  "F (Fail)": 0,
};

// Available standard credits in standard B.Tech/Engineering
const COMMON_CREDITS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6];

export const CGPACalculator: React.FC = () => {
  // Hardcoded or fetched initial semesters from localStorage to prevent loss of state
  const [semesters, setSemesters] = useState<Semester[]>(() => {
    try {
      const saved = localStorage.getItem("studycalc_semesters");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading storage:", e);
    }
    // Default initial template
    return [
      {
        id: "sem-1",
        name: "Semester 1",
        subjects: [
          { id: "sub-1-1", name: "Mathematics - I", credits: 4, grade: "A+" },
          { id: "sub-1-2", name: "Engineering Physics", credits: 4, grade: "A" },
          { id: "sub-1-3", name: "Programming for Problem Solving", credits: 3, grade: "B+" },
          { id: "sub-1-4", name: "Lab Manual Practical", credits: 1.5, grade: "O" },
        ],
      },
    ];
  });

  const [formula, setFormula] = useState<"jntu" | "aicte" | "direct">("jntu"); // jntu: (CGPA - 0.75)*10, aicte: CGPA * 9.5, direct: CGPA * 10
  const [saveSuccess, setSaveSuccess] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Write changes to localStorage
  useEffect(() => {
    localStorage.setItem("studycalc_semesters", JSON.stringify(semesters));
  }, [semesters]);

  // Handle Dynamic Semesters
  const addSemester = () => {
    const nextIndex = semesters.length + 1;
    const newSem: Semester = {
      id: `sem-${Date.now()}`,
      name: `Semester ${nextIndex}`,
      subjects: [
        { id: `sub-${Date.now()}-1`, name: "Core Course I", credits: 3, grade: "A" },
        { id: `sub-${Date.now()}-2`, name: "Elective Subject", credits: 3, grade: "A" },
      ],
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length === 1) {
      alert("At least one semester is required to calculate academic averages.");
      return;
    }
    setSemesters(semesters.filter((s) => s.id !== semId));
  };

  const renameSemester = (semId: string, newName: string) => {
    setSemesters(
      semesters.map((s) => (s.id === semId ? { ...s, name: newName } : s))
    );
  };

  // Handle Dynamic Subjects within Semesters
  const addSubject = (semId: string) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id === semId) {
          const newSub: Subject = {
            id: `sub-${Date.now()}`,
            name: `Subject ${s.subjects.length + 1}`,
            credits: 3,
            grade: "A",
          };
          return { ...s, subjects: [...s.subjects, newSub] };
        }
        return s;
      })
    );
  };

  const removeSubject = (semId: string, subId: string) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id === semId) {
          if (s.subjects.length === 1) {
            alert("Each semester needs to contain at least 1 course.");
            return s;
          }
          return { ...s, subjects: s.subjects.filter((sub) => sub.id !== subId) };
        }
        return s;
      })
    );
  };

  const updateSubject = (semId: string, subId: string, updates: Partial<Subject>) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id === semId) {
          return {
            ...s,
            subjects: s.subjects.map((sub) => {
              if (sub.id === subId) {
                // Ensure typed updates
                const merged = { ...sub, ...updates };
                if (updates.credits !== undefined) {
                  const val = Number(updates.credits);
                  merged.credits = isNaN(val) ? 0 : val;
                }
                return merged;
              }
              return sub;
            }),
          };
        }
        return s;
      })
    );
  };

  // Reset ALL state
  const resetAllData = () => {
    if (window.confirm("Are you sure you want to restore the default calculator settings? This logs out custom entries.")) {
      setSemesters([
        {
          id: "sem-1",
          name: "Semester 1",
          subjects: [
            { id: "sub-1-1", name: "Mathematics - I", credits: 4, grade: "A+" },
            { id: "sub-1-2", name: "Engineering Physics", credits: 4, grade: "A" },
            { id: "sub-1-3", name: "Programming for Problem Solving", credits: 3, grade: "B+" },
            { id: "sub-1-4", name: "Lab Manual Practical", credits: 1.5, grade: "O" },
          ],
        },
      ]);
      localStorage.removeItem("studycalc_semesters");
    }
  };

  // Mathematical Calculation Logic
  const getSemSGPA = (sem: Semester): number => {
    let totalScore = 0;
    let totalCredits = 0;
    sem.subjects.forEach((sub) => {
      const gPoints = JNTU_GRADES[sub.grade] ?? JNTU_GRADES[`${sub.grade} (Outstanding)`] ?? JNTU_GRADES[`${sub.grade} (Excellent)`] ?? JNTU_GRADES[`${sub.grade} (Very Good)`] ?? JNTU_GRADES[`${sub.grade} (Good)`] ?? JNTU_GRADES[`${sub.grade} (Above Average)`] ?? JNTU_GRADES[`${sub.grade} (Average)`] ?? 0;
      // Map letter shortforms directly to point value
      let pointsVal = 0;
      if (sub.grade === "O") pointsVal = 10;
      else if (sub.grade === "A+") pointsVal = 9;
      else if (sub.grade === "A") pointsVal = 8;
      else if (sub.grade === "B+") pointsVal = 7;
      else if (sub.grade === "B") pointsVal = 6;
      else if (sub.grade === "C") pointsVal = 5;
      else if (sub.grade === "F") pointsVal = 0;

      totalScore += pointsVal * sub.credits;
      totalCredits += sub.credits;
    });
    return totalCredits > 0 ? parseFloat((totalScore / totalCredits).toFixed(2)) : 0;
  };

  const getCumulativeCGPA = (): {
    cgpa: number;
    percentage: number;
    totalCredits: number;
    earnedPoints: number;
  } => {
    let grandPoints = 0;
    let grandCredits = 0;

    semesters.forEach((sem) => {
      sem.subjects.forEach((sub) => {
        let pointsVal = 0;
        if (sub.grade === "O") pointsVal = 10;
        else if (sub.grade === "A+") pointsVal = 9;
        else if (sub.grade === "A") pointsVal = 8;
        else if (sub.grade === "B+") pointsVal = 7;
        else if (sub.grade === "B") pointsVal = 6;
        else if (sub.grade === "C") pointsVal = 5;
        else if (sub.grade === "F") pointsVal = 0;

        grandPoints += pointsVal * sub.credits;
        grandCredits += sub.credits;
      });
    });

    const cgpa = grandCredits > 0 ? parseFloat((grandPoints / grandCredits).toFixed(2)) : 0;

    // Formulas
    let percentage = 0;
    if (formula === "jntu") {
      percentage = cgpa >= 0.75 ? parseFloat(((cgpa - 0.75) * 10).toFixed(2)) : 0;
    } else if (formula === "aicte") {
      percentage = parseFloat((cgpa * 9.5).toFixed(2));
    } else {
      percentage = parseFloat((cgpa * 10).toFixed(2));
    }

    return {
      cgpa,
      percentage,
      totalCredits: grandCredits,
      earnedPoints: grandPoints,
    };
  };

  const stats = getCumulativeCGPA();

  const handlePrint = () => {
    window.print();
  };

  const triggerSaveNotify = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Page Title / Hero header block */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <Calculator id="cgpa-calc-icon" className="w-8 h-8 text-blue-600" />
          <span>JNTU CGPA & SGPA Calculator</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto text-sm md:text-base">
          Calculate relative semesters average dynamically based on actual credit metrics. High fidelity compliance for JNTUH, JNTUK & JNTUA grading scales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main calculation sheet (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 text-sm">Conversion Standard:</span>
              <select
                id="formula-select"
                value={formula}
                onChange={(e) => setFormula(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-2 focus:ring-1 focus:ring-blue-500 font-medium cursor-pointer"
              >
                <option value="jntu">JNTU Formula: (CGPA - 0.75) * 10</option>
                <option value="aicte">AICTE Standard: CGPA * 9.5</option>
                <option value="direct">Direct Scale: CGPA * 10</option>
              </select>
            </div>

            <div className="flex gap-2 text-xs font-medium">
              <button
                id="btn-save-draft"
                onClick={triggerSaveNotify}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200. rounded-lg transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Progress</span>
              </button>
              <button
                id="btn-reset-calc"
                onClick={resetAllData}
                className="flex items-center gap-1.5 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Draft</span>
              </button>
            </div>
          </div>

          {/* Success Dialog */}
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-medium"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 animate-bounce" />
                <span>Academic blueprint saved successfully to local browser state!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List of custom semesters */}
          <div ref={printAreaRef} className="space-y-6">
            {semesters.map((sem, semIndex) => {
              const sgpaVal = getSemSGPA(sem);

              return (
                <motion.div
                  key={sem.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  {/* Semester Header Card */}
                  <div className="bg-slate-50/70 py-4 px-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <input
                      id={`sem-name-input-${sem.id}`}
                      type="text"
                      value={sem.name}
                      onChange={(e) => renameSemester(sem.id, e.target.value)}
                      className="font-display font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 px-2 py-1 rounded border-b border-transparent hover:border-slate-300 w-44 text-sm md:text-base"
                    />

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Semester SGPA</span>
                        <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                          {sgpaVal > 0 ? sgpaVal.toFixed(2) : "0.00"}
                        </span>
                      </div>

                      <button
                        id={`btn-remove-sem-${sem.id}`}
                        onClick={() => removeSemester(sem.id)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Remove Semester"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Course list within semester */}
                  <div className="p-6">
                    <div className="block overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap min-w-[500px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase font-medium">
                            <th className="py-2.5 px-3">Subject / Course Name</th>
                            <th className="py-2.5 px-3 w-32">Credits</th>
                            <th className="py-2.5 px-3 w-40">Grade (JNTU Mode)</th>
                            <th className="py-2.5 px-3 w-16 text-right">Points</th>
                            <th className="py-2.5 px-3 w-12"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {sem.subjects.map((sub) => {
                            let ptsVal = 0;
                            if (sub.grade === "O") ptsVal = 10;
                            else if (sub.grade === "A+") ptsVal = 9;
                            else if (sub.grade === "A") ptsVal = 8;
                            else if (sub.grade === "B+") ptsVal = 7;
                            else if (sub.grade === "B") ptsVal = 6;
                            else if (sub.grade === "C") ptsVal = 5;
                            else if (sub.grade === "F") ptsVal = 0;

                            return (
                              <tr key={sub.id} className="hover:bg-slate-50/50 group transition-colors">
                                <td className="py-2 px-3">
                                  <input
                                    id={`input-sub-name-${sub.id}`}
                                    type="text"
                                    value={sub.name}
                                    onChange={(e) => updateSubject(sem.id, sub.id, { name: e.target.value })}
                                    className="bg-transparent text-slate-800 text-xs md:text-sm font-medium border-b border-transparent hover:border-slate-200 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 rounded px-1.5 py-1 w-full"
                                    placeholder="Enter course name"
                                  />
                                </td>
                                <td className="py-2 px-3">
                                  <select
                                    id={`select-sub-credits-${sub.id}`}
                                    value={sub.credits}
                                    onChange={(e) => updateSubject(sem.id, sub.id, { credits: parseFloat(e.target.value) })}
                                    className="bg-slate-50 border border-slate-200 rounded-md p-1 p-y-1.5 focus:ring-1 focus:ring-blue-500 font-mono text-xs w-full text-slate-700"
                                  >
                                    {COMMON_CREDITS.map((num) => (
                                      <option key={num} value={num}>
                                        {num.toFixed(1)} Credits
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-2 px-3">
                                  <select
                                    id={`select-sub-grade-${sub.id}`}
                                    value={sub.grade}
                                    onChange={(e) => updateSubject(sem.id, sub.id, { grade: e.target.value })}
                                    className="bg-slate-50 border border-slate-200 rounded-md p-1 focus:ring-1 focus:ring-blue-500 text-xs w-full font-medium text-slate-700 cursor-pointer"
                                  >
                                    <option value="O">O (Outstanding - 10)</option>
                                    <option value="A+">A+ (Excellent - 9)</option>
                                    <option value="A">A (Very Good - 8)</option>
                                    <option value="B+">B+ (Good - 7)</option>
                                    <option value="B">B (Above Average - 6)</option>
                                    <option value="C">C (Average - 5)</option>
                                    <option value="F">F (Fail - 0)</option>
                                  </select>
                                </td>
                                <td className="py-2 px-3 text-right font-mono text-xs font-semibold text-slate-600">
                                  {ptsVal} pts
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    id={`btn-delete-sub-${sub.id}`}
                                    onClick={() => removeSubject(sem.id, sub.id)}
                                    className="text-slate-300 hover:text-red-500 p-1 rounded-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
                                    title="Delete Course"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex justify-start items-center">
                      <button
                        id={`btn-add-course-sem-${sem.id}`}
                        onClick={() => addSubject(sem.id)}
                        className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer "
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Subject Course</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Block to trigger addition of Semester */}
          <div className="flex justify-center py-2">
            <button
              id="btn-add-semester"
              onClick={addSemester}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/20 py-4 px-8 w-full rounded-2xl text-slate-600 hover:text-blue-600 font-medium transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Add Academic Semester / Year Block</span>
            </button>
          </div>
        </div>

        {/* Aggregate scores card column */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-xl sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-display font-medium text-slate-300 text-sm">StudyCalc Aggregation</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">Active Scales</span>
            </div>

            {/* Calculations metrics */}
            <div className="py-6 space-y-5 text-center">
              <div>
                <span className="text-slate-400 text-xs font-semibold block uppercase tracking-widest mb-1">Cumulative CGPA</span>
                <span className="text-4xl md:text-5xl font-extrabold font-display bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                  {stats.cgpa > 0 ? stats.cgpa.toFixed(2) : "0.00"}
                </span>
                <span className="text-slate-500 text-xs block font-mono mt-1">/ 10.00 Point Grading System</span>
              </div>

              <div>
                <span className="text-slate-404 text-xs font-semibold block uppercase tracking-widest mb-1">Equivalent Marks Percentage</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {stats.percentage > 0 ? `${stats.percentage}%` : "0.00%"}
                </span>
                <div className="text-slate-500 text-[10px] italic mt-1 font-sans">
                  Using formula: {formula === "jntu" ? "(CGPA - 0.75) * 10" : formula === "aicte" ? "CGPA * 9.5" : "CGPA * 10"}
                </div>
              </div>
            </div>

            {/* Meta facts */}
            <div className="bg-slate-800/50 rounded-2xl p-4 gap-3 grid grid-cols-2 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-medium">Total Semester Items</span>
                <span className="font-bold text-slate-200 mt-1 block font-mono">{semesters.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-medium">Earned Credit Weights</span>
                <span className="font-bold text-slate-200 mt-1 block font-mono">{stats.totalCredits}</span>
              </div>
            </div>

            {/* Print/Export buttons */}
            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                id="btn-print-results"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700. text-white rounded-xl font-medium text-xs md:text-sm hover:scale-[1.01] transition-all cursor-pointer font-sans"
              >
                <Printer className="w-4 h-4" />
                <span>Print Academic Sheet</span>
              </button>
              <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                StudyCalc adheres STRICTLY to academic guidelines. Grade indices are compiled dynamically client-side securely. Use the Print option to export as PDF.
              </p>
            </div>
          </div>

          {/* JNTU Grading Reference card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-500" />
              <span>JNTU Grade Reference Chart</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              JNTU (Jawarlal Nehru Technological University) complies with the UGC guidelines, assigning absolute and relative letter grades on a 10-point interval.
            </p>

            <div className="space-y-1.5 font-mono text-xs text-slate-600">
              <div className="flex justify-between p-1.5 rounded bg-slate-50/50">
                <span className="font-semibold text-slate-700">O (Outstanding)</span>
                <span>10 Points</span>
              </div>
              <div className="flex justify-between p-1.5 rounded">
                <span className="font-semibold text-slate-700">A+ (Excellent)</span>
                <span>9 Points</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-slate-50/50">
                <span className="font-semibold text-slate-700">A (Very Good)</span>
                <span>8 Points</span>
              </div>
              <div className="flex justify-between p-1.5 rounded">
                <span className="font-semibold text-slate-700">B+ (Good)</span>
                <span>7 Points</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-slate-50/50">
                <span className="font-semibold text-slate-700">B (Above Average)</span>
                <span>6 Points</span>
              </div>
              <div className="flex justify-between p-1.5 rounded">
                <span className="font-semibold text-slate-700">C (Average)</span>
                <span>5 Points</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-red-50 text-red-700 font-bold">
                <span>F (Fail)</span>
                <span>0 Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO copy text for Search engines */}
      <section className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 mt-12 text-xs md:text-sm text-slate-600 space-y-4">
        <h2 className="font-display font-semibold text-slate-800 text-base md:text-lg">About JNTU CGPA and SGPA Regulations</h2>
        <p className="leading-relaxed">
          CGPA (Cumulative Grade Point Average) and SGPA (Semester Grade Point Average) represent essential educational credentials evaluating academic standing in modern technical education institutions. Under major JNTU (Hyderabad, Kakinada, Anantapur) regulatory regimes like <strong>R16, R18, and R22</strong>, candidates receive letter grade assessments rather than raw scorecard numbers. This ensures consistency with the University Grants Commission (UGC) credit structures.
        </p>
        <p className="leading-relaxed">
          Our online CGPA & SGPA tool helps engineering students compute these values on the fly without complex pen-and-paper averages. Multi-semester evaluations accurately weight overall scores based on the corresponding credit units. To convert your calculated CGPA into percentage form, use the regional selection. For standard JNTU candidate sheets, the formula is:
        </p>
        <div className="p-3 bg-white rounded-lg border border-slate-200/60 font-mono text-center text-blue-600 font-semibold my-2">
          Percentage (%) = (CGPA - 0.75) * 10
        </div>
        <p className="leading-relaxed">
          By utilizing this specialized calculation framework, you ensure complete alignment with official college transcripts. Make sure to enter corresponding elective credits correctly, and avoid manual decimal shifts. Keep your study transcripts updated on our cloud-free calculator!
        </p>
      </section>
    </div>
  );
};
