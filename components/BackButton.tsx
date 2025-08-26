"use client";

export default function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()} 
      className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  );
}
