import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";
import { LIMIT, USER_ID } from "../constants";
import Cookies from "js-cookie";

import UsersyType from "../types/user";
import { AxiosResponse } from "axios";

interface UsersState {
  search: string;
  total: number;
  loading: boolean;
  users: UsersyType[];
  selected: null | string;
  isModalLoading: boolean;
  isModalOpen: boolean;
  activeTab: string;
  activePage: number;
  page: number;
  limit: number;
  photo: AxiosResponse | null;
  uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setActivePage: (page: number) => void;
  setActiveTab: (key: string, form: FormInstance) => void;
  closeModal: () => void;
  handleOk: (form: FormInstance) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showModal: (form: FormInstance) => void;
  handleEdit: (form: FormInstance, id: string) => void;
  handleDelete: (id: string) => void;
  getUsers: () => void;
}

const useUsers = create<UsersState>()((set, get) => {
  const setState = (obj: object) => {
    set((state) => ({ ...state, ...obj }));
  };
  return {
    search: "",
    total: 0,
    loading: false,
    experiences: [],
    activePage: 1,
    activeTab: "1",
    setActiveTab: (key, form) => {
      if (key === "1") {
        form.resetFields();
        set((state) => ({ ...state, selected: null }));
      }
      set((state) => ({ ...state, activeTab: key }));
    },
    setActivePage: (page) => {
      set((state) => ({ ...state, activePage: page }));
      get().getUsers();
    },
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getUsers: async () => {
      try {
        const params = {
          user: Cookies.get(USER_ID),
          search: get().search,
          page: get().activePage,
          limit: LIMIT,
        };
        setState({ loading: true });
        const {
          data: { data, pagination },
        } = await request.get("users", {
          params,
        });

        setState({ users: data, total: pagination.total });
      } finally {
        setState({ loading: false });
      }
    },
    closeModal: () => {
      setState({ isModalOpen: false });
    },
    handleOk: async (form) => {
      try {
        const { selected } = get();
        const values = await form.validateFields();

        setState({ isModalLoading: true });

        if (selected === null) {
          await request.post(`users`, values);
        } else {
          await request.put(`users/${selected}`, values);
        }

        get().getUsers();
        form.resetFields();
      } finally {
        setState({ isModalOpen: false, isModalLoading: false });
      }
    },
    handleSearch: (e) => {
      setState({ search: e.target.value });
      get().getUsers();
    },
    showModal: (form) => {
      setState({ isModalOpen: true, selected: null });
      form.resetFields();
    },
    handleEdit: async (form, id) => {
      try {
        setState({ selected: id, loading: true, isModalOpen: true });
        const { data } = await request.get(`users/${id}`);
        form.setFieldValue(data);
      } finally {
        setState({ selected: id, loading: false });
      }
    },
    handleDelete: async (id) => {
      try {
        setState({ loading: true });
        await request.delete(`users/${id}`);
        get().getUsers();
      } finally {
        setState({ selected: id, loading: false });
      }
    },
    uploadPhoto: async (e: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      formData.append("file", file);
      const data = await request.post("upload", formData);
      set({ photo: data });
    },
  };
});

export default useUsers;
