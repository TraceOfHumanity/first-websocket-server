import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginPopup: false,
};

const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    toggleLoginPopup: (state) => {
      state.isLoginPopup = !state.isLoginPopup;
    },
  },
});

export const { toggleLoginPopup } = popupsSlice.actions;
export default popupsSlice.reducer;
