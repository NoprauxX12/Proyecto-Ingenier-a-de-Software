import React, {useState, useContext} from "react";
import { AuthContext } from "../../providers/userProvider";

const PostCard= (props)=>{
    const {post, cities} = props;
    let style={ display: "flex", float: "left"}
    return(<>
    <div className="card" style={{width: "90%", margin:"auto", marginBottom: "0.5em", paddingBottom: "0"}}>
        <div className="card-header" style={{textAlign: "left"}}>
            <p style={{margin: 0, color: "#3D00B7"}}>{post.name}</p>
        </div>
        <div className="card-body" style={{textAlign: "justify"}}>
            <div style={post.img? style: {height: "100%"}}>
                {post.img !== null && (
                    <img
                    src={`data:image/jpeg;base64,${post.img}`}
                    id="postImg"
                    alt="Profile"
                    style={{ marginRight: "1em" }}
                    />
                )}
                <div>
                    <h5 className="cardty-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                    <p style={{ color: "#55ACEE" }}>{post.city}</p>
                    <a href="/" className="btne_dark" style={{ fontSize: "0.8em" }}>
                    <p style={{ color: "#fff", margin: "0 0.5em", fontWeight: "bold" }}>Cotizar</p>
                    </a>
                </div>
            </div>        
        </div>
    </div>

    </>);
}
export default PostCard;


function GenerateEstimate({cities}){
  const [selectedCity, setSelectedCity] = useState("");
  const {userData} = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    "city": userData.idCity,
    "place": userData.adress,
    "description": null,
    "dateStart":"",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    
  };

    return (<>
    <div className="overlay">
        <div className="deal-box" style={{width: "auto"}}>
            <form action="/">
                <div className="form-group">
                  <label htmlFor="city" className="left form-label mt-4">ciudad donde se realizará el servicio</label>
                  <select onChange={handleChange} className="form-control" style={{ backgroundColor: 'rgb(236, 236, 236)' }} id="exampleFreelancer/client" name="city" >
                  <option value={userData.idCity}>{selectedCity}</option>
                      {cities.length>0 && (
                        cities.map((city) => (<>
                          {city.idCity!==formValues.city && (<>
                            <option value={city.idCity}>{city.name}</option>
                          </>)}
                        </>
                        )
                      )
                      
                      )}
                  </select>
                </div>
                <input type="text" />
                <button> submit</button>
            </form>
        </div>
    </div>
    </>)
}