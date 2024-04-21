/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/userProvider';
import { useNavigate } from 'react-router-dom'; 
import "../styles/items.css";
//data
import TownData from '../services/towns';
import UserData from "../services/user";
import PostData from "../services/postData";
//components
import Footer from '../includes/Footer';
import ClientsMainContainer from '../includes/containers/mainContainer';
import InfoContainer from "../includes/containers/infoContainer";
import Navbar from '../includes/navs/Navbar';
import SiderBar from '../includes/navs/SiderBar';
import Card from '../includes/cards/freelancerCard';
import PostCard from '../includes/cards/postCard';
import ElQueSabeChatbot from './chat/chatBot/homeChatbot';

function HomeScreen() {
  const navigate = useNavigate(); 
  const params = new URLSearchParams(window.location.search);
  const { userData, isLoggedIn } = useContext(AuthContext);
  const [search, setSearch] = useState(params.get('search'));

  const handleButtonClick = () => {
    if(isLoggedIn){
      navigate('/post'); 
    }
  };
  const [posts, setPosts] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [cityes, setCytyes] = useState([]);
  const [name, setName]= useState("Ciudad");
  const [selectedCity, setSelectedCity] = useState("00");
  const mt = (userData===null || userData==="2")? "1em":"3em";

  useEffect(() => {
    document.title="Home";
    
    const fetchCityes = async () => {
        TownData.fetchCityes((res) => {
          setCytyes(res); // Aquí accedes a res.data en lugar de res
        });
      
    };

    const fetchFreelancers = async () => {
      UserData.fetchFreelancers({keyword: search, city: selectedCity}, (res)=>{
        setFreelancers(res);
      })
    };

    const FetchPosts = async ()=>{
      PostData.getPost(selectedCity!=="00"? selectedCity: null, search, (res)=>{
        if(res) setPosts(res);
      });
    }
    if(userData === null || userData.user === "2"){
      fetchCityes();
    }else{
      fetchCityes();
      FetchPosts();
    }
    fetchFreelancers();
    const params = new URLSearchParams(window.location.search);
    const valor = params.get('search'); 
    // Actualizar el estado con el valor obtenido
    setSearch(valor);
  },[search, selectedCity, userData]); 
  
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {userData === null || userData.user==="2" ? (<>
        <Navbar />
      </>):(<>
        <SiderBar/>
      </>)}
      
      {(search === null && userData === null) && (
        <>
          <InfoContainer />
        </>
      )}
      {
        (userData === null || userData.user === "2") && (
          <ClientsMainContainer  search={search}/>
        )
      }
      <div className="card text-center shadow-none border-none" style={{width: "95%", margin: "auto", marginTop: mt}}>
          <div className="card-header border-none" style={{paddingLeft: "2em"}}>
            <ul className="nav nav-pills card-header-pills">
              <li className="nav-item">
                <p style={{marginRight: "0.3em", marginTop: "0.2em"}}><i class='bx bx-menu-alt-left'></i>Filtros: </p>
              </li>
              <li className="nav-item">
                <div className="dropdown" style={{ display: "inline-block" }}>
                  <button className="btne dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ display: "inline", fontSize: "0.8em" }}>
                    {name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-start" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {selectedCity!=="00" && (<>
                      <li key={"00"}>
                        <a className="dropdown-item" onClick={() => { 
                            setName("Ciudad");
                            setSelectedCity("00");
                          }}>Todas</a>
                      </li>
                    </>)} 
                    {cityes.length > 0 ? (
                      cityes.map((city) => (
                        <li key={city.idCity}>
                          <a className="dropdown-item" onClick={() => { 
                            setName(city.name);
                            setSelectedCity(city.idCity);
                          }}>
                            {city.name}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li>No hay ciudades disponibles</li>
                    )}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding: "2em"}}>
              {(userData===null || userData.user==="2")? (<>
                {freelancers.length>0 ? (
                <>
                {freelancers.map((freelancer) => (
                  <Card freelancer={freelancer}/> 
                ))}
                
              </>
              ): (
              <>
              <h2 style={{margin: "4em 0"}}>No se han encontrado freelancers</h2>
              </>)}
              </>):(<>
                {posts.length>0 ? (
                <>
                {posts.map((post) => (
                    <PostCard post={post}/>  
                ))}
                
                </>
                ): (
                <>
                <h2 style={{margin: "4em 0"}}>No se han encontrado posts</h2>
                </>)}
              </>)}
              
          </div>

        </div>
      <Footer />
      {(userData && userData.user === '2') && (<> <div 
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button className="circular-button" onClick={handleButtonClick}>
          <i className="bx bx-plus-medical" style={{color: '#ffffff'}} />

        </button>
      </div>
      </>)}
      <ElQueSabeChatbot/>
    </div>
  );
}

export default HomeScreen;
