import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";

interface AuthState {
  user: User | null;
  isGuest: boolean;
  login: (user: User) => void;
  loginAsGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isGuest: false,

      login: (user) => set({ user, isGuest: false }),

      loginAsGuest: () => set({ user: null, isGuest: true }),

      logout: () => set({ user: null, isGuest: false }),
    }),
    {
      name: STORAGE_KEYS.user,
    }
  )
);

export const selectUser = (state: AuthState) => state.user;
export const selectIsGuest = (state: AuthState) => state.isGuest;
export const selectIsAuthenticated = (state: AuthState) =>
  Boolean(state.user) || state.isGuest;
