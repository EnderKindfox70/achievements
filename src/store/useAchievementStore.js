import { create } from 'zustand';

const useAchievementsStore = create((set) => ({
  achievements: [],
  setAchievements: (achievements) => set({ achievements }),
}));

export default useAchievementsStore;
