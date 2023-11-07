import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";
import { LIMIT, USER_ID } from "../constants";
import Cookies from "js-cookie";
import EducationType from "../types/education";

interface EducationState {
  search: string;
  total: number;
  loading: boolean;
  education: EducationType[];
  selected: null | string;
  isModalLoading: boolean;
  isModalOpen: boolean;
  activeTab: string;
  activePage: number;
  page: number;
  limit: number;  
  setActivePage: (page: number) => void;
  setActiveTab: (key: string, form: FormInstance) => void;
  closeModal: () => void;
  handleOk: (form: FormInstance) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showModal: (form: FormInstance) => void;
  handleEdit: (form: FormInstance, id: string) => void;
  handleDelete: (id: string) => void;
  getEducation: () => void;
}

const useEducation = create<EducationState>()((set, get) => {
  const setState = (obj: object) => {
    set((state) => ({ ...state, ...obj }));
  };
  return {
    search: "",
    total: 0,
    loading: false,
    skills: [],
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
      get().getEducation();
    },
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getEducation: async () => {
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
        } = await request.get("education", {
          params,
        });

        setState({ education: data, total: pagination.total });
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
          await request.post(`education`, values);
        } else {
          await request.put(`education/${selected}`, values);
        }

        get().getEducation();
        form.resetFields();
      } finally {
        setState({ isModalOpen: false, isModalLoading: false });
      }
    },
    handleSearch: (e) => {
      setState({ search: e.target.value });
      get().getEducation();
    },
    showModal: (form) => {
      setState({ isModalOpen: true, selected: null });
      form.resetFields();
    },
    handleEdit: async (form, id) => {
      try {
        setState({ selected: id, loading: true, isModalOpen: true });
        const { data } = await request.get(`education/${id}`);
        form.setFieldValue(data);
      } finally {
        setState({ selected: id, loading: false });
      }
    },
    handleDelete: async (id) => {
      try {
        setState({ loading: true });
        await request.delete(`education/${id}`);
        get().getEducation();
      } finally {
        setState({ selected: id, loading: false });
      }
    },
  };
});

export default useEducation;
