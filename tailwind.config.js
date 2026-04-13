/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ff6a00',
          DEFAULT: '#ff4400', // AliExpress Orange
          dark: '#e63e00',
          contrastText: '#fff'
        },
        secondary: {
          light: '#334155',
          DEFAULT: '#1e293b', // Slate 800
          dark: '#0f172a',
          contrastText: '#fff'
        },
        accent: {
          DEFAULT: '#ef4444', // Red for sales/highlights
        },
        surface: '#ffffff',
        background: '#f8fafc', // Slate 50
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        'large': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'premium-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
