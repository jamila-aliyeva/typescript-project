import { create } from "zustand";
import request from "../server";
import { FormInstance } from "antd";
import SkillType from "../types/skills";
import UsersyType from "../types/user";

interface UsersState {
  search: string;
  total: number;
  loading: boolean;
  users: SkillType[];
  selected: null | string;
  isModalLoading: boolean;
  isModalOpen: boolean;
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
    users: [],
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    getUsers: async () => {
      try {
        const { search } = get();
        const params = { search };
        setState({ loading: true });
        const { data } = await request.get<UsersyType[]>(`users`, {
          params,
        });
        setState({ skills: data.data, total: data.data.length });
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
          await request.post(`users`, values);
        } else {
          await request.put(`users/${selected}`, values);
        }

        get().getUsers();
        form.resetFields();
      } finally {
        setState({ isModalLoading: false });
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
  };
});

export default useUsers;
