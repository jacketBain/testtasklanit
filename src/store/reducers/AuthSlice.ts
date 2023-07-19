import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AuthService from "../../service/AuthService";
import { IUser } from "../../api/auth/interface";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  } as {
    user: null | IUser;
    token: null | string;
  },
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, setUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authReducer.user;
export const selectCurrentToken = (state: RootState) => state.authReducer.token;
