import React, { useContext, useState, useEffect } from "react";
import ReviewData from "../../services/review";

const ReviewPage = () => {
    const params = new URLSearchParams(window.location.search);
    const [reviews, setReviews] = useState([]);
    const id = params.get("id");    

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                ReviewData.selectedReviews({ id: id }, (responses) => {
                    if (responses.result) {
                        setReviews(responses.data);
                    } else {
                        console.error("Error al obtener Reseñas");
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchReviews();
    }, [id]);


    const handelclick =() =>{
        window.location.href = '/';
    }


    return (
        <div className="review-container">
            <i className="bx bx-chevron-left icon-left" onClick={handelclick}></i>
            <h1><span style={{color: "#3D00B7"}}>Lista de </span> <span style={{color: "#55ACEE"}}>Reseñas</span></h1>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div className="review-box" key={review.idFreelancer}>
                        <h4><i className='bx bxs-star bx-spin' style={{color: "#3D00B7"}} ></i>Puntuación: {review.clientScore}</h4>
                        <h4><i className='bx bx-glasses bx-tada' style={{color: "#55ACEE"}} ></i>Descripción: {review.clientComment}</h4>
                    </div>
                ))
            ) : (
                <p>No hay reseñas disponibles.</p>
            )}
        </div>
    );
};

export default ReviewPage;