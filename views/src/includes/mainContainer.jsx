import React, {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../util/apiUrl";

const MainContainer=()=>{
    const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.post(BaseUrl + "/getFreelancers");
        setFreelancers(response.data);
      } catch (error) {
        console.error("Error al obtener freelancers:", error);
      }
    };

    fetchFreelancers();
  }, []); 
    return (
        <div>
        {freelancers.length >0 && (
            <div className="grid">
            {freelancers.map((freelancer) => (
                <article key={freelancer.idFreelancer} className="card product-item itemF">
                    <header className="card__header">
                    <h1 className="product">
                        {freelancer.name}
                    </h1>
                    </header>
                    <div className="card__image">
                    <img src={freelancer.url} alt={freelancer.name} />
                    </div>
                    <div className="card__content">
                    <h2 className="product">
                        $ free
                    </h2>
                    <p className="product__description">
                        {freelancer.description}
                    </p>
                    </div>
                    <div className="card__actions">
                    <a href={"/"} className="btne">Details</a>
                    </div>
                </article>
))}

        </div>
        )}
        {freelancers.length===0 && (
            <h1>No Freelancers Found!</h1>
        )}
    </div>

    );
}

export default MainContainer;