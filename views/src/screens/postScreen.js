import React, { useEffect } from "react";
import "../styles/post.css"
//components
import Postform from "../includes/forms/post";

function PostPage() {
    useEffect(()=>{
        document.title="create-post";
    })
    return(
        <div>
            <Postform/>
        </div>
    );
};

export default PostPage;