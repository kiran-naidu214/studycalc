/**
 * Core Types for StudyCalc Utility Platform
 */

export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string; // O, A+, A, B+, B, C, F
}

export interface Semester {
  id: string;
  name: string; // e.g., "Semester 1" or "Year 1 - Sem 1"
  subjects: Subject[];
}

export interface SavedResult {
  id: string;
  timestamp: string;
  title: string;
  semesters: Semester[];
  cgpa: number;
  percent: number;
}

export type ActiveTab = 
  | "home"
  | "cgpa"
  | "attendance"
  | "engineering"
  | "percentage"
  | "gpa"
  | "sgpa"
  | "unit"
  | "scientific"
  | "marks"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer"
  | "cookie";

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ToolMetadata {
  id: ActiveTab;
  name: string;
  slug: string;
  iconName: string;
  shortDescription: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}
