import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";

import Crud from "./crud";
import EducationType from "../types/education";

interface EducationState {
  search: string;
  total: number;
  loading: boolean;
  education: EducationType[];
  selected: null | string;
  isModalLoading: boolean;
  isModalOpen: boolean;
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
    education: [],
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getEducation: async () => {
      try {
        const { search } = get();
        const params = { search };
        setState({ loading: true });
        const { data } = await request.get<EducationType[]>(`education`, {
          params,
        });
        setState({ education: data.data, total: data.data.length });
        console.log(data);
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
          await request.put(`education${selected}`, values);
        }

        get().getEducation();
        form.resetFields();
      } finally {
        setState({ isModalLoading: false });
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
