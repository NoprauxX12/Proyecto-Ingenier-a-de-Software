const path = require('path');

module.exports = {
  // Otras configuraciones de webpack aquí...

  resolve: {
    // Configuración de los polyfills para los módulos faltantes
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/")
    }
  },
  
  // Otras configuraciones de webpack aquí...
};
