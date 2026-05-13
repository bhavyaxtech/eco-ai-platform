import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  points: number;
}

interface LeaderboardUser {
  username: string;
  points: number;
}

interface Store {
  user: User | null;

  token: string | null;

  darkMode: boolean;

  completedQuizzes: number[];

  totalXP: number;

  leaderboard: LeaderboardUser[];

  /* AUTH */
  setAuth: (
    token: string,
    user: User
  ) => void;

  logout: () => void;

  /* POINTS */
  addPoints: (
    points: number
  ) => void;

  completeQuiz: (
    quizId: number,
    xp: number
  ) => void;

  updateLeaderboard: () => void;

  /* DARK MODE */
  toggleDarkMode: () => void;
}

export const useAuthStore =
  create<Store>((set, get) => ({

    /* =========================
       INITIAL STATE
    ========================= */

    user: JSON.parse(
      localStorage.getItem('eco_user') || 'null'
    ),

    token:
      localStorage.getItem('eco_token'),

    darkMode:
      localStorage.getItem('eco_dark') === 'true',

    completedQuizzes: JSON.parse(
      localStorage.getItem(
        'eco_completed'
      ) || '[]'
    ),

    totalXP: Number(
      localStorage.getItem('eco_xp') || 0
    ),

    leaderboard: JSON.parse(
      localStorage.getItem(
        'eco_leaderboard'
      ) || '[]'
    ),

    /* =========================
       LOGIN / REGISTER
    ========================= */

    setAuth: (token, user) => {

      const fixedUser = {
        ...user,
        points: user.points || 1200,
      };

      localStorage.setItem(
        'eco_token',
        token
      );

      localStorage.setItem(
        'eco_user',
        JSON.stringify(fixedUser)
      );

      set({
        token,
        user: fixedUser,
      });

      get().updateLeaderboard();
    },

    /* =========================
       LOGOUT
    ========================= */

    logout: () => {

      localStorage.removeItem(
        'eco_token'
      );

      localStorage.removeItem(
        'eco_user'
      );

      set({
        token: null,
        user: null,
      });
    },

    /* =========================
       ADD ECO POINTS
    ========================= */

    addPoints: (points) =>

      set((state) => {

        if (!state.user)
          return state;

        const updatedUser = {
          ...state.user,
          points:
            state.user.points + points,
        };

        localStorage.setItem(
          'eco_user',
          JSON.stringify(updatedUser)
        );

        localStorage.setItem(
          'eco_xp',
          String(
            state.totalXP + points
          )
        );

        return {
          user: updatedUser,
          totalXP:
            state.totalXP + points,
        };
      }),

    /* =========================
       COMPLETE QUIZ
    ========================= */

    completeQuiz: (
      quizId,
      xp
    ) =>

      set((state) => {

        if (!state.user)
          return state;

        if (
          state.completedQuizzes.includes(
            quizId
          )
        ) {
          return state;
        }

        const updatedUser = {
          ...state.user,
          points:
            state.user.points + xp,
        };

        const updatedCompleted = [
          ...state.completedQuizzes,
          quizId,
        ];

        localStorage.setItem(
          'eco_user',
          JSON.stringify(updatedUser)
        );

        localStorage.setItem(
          'eco_completed',
          JSON.stringify(
            updatedCompleted
          )
        );

        localStorage.setItem(
          'eco_xp',
          String(
            state.totalXP + xp
          )
        );

        return {
          user: updatedUser,

          completedQuizzes:
            updatedCompleted,

          totalXP:
            state.totalXP + xp,
        };
      }),

    /* =========================
       LEADERBOARD
    ========================= */

    updateLeaderboard: () => {

      const state = get();

      if (!state.user) return;

      let leaderboard =
        state.leaderboard || [];

      const existing =
        leaderboard.find(
          (p) =>
            p.username ===
            state.user?.username
        );

      if (existing) {

        existing.points =
          state.user.points;

      } else {

        leaderboard.push({
          username:
            state.user.username,
          points:
            state.user.points,
        });
      }

      leaderboard.sort(
        (a, b) =>
          b.points - a.points
      );

      localStorage.setItem(
        'eco_leaderboard',
        JSON.stringify(
          leaderboard
        )
      );

      set({
        leaderboard,
      });
    },

    /* =========================
       DARK MODE
    ========================= */

    toggleDarkMode: () =>

      set((state) => {

        localStorage.setItem(
          'eco_dark',
          String(!state.darkMode)
        );

        return {
          darkMode:
            !state.darkMode,
        };
      }),
  }));