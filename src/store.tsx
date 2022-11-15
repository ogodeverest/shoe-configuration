import create from "zustand";

export interface ConfigItems {
  laces: string;
  mesh: string;
  caps: string;
  inner: string;
  sole: string;
  stripes: string;
  band: string;
  patch: string;
}

interface ConfigState {
  current: keyof ConfigItems | null;
  hovered: keyof ConfigItems | null;
  changeColor: (color: string) => void;
  setCurrent: (value: keyof ConfigItems | null) => void;
  setHovered: (value: keyof ConfigItems | null) => void;
  items: ConfigItems;
}

const useConfigStore = create<ConfigState>((set) => ({
  current: null,
  hovered: null,
  changeColor: (value: string) => {
    set((state) => ({
      ...state,
      items: {
        ...state.items,
        [state.current as string]: value,
      },
    }));
  },
  setCurrent: (value: keyof ConfigItems | null) => {
    set((state) => ({
      ...state,
      current: value,
    }));
  },
  setHovered: (value: keyof ConfigItems | null) => {
    set((state) => ({
      ...state,
      hovered: value,
    }));
  },
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
}));

export default useConfigStore;
