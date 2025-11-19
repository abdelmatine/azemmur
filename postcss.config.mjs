import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Next.js expects an object where plugins are properties in some setups.
// Exporting this shape avoids the "Malformed PostCSS Configuration" error.
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
