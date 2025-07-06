// @/store/userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      userType: null,
      userData: null,
      profile: null, // Add profile state
      setUserType: (type) => set({ userType: type }),
      setUserData: (data) => set({ userData: data }),
      setProfile: (profile) => set({ profile }), // Add method to update profile
      
    }),
    {
      name: 'fynder-user-store',
      partialize: (state) => ({
        userType: state.userType,
        userData: state.userData,
        profile: state.profile, // Persist profile
      }),
    }
  )
);