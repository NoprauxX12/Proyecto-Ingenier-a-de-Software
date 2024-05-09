/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useContext} from "react";
import { AuthContext } from "../../providers/userProvider";
import EstimateData from "../../services/estimate";
import { useSocket } from "../../providers/socketProvider";
import MessageData from "../../services/message";

const PostCard= (props)=>{
    const [selectedPost, setSelectedPost]= useState(null);
    const {post} = props;
    let style={ display: "flex", float: "left"}

    const handleClick= (Spost)=>{
      setSelectedPost(Spost);
    }
    const onClose= ()=>{
      setSelectedPost(null);
    }
    return(<>
    {selectedPost!==null && (<>
      <GenerateEstimate post={selectedPost} onClose={onClose} />
    </>)}
    
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
                    <a onClick={()=> handleClick(post)} className="btne_dark" style={{ fontSize: "0.8em" }}>
                    <p style={{ color: "#fff", margin: "0 0.5em", fontWeight: "bold" }}>Cotizar</p>
                    </a>
                </div>
            </div>        
        </div>
    </div>

    </>);
}
export default PostCard;


function GenerateEstimate({post, onClose}){
  const {userData} = useContext(AuthContext);
  const socket= useSocket();
  const [message, setMessage]= useState(`Hola soy ${userData.name} aliado del El Que Sabe y me gustaria tener mas información sobre tu solicitud`);
  const [formValues, setFormValues] = useState({
    "idFreelancer": userData.idCard,
    "idClient": post.idClient,
    "city": post.idCity,
    "place": post.adress,
    "description": post.description,
    "img": post.img,
    "user": 1,
  });

    const handleChange = (e) => {
        const value = e.target.value;
        setMessage(value)
        setFormValues({...formValues});
    };

  const onSubmit= (e)=>{
    e.preventDefault();
    EstimateData.Create(formValues,(res)=>{
      let idToNotify = userData.user==="2"? res.idFreelancer+"1" : res.idClient+"2";
      socket.emit("newEstimate", {autorId: userData.idCard+userData.user,
      receptorId: idToNotify});
            const info = {
                visto: false,
                content: message,
                autor: userData.name,
                room_id: res.id,
                autorId:userData.idCard+userData.user,
                receptorId: post.idClient +"2",
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };
            MessageData.createMessage(info, (res)=>{
                socket.emit("send_message", info); // Emitir el mensaje al servidor 
            })   
            
    })
    setTimeout(200,onClose())
    
  }

    return (<>
    <div className="overlay">
        <div className="deal-box" style={{width: "auto"}}>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="message" className="left form-label mt-4">Mensage inicial (expresa tus dudas o inquietudes)</label>
                  <textarea value={message} 
                  style={{height: "6em"}}
                  onChange={handleChange} 
                  type="text" 
                  name="message" 
                  className="form-control" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp" 
                  placeholder="¿tienes alguna pregunta?"
                  required />
                </div>
                <button type="button" className="botn" id="button_b" onClick={onClose} style={{display: "inline-block", marginBottom: "0.1em"}}>Cancelar</button>
                <button type="submit" className="botn" id="button" style={{display: "inline-block", marginBottom: "0.1em"}}>Enviar</button>
            </form>
        </div>
    </div>
    </>)
}