import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isOpen: false
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload?.message || action.payload, showAfterRedirect: action.payload?.showAfterRedirect };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const {setMessage, clearMessage } = actions
export default reducer;
