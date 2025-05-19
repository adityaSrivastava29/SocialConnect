import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/action/postAction';
import "../../style/addPost.css";

const AddPost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.selectedUser);
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newPost = {
      message,
      image: previewUrl, // In real-world, upload to server and store URL
      userId: user?.id || 1,
      createdAt: new Date().toISOString(),
    };

    dispatch(createPost(newPost));
    setMessage('');
    setMedia(null);
    setPreviewUrl('');
  };

  return (
    <div className="card-post mt-4">
      <h4>Post something</h4>
      <div className="post-header">
        <img
          src={user?.logo || '/assets/default-avatar.png'}
          alt="User Avatar"
          className="post-avatar"
        />
        <textarea
          className="post-input"
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {previewUrl && (
        <div className="media-preview">
          {media?.type.startsWith('video') ? (
            <video src={previewUrl} controls width="100%" />
          ) : (
            <img src={previewUrl} alt="Preview" />
          )}
        </div>
      )}

      <div className="post-footer">
        <label htmlFor="media-upload" className="upload-btn">
          📎 Upload Media
        </label>
        <input
          id="media-upload"
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
          hidden
        />
        <button className="post-button" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default AddPost;
