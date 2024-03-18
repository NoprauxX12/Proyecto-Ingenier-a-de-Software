import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/userProvider';
import { useNavigate } from 'react-router-dom'; 
import "../styles/items.css";
//components
import Footer from '../includes/Footer';
import ClientsMainContainer from '../includes/containers/mainContainer';
import InfoContainer from "../includes/containers/infoContainer";
import Navbar from '../includes/Navbar';
import { FaPlus } from 'react-icons/fa';

function HomeScreen() {
  const navigate = useNavigate(); 
  const params = new URLSearchParams(window.location.search);
  const { userData, isLoggedIn } = useContext(AuthContext);
  const search = params.get('search');

  useEffect(() =>{
    if(!isLoggedIn){
      navigate('/'); 
    }
  }, [isLoggedIn, navigate]); 

  const handleButtonClick = () => {
    if(isLoggedIn){
      navigate('/post'); 
    }
  };
  
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />
      {(search === null && userData === null) && (
        <>
          <InfoContainer />
        </>
      )}
      {
        (userData === null || userData.user === "2") && (
          <ClientsMainContainer />
        )
      }
      <Footer />
      {(userData && userData.user === '2') && (<> <div 
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button className="circular-button" onClick={handleButtonClick}>
          <FaPlus style={{ color: '#55ACEE' }} />
        </button>
      </div>
      </>)}
      
    </div>
  );
}

export default HomeScreen;
