import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      userType: null,
      userData: null,
      setUserType: (type) => set({ userType: type }),
      setUserData: (data) => set({ userData: data }),
    }),
    {
      name: 'fynder-user-store', // key in localStorage
      partialize: (state) => ({ userType: state.userType, userData: state.userData }),
    }
  )
);