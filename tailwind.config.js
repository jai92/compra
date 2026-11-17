// Configuración para compilar los estilos dentro de la APK (así funciona sin internet)
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981', 600: '#059669', 700: '#047857' }
      },
      boxShadow: { xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
      backdropBlur: { xs: '2px' }
    }
  }
};
