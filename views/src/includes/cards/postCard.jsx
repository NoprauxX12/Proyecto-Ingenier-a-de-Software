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
            <svg xmlns="http://www.w3.org/2000/svg" width={44} height={34} viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', transform: '', msfilter: ''}}><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width={44} height={34} viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', transform: '', msfilter: ''}}><path d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z" /></svg>
        </div>
    </div>

    </>);
}
export default PostCard;
//<a href="#" className="btn btn-primary">Go somewhere</a>