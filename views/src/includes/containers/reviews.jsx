import React, { useState, useEffect } from "react";
import ReviewData from "../../services/review";
import Urls from "../../util/urls";

const ReviewPage = () =>{
    const params = new URLSearchParams(window.location.search);
    const [reviews, setReviews] = useState([]);
    const id = params.get("id");

    useEffect(()=>{
        const fechReviews = async () =>{
            try{
                ReviewData.selectedReviews({id: id}, (responses)=>{
                    if(responses.result){
                        setReviews(responses.data);
                    }else{
                        console.error("Error al obtener Reseñas");
                    }
                })
            }catch (error){
                console.log(error);
            }
        };
        fechReviews();
    }, [id]);


    return(
        <div>
            <h1>Lista de Reseñas</h1> 
            <a style={{float: "right", marginTop: "-2em"}} href={Urls.viewProfile+`/?id=${id}&usertype=1`}>
                <i class='bx bx-chevron-left' style={{color: '#7d7d7d', fontSize: "4em"}} ></i>
            </a>
            {reviews.length > 0 ? (
                reviews.map((review) =>(
                    <div key={review.idFreelancer} style={{margin: "1.5em"}}>
                        <h4>Puntuación:{review.clientScore}</h4>
                        <h4>Reseña:</h4>
                        <p>{review.clientComment}</p>
                    </div>
                ))  
            ) : (
                <p>No hay reseñas disponibles.</p>
            )}
        </div>
    );
    

};

export default ReviewPage;