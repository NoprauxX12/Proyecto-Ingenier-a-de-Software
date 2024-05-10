import "../../styles/register.css";
import React, { useEffect } from "react";
//components
import MiddleLogoContainer from "../../includes/containers/middleLogoContainer";
import AdminLogin from "./adminLogin";

function AdminHome() {
    useEffect(()=>{
        document.title="log in";
    }, []);
    return (
        <div>
            <MiddleLogoContainer/>
            <div className="mitad div__form">
                <AdminLogin/>
            </div>
        </div>
    )
}

export default AdminHome;