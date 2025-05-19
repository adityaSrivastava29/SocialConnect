import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/action/userAction';
import '../../style/aboutUser.css'

const AboutUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.selectedUser);

  useEffect(() => {
    dispatch(fetchUser(1));
  }, [dispatch]);

  if (!user || !user.bio) return <p>Loading about section...</p>;

  return (
    <div className="card-bio">
      <h4>User Bio</h4>
      <p>{user.bio}</p>
      <hr/>
      <h4>CONTACT INFO</h4>
      <p>📧  {user.email}</p>
      <p>📞  {user.mobile}</p>
    </div>
  );
};

export default AboutUser;
