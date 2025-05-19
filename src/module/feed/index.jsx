import React, { useEffect, useState } from "react";
import "../../style/feeds.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/action/postAction";
import { fetchUsers } from "../../store/action/userAction";

const Feeds = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postState.posts);
  const users = useSelector((state) => state.userState.users);

  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [replyLikes, setReplyLikes] = useState({});
  const [nestedReplies, setNestedReplies] = useState({});
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUser = (userId) => users.find((user) => user.id === userId);

  const handleLike = (postId) => {
    const isLiked = likedItems[`post-${postId}`];

    setLikes((prev) => ({
      ...prev,
      [postId]: isLiked ? (prev[postId] || 1) - 1 : (prev[postId] || 0) + 1,
    }));

    setLikedItems((prev) => ({
      ...prev,
      [`post-${postId}`]: !isLiked,
    }));
  };

  const handleAddComment = (postId) => {
    const newComment = commentInputs[postId]?.trim();
    if (!newComment) return;

    const comment = {
      id: Date.now(),
      userId: 1,
      text: newComment,
      replies: [],
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }));

    setCommentInputs((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  const handleReply = (postId, commentId, replyText) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      text: replyText,
      userId: 1,
      likes: 0,
      subReplies: [],
    };

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, reply],
            }
          : comment
      ),
    }));
  };

  const handleLikeReply = (replyId) => {
    const isLiked = likedItems[`reply-${replyId}`];

    setReplyLikes((prev) => ({
      ...prev,
      [replyId]: isLiked ? (prev[replyId] || 1) - 1 : (prev[replyId] || 0) + 1,
    }));

    setLikedItems((prev) => ({
      ...prev,
      [`reply-${replyId}`]: !isLiked,
    }));
  };

  const handleNestedReply = (postId, commentId, replyId, text) => {
    if (!text.trim()) return;

    const newSubReply = {
      id: Date.now(),
      userId: 1,
      text,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) => {
        if (comment.id !== commentId) return comment;

        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === replyId
              ? {
                  ...reply,
                  subReplies: [...(reply.subReplies || []), newSubReply],
                }
              : reply
          ),
        };
      }),
    }));

    setNestedReplies((prev) => ({
      ...prev,
      [replyId]: "",
    }));
  };

  return (
    <div className="card-post mt-4 mb-5">
      <h4 className="feed-title">News Feed</h4>
      <hr/>
      {posts.map((post) => {
        const user = getUser(post.userId);
        const postComments = comments[post.id] || [];

        return (
          <div key={post.id} className="feed-card">
            <div className="feed-card-header">
              <img
                src={user?.logo || "/assets/default-avatar.png"}
                alt={user?.name}
                className="feed-avatar"
              />
              <div>
                <strong>{user?.name || "Unknown"}</strong>
                <div className="feed-time">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="feed-card-body">
              <p className="feed-message">{post.message}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="feed-post-image" />
              )}
            </div>

            <div className="feed-actions">
              <button onClick={() => handleLike(post.id)}>
                {likedItems[`post-${post.id}`] ? "👎 Unlike" : "👍 Like"} (
                {likes[post.id] || 0})
              </button>
            </div>

            <div className="feed-comments">
              <input
                type="text"
                value={commentInputs[post.id] || ""}
                placeholder="Write a comment..."
                onChange={(e) =>
                  setCommentInputs((prev) => ({
                    ...prev,
                    [post.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && handleAddComment(post.id)
                }
              />
              <button onClick={() => handleAddComment(post.id)}>Post</button>

              {postComments.map((comment) => {
                const user = getUser(comment.userId);

                return (
                  <div key={comment.id} className="comment">
                    <strong>{user?.name || "User"}</strong>: {comment.text}
                    {/* Comment Actions */}
                    <div className="reply-actions">
                      <button onClick={() => handleLikeReply(comment.id)}>
                        👍 Like ({replyLikes[comment.id] || 0})
                      </button>
                    </div>
                    {/* Comment Reply Input */}
                    <div className="nested-reply-input">
                      <input
                        placeholder="Reply to comment..."
                        value={nestedReplies[comment.id] || ""}
                        onChange={(e) =>
                          setNestedReplies((prev) => ({
                            ...prev,
                            [comment.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleReply(
                            post.id,
                            comment.id,
                            nestedReplies[comment.id]
                          )
                        }
                      />
                    </div>
                    {/* Replies */}
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply">
                        <strong>{getUser(reply.userId)?.name || "User"}</strong>
                        : {reply.text}
                        {/* Reply Actions */}
                        <div className="reply-actions">
                          <button onClick={() => handleLikeReply(reply.id)}>
                            {likedItems[`reply-${reply.id}`]
                              ? "👎 Unlike"
                              : "👍 Like"}{" "}
                            ({replyLikes[reply.id] || 0})
                          </button>
                        </div>
                        {/* Nested replies (one-level deep) */}
                        {(reply.subReplies || []).map((r) => (
                          <div key={r.id} className="nested-reply">
                            <strong>{getUser(r.userId)?.name || "User"}</strong>
                            : {r.text}
                          </div>
                        ))}
                        {/* Nested reply input */}
                        <div className="nested-reply-input">
                          <input
                            placeholder="Reply..."
                            value={nestedReplies[reply.id] || ""}
                            onChange={(e) =>
                              setNestedReplies((prev) => ({
                                ...prev,
                                [reply.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleNestedReply(
                                post.id,
                                comment.id,
                                reply.id,
                                nestedReplies[reply.id]
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feeds;
