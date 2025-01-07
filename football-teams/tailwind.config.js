// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'stadium': "url('/home/moriyaester/Desktop/resume/Footballs-Teams/football-teams/src/background.jpg')",
      },
      colors: {
        primary: '#32CD32', // Lime green
        secondary: '#000',  // Black
        accent: '#FF6347',  // Red
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
