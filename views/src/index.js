import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa el componente principal de la aplicación
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App /> {/* Renderiza el componente principal de la aplicación */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // Conecta el componente al elemento con id 'root' en el HTML
);
