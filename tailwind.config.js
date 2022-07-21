module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      width: {
        '200': '200px',
        '300': '300px',
        '400': '400px',
        '500': '500px',
      },
      height: {
        '200': '200px',
        '300': '300px',
        '400': '400px',
        '500': '500px',
      },
      colors: {
        'primary': '#42a5f5',
        'success': '#7CED5A',
        'danger' : '#ED5F5A',
      },
      fontFamily: {
          lora: "'Lora', serif",
          roboto: "'Roboto', sans-serif"
      },
      backgroundImage: {
        'wave': "url('svgs/wave.svg')",
       }
    },
  },
  plugins: [],
}
