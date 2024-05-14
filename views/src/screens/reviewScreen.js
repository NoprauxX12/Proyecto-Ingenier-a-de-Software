import React, { useEffect } from "react";
import ReviewPage from "../includes/containers/reviews";
import "../styles/reviews.css"


function ReviewScreen() {
    useEffect(()=>{
        document.title= "Reviews"
    });
    return(
        <div>
            <ReviewPage/>
        </div>
    );
};
export default ReviewScreen;