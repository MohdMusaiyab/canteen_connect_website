import React from "react";
import { useSelector } from "react-redux";
const Home = () => {
  // Accessing the currentUser state from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log("Home Page");
  // console.log(currentUser.name, "Current User");

  return (
    <div>
      Home Page
      <h1></h1>
    </div>
  );
};

export default Home;
