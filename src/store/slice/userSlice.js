import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersApi from "../../api/usersAPI";

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async () => {
    const response = await usersApi.get(1);
    return response;
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    const response = await usersApi.get();
    return response;
  }
);

const initialState = {
  userData: {},
  users: [],
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const { } = counterSlice.actions;
export default userSlice.reducer;
