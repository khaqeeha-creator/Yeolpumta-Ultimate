import { create } from 'zustand';
import { AppState, Task } from '@/types';

export const useStore = create<AppState>((set) => ({
  user: null,
  dailyChallenge: null,
  tasks: [],
  analytics: null,
  leaderboard: [],
  notifications: [],
  isLoading: true,
  theme: 'dark',
  reducedMotion: false,

  setUser: (user) => set({ user }),
  setTasks: (tasks) => set({ tasks }),
  
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === taskId ? { ...t, status } : t)
  })),

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),

  updateTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === updatedTask.id ? updatedTask : t)
  })),

  acceptChallenge: () => set((state) => {
    if (!state.user) return {};
    // Simulate immediate optimistic UI update
    return {
      user: { ...state.user, energy: Math.max(0, state.user.energy - 20) },
      notifications: [...state.notifications, `Challenge accepted! -20 Energy`]
    };
  }),

  addNotification: (msg) => set((state) => {
    // Keep last 3 notifications
    const newNotes = [...state.notifications, msg].slice(-3);
    return { notifications: newNotes };
  }),

  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),

  toggleReducedMotion: () => set((state) => ({ 
    reducedMotion: !state.reducedMotion 
  })),

  fetchDashboard: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      set({
        user: data.user,
        dailyChallenge: data.dailyChallenge,
        tasks: data.tasks as Task[],
        analytics: data.analytics,
        leaderboard: data.leaderboard,
        isLoading: false
      });
    } catch (err) {
      console.error("Failed to fetch dashboard", err);
      set({ isLoading: false });
    }
  }
}));