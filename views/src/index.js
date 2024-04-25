import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import { SocketProvider } from './providers/socketProvider';
import { AuthProvider } from './providers/userProvider';

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <AuthProvider>
        <App /> {/* Renderiza el componente principal de la aplicación */}
      </AuthProvider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root') // Conecta el componente al elemento con id 'root' en el HTML
);
  