import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const registeUser = createAsyncThunk(
  "/register",
  async ({ fullname, email, phone_number,  password }, thunkAPI) => {
    try {
      const response = await AuthService.registeUser(fullname, email, phone_number, password);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await AuthService.login(username, password);
      // return { user: data };
     
      return result ;
    } catch (error) {
      const message =
        (error &&
          error.data &&
          error.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const confirmSignUp = createAsyncThunk(
  "/success-registeration",
  async ({ email, confirm_code }, thunkAPI) => {
    try {
      const result = await AuthService.confirmSignUp(email, confirm_code);
      return result;
    } catch (error) {
      const message =
        (error &&
          error.data &&
          error.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const resendCodeConfirm = createAsyncThunk(
  "/success-registeration/resend",
  async ({ username }, thunkAPI) => {
    try {
      const result = await AuthService.resendCodeConfirm(username);
      return result;
    } catch (error) {
      const message =
        (error &&
          error.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const forgotPassword = createAsyncThunk(
  "/forgot-password",
  async ({username}, thunkAPI) => {
    try {
      const data = await AuthService.forgotPassword(username);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user  }
  : { isLoggedIn: false, user: null, error: null, };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    [registeUser.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      // state.error = null;
    },
    [registeUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
      // state.error = action.payload;
    },
    [confirmSignUp.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [confirmSignUp.rejected]: (state, action) => {
      state.isLoggedIn = false;
      // state.error = action.payload;
    },
    [resendCodeConfirm.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      // state.error = null;
    },
    [resendCodeConfirm.rejected]: (state, action) => {
      state.isLoggedIn = false;
      // state.user = null;
      // state.error = action.payload;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      console.log(JSON.stringify(action.payload), "LOGIN FULFILLED SUCCESSFULLY")
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  // extraReducers: builder => {
  //   builder
  //   .addCase(registeUser.fulfilled, (state, action)=>{
  //     state.isLoggedIn = false;
  //   })
  //   .addCase(registeUser.rejected, (state, action)=>{
  //     state.isLoggedIn = false;
  //   })
  //   .addCase(confirmSignUp.fulfilled, (state, action)=>{
  //     state.isLoggedIn = false;
  //     state.user = action.payload.user;
  //   })
  //   .addCase(confirmSignUp.rejected, (state, action)=>{
  //     state.isLoggedIn = false;
  //     state.user = null;
  //   })
  //   .addCase(login.fulfilled, (state, action)=>{
  //     state.isLoggedIn = true;
  //     state.user = action.payload.user;
  //   })
  //   .addCase(login.rejected, (state, action)=>{
  //     state.isLoggedIn = false;
  //     state.user = null;
  //   })
  //   .addCase(logout.fulfilled, (state, action)=>{
  //     state.isLoggedIn = false;
  //     state.user = null;
  //   })
  //     // .addCase(registeUser.pending, (state) => {
  //     //   state.loading = true;
  //     // })
  //     // .addCase(registeUser.fulfilled, (state, action) => {
  //     //   state.loading = false;
  //     //   state.token = action.payload; // <-- no errors, response is token
  //     // })
  //     // .addCase(registeUser.rejected, (state, action) => {
  //     //   state.loading = false;
  //     //   state.error = action.payload; // <-- error response
  //     // })
  //     // .addCase(verifyToken.pending, (state) => {
  //     //   state.loading = true;
  //     // })
  //     // .addCase(verifyToken.fulfilled, (state, action) => {
  //     //   state.loading = false;
  //     //   state.user = action.payload;
  //     //   state.isAuthenticated = true;
  //     // })
  //     // .addCase(verifyToken.rejected, (state, action) => {
  //     //   state.loading = false;
  //     //   state.error = action.payload;
  //     //   state.isAuthenticated = false;
  //     // });
  // },
});

const { reducer } = authSlice;
export default reducer;
