import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginStatus } from "./store/slices/authSlice";

const AuthInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const { initialized } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!initialized) {
            // Check login cookie/session first
            // dispatch(loginStatus());
            // Fetch the user data if logged in
            dispatch(getUser());
        }
    }, [dispatch, initialized]);

    // Show loader until auth is initialized
    if (!initialized) {
        return <div className="loader">Loading...</div>; // 👈 replace with your spinner
    }

    return children;
};

export default AuthInitializer;
