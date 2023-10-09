/* eslint-disable no-unsafe-optional-chaining */
import { Data } from "@/types";
import { create } from "zustand";

interface IUseData {
  data: Data[] | [];
  isLoading: boolean;
  error: string;
  setData: (newData: Data[]) => void;
  mutateData: (mutateData: Pick<Data, "status" | "len">) => void;
  editData: (id: number, updatedData: Pick<Data, "status" | "len">) => void;
  deleteData: (id: number) => void;
  setIsLoading: () => void;
  setError: (message: string) => void;
}

export const useData = create<IUseData>((set) => ({
  data: [],
  isLoading: false,
  error: "",
  setData: (newData) =>
    set(() => ({
      isLoading: false,
      data: newData,
    })),
  mutateData: (mutateData) =>
    set((state) => {
      const len = state?.data?.length;
      const lastId = state?.data[len - 1].id;
      return {
        data: [...state.data, { id: lastId + 1, ...mutateData, wkt: 0 }],
      };
    }),
  editData: (editDataId, updatedData) =>
    set((state) => {
      const updatedDataIndex = state?.data?.findIndex(
        ({ id }) => id === editDataId
      );

      const newData = [
        ...state?.data?.slice(0, updatedDataIndex),
        { ...state?.data?.[updatedDataIndex], ...updatedData },
        ...state?.data?.slice(updatedDataIndex + 1, state?.data?.length),
      ];
      return {
        data: newData,
      };
    }),
  deleteData: (deletedDataId) =>
    set((state) => {
      const newData = state?.data?.filter(({ id }) => id !== deletedDataId);

      return { data: newData };
    }),
  setIsLoading: () =>
    set(() => ({
      isLoading: true,
    })),
  setError: (message) =>
    set(() => ({
      isLoading: false,
      error: message,
    })),
}));
