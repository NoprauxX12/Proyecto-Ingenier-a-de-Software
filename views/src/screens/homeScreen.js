import React from 'react';
import Navbar from '../includes/Navbar';
import ClientsMainContainer from '../includes/mainContainer';
import "../styles/items.css";

function HomeScreen() {
  return (
    <div>
      <Navbar/>
      <ClientsMainContainer/>
    </div>
  );
}

export default HomeScreen;
