import { create } from "zustand";

interface chatReceiver {
  chatReceiver: string;
  updateChatReceiver: (by: string) => void;
}

const useChatReceiverStore = create<chatReceiver>()((set) => ({
  chatReceiver: "",
  updateChatReceiver: (chatReceiver) => set({ chatReceiver: chatReceiver }),
}));
