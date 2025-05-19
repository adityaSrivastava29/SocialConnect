import {
    FETCH_USERS,
    FETCH_USER,
    UPDATE_USER,
    ADD_USER,
  } from '../action/userAction';
  
  const initialState = {
    users: [],
    selectedUser: {},
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS:
        return { ...state, users: action.payload };
      case FETCH_USER:
        return { ...state, selectedUser: action.payload };
      case UPDATE_USER:
        return { ...state, selectedUser: action.payload };
      case ADD_USER:
        return { ...state, users: [...state.users, action.payload] };
      default:
        return state;
    }
  };
  
  export default userReducer;
  