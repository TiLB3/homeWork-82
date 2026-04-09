import type {
  GlobalError,
  IUser, LoginMutation,
  RegisterMutation,
  ValidationError
} from "../../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../../app/store.ts";
import {axiosApi} from "../../../axiosApi.ts";
import {isAxiosError} from "axios";
import {toast} from "react-toastify";

interface UsersSlice {
  user: IUser | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersSlice = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
}

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loginLoading = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loginLoading = false;
    });
  }
});

export const register = createAsyncThunk<
  IUser,
  RegisterMutation,
  { rejectValue: ValidationError }
>(
  "user/register",
  async (registerMutation, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post<IUser>("/users", registerMutation);

      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  });

export const login = createAsyncThunk<
  IUser,
  LoginMutation,
  { rejectValue: GlobalError }
>(
  "user/login",
  async (loginMutation, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post<{message: string, user: IUser }>("/users/sessions", loginMutation);

      return user.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  });

export const logout = createAsyncThunk(
  "user/logout",
  async () => {
    const response = await axiosApi.delete<{message: string}>("users/sessions");
    toast.success(response.data.message);
  }
)


export const getUser = (state: RootState) => state.user.user;
export const getRegisterLoading = (state: RootState) => state.user.registerLoading;
export const getRegisterError = (state: RootState) => state.user.registerError;
export const getLoginError = (state: RootState) => state.user.loginError;
export const getLoginLoading = (state: RootState) => state.user.loginLoading;

export const userReducer = usersSlice.reducer;