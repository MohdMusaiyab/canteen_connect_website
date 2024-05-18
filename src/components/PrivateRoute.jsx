import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { signOutUserSuccess } from "../redux/user/userSlice";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for authentication token in cookies
    const userToken = Cookies.get("userToken");

    // If the authentication token is not present, dispatch sign out action
    if (!userToken) {
      // Dispatch action to clear user state
      dispatch(signOutUserSuccess());
    }
  }, [dispatch]);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
