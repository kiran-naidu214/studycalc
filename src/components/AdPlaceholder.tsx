import React from "react";

/**
 * Google AdSense Placeholders for StudyCalc
 * Designed to prevent CLS (Cumulative Layout Shift) while remaining visually clean.
 * Display components contain semantic comments for easy AdSense script insertion.
 */

export const AdBannerTop: React.FC = () => {
  // Google AdSense Top Banner placeholder - typically placed below navigation / hero
  return (
    <div className="w-full max-w-7xl mx-auto my-4 flex justify-center items-center overflow-hidden" style={{ minHeight: "90px" }}>
      {/* 
        Google AdSense Top Banner Placeholder
        Ad Unit: studycalc_top_leaderboard
        Format: auto (horizontal recommended)
        
        To activate, paste your AdSense <ins> code inside this div:
      */}
      <div className="text-[10px] text-slate-300 pointer-events-none select-none tracking-widest uppercase font-mono py-1">
        ADVERTISEMENT
      </div>
    </div>
  );
};

export const AdBannerMiddle: React.FC = () => {
  // Google AdSense Middle Banner placeholder - typically between sections or tools
  return (
    <div className="w-full max-w-5xl mx-auto my-6 flex justify-center items-center overflow-hidden" style={{ minHeight: "120px" }}>
      {/* 
        Google AdSense Middle Banner Placeholder
        Ad Unit: studycalc_middle_banner
        Format: fluid / structural
        
        To activate, paste your AdSense <ins> code inside this div:
      */}
      <div className="text-[10px] text-slate-300 pointer-events-none select-none tracking-widest uppercase font-mono py-1">
        ADVERTISEMENT
      </div>
    </div>
  );
};

export const AdBannerBottom: React.FC = () => {
  // Google AdSense Bottom Banner placeholder - typically placed above the footer page layout
  return (
    <div className="w-full max-w-7xl mx-auto my-4 flex justify-center items-center overflow-hidden" style={{ minHeight: "150px" }}>
      {/* 
        Google AdSense Bottom Banner Placeholder
        Ad Unit: studycalc_bottom_banner
        Format: aggregate horizontal
        
        To activate, paste your AdSense <ins> code inside this div:
      */}
      <div className="text-[10px] text-slate-300 pointer-events-none select-none tracking-widest uppercase font-mono py-1">
        ADVERTISEMENT
      </div>
    </div>
  );
};

export const AdSidebar: React.FC = () => {
  // Google AdSense Sidebar banner - ideal for desktop side column displays
  return (
    <div className="hidden lg:flex w-[300px] h-[600px] sticky top-24 self-start justify-center items-center bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden">
      {/* 
        Google AdSense Sidebar Placeholder
        Ad Unit: studycalc_sidebar_skyscraper
        Dimensions: 300x600 px
        
        To activate, paste your AdSense <ins> code inside this div:
      */}
      <div className="text-[10px] text-slate-300 pointer-events-none select-none tracking-widest uppercase font-mono">
        ADVERTISEMENT
      </div>
    </div>
  );
};
export default AdBannerTop;
