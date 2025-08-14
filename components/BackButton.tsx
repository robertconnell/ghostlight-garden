"use client";

export default function BackButton() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home if no history
      window.location.href = '/home';
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
    >
      <svg 
        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to Collection
    </button>
  );
}
