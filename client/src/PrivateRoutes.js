import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import { Outlet } from "react-router";

function PrivateRoutes() {

    const { currentUser } = useContext(UserContext);

    // console.debug("Private Routes", "currentUser=", currentUser);


    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;