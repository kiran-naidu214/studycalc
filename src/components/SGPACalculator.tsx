import React, { useState } from "react";
import { FileSpreadsheet, Plus, Trash2, Printer, RotateCcw, Check, Sparkles } from "lucide-react";

interface SGPAItem {
  id: string;
  name: string;
  credits: number;
  gradeValue: number;
}

export const SGPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<SGPAItem[]>([
    { id: "1", name: "Engineering Chemistry", credits: 4, gradeValue: 9 },
    { id: "2", name: "Basic Electrical Engineering", credits: 3, gradeValue: 8 },
    { id: "3", name: "English for Skill Enhancement", credits: 2, gradeValue: 10 },
    { id: "4", name: "Engineering Graphics Lab", credits: 1.5, gradeValue: 7 },
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        name: `Course ${courses.length + 1}`,
        credits: 3,
        gradeValue: 8,
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length === 1) {
      alert("At least one course is required.");
      return;
    }
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof SGPAItem, value: any) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          if (field === "credits") {
            const val = parseFloat(value);
            return { ...c, credits: isNaN(val) ? 0 : val };
          }
          if (field === "gradeValue") {
            return { ...c, gradeValue: parseInt(value, 10) };
          }
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const resetAll = () => {
    if (window.confirm("Reset course sheet?")) {
      setCourses([
        { id: "1", name: "Engineering Chemistry", credits: 4, gradeValue: 9 },
        { id: "2", name: "Basic Electrical Engineering", credits: 3, gradeValue: 8 },
        { id: "3", name: "English for Skill Enhancement", credits: 2, gradeValue: 10 },
        { id: "4", name: "Engineering Graphics Lab", credits: 1.5, gradeValue: 7 },
      ]);
    }
  };

  // Compile calculations
  let totalCredits = 0;
  let earnedGradePoints = 0;
  courses.forEach((c) => {
    totalCredits += c.credits;
    earnedGradePoints += c.credits * c.gradeValue;
  });

  const sgpa = totalCredits > 0 ? parseFloat((earnedGradePoints / totalCredits).toFixed(2)) : 0;
  const percentageStr = sgpa > 0 ? ((sgpa - 0.75) * 10).toFixed(2) : "0.00";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <FileSpreadsheet id="sgpa-calc-icon" className="w-8 h-8 text-blue-600" />
          <span>SGPA Calculator (Single Semester)</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Track semester-specific Grade Point Average scores based on credit courses. Specially designed for final year transcripts audits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table sheet */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <span className="font-display font-semibold text-slate-800 text-sm">Active Semester Subject Mapping</span>
              <button
                id="btn-sgpa-reset"
                onClick={resetAll}
                className="text-xs text-red-600 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Block</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[400px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase font-medium">
                    <th className="py-2.5 px-2">Course Name</th>
                    <th className="py-2.5 px-2 w-28">Credits</th>
                    <th className="py-2.5 px-2 w-36">JNTU Grade Value</th>
                    <th className="py-2.5 px-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="py-2 px-2">
                        <input
                          id={`sgpa-course-name-${c.id}`}
                          type="text"
                          value={c.name}
                          onChange={(e) => updateCourse(c.id, "name", e.target.value)}
                          className="bg-transparent text-slate-800 text-xs md:text-sm font-medium border-b border-transparent hover:border-slate-300 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          id={`sgpa-course-credits-${c.id}`}
                          type="number"
                          value={c.credits}
                          onChange={(e) => updateCourse(c.id, "credits", e.target.value)}
                          step="0.5"
                          min="0"
                          className="bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 font-mono text-xs w-full text-slate-700"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <select
                          id={`sgpa-course-grade-${c.id}`}
                          value={c.gradeValue}
                          onChange={(e) => updateCourse(c.id, "gradeValue", e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs w-full text-slate-700 cursor-pointer"
                        >
                          <option value="10">O (Outstanding - 10)</option>
                          <option value="9">A+ (Excellent - 9)</option>
                          <option value="8">A (Very Good - 8)</option>
                          <option value="7">B+ (Good - 7)</option>
                          <option value="6">B (Above Average - 6)</option>
                          <option value="5">C (Average - 5)</option>
                          <option value="0">F (Fail - 0)</option>
                        </select>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          id={`btn-remove-sgpa-course-${c.id}`}
                          onClick={() => removeCourse(c.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              id="btn-sgpa-add"
              onClick={addCourse}
              className="mt-4 flex items-center justify-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course Subject</span>
            </button>
          </div>
        </div>

        {/* Info card */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-2">Calculated SGPA</span>
            <span className="text-4xl md:text-5xl font-extrabold font-display text-blue-400 block font-mono">
              {sgpa.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-500 block uppercase font-medium mt-1">/ 10 Point Scale</span>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Equivalent Percentage</span>
                <span className="text-lg font-bold text-emerald-400 font-mono mt-1 block">{parseFloat(percentageStr) > 0 ? `${percentageStr}%` : "0.00%"}</span>
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Credit Weight</span>
                <span className="text-sm font-bold text-slate-200 font-mono mt-1 block">{totalCredits} credits</span>
              </div>
            </div>

            <button
              id="btn-sgpa-print"
              onClick={() => window.print()}
              className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Print Result
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-150">
            <h3 className="font-display font-semibold text-slate-800 text-xs flex items-center gap-1 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              <span>What is SGPA?</span>
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              SGPA stands for **Semester Grade Point Average**. It represents your cumulative performance rating across subjects in one term, calculated by taking the sum of products of course credits and grading weight and dividing by total earned credits.
            </p>
          </div>
        </div>
      </div>

      {/* SEO text */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 mt-12 text-xs md:text-sm text-slate-600 space-y-4">
        <h2 className="font-display font-semibold text-slate-800 text-base">SGPA vs CGPA Explained</h2>
        <p className="leading-relaxed">
          While SGPA registers academic progress within a standalone, individual semester session, CGPA (Cumulative Grade Point Average) evaluates grand aggregate scores across all compiled semesters. Keeping track of individual semesters helps students spot trends, isolate potential credit risks, and optimize overall grade standing.
        </p>
      </section>
    </div>
  );
};
export default SGPACalculator;
