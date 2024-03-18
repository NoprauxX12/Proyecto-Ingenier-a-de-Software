import React, {useContext} from 'react';
import { AuthContext } from '../providers/userProvider';
import "../styles/items.css";
//components
import Footer from '../includes/Footer';
import ClientsMainContainer from '../includes/containers/mainContainer';
import InfoContainer from "../includes/containers/infoContainer";
import Navbar from '../includes/Navbar';

function HomeScreen() {
  const params = new URLSearchParams(window.location.search);
  const {userData} = useContext(AuthContext);
  const search = params.get('search'); 
  return (
    <div>
      <Navbar/>
      {(search===null && userData===null) && (
          <>
          <InfoContainer/>
          </>
        )}
      {
        (userData===null || userData.user==="2") &&(
          <ClientsMainContainer/>
        )
      }
      <Footer/> 
    </div>
  );
}

export default HomeScreen;
 