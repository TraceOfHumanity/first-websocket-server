import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    removeActiveUser: (state) => {
      state.activeUser = null;
    },
  },
});

export const { setActiveUser, removeActiveUser } = authSlice.actions;
export default authSlice.reducer;
