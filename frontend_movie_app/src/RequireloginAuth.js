import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";

const RequireloginAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
            ?<Navigate to="/about" state={{ from: location }} replace />
            
                
                : <Outlet />
    );
}


export default RequireloginAuth;