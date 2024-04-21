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
import ProfileScreen from './screens/profile/profileScreen';
import Chat from './screens/chat/chat'
import Screenchat from './screens/chat/screenchat';
import HomeChatBot from './screens/chat/chatBot/homeChatbot';


function App() {
  return (
    <Router>
      <Routes>
        <Route path={Urls.profile} element={<ProfileScreen/>} />
        <Route path={Urls.photo}element={<UploadPhotoScreen/>}/>
        <Route path={Urls.home} element={<HomeScreen />} />
        <Route path={Urls.signUp} element={<SignUpScreen />} />
        <Route path={Urls.logIn} element={<LoginScreen />}/>
        <Route path='/post' element = {<PostPage />}/>
        <Route path='/chat' element = {<Chat/>}/>
        <Route path={Urls.Screenchat} element = {<Screenchat/>}/>
        <Route path='/chatBot' element = {<HomeChatBot/>}/>

      </Routes>
    </Router>
  );
}

export default App;
