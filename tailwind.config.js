/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF3D4A',
        secondary: '#8B1300',
        'text-heading': '#333333',
        'text-body': '#000000',
        'text-on-dark': '#FFFFFF',
        'hover-background': '#f2f2f2',
        'focus': '#8B1300',
        'ingredients-background': '#FFF9E8',
      },
      fontFamily: {
        'body': ['Lexend', 'sans-serif'],
        'heading': ['Madimi One', 'cursive'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
        '5xl': '60px',
        '6xl': '80px',
        '7xl': '120px',
      },
      fontSize: {
        'xs': '0.625rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      lineHeight: {
        'tight': '100%',
        'snug': '125%',
        'normal': '150%',
        'relaxed': '175%',
        'loose': '200%',
      },
    },
  },
  plugins: [],
} 