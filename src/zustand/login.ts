// import { create } from "zustand";
// import request from "../server";
// import { TOKEN, USER, USER_ID } from "../constants";
// import Cookies from "js-cookie";
// import { FormInstance } from "antd";
// import { NavigateFunction } from "react-router-dom";

// export interface LoginType {
//   token: string;
//   role: string;
//   username: string;
//   password: string;
// }

// interface LoginState {
//   loading: boolean;
//   isAuthenticated: boolean;
//   user: LoginType[] | null;
//   token: string | null;
//   role: string | null;
//   login: (form: FormInstance, navigate: NavigateFunction) => void;
// }

// const useLogin = create<LoginState>()((set, get) => {
//   return {
//     loading: false,
//     login: async (form, navigate) => {
//       try {
//         set((state) => ({ ...state, loading: true }));
//         const values = await form.validateFields();
//         const { data } = await request.post("auth/login", values);
//         set((state) => ({
//           ...state,
//           token: data.token,
//           user: data,
//           isAuthenticated: true,
//           role: data.user.role,
//         }));
//         if (get().role === "admin") {
//           navigate("/dashboard");
//         } else if (get().role === "client") {
//           navigate("/profiles");
//         } else {
//           navigate("/");
//         }
//         localStorage.setItem(USER, JSON.stringify(data));
//         Cookies.set(TOKEN, data.token);
//         Cookies.set(USER_ID, data.user._id);
//         request.defaults.headers.Authorization = `Bearer ${data.token}`;
//       } finally {
//         set((state) => ({ ...state, loading: false }));
//       }
//     },
//   };
// });
// export default useLogin;
