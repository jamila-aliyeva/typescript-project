import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";

import PortfoliosType from "../types/porfolios";

interface PortfoliosState {
  search: string;
  total: number;
  loading: boolean;
  portfolios: PortfoliosType[];
  selected: null | string;
  isModalLoading: boolean;
  isModalOpen: boolean;
  closeModal: () => void;
  handleOk: (form: FormInstance) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showModal: (form: FormInstance) => void;
  handleEdit: (form: FormInstance, id: string) => void;
  handleDelete: (id: string) => void;
  getPortfolios: () => void;
}

const usePorfolios = create<PortfoliosState>()((set, get) => {
  const setState = (obj: object) => {
    set((state) => ({ ...state, ...obj }));
  };
  return {
    search: "",
    total: 0,
    loading: false,
    portfolios: [],
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getPortfolios: async () => {
      try {
        const { search } = get();
        const params = { search };
        setState({ loading: true });
        const { data } = await request.get<PortfoliosType[]>(`portfolios`, {
          params,
        });
        setState({ portfolios: data.data, total: data.data.length });
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
          await request.post(`portfolios`, values);
        } else {
          await request.put(`portfolios${selected}`, values);
        }

        get().getPortfolios();
        form.resetFields();
      } finally {
        setState({ isModalLoading: false });
      }
    },
    handleSearch: (e) => {
      setState({ search: e.target.value });
      get().getPortfolios();
    },
    showModal: (form) => {
      setState({ isModalOpen: true, selected: null });
      form.resetFields();
    },
    handleEdit: async (form, id) => {
      try {
        setState({ selected: id, loading: true, isModalOpen: true });
        const { data } = await request.get(`portfolios/${id}`);
        form.setFieldValue(data);
      } finally {
        setState({ selected: id, loading: false });
      }
    },
    handleDelete: async (id) => {
      try {
        setState({ loading: true });
        await request.delete(`portfolios/${id}`);
        get().getPortfolios();
      } finally {
        setState({ selected: id, loading: false });
      }
    },
  };
});

export default usePorfolios;
