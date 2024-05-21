import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state, action) => {
      state._id = "";
      state.username = "";
      state.email = "";
      state.profile_pic = "";
      state.token = "";
    },
  },
});

export const { setUser, setToken, logOut } = userSlice.actions;
export default userSlice.reducer;
