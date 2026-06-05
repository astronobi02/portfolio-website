/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple:  '#3D2EFF',
        lime:    '#C6F135',
        'purple-dark': '#2a1fd6',
        'lime-dark':   '#afd620',
      },
      fontFamily: {
        display: ["'Space Grotesk'", 'sans-serif'],
        body:    ["'Space Grotesk'", 'sans-serif'],
        mono:    ["'JetBrains Mono'", 'monospace'],
      },
      fontSize: {
        hero: ['clamp(3rem,6vw,5.5rem)', { lineHeight: '1.0', fontWeight: '800' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
