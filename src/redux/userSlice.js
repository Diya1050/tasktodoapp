import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,  // Stores user details
  isAuthenticated: false,  // To track if user is logged in or not
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action) => {
      // Store user details on signup
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      // Login action to authenticate user
      const user = state.user;
      if (user && user.email === action.payload.email && user.password === action.payload.password) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signup, login, logout } = userSlice.actions;

export default userSlice.reducer;
