import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload  };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const {setMessage, clearMessage } = actions
export default reducer;








// // create slice

// const name = 'message';
// const initialState = createInitialState();
// const reducers = createReducers();
// const messageSlice = createSlice({ name, initialState, reducers });

// // exports

// // export const alertActions = { ...slice.actions };
// // export const alertReducer = slice.reducer;
// const { reducer, actions } = messageSlice;
// export const { success, error, setMessage, clearMessage } = actions
// export default reducer;

// // implementation

// function createInitialState() {
//     return {
//         value: null
//     }
// }

// function createReducers() {
//     return {
//         success,
//         error,
//         setMessage,
//         clearMessage
//     };

//     // payload can be a string message ('alert message') or 
//     // an object ({ message: 'alert message', showAfterRedirect: true })
//     function success(state, action) {
//         state.value = {
//             type: 'alert-success',
//             message: action.payload?.message || action.payload,
//             showAfterRedirect: action.payload?.showAfterRedirect
//         };
//     }

//     function error(state, action) {
//         state.value = {
//             type: 'alert-danger',
//             message: action.payload?.message || action.payload,
//             showAfterRedirect: action.payload?.showAfterRedirect
//         };
//     }

//     function setMessage (state, action) {
//             return { message: action.payload?.message || action.payload, showAfterRedirect: action.payload?.showAfterRedirect };
//     };

//     function clearMessage(state) {
//         // if showAfterRedirect flag is true the alert is not cleared 
//         // for one route change (e.g. after successful registration)
//         if (state.value?.showAfterRedirect) {
//             state.value.showAfterRedirect = false;
//         } else {
//             state.value = null;
//         }
//     }
// }
