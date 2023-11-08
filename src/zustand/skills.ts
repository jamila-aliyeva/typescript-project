import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";
import SkillType from "../types/skills";
import { LIMIT, USER_ID } from "../constants";
import Cookies from "js-cookie";

interface SkillsState {
  search: string;
  total: number;
  loading: boolean;
  skills: SkillType[];
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
  getSkills: () => void;
  getUserSkills: () => void;
}

const useSkills = create<SkillsState>()((set, get) => {
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
    setActivePage: async (page) => {
      set((state) => ({ ...state, activePage: page }));
      get().getSkills();
    },
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getSkills: async () => {
      try {
        const params = {
          user: Cookies.get(USER_ID),
          search: get().search,
          page: get().activePage,
          limit: LIMIT,
        };
        setState({ loading: true });
        const {
          data: {
            data,
            pagination: { total },
          },
        } = await request.get("skills", {
          params,
        });

        setState({ skills: data, total: total });
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
          await request.post(`skills`, values);
        } else {
          await request.put(`skills/${selected}`, values);
        }

        get().getSkills();
        form.resetFields();
      } finally {
        setState({ isModalOpen: false, isModalLoading: false });
      }
    },
    handleSearch: (e) => {
      setState({ search: e.target.value });
      get().getSkills();
    },
    showModal: (form) => {
      setState({ isModalOpen: true, selected: null });
      form.resetFields();
    },
    handleEdit: async (form, id) => {
      try {
        setState({ selected: id, loading: true, isModalOpen: true });
        const { data } = await request.get(`skills/${id}`);
        form.setFieldValue(data);
      } finally {
        setState({ selected: id, loading: false });
      }
    },
    handleDelete: async (id) => {
      try {
        setState({ loading: true });
        await request.delete(`skills/${id}`);
        get().getSkills();
      } finally {
        setState({ selected: id, loading: false });
      }
    },
  };
});

export default useSkills;
