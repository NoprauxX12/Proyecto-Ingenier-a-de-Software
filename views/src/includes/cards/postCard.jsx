import React from "react";


const PostCard= (props)=>{
    const {post} = props;
    return(<>
    <div className="card" style={{width: "90%", margin:"auto", marginBottom: "0.5em", paddingBottom: "0"}}>
        <div className="card-header" style={{textAlign: "left"}}>
            <p style={{margin: 0, color: "#3D00B7"}}>{post.name}</p>
        </div>
        <div className="card-body" style={{textAlign: "justify"}}>
            <h5 className="cardty-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <p style={{color: "#55ACEE"}}>{post.city}</p>
            <a href="/" className="btne_dark" style={{fontSize: "0.8em", float: "right"}}><p style={{color: "#fff", margin:"0 0.5em", fontWeight: "bold"}}>Cotizar</p></a>
        </div>
    </div>

    </>);
}
export default PostCard;
//<a href="#" className="btn btn-primary">Go somewhere</a>