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
      localStorage.getItem(
        'eco_user'
      ) || 'null'
    ),

    token:
      localStorage.getItem(
        'eco_token'
      ),

    darkMode:
      localStorage.getItem(
        'eco_dark'
      ) === 'true',

    completedQuizzes: JSON.parse(
      localStorage.getItem(
        'eco_completed'
      ) || '[]'
    ),

    totalXP: Number(
      localStorage.getItem(
        'eco_xp'
      ) || 0
    ),

    leaderboard: JSON.parse(
      localStorage.getItem(
        'eco_leaderboard'
      ) || '[]'
    ),

    /* =========================
       LOGIN / REGISTER
    ========================= */

    setAuth: (
      token,
      user
    ) => {

      const fixedUser = {
        ...user,
        points:
          user.points || 0,
      };

      localStorage.setItem(
        'eco_token',
        token
      );

      localStorage.setItem(
        'eco_user',
        JSON.stringify(
          fixedUser
        )
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

    addPoints: (
      points
    ) =>

      set((state) => {

        if (!state.user)
          return state;

        const updatedUser = {
          ...state.user,
          points:
            state.user.points +
            points,
        };

        const updatedXP =
          state.totalXP +
          points;

        localStorage.setItem(
          'eco_user',
          JSON.stringify(
            updatedUser
          )
        );

        localStorage.setItem(
          'eco_xp',
          String(updatedXP)
        );

        /* UPDATE LEADERBOARD */

        let leaderboard =
          state.leaderboard || [];

        const existing =
          leaderboard.find(
            (p) =>
              p.username ===
              updatedUser.username
          );

        if (existing) {

          existing.points =
            updatedUser.points;

        } else {

          leaderboard.push({
            username:
              updatedUser.username,
            points:
              updatedUser.points,
          });
        }

        leaderboard.sort(
          (a, b) =>
            b.points -
            a.points
        );

        localStorage.setItem(
          'eco_leaderboard',
          JSON.stringify(
            leaderboard
          )
        );

        return {
          user: updatedUser,

          totalXP:
            updatedXP,

          leaderboard,
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

        const alreadyCompleted =
          state.completedQuizzes.includes(
            quizId
          );

        /* ALWAYS ADD XP */

        const updatedUser = {
          ...state.user,
          points:
            state.user.points +
            xp,
        };

        /* SAVE QUIZ ONLY ONCE */

        const updatedCompleted =
          alreadyCompleted
            ? state.completedQuizzes
            : [
                ...state.completedQuizzes,
                quizId,
              ];

        const updatedXP =
          state.totalXP + xp;

        /* SAVE */

        localStorage.setItem(
          'eco_user',
          JSON.stringify(
            updatedUser
          )
        );

        localStorage.setItem(
          'eco_completed',
          JSON.stringify(
            updatedCompleted
          )
        );

        localStorage.setItem(
          'eco_xp',
          String(updatedXP)
        );

        /* UPDATE LEADERBOARD */

        let leaderboard =
          state.leaderboard || [];

        const existing =
          leaderboard.find(
            (p) =>
              p.username ===
              updatedUser.username
          );

        if (existing) {

          existing.points =
            updatedUser.points;

        } else {

          leaderboard.push({
            username:
              updatedUser.username,
            points:
              updatedUser.points,
          });
        }

        leaderboard.sort(
          (a, b) =>
            b.points -
            a.points
        );

        localStorage.setItem(
          'eco_leaderboard',
          JSON.stringify(
            leaderboard
          )
        );

        return {
          user: updatedUser,

          completedQuizzes:
            updatedCompleted,

          totalXP:
            updatedXP,

          leaderboard,
        };
      }),

    /* =========================
       UPDATE LEADERBOARD
    ========================= */

    updateLeaderboard: () => {

      const state = get();

      if (!state.user)
        return;

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
          b.points -
          a.points
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
          String(
            !state.darkMode
          )
        );

        return {
          darkMode:
            !state.darkMode,
        };
      }),
  }));