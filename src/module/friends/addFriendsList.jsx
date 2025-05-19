import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchUsers } from '../../store/action/userAction';
import '../../style/addFriendsList.css';
import AddFriendModal from './addFriendModal';

const AddFriendsList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.userState.users);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddFriend = (friendData) => {
    dispatch(createUser(friendData));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="friends">
      <h3>Friends</h3>
      <div className="friend-list">
        {users.map(user => (
          <div key={user.id} className="friend-item">
            <img src={user.logo} alt={user.name} />
            <span>{user.name}</span>
          </div>
        ))}
      </div>
      <button className="add-friend-btn" onClick={() => setModalOpen(true)}>
        Add Friend
      </button>

      <AddFriendModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddFriend}
      />
    </div>
  );
};

export default AddFriendsList;
