import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";
import { LIMIT, USER_ID } from "../constants";
import Cookies from "js-cookie";
import PortfoliosType from "../types/porfolios";

interface PortfoliosState {
  search: string;
  total: number;
  loading: boolean;
  portfolios: PortfoliosType;
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
  getPorfolio: () => void;
}

const usePortfolio = create<PortfoliosState>()((set, get) => {
  const setState = (obj: object) => {
    set((state) => ({ ...state, ...obj }));
  };
  return {
    search: "",
    total: 0,
    loading: false,
    portfolios: [],
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
      get().getPorfolio();
    },
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getPorfolio: async () => {
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
        } = await request.get("portfolios", {
          params,
        });

        setState({ portfolios: data, total: pagination.total });
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
          await request.put(`portfolios/${selected}`, values);
        }

        get().getPorfolio();
        form.resetFields();
      } finally {
        setState({ isModalOpen: false, isModalLoading: false });
      }
    },
    handleSearch: (e) => {
      setState({ search: e.target.value });
      get().getPorfolio();
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
        get().getPorfolio();
      } finally {
        setState({ selected: id, loading: false });
      }
    },
  };
});

export default usePortfolio;
