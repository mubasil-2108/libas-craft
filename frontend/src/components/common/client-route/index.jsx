import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ClientRoute = ({ children }) => {
    const { isLoggedIn, user, initialized } = useSelector((state) => state.auth);

    if (!initialized) return <div className="loader">Loading...</div>;

    // if (!isLoggedIn) return <Navigate to="/401" replace />;
    // 🚫 Admin should never see client pages
    if (isLoggedIn && user?.role?.toLowerCase() === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ClientRoute;
