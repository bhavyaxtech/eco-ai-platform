import axios from 'axios';

/* API */

const API = axios.create({
  baseURL: 'https://eco-ai-backend-0y45.onrender.com/api',
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

    const response = await API.post(
      '/auth/login',
      {
        email,
        password,
      }
    );

    return response.data;
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

    const response = await API.post(
      '/auth/register',
      {
        username,
        email,
        password,
      }
    );

    return response.data;
  },
};

export default API;
