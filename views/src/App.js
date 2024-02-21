import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import SignUpScreen from './screens/sign-up/sign-up';
import SignUpFreelancer from './screens/sign-up/sign-up-freelancer'
import SingUpClient from './screens/sign-up/sign-up-client';

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
        <Route  path='/sign-up-freelancer' element={<SignUpFreelancer/>}/>
        <Route path='/sign-up-client' element= {<SingUpClient/>}/>
      </Routes>
    </Router>
  );
}

export default App;
