import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import { AuthProvider } from './providers/userProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App /> {/* Renderiza el componente principal de la aplicación */}
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root') // Conecta el componente al elemento con id 'root' en el HTML
);
