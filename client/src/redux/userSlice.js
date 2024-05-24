import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  onlineUser: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state, action) => {
      state._id = "";
      state.name = "";
      state.username = "";
      state.email = "";
      state.profile_pic = "";
      state.token = "";
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
  },
});

export const { setUser, setToken, logOut, setOnlineUser } = userSlice.actions;
export default userSlice.reducer;
