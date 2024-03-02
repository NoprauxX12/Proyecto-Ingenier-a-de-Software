import React from 'react';
import Navbar from '../includes/Navbar';
import ClientsMainContainer from '../includes/mainContainer';
import "../styles/items.css";
import Footer from '../includes/Footer';

function HomeScreen() {
  return (
    <div>
      <Navbar/>
      <ClientsMainContainer/>
      <Footer/>
    </div>
  );
}

export default HomeScreen;
