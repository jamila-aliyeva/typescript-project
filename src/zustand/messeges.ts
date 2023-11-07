import { create } from "zustand";
import MessegesType from "../types/messeges";
import { FormInstance } from "antd";
import request from "../server";
import Cookies from "js-cookie";
import { LIMIT, USER_ID } from "../constants";
// import { useState } from "react";

interface MessegesState {
  search: string;
  total: number;
  loading: boolean;
  messages: MessegesType[];
  selected: null | string;
  isModalLoading: boolean;
  isModalOpen: boolean;
  activeTab: string;
  activePage: number;
  page: number;
  limit: number;
  sortingOption: string;
  setActivePage: (page: number) => void;
  setActiveTab: (key: string, form: FormInstance) => void;
  closeModal: () => void;
  handleOk: (form: FormInstance) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showModal: (form: FormInstance) => void;
  handleEdit: (form: FormInstance, id: string) => void;
  handleDelete: (id: string) => void;
  getMessages: (sortingOption: string) => void;
}

const useMessages = create<MessegesState>((set, get) => {
  const setState = (obj: object) => {
    set((state) => ({ ...state, ...obj }));
  };
  return {
    search: "",
    total: 0,
    loading: false,
    messeges: [],
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
      get().getMessages();
    },
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getMessages: async (sortingOption) => {
      try {
        const params = {
          user: Cookies.get(USER_ID),
          search: get().search,
          page: get().activePage,
          limit: LIMIT,
          sort: sortingOption,
        };
        setState({ loading: true });
        const {
          data: { data, pagination },
        } = await request.get("messages", {
          params,
        });
        console.log(data);

        setState({ messages: data, total: pagination.total });
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
          await request.post(`messages`, values);
        } else {
          await request.put(`messages/${selected}`, values);
        }

        get().getMessages();
        form.resetFields();
      } finally {
        setState({ isModalOpen: false, isModalLoading: false });
      }
    },
    handleSearch: (e) => {
      setState({ search: e.target.value });
      get().getMessages(get().sortingOption);
    },
    showModal: (form) => {
      setState({ isModalOpen: true, selected: null });
      form.resetFields();
    },
    handleEdit: async (form, id) => {
      try {
        setState({ selected: id, loading: true, isModalOpen: true });
        const { data } = await request.get(`messages/${id}`);
        form.setFieldValue(data);
      } finally {
        setState({ selected: id, loading: false });
      }
    },
    handleDelete: async (id) => {
      try {
        setState({ loading: true });
        await request.delete(`messages/${id}`);
        get().getMessages();
      } finally {
        setState({ selected: id, loading: false });
      }
    },
  };
});
export default useMessages;
