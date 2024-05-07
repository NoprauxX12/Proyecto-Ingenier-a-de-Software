import React, { useContext, useState, useEffect } from "react";
import ReviewData from "../../services/review";
import { AuthContext } from "../../providers/userProvider";

const ReviewPage = () =>{
    const params = new URLSearchParams(window.location.search);
    const [reviews, setReviews] = useState([]);
    const id = params.get("id");

    useEffect(()=>{
        const fechReviews = async () =>{
            try{
                ReviewData.selectedReviews({id: id}, (responses)=>{
                    if(responses.result){
                        console.log("ola",typeof responses.data)
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
    }, []);


    return(
        <div>
            <h1>Lista de Reseñas</h1>
            {reviews.length > 0 ? (
                reviews.map((review) =>(
                    <div key={review.idFreelancer}>
                        <h4>Puntuación:{review.clientScore}</h4>
                        <h4>Reseña: {review.clientComment}</h4>
                    </div>
                ))
            ) : (
                <p>No hay reseñas disponibles.</p>
            )}
        </div>
    );
    

};

export default ReviewPage;