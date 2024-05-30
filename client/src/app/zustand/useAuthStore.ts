import { create } from "zustand";

interface AuthState {
  authName: string;
  updateAuthName: (by: string) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authName: "",
  updateAuthName: (name: string) => set({ authName: name }),
}));
