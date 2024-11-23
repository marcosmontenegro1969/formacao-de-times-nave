/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        43: '10.75rem', // Personalizado para mt-42
      },
      colors: {
        light_green_nave: '#A8D53F',
        dark_green_nave: '#008C45',
        dark_grey_nave: '#4F4F4F',
        blue_flagPE: '#3155A4',
        yellow_flagPE: '#FFB511',
        red_flagPE: '#C34342',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)' },
          '50%': { transform: 'scale(1.1)', boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.2)' },
        },
      },
      animation: {
        pulse: 'pulse 1s infinite',
      },
    },
  },
  plugins: [],
};
