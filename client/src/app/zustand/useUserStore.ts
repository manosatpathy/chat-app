import { create } from "zustand";

interface User {
  _id: string;
  name: string;
}

interface users {
  usersName: User[];
  updateUsersName: (by: User[]) => void;
}

export const useUserStore = create<users>()((set) => ({
  usersName: [],
  updateUsersName: (users: User[]) => set({ usersName: users }),
}));
