/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#286696","700":"#286696","800":"#1e40af","900":"#1e3a8a"}
      }
    },
  },
  plugins: [],
};
