import React, { useState } from "react";
import { Sparkles, ArrowRight, RefreshCw, Layers } from "lucide-react";

interface UnitType {
  name: string;
  factor: number; // reference factor
}

interface CategoryType {
  id: string;
  name: string;
  units: Record<string, number>; // value to reference value
}

const CATEGORIES: CategoryType[] = [
  {
    id: "length",
    name: "Length / Distance",
    units: {
      "Meter (m)": 1,
      "Kilometer (km)": 1000,
      "Centimeter (cm)": 0.01,
      "Millimeter (mm)": 0.001,
      "Mile (mi)": 1609.344,
      "Yard (yd)": 0.9144,
      "Foot (ft)": 0.3048,
      "Inch (in)": 0.0254,
    },
  },
  {
    id: "mass",
    name: "Mass / Weight",
    units: {
      "Gram (g)": 1,
      "Kilogram (kg)": 1000,
      "Pound (lb)": 453.59237,
      "Ounce (oz)": 28.34952,
      "Milligram (mg)": 0.001,
      "Ton (t)": 1000000,
    },
  },
  {
    id: "storage",
    name: "Data Storage",
    units: {
      "Byte (B)": 1,
      "Kilobyte (KB)": 1024,
      "Megabyte (MB)": 1024 * 1024,
      "Gigabyte (GB)": 1024 * 1024 * 1024,
      "Terabyte (TB)": 1024 * 1024 * 1024 * 1024,
    },
  },
];

export const UnitConverter: React.FC = () => {
  const [activeCatIndex, setActiveCatIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number | string>(10);

  const category = CATEGORIES[activeCatIndex];
  const unitNames = Object.keys(category.units);

  const [fromUnit, setFromUnit] = useState<string>(unitNames[0]);
  const [toUnit, setToUnit] = useState<string>(unitNames[1] || unitNames[0]);

  // Handle category shift
  const handleCategoryShift = (index: number) => {
    setActiveCatIndex(index);
    const cat = CATEGORIES[index];
    const keys = Object.keys(cat.units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  };

  // Convert logical units
  const performConversion = (): number => {
    const val = Number(inputValue) || 0;
    if (fromUnit === toUnit) return val;

    const fromFactor = category.units[fromUnit];
    const toFactor = category.units[toUnit];

    if (!fromFactor || !toFactor) return 0;

    // Convert to reference standard then to destination units
    const referenceVal = val * fromFactor;
    return parseFloat((referenceVal / toFactor).toFixed(6));
  };

  // Temperature logic is non-linear so handled separately
  const [tempInput, setTempInput] = useState<number | string>(25);
  const [tempFrom, setTempFrom] = useState<"C" | "F" | "K">("C");
  const [tempTo, setTempTo] = useState<"C" | "F" | "K">("F");

  const convertTempVal = (): number => {
    const val = Number(tempInput) || 0;
    if (tempFrom === tempTo) return val;

    let tempInC = 0;
    if (tempFrom === "C") tempInC = val;
    else if (tempFrom === "F") tempInC = (val - 32) * (5 / 9);
    else tempInC = val - 273.15;

    let ans = 0;
    if (tempTo === "C") ans = tempInC;
    else if (tempTo === "F") ans = tempInC * (9 / 5) + 32;
    else ans = tempInC + 273.15;

    return parseFloat(ans.toFixed(4));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <Layers id="unit-converter-icon" className="w-8 h-8 text-blue-600" />
          <span>Scientific Unit Converter</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Robust, mathematically sound dynamic unit converters. Supports BTech laboratory dimensions and system storage scales.
        </p>
      </div>

      <div className="space-y-6">
        {/* Metric selection bar */}
        <div className="flex flex-wrap gap-2.5 bg-slate-100 p-2.5 rounded-2xl">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              id={`btn-cat-${cat.id}`}
              onClick={() => handleCategoryShift(idx)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                activeCatIndex === idx
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:bg-slate-200/60 text-slate-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
          <button
            id="btn-cat-temp"
            onClick={() => handleCategoryShift(-1)}
            className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeCatIndex === -1
                ? "bg-blue-600 text-white shadow-sm"
                : "hover:bg-slate-200/60 text-slate-600"
            }`}
          >
            Temperature
          </button>
        </div>

        {/* Dynamic calculation card */}
        {activeCatIndex !== -1 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="font-display font-bold text-slate-800 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Convert {category.name} Units</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <label htmlFor="unit-input-val" className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Input Value</label>
                <input
                  id="unit-input-val"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">From Unit</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-500 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  {unitNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">To Unit</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-500 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  {unitNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Answer Board */}
            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-105 border-dashed flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-1">Conversion Result</span>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-slate-550 block text-xs font-semibold">{inputValue} {fromUnit}</span>
                <ArrowRight className="w-4 h-4 text-blue-500 block" />
                <span className="text-xl font-black text-blue-700 block">{performConversion()} {toUnit}</span>
              </div>
            </div>
          </div>
        ) : (
          // Temperature Module
          <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="font-display font-bold text-slate-800 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Convert Temperature Parameters</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Input Value</label>
                <input
                  type="number"
                  value={tempInput}
                  onChange={(e) => setTempInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">From Scale</label>
                <select
                  value={tempFrom}
                  onChange={(e) => setTempFrom(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-500 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  <option value="C">Celsius (°C)</option>
                  <option value="F">Fahrenheit (°F)</option>
                  <option value="K">Kelvin (K)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">To Scale</label>
                <select
                  value={tempTo}
                  onChange={(e) => setTempTo(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-500 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  <option value="C">Celsius (°C)</option>
                  <option value="F">Fahrenheit (°F)</option>
                  <option value="K">Kelvin (K)</option>
                </select>
              </div>
            </div>

            {/* Answer Board */}
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 border-dashed flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-1">Conversion Result</span>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-slate-550 block text-xs font-semibold">{tempInput}°{tempFrom}</span>
                <ArrowRight className="w-4 h-4 text-emerald-500 block" />
                <span className="text-xl font-black text-emerald-700 block">{convertTempVal()}°{tempTo}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO text */}
      <section className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 mt-12 text-xs md:text-sm text-slate-600 space-y-4">
        <h2 className="font-display font-semibold text-slate-800 text-base">Value of accurate technical conversions</h2>
        <p className="leading-relaxed">
          Technical units converters support students sorting physical equations and tracking code storage indexes. Avoid shifting decimal units manual errors during B.Tech lab reports compilations. Use StudyCalc to transform metrics flawlessly!
        </p>
      </section>
    </div>
  );
};
export default UnitConverter;
