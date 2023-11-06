import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Children from "../types/childer";
import authReducer, { authName } from "./slice/auth";
import usersQuery, { usersName, usersReducer } from "./query/user";
import authQuery, {
  authAccountName,
  authAccountReducer,
} from "./query/account";

const reducer = {
  [authName]: authReducer,
  [usersName]: usersReducer,
  [authAccountName]: authAccountReducer,
};

const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersQuery.middleware, authQuery.middleware),
});

const StoreProvider = ({ children }: Children) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
