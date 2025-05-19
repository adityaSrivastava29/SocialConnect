import postApi from '../../api/postAPI';

export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';

export const fetchPosts = () => async (dispatch) => {
  try {
    const data = await postApi.get(); 
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (err) {
    console.error('Failed to fetch posts:', err);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const newPost = await postApi.create(postData);
    dispatch({ type: ADD_POST, payload: newPost });
  } catch (err) {
    console.error('Failed to create post:', err);
  }
};
