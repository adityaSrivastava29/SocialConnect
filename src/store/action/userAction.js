import usersApi from '../../api/usersAPI';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_USER = 'ADD_USER';

export const fetchUsers = () => async (dispatch) => {
  try {
    const data = await usersApi.get();
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (err) {
    console.error('Failed to fetch users:', err);
  }
};

export const fetchUser = (id) => async (dispatch) => {
  try {
    const data = await usersApi.get(id);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (err) {
    console.error('Failed to fetch user:', err);
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const data = await usersApi.update(id, userData);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (err) {
    console.error('Failed to update user:', err);
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const newUser = await usersApi.create(userData);
    dispatch({ type: ADD_USER, payload: newUser });
  } catch (err) {
    console.error('Failed to add user:', err);
  }
};
