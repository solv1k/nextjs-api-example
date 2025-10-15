import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserProfile } from "@/api/endpoints/profile";

const GLOBAL_STORE_KEY = "appGlobalStore";

interface GlobalStore {
  user: UserProfile | null;
  token: string | null;
  isShowLoginModal: boolean;
  isShowLogoutModal: boolean;
  setUser: (user: UserProfile | null) => void;
  setAuthToken: (token: string | null) => void;
  setIsShowLoginModal: (isShowLoginModal: boolean) => void;
  setIsShowLogoutModal: (isShowLogoutModal: boolean) => void;
  logout: () => void;
}

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isShowLoginModal: false,
      isShowLogoutModal: false,

      setUser: (user: UserProfile | null) => set({ user }),
      setAuthToken: (token: string | null) => set({ token }),
      setIsShowLoginModal: (isShowLoginModal: boolean) =>
        set({ isShowLoginModal }),
      setIsShowLogoutModal: (isShowLogoutModal: boolean) =>
        set({ isShowLogoutModal }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: GLOBAL_STORE_KEY,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
