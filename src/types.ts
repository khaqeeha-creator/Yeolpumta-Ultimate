export interface User {
  id: string;
  name: string;
  avatar: string | null;
  streak: number;
  xp: number;
  energy: number;
}

export interface Task {
  id: string;
  title: string;
  difficulty: 'normal' | 'hard' | 'ultimate';
  estimateMin: number;
  tags: string[];
  status: 'todo' | 'doing' | 'done' | 'backlog';
  history: { date: string; outcome: 'success' | 'failed' }[];
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'normal' | 'hard' | 'ultimate';
  goalMinutes: number;
  rewardXP: number;
}

export interface AnalyticsData {
  timeseries: { date: string; accuracy: number; speed: number; xp: number }[];
  heatmap: Record<string, number>;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  sparkline: number[];
}

export interface AppState {
  user: User | null;
  dailyChallenge: Challenge | null;
  tasks: Task[];
  analytics: AnalyticsData | null;
  leaderboard: LeaderboardEntry[];
  notifications: string[];
  isLoading: boolean;
  theme: 'dark' | 'light';
  reducedMotion: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  acceptChallenge: () => void;
  addNotification: (msg: string) => void;
  toggleTheme: () => void;
  toggleReducedMotion: () => void;
  fetchDashboard: () => Promise<void>;
}