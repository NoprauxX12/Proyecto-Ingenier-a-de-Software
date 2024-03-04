import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import SignUpScreen from './screens/sign-up/sign-up';
import LoginScreen from './screens/login/loginScreen';

import Urls from "./util/urls";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path={Urls.home} element={<HomeScreen />} />
        <Route path={Urls.singUp} element={<SignUpScreen />} />
        <Route path={Urls.logIn} element={<LoginScreen />}/>
      </Routes>
    </Router>
  );
}

export default App;
