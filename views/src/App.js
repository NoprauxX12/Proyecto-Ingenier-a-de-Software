import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import SignUpScreen from './screens/sign-up/sign-up';

import "./styles/App.css";
import LoginScreen from './screens/login/loginScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
        <Route path='/log-in' element={<LoginScreen />}/>
      </Routes>
    </Router>
  );
}

export default App;
