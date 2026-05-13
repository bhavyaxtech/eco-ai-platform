import axios from 'axios';

/* API */

const API = axios.create({

  baseURL:
    'http://127.0.0.1:5000/api',
});

/* TYPES */

interface User {

  id: number;

  username: string;

  email: string;

  role?: string;

  points: number;
}

/* AUTH API */

export const auth = {

  /* LOGIN */

  login: async (
    email: string,
    password: string
  ): Promise<{
    token: string;
    user: User;
  }> => {

    // DEMO LOGIN

    return {

      token: 'demo-token',

      user: {

        id: 1,

        username:
          'EcoUser',

        email,

        role: 'user',

        points: 120,
      },
    };
  },

  /* REGISTER */

  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<{
    token: string;
    user: User;
  }> => {

    // DEMO REGISTER

    return {

      token: 'demo-token',

      user: {

        id: 2,

        username,

        email,

        role: 'user',

        points: 0,
      },
    };
  },
};

export default API;