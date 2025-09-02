import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

type AuthStore = {
  confirmation: FirebaseAuthTypes.ConfirmationResult;
  setConfirmation: (confirmation: FirebaseAuthTypes.ConfirmationResult ) => void;
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
  reSetUserStore: () => void;

};

export const useAuthStore = create<AuthStore>((set) => ({
  confirmation: null,
  setConfirmation: (confirmation) => set({ confirmation }),
  phoneNumber: null,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  reSetUserStore: () => set({ confirmation: null, phoneNumber: null }),
}));