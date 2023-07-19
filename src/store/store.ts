import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import { commonApi } from "../api/common/commonApi";

const rootReducer = combineReducers({
  authReducer,
  [commonApi.reducerPath]: commonApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(commonApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
