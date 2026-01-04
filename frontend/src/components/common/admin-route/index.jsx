import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// const AdminRoute = () => {
//     const { isLoggedIn, user, initialized } = useSelector((state) => state.auth);

//     if (!initialized) return <div className="loader">Loading...</div>;

//     console.log(isLoggedIn, "isLoggedIn in AdminRoute");
//     console.log(user?.role, "role in AdminRoute");
//     console.log(initialized, "initialized in AdminRoute");

//     console.log(`'${user?.role}'`);
//     console.log(user?.role.trim().toLowerCase());


//     if (!isLoggedIn || user?.role?.trim().toLowerCase() !== "admin") {
//         return <Navigate to="/401" replace />;
//     }


//     return <Outlet />;
// };


const isAdmin = '/admin'; 

const AdminRoute = () => {
    const { isLoggedIn, user, initialized } = useSelector((state) => state.auth);
    console.log(window.location.pathname, "window.location.pathname in AdminRoute");
    if (!initialized) return <div className="loader">Loading...</div>;

    if (!isLoggedIn || !user || user.role?.trim().toLowerCase() !== "admin" || !window.location.pathname.includes('/')) {
        return <Navigate to="/401" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
