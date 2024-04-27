import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import SignUpScreen from './screens/sign-up/sign-up';
import LoginScreen from './screens/login/loginScreen';
import Urls from "./util/urls";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/App.css";
import "./styles/profile.css"
import UploadPhotoScreen from './screens/Uploadphoto/photoScreen';
import PostPage from './screens/postScreen'
import ViewProfile from './screens/profile/viewProfile';
import EditProfile from './screens/profile/editProfile';
import Chat from './screens/chat/chatScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Urls.viewProfile} element={<ViewProfile/>}/>
        <Route path={Urls.editProfile} element={<EditProfile/>}/>
        <Route path={Urls.photo}element={<UploadPhotoScreen/>}/>
        <Route path={Urls.home} element={<HomeScreen />} />
        <Route path={Urls.signUp} element={<SignUpScreen />}/>
        <Route path={Urls.logIn} element={<LoginScreen />}/>
        <Route path={Urls.post} element = {<PostPage />}/>
        <Route path={Urls.chat} element = {<Chat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
