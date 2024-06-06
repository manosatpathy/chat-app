import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  username: string;
}

interface chatReceiver {
  chatReceiver: User;
  updateChatReceiver: (by: User) => void;
}

const defaultUser: User = {
  _id: "",
  name: "",
  username: "",
};

export const useChatReceiverStore = create<chatReceiver>()((set) => ({
  chatReceiver: defaultUser,
  updateChatReceiver: (chatReceiver: User) =>
    set({ chatReceiver: chatReceiver }),
}));
