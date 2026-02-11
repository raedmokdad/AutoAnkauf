export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4D00', // Energetic Orange
          hover: '#CC3D00',
        },
        dark: {
          DEFAULT: '#0F172A', // Slate 900
          lighter: '#1E293B', // Slate 800
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
