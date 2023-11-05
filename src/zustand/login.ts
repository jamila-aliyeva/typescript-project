import { create } from "zustand";
import request from "../server";
import { USER } from "../constants";
import Cookies from "js-cookie";
import { FormInstance } from "antd";

interface LoginState {
  role: string;
  login: (form: FormInstance) => void;
}

const useLogin = create<LoginState>()((set, get) => {
  return {
    loading: false,
    login: async (form, navigate) => {
      const value = form.validateFields();
      const res = await request.post("auth/login", value);

      set((state) => ({
        ...state,
        token: res.data.token,
        user: res.data,
        isAuthenticated: true,
        role: res.data.user.role,
      }));
      if (get().role === "admin") {
        navigate("dashboard");
      } else if (get().role === "user") {
        navigate("/user");
      } else {
        navigate("/");
      }
      localStorage.setItem(USER, JSON.stringify(res.data));
      Cookies.set(USER, res.data.token);
      request.defaults.headers.Authorization = `Bearer ${res.data.token}`;
    },
  };
});
export default useLogin;
