import React, {useContext} from "react";
import { AuthContext } from "../../providers/userProvider";

function LoginScreen() {
    const {userData} = useContext(AuthContext);
    console.log(userData.name);
    return (
        <div>
            <h1>welcome {userData.name}</h1>
        </div>
    )
}

export default LoginScreen;
