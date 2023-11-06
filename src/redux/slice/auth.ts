import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { TOKEN, USER } from "../../constants";

interface AuthState {
  isAuthenticated: boolean;
  user: null | undefined;
}
const initialState: AuthState = {
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  user: JSON.parse(localStorage.getItem(USER)),
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuth(state, { payload }) {
      state.isAuthenticated = true;
      state.user = payload;
    },
    removeAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const { name, reducer: authReducer } = authSlice;

const { setAuth, removeAuth } = authSlice.actions;

export { name as authName, setAuth, removeAuth, authReducer as default };
