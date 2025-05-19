import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/action/userAction";
import "../../style/userProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.selectedUser);

  useEffect(() => {
    dispatch(fetchUser(1)); // Load user with ID 1 (static for now)
  }, [dispatch]);

  if (!user || !user.name) return <p>Loading profile...</p>;
  
  return (
    <>
      <div className="card">
        <div className="profile-content">
          <img className="logo-img" src={user.logo} alt="Profile logo"/>
          <h2>{user.name}</h2>
          <p>{user.role}</p>
        </div>
        <div className="profile-button">
          <button className="button">Message</button>
          <button className="button">Following</button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
