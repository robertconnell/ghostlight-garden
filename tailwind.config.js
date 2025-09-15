/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints for better tablet support
        'tablet': '768px',    // iPad and larger tablets
        'desktop': '1024px',  // Desktop and larger screens
        // Keep existing Tailwind breakpoints for compatibility
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        'alex-brush': ['Alex Brush', 'cursive'],
        'ghostlight-font': ['Inter', 'sans-serif'],
        'button-font': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
