// import Cookies from "js-cookie";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// import { FormInstance } from "antd";
// import dayjs from "dayjs";
// import request from "../server";
// import { USER_DATA_STATE, USER_ID } from "../constants";

// const crud = <T>(url: string) => {
//   interface ClientOfDataStoreType {
//     loading: boolean;
//     activePage: number;
//     search: string;
//     selected: string | null;
//     data: T[];
//     total: number;
//     activeTab: string;
//     setActivePage: (page: number) => void;
//     setActiveTab: (key: string, form: FormInstance) => void;
//     getData: () => void;
//     handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     deleteData: (id: string) => void;
//     addData: (form: FormInstance) => void;
//     editData: (id: string, form: FormInstance) => void;
//   }

//   return create<ClientOfDataStoreType>()(
//     persist(
//       (set, get) => ({
//         loading: false,
//         data: [],
//         search: "",
//         selected: null,
//         activePage: 1,
//         total: 0,
//         activeTab: "1",
//         setActiveTab: (key, form) => {
//           if (key === "1") {
//             form.resetFields();
//             set((state) => ({ ...state, selected: null }));
//           }
//           set((state) => ({ ...state, activeTab: key }));
//         },
//         setActivePage: (page) => {
//           set((state) => ({ ...state, activePage: page }));
//           get().getData();
//         },
//         getData: async () => {
//           try {
//             const params = {
//               user: Cookies.get(USER_ID),
//               search: get().search,
//               page: get().activePage,
//               limit: LIMIT,
//             };
//             set((state) => ({ ...state, loading: true }));
//             const {
//               data: { data, pagination },
//             } = await request.get(url, {
//               params,
//             });

//             set((state) => ({
//               ...state,
//               data: data,
//               total: pagination.total,
//             }));
//           } finally {
//             set((state) => ({ ...state, loading: false }));
//           }
//         },
//         handleSearch: (e) => {
//           set((state) => ({ ...state, search: e.target.value }));
//           get().getData();
//         },
//         deleteData: async (id) => {
//           try {
//             set((state) => ({ ...state, loading: true }));
//             await request.delete(`${url}/${id}`);
//             get().getData();
//           } finally {
//             set((state) => ({ ...state, loading: false }));
//           }
//         },
//         addData: async (form) => {
//           try {
//             set((state) => ({ ...state, loading: true }));
//             let data = await form.validateFields();
//             if (url === "experiences") {
//               const start = data?.startDate?.toISOString().split("T")[0];
//               const end = data?.endDate?.toISOString().split("T")[0];
//               data = { ...data, startDate: start, endDate: end };
//             }

//             if (get().selected === null) {
//               await request.post(url, data);
//             } else {
//               await request.put(`${url}/${get().selected}`, data);
//             }
//             set((state) => ({ ...state, activeTab: "1", loading: true }));
//             get().getData();
//             form.resetFields();
//           } finally {
//             set((state) => ({ ...state, loading: false }));
//           }
//         },
//         editData: async (id, form) => {
//           try {
//             set((state) => ({ ...state, loading: true, selected: id }));
//             let { data } = await request.get(`${url}/${id}`);
//             if (url === "experiences") {
//               const start = dayjs(data?.startDate);
//               const end = dayjs(data?.endDate);
//               data = { ...data, startDate: start, endDate: end };
//             }
//             form.setFieldsValue(data);
//             set((state) => ({ ...state, activeTab: "2" }));
//           } finally {
//             set((state) => ({ ...state, loading: false }));
//           }
//         },
//       }),
//       {
//         name: USER_DATA_STATE,
//         storage: createJSONStorage(() => localStorage),
//       }
//     )
//   );
// };

// export default crud;
