import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";

import ExperiensesTypes from "../types/experienses";

interface ExperiensesState {
  search: string;
  total: number;
  loading: boolean;
  experiences: ExperiensesTypes[];
  selected: null | string;
  isModalLoading: boolean;
  isModalOpen: boolean;
  closeModal: () => void;
  handleOk: (form: FormInstance) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showModal: (form: FormInstance) => void;
  handleEdit: (form: FormInstance, id: string) => void;
  handleDelete: (id: string) => void;
  getExperienses: () => void;
}

const useExperienses = create<ExperiensesState>()((set, get) => {
  const setState = (obj: object) => {
    set((state) => ({ ...state, ...obj }));
  };
  return {
    search: "",
    total: 0,
    loading: false,
    experiences: [],
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getExperienses: async () => {
      try {
        const { search } = get();
        const params = { search };
        setState({ loading: true });
        const { data } = await request.get<ExperiensesTypes[]>(`experiences`, {
          params,
        });
        setState({ experiences: data.data, total: data.data.length });
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
          await request.post(`experiences`, values);
        } else {
          await request.put(`experiences${selected}`, values);
        }

        get().getExperienses();
        form.resetFields();
      } finally {
        setState({ isModalLoading: false });
      }
    },
    handleSearch: (e) => {
      setState({ search: e.target.value });
      get().getExperienses();
    },
    showModal: (form) => {
      setState({ isModalOpen: true, selected: null });
      form.resetFields();
    },
    handleEdit: async (form, id) => {
      try {
        setState({ selected: id, loading: true, isModalOpen: true });
        const { data } = await request.get(`experiences/${id}`);
        form.setFieldValue(data);
      } finally {
        setState({ selected: id, loading: false });
      }
    },
    handleDelete: async (id) => {
      try {
        setState({ loading: true });
        await request.delete(`experiences/${id}`);
        get().getExperienses();
      } finally {
        setState({ selected: id, loading: false });
      }
    },
  };
});

export default useExperienses;
