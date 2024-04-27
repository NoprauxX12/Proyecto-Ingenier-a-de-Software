import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';
// Crear un contexto para el socket
const SocketContext = createContext();

// Proveedor de contexto que proporciona el socket a toda la aplicación
export const SocketProvider = ({ children }) => {
    const storedUserData = localStorage.getItem('userData');
    const userData =  storedUserData ? JSON.parse(storedUserData) : null;
    const socket = io('http://localhost:3001'); // Establecer la conexión del socket
    socket.emit("join_room", userData.idCard + userData.user);
    if(userData) socket.emit("save_user", {
        user: userData.user, 
        id: userData.idCard + userData.user, 
        socket: socket.id
    });
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// Hook personalizado para acceder al socket desde cualquier componente
export const useSocket = () => useContext(SocketContext);
